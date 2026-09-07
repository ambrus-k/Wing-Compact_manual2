let audioCtx: AudioContext | null = null;
let currentOscillator: OscillatorNode | null = null;
let currentGainNode: GainNode | null = null;
let noiseBufferSource: AudioBufferSourceNode | null = null;

export function getOrCreateAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function stopTestSignal() {
  try {
    if (currentOscillator) {
      currentOscillator.stop();
      currentOscillator.disconnect();
      currentOscillator = null;
    }
    if (noiseBufferSource) {
      noiseBufferSource.stop();
      noiseBufferSource.disconnect();
      noiseBufferSource = null;
    }
    if (currentGainNode) {
      currentGainNode.disconnect();
      currentGainNode = null;
    }
  } catch (err) {
    console.warn('Error stopping audio generator:', err);
  }
}

export function playSineTone(freq: number = 1000, volume: number = 0.15) {
  stopTestSignal();
  const ctx = getOrCreateAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  currentOscillator = osc;
  currentGainNode = gain;
}

export function playPinkNoise(volume: number = 0.12) {
  stopTestSignal();
  const ctx = getOrCreateAudioContext();
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);

  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
    b6 = white * 0.115926;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = buffer;
  whiteNoise.loop = true;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.05);

  whiteNoise.connect(gain);
  gain.connect(ctx.destination);

  whiteNoise.start();
  noiseBufferSource = whiteNoise;
  currentGainNode = gain;
}

export function playWhiteNoise(volume: number = 0.08) {
  stopTestSignal();
  const ctx = getOrCreateAudioContext();
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = buffer;
  whiteNoise.loop = true;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.05);

  whiteNoise.connect(gain);
  gain.connect(ctx.destination);

  whiteNoise.start();
  noiseBufferSource = whiteNoise;
  currentGainNode = gain;
}

export interface LatencyPathCalculation {
  sampleRate: 48000 | 44100;
  baseHardwareLatencySamples: number; // 48 samples = 1.0 ms
  hasBusToBusSend: boolean; // +8 samples
  hasLoopbackToChannelInput: boolean; // +38 samples
  insertEffect1: string;
  insertEffect2: string;
}

export const FX_LATENCY_MAP: Record<string, { samples48k: number; samples44k: number }> = {
  'Žádný insert (Bypass)': { samples48k: 0, samples44k: 0 },
  'Standardní EQ / Comp (bez insertu)': { samples48k: 0, samples44k: 0 },
  'VSS3 Reverb (přes Bus Send)': { samples48k: 32, samples44k: 32 },
  'Stereo Pitch (Delay = 0)': { samples48k: 32 + 178, samples44k: 32 + 178 },
  'Precision Limiter': { samples48k: 32 + 52, samples44k: 32 + 48 },
  'Exciter (Aural Enhancer)': { samples48k: 32 + 11, samples44k: 32 + 10 },
  'Pitch Fix (Auto-Tune)': { samples48k: 32 + 39, samples44k: 32 + 39 },
  'UK Rock Amp (Kytara)': { samples48k: 32 + 18, samples44k: 32 + 18 },
  'Angel Amp (Metal)': { samples48k: 32 + 18, samples44k: 32 + 18 },
  'Jazz Clean Amp': { samples48k: 32 + 14, samples44k: 32 + 14 },
  'Deluxe Amp': { samples48k: 32 + 16, samples44k: 32 + 16 },
  'Mastering Strip (4 efekty)': { samples48k: 32 + 52, samples44k: 32 + 52 }
};

export function calculateTotalLatency(config: LatencyPathCalculation) {
  const is48k = config.sampleRate === 48000;
  let totalSamples = config.baseHardwareLatencySamples;

  if (config.hasBusToBusSend) {
    totalSamples += 8;
  }
  if (config.hasLoopbackToChannelInput) {
    totalSamples += 38;
  }

  const fx1 = FX_LATENCY_MAP[config.insertEffect1] || { samples48k: 0, samples44k: 0 };
  const fx2 = FX_LATENCY_MAP[config.insertEffect2] || { samples48k: 0, samples44k: 0 };

  totalSamples += is48k ? fx1.samples48k : fx1.samples44k;
  totalSamples += is48k ? fx2.samples48k : fx2.samples44k;

  const latencyMs = (totalSamples / config.sampleRate) * 1000;

  return {
    totalSamples,
    latencyMs: Number(latencyMs.toFixed(3)),
    sampleRate: config.sampleRate
  };
}

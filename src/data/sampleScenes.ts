import { SavedScene } from '../types';

export const INITIAL_SCENES: SavedScene[] = [
  {
    id: 'scene-rock-fest-24',
    name: 'Rock Fest 24ch Compact Standard',
    type: 'snapshot',
    createdAt: '2026-06-12T14:30:00Z',
    updatedAt: '2026-08-15T18:20:00Z',
    tags: ['Rock', 'Festival', '24ch', 'Live'],
    description: 'Kompletní festivalový setup pro rockovou kapelu (Bicí 8ch, Basa 2ch, 4x Kytara, 4x Vokál, 6x IEM Stereo sběrnice, 4x FX Rack).',
    favorite: true,
    channelCount: 24,
    scope: {
      channels: true,
      aux: true,
      buses: true,
      mains: true,
      matrix: true,
      eq: true,
      dyn: true,
      gate: true,
      fx: true,
      routing: true,
      dca: true,
      muteGroups: true
    },
    details: {
      targetEnsemble: 'Rocková kapela (4-5 členů)',
      faderLayerPreset: 'Bank 1: Ch 1-12 (Drums/Bass) | Bank 2: Ch 13-24 (Gtr/Keys/Vocs)',
      mainFaderAssign: 'MAIN 1 (Stereo PA)',
      customControlsProfile: 'U1: Tap Tempo Delay | U2: FX Mute | U3: Drum Gate Mute | U4: Virtual Soundcheck Switch',
      notes: 'Routing nastaven z Local In 1-24 Midas PRO. DCA 1=Drums, DCA 2=Bass, DCA 3=Guitars, DCA 4=Vocals, DCA 5=FX.'
    },
    channels: [
      { chNum: 1, name: 'Kick In', sourceInput: 'Local In 1', gainDb: 22, phantom48V: true, phaseInvert: false, color: 'orange', icon: 'Drum', faderDb: 0.0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'WING Gate', eqModel: 'WING 6-Band EQ', compOn: true, compModel: '76 Limiter Amp', dcaGroup: 1, busSends: [{ busNum: 1, busName: 'IEM Lead', levelDb: -6, on: true }, { busNum: 5, busName: 'IEM Drums', levelDb: 0, on: true }] },
      { chNum: 2, name: 'Kick Out', sourceInput: 'Local In 2', gainDb: 28, phantom48V: false, phaseInvert: true, color: 'orange', icon: 'Drum', faderDb: -2.5, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'WING Gate', eqModel: 'Pulsar P1a (Pultec)', compOn: true, compModel: 'BDX 160', dcaGroup: 1, busSends: [{ busNum: 5, busName: 'IEM Drums', levelDb: -2, on: true }] },
      { chNum: 3, name: 'Snare Top', sourceInput: 'Local In 3', gainDb: 26, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Drum', faderDb: 0.0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'WING Expander', eqModel: 'Even 84 (Neve)', compOn: true, compModel: '76 Limiter Amp', dcaGroup: 1, busSends: [{ busNum: 1, busName: 'IEM Lead', levelDb: -3, on: true }, { busNum: 9, busName: 'FX Reverb', levelDb: -12, on: true }] },
      { chNum: 4, name: 'Snare Bottom', sourceInput: 'Local In 4', gainDb: 30, phantom48V: false, phaseInvert: true, color: 'orange', icon: 'Drum', faderDb: -6.0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'WING Gate', eqModel: 'WING 6-Band EQ', compOn: false, compModel: 'Bypass', dcaGroup: 1 },
      { chNum: 5, name: 'Hi-Hat', sourceInput: 'Local In 5', gainDb: 32, phantom48V: true, phaseInvert: false, color: 'yellow', icon: 'Cymbal', faderDb: -4.0, pan: -35, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ (HPF 350Hz)', compOn: false, compModel: 'Bypass', dcaGroup: 1 },
      { chNum: 6, name: 'Rack Tom 1', sourceInput: 'Local In 6', gainDb: 28, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Tom', faderDb: -1.0, pan: -30, muted: false, solo: false, gateOn: true, gateModel: 'WING Gate Duck', eqModel: 'WING 6-Band EQ', compOn: true, compModel: 'WING Compressor', dcaGroup: 1 },
      { chNum: 7, name: 'Floor Tom', sourceInput: 'Local In 7', gainDb: 29, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Tom', faderDb: 0.0, pan: 40, muted: false, solo: false, gateOn: true, gateModel: 'WING Gate Duck', eqModel: 'WING 6-Band EQ', compOn: true, compModel: 'WING Compressor', dcaGroup: 1 },
      { chNum: 8, name: 'Overheads (Stereo)', sourceInput: 'Local In 8-9', gainDb: 34, phantom48V: true, phaseInvert: false, color: 'yellow', icon: 'Cymbal', faderDb: -3.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'SOUL 9000 Analog EQ', compOn: true, compModel: 'Fair Kid (Fairchild)', dcaGroup: 1 },
      { chNum: 9, name: 'Bass DI (Clean)', sourceInput: 'Local In 10', gainDb: 18, phantom48V: false, phaseInvert: false, color: 'blue', icon: 'Bass', faderDb: 0.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Pulsar P1a (Pultec)', compOn: true, compModel: 'LA Leveler (Opto)', dcaGroup: 2, busSends: [{ busNum: 1, busName: 'IEM Lead', levelDb: -4, on: true }, { busNum: 5, busName: 'IEM Drums', levelDb: 0, on: true }] },
      { chNum: 10, name: 'Bass Mic (Amp Drive)', sourceInput: 'Local In 11', gainDb: 24, phantom48V: false, phaseInvert: false, color: 'blue', icon: 'Amp', faderDb: -4.5, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Even 84 (Neve)', compOn: true, compModel: '76 Limiter Amp', dcaGroup: 2 },
      { chNum: 11, name: 'Gtr Electric Left', sourceInput: 'Local In 12', gainDb: 24, phantom48V: false, phaseInvert: false, color: 'green', icon: 'Guitar', faderDb: -1.5, pan: -65, muted: false, solo: false, gateOn: true, gateModel: 'WING Gate', eqModel: 'WING 6-Band EQ', compOn: false, compModel: 'Bypass', dcaGroup: 3 },
      { chNum: 12, name: 'Gtr Electric Right', sourceInput: 'Local In 13', gainDb: 24, phantom48V: false, phaseInvert: false, color: 'green', icon: 'Guitar', faderDb: -1.5, pan: 65, muted: false, solo: false, gateOn: true, gateModel: 'WING Gate', eqModel: 'WING 6-Band EQ', compOn: false, compModel: 'Bypass', dcaGroup: 3 },
      { chNum: 13, name: 'Gtr Solo / Lead', sourceInput: 'Local In 14', gainDb: 26, phantom48V: false, phaseInvert: false, color: 'green', icon: 'Guitar', faderDb: 1.0, pan: 10, muted: false, solo: false, gateOn: true, gateModel: 'WING Gate', eqModel: 'Even 84 (Neve 3.2kHz Boost)', compOn: true, compModel: '76 Limiter Amp', dcaGroup: 3, busSends: [{ busNum: 10, busName: 'FX Stereo Delay', levelDb: -8, on: true }] },
      { chNum: 14, name: 'Acoustic Guitar', sourceInput: 'Local In 15', gainDb: 28, phantom48V: true, phaseInvert: false, color: 'green', icon: 'Acoustic', faderDb: -2.0, pan: -20, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'SOUL 9000 EQ (Notch 220Hz)', compOn: true, compModel: 'LA Leveler', dcaGroup: 3 },
      { chNum: 15, name: 'Keys Left (Stereo)', sourceInput: 'Local In 16', gainDb: 14, phantom48V: false, phaseInvert: false, color: 'magenta', icon: 'Keys', faderDb: -2.5, pan: -70, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: false, compModel: 'Bypass', dcaGroup: 4 },
      { chNum: 16, name: 'Keys Right (Stereo)', sourceInput: 'Local In 17', gainDb: 14, phantom48V: false, phaseInvert: false, color: 'magenta', icon: 'Keys', faderDb: -2.5, pan: 70, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: false, compModel: 'Bypass', dcaGroup: 4 },
      { chNum: 17, name: 'Lead Vocal (Radio Beta58)', sourceInput: 'Local In 18', gainDb: 32, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: 2.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ + BDX902 De-Esser', compOn: true, compModel: 'LA Leveler + 76 Limiter Series', dcaGroup: 5, busSends: [{ busNum: 1, busName: 'IEM Lead', levelDb: 4, on: true }, { busNum: 9, busName: 'FX Vocal Hall', levelDb: -6, on: true }, { busNum: 10, busName: 'FX Stereo Delay', levelDb: -10, on: true }] },
      { chNum: 18, name: 'Backing Voc Gtr (SM58)', sourceInput: 'Local In 19', gainDb: 34, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: -1.0, pan: -40, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ (HPF 140Hz)', compOn: true, compModel: 'WING Compressor', dcaGroup: 5, busSends: [{ busNum: 9, busName: 'FX Vocal Hall', levelDb: -9, on: true }] },
      { chNum: 19, name: 'Backing Voc Bass', sourceInput: 'Local In 20', gainDb: 34, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: -2.0, pan: 35, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: true, compModel: 'WING Compressor', dcaGroup: 5 },
      { chNum: 20, name: 'Backing Voc Keys', sourceInput: 'Local In 21', gainDb: 35, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: -3.0, pan: 50, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: true, compModel: 'WING Compressor', dcaGroup: 5 },
      { chNum: 21, name: 'Click Track (In-Ear only)', sourceInput: 'Local In 22', gainDb: 10, phantom48V: false, phaseInvert: false, color: 'gray', icon: 'Clock', faderDb: -90.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Bypass', compOn: false, compModel: 'Bypass', busSends: [{ busNum: 1, busName: 'IEM Lead', levelDb: -8, on: true }, { busNum: 5, busName: 'IEM Drums', levelDb: 0, on: true }] },
      { chNum: 22, name: 'Audio Guide Cues', sourceInput: 'Local In 23', gainDb: 12, phantom48V: false, phaseInvert: false, color: 'gray', icon: 'Volume2', faderDb: -90.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Bypass', compOn: false, compModel: 'Bypass', busSends: [{ busNum: 1, busName: 'IEM Lead', levelDb: -10, on: true }] },
      { chNum: 23, name: 'Talkback Sound Guy', sourceInput: 'Local In 24 (XLR Front/Rear)', gainDb: 38, phantom48V: false, phaseInvert: false, color: 'cyan', icon: 'Radio', faderDb: -90.0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'WING Gate', eqModel: 'WING 6-Band EQ', compOn: true, compModel: 'WING Compressor', busSends: [{ busNum: 1, busName: 'IEM Lead', levelDb: 0, on: true }, { busNum: 3, busName: 'IEM Gtr', levelDb: 0, on: true }, { busNum: 5, busName: 'IEM Drums', levelDb: 0, on: true }] },
      { chNum: 24, name: 'USB Walk-In Music (Stereo)', sourceInput: 'USB Play 1-2', gainDb: 0, phantom48V: false, phaseInvert: false, color: 'yellow', icon: 'Music', faderDb: -8.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Pulsar P1a (Warm Low)', compOn: false, compModel: 'Bypass' }
    ],
    buses: [
      { busNum: 1, name: 'IEM Lead (Stereo)', isStereo: true, role: 'IEM Monitor', faderDb: 0.0, color: 'red', pan: 0, fxInsert: 'None' },
      { busNum: 3, name: 'IEM Guitar (Stereo)', isStereo: true, role: 'IEM Monitor', faderDb: 0.0, color: 'green', pan: 0, fxInsert: 'None' },
      { busNum: 5, name: 'IEM Drums (Stereo)', isStereo: true, role: 'IEM Monitor', faderDb: 0.0, color: 'orange', pan: 0, fxInsert: 'None' },
      { busNum: 7, name: 'Front Wedge Mon', isStereo: false, role: 'Wedge Monitor', faderDb: -2.0, color: 'yellow', pan: 0, fxInsert: 'GEQ 31-Band Feedback Sup' },
      { busNum: 9, name: 'FX 1 Send: Hall', isStereo: true, role: 'FX Send', faderDb: 0.0, color: 'magenta', pan: 0, fxInsert: 'TC VSS3 Reverb' },
      { busNum: 11, name: 'FX 2 Send: Delay', isStereo: true, role: 'FX Send', faderDb: 0.0, color: 'cyan', pan: 0, fxInsert: 'Stereo Tap Delay' },
      { busNum: 13, name: 'Drum Subgroup (Parallel)', isStereo: true, role: 'Subgroup', faderDb: -3.0, color: 'orange', pan: 0, fxInsert: 'Fairchild 670 Bus Comp' },
      { busNum: 15, name: 'Stream Broadcast Mix', isStereo: true, role: 'Stream Submix', faderDb: 0.0, color: 'blue', pan: 0, fxInsert: 'C5 Combinator Multiband' }
    ],
    dcas: [
      { dcaNum: 1, name: 'DCA 1: Drums All', color: 'orange', faderDb: 0.0, muted: false, memberChannels: 'Ch 1-8' },
      { dcaNum: 2, name: 'DCA 2: Bass Clean+Mic', color: 'blue', faderDb: 0.0, muted: false, memberChannels: 'Ch 9-10' },
      { dcaNum: 3, name: 'DCA 3: Guitars All', color: 'green', faderDb: 0.0, muted: false, memberChannels: 'Ch 11-14' },
      { dcaNum: 4, name: 'DCA 4: Keys / Synths', color: 'magenta', faderDb: -1.0, muted: false, memberChannels: 'Ch 15-16' },
      { dcaNum: 5, name: 'DCA 5: Vocals Lead+Back', color: 'red', faderDb: 1.0, muted: false, memberChannels: 'Ch 17-20' },
      { dcaNum: 6, name: 'DCA 6: FX Master Returns', color: 'cyan', faderDb: 0.0, muted: false, memberChannels: 'FX 1-4' },
      { dcaNum: 7, name: 'DCA 7: IEM Master Trim', color: 'yellow', faderDb: 0.0, muted: false, memberChannels: 'Bus 1-6' },
      { dcaNum: 8, name: 'DCA 8: Complete Band', color: 'purple', faderDb: 0.0, muted: false, memberChannels: 'Ch 1-20' }
    ],
    fxSlots: [
      { slotNum: 1, model: 'TC Electronic VSS3', name: 'Vocal Lush Hall', type: 'Send/Return', source: 'Bus 9-10', target: 'FX 1 Return', keyParam: 'Decay: 2.8s, Pre-Delay: 25ms, Diffuse: 85%' },
      { slotNum: 2, model: 'Stereo Delay 24-bit', name: '1/4 Note Ping-Pong', type: 'Send/Return', source: 'Bus 11-12', target: 'FX 2 Return', keyParam: 'Tempo: 124 BPM, Feed: 35%, High Cut: 4.5kHz' },
      { slotNum: 3, model: 'Vintage Plate 140', name: 'Snare Plate Reverb', type: 'Send/Return', source: 'Ch 3 Direct', target: 'FX 3 Return', keyParam: 'Decay: 1.4s, Low Cut: 180Hz, Drive: Clean' },
      { slotNum: 4, model: 'BDX 902 De-Esser', name: 'Vocal Sibilance Tamer', type: 'Channel Insert', source: 'Ch 17 Insert', target: 'Ch 17 Post-EQ', keyParam: 'Freq: 6.8kHz, Depth: 8dB, HF Only' },
      { slotNum: 5, model: 'Fairchild 670 Stereo', name: 'Parallel Drum Glue', type: 'Bus Insert', source: 'Bus 13-14 Insert', target: 'Bus 13-14 Output', keyParam: 'Time Const: 1, Input: +6dB, GR: 4-6dB' },
      { slotNum: 6, model: 'C5 Combinator Multiband', name: 'Broadcast Stream Maximizer', type: 'Bus Insert', source: 'Bus 15-16 Insert', target: 'Bus 15-16 Output', keyParam: '5 Bands, Fast Limiter, LUFS Target: -14' },
      { slotNum: 7, model: 'Dimension Chorus', name: '80s Acoustic & Clean Gtr', type: 'Send/Return', source: 'Ch 14 Send', target: 'FX 7 Return', keyParam: 'Mode 3, Speed: 0.4Hz, Depth: 70%' },
      { slotNum: 8, model: 'Precision Limiter Pro', name: 'Master PA Protection', type: 'Master Insert', source: 'MAIN 1 Insert', target: 'MAIN 1 Output', keyParam: 'Ceiling: -0.3 dBFS, Lookahead: 1.5ms, Release: Auto' }
    ],
    matrices: [
      { matrixNum: 1, name: 'Matrix 1-2: Main PA Left/Right', source: 'MAIN 1 (Stereo)', delayMs: 0.0, delayMeters: 0.0, eqType: '6-Band Room Tuning PEQ', faderDb: 0.0, destination: 'Local Out 1-2 (XLR to Amps)' },
      { matrixNum: 3, name: 'Matrix 3: Subwoofers Aux-Fed', source: 'MAIN 2 / Mono Sub', delayMs: 4.2, delayMeters: 1.44, eqType: 'LPF 24dB/oct 85Hz Butterworth', faderDb: 2.0, destination: 'Local Out 3 (XLR to Subs)' },
      { matrixNum: 4, name: 'Matrix 4: Front Fill Stage', source: 'MAIN 1 (Stereo)', delayMs: 7.8, delayMeters: 2.68, eqType: 'HPF 120Hz + High Shelf', faderDb: -4.0, destination: 'Local Out 4 (XLR to Fills)' },
      { matrixNum: 5, name: 'Matrix 5-6: Delay Tower PA (35m)', source: 'MAIN 1 (Stereo)', delayMs: 102.5, delayMeters: 35.15, eqType: 'Delay Tower Compensation EQ', faderDb: -2.0, destination: 'AES50-A Out 1-2' }
    ],
    cues: [
      { cueNumber: '1.00', cueName: '01. Intro Song: Full Energy', songSection: 'Intro', crossfadeSec: 0.0, targetSceneId: 'scene-rock-fest-24', notes: 'Guitars wide, heavy reverb on snare.' },
      { cueNumber: '1.10', cueName: '02. Verse: Acoustic Breakdown', songSection: 'Verse 1', crossfadeSec: 2.5, targetSceneId: 'scene-rock-fest-24', notes: 'Acoustic Guitar +4dB, Drums -3dB, Delay on Lead Voc.' },
      { cueNumber: '2.00', cueName: '03. Guitar Solo / Climax', songSection: 'Solo', crossfadeSec: 1.0, targetSceneId: 'scene-rock-fest-24', notes: 'Lead Gtr +3dB with 1/4 delay send active, DCA 3 up.' },
      { cueNumber: '3.00', cueName: '04. Acoustic Ballad Switch', songSection: 'Interlude', crossfadeSec: 4.0, targetSceneId: 'scene-pop-live-trio', notes: 'Smooth 4-second fade to acoustic setup.' }
    ]
  },
  {
    id: 'scene-pop-live-trio',
    name: 'Pop Trio & Backtracks Setup',
    type: 'snapshot',
    createdAt: '2026-07-01T10:15:00Z',
    updatedAt: '2026-08-10T11:45:00Z',
    tags: ['Pop', 'Electronic', 'Backing Tracks', 'Stereo'],
    description: 'Moderní popový setup s elektronickými stopami z USB Audio 48x48, stereo akustickou kytarou, klávesami a 3x vokály s procesory Auto Rider.',
    favorite: true,
    channelCount: 18,
    scope: {
      channels: true,
      aux: true,
      buses: true,
      mains: true,
      matrix: true,
      eq: true,
      dyn: true,
      gate: true,
      fx: true,
      routing: true,
      dca: true,
      muteGroups: true
    },
    details: {
      targetEnsemble: 'Popová kapela s podklady',
      faderLayerPreset: 'Bank 1: Ch 1-8 Tracks & Keys | Bank 2: Ch 9-16 Vocals & Guitars',
      mainFaderAssign: 'MAIN 1 (PA) + MAIN 2 (Stream)',
      customControlsProfile: 'U1: Tap Tempo | U2: Doubler On/Off | U3: Talkback A | U4: Rec Start',
      notes: 'Inserty obsahují BDX902 De-Esser a TC Electronic VSS3 Reverb. Main 2 posílá nezávislý stream mix s masteringovým limiterem.'
    },
    channels: [
      { chNum: 1, name: 'Tracks: Elec Kick & Snare', sourceInput: 'USB Play 1-2', gainDb: 0, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Music', faderDb: 0.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: true, compModel: 'BDX 160', dcaGroup: 1 },
      { chNum: 3, name: 'Tracks: Synth Bass & 808', sourceInput: 'USB Play 3-4', gainDb: 0, phantom48V: false, phaseInvert: false, color: 'blue', icon: 'Bass', faderDb: -1.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Pulsar P1a', compOn: true, compModel: 'LA Leveler', dcaGroup: 2 },
      { chNum: 5, name: 'Tracks: Synth Arp & Pads', sourceInput: 'USB Play 5-6', gainDb: 0, phantom48V: false, phaseInvert: false, color: 'magenta', icon: 'Keys', faderDb: -3.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'SOUL 9000 EQ', compOn: false, compModel: 'Bypass', dcaGroup: 3 },
      { chNum: 7, name: 'Tracks: Backing Vocs FX', sourceInput: 'USB Play 7-8', gainDb: 0, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: -2.5, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: true, compModel: 'WING Compressor', dcaGroup: 4 },
      { chNum: 9, name: 'Live Acoustic Gtr DI', sourceInput: 'Local In 1', gainDb: 26, phantom48V: true, phaseInvert: false, color: 'green', icon: 'Acoustic', faderDb: 0.0, pan: -25, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Even 84 (Neve)', compOn: true, compModel: 'LA Leveler', dcaGroup: 5 },
      { chNum: 10, name: 'Live Elec Gtr Kemper (Stereo)', sourceInput: 'Local In 2-3', gainDb: 18, phantom48V: false, phaseInvert: false, color: 'green', icon: 'Guitar', faderDb: -1.0, pan: 30, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: false, compModel: 'Bypass', dcaGroup: 5 },
      { chNum: 12, name: 'Live Stage Piano (Nord)', sourceInput: 'Local In 4-5', gainDb: 14, phantom48V: false, phaseInvert: false, color: 'magenta', icon: 'Keys', faderDb: -2.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'SOUL 9000 EQ', compOn: false, compModel: 'Bypass', dcaGroup: 3 },
      { chNum: 14, name: 'Lead Voc (Neumann KMS104)', sourceInput: 'Local In 6', gainDb: 36, phantom48V: true, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: 2.5, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ + BDX902', compOn: true, compModel: 'LA Leveler (Opto Warm)', dcaGroup: 6 },
      { chNum: 15, name: 'Backing Voc Gtr (Beta58)', sourceInput: 'Local In 7', gainDb: 34, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: -0.5, pan: -45, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: true, compModel: '76 Limiter Amp', dcaGroup: 6 },
      { chNum: 16, name: 'Backing Voc Keys (Beta58)', sourceInput: 'Local In 8', gainDb: 34, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: -1.0, pan: 45, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: true, compModel: '76 Limiter Amp', dcaGroup: 6 }
    ],
    buses: [
      { busNum: 1, name: 'IEM Lead (Stereo)', isStereo: true, role: 'IEM Monitor', faderDb: 0.0, color: 'red', pan: 0 },
      { busNum: 3, name: 'IEM Gtr/Tracks (Stereo)', isStereo: true, role: 'IEM Monitor', faderDb: 0.0, color: 'green', pan: 0 },
      { busNum: 5, name: 'IEM Keys (Stereo)', isStereo: true, role: 'IEM Monitor', faderDb: 0.0, color: 'magenta', pan: 0 },
      { busNum: 9, name: 'FX 1: VSS3 Pop Hall', isStereo: true, role: 'FX Send', faderDb: 0.0, color: 'magenta', pan: 0 },
      { busNum: 11, name: 'FX 2: Vocal Doubler Delay', isStereo: true, role: 'FX Send', faderDb: 0.0, color: 'cyan', pan: 0 }
    ],
    dcas: [
      { dcaNum: 1, name: 'DCA 1: Backing Tracks', color: 'orange', faderDb: 0.0, muted: false, memberChannels: 'Ch 1-8' },
      { dcaNum: 2, name: 'DCA 2: Bass 808', color: 'blue', faderDb: 0.0, muted: false, memberChannels: 'Ch 3-4' },
      { dcaNum: 3, name: 'DCA 3: Keys & Synths', color: 'magenta', faderDb: 0.0, muted: false, memberChannels: 'Ch 5-6, 12-13' },
      { dcaNum: 5, name: 'DCA 5: Live Guitars', color: 'green', faderDb: 0.0, muted: false, memberChannels: 'Ch 9-11' },
      { dcaNum: 6, name: 'DCA 6: All Vocals', color: 'red', faderDb: 1.0, muted: false, memberChannels: 'Ch 14-16' }
    ],
    fxSlots: [
      { slotNum: 1, model: 'TC Electronic VSS3', name: 'Pop Silk Vocal Hall', type: 'Send/Return', source: 'Bus 9-10', target: 'FX 1 Return', keyParam: 'Decay: 2.2s, Pre-Delay: 35ms, Air: +3dB' },
      { slotNum: 2, model: 'Stereo Pitch Doubler', name: 'Vocal Thickener', type: 'Send/Return', source: 'Bus 11-12', target: 'FX 2 Return', keyParam: 'Left: -8 cents, Right: +9 cents, Delay: 18ms' }
    ],
    matrices: [
      { matrixNum: 1, name: 'Matrix 1-2: Main FOH PA', source: 'MAIN 1', delayMs: 0.0, delayMeters: 0.0, eqType: 'Room PEQ', faderDb: 0.0, destination: 'Local Out 1-2' },
      { matrixNum: 5, name: 'Matrix 5-6: YouTube / Stream HD', source: 'MAIN 2', delayMs: 0.0, delayMeters: 0.0, eqType: 'Broadcast Target -14 LUFS', faderDb: 0.0, destination: 'USB Out 1-2' }
    ]
  },
  {
    id: 'scene-symphony-gala',
    name: 'Symfonický Orchestr 40ch Gala',
    type: 'snapshot',
    createdAt: '2026-05-20T09:00:00Z',
    updatedAt: '2026-08-01T16:10:00Z',
    tags: ['Orchestr', 'Smyčce', 'Žestě', 'Dante/AES50', 'Klasika'],
    description: 'Klasický orchestrální setup přes AES50 A/B (DL32 stagebox) se zónovými maticemi pro sál, balkon a přísálí s přesnou fázovou kompenzací.',
    favorite: false,
    channelCount: 40,
    scope: {
      channels: true,
      aux: true,
      buses: true,
      mains: true,
      matrix: true,
      eq: true,
      dyn: true,
      gate: false,
      fx: true,
      routing: true,
      dca: true,
      muteGroups: true
    },
    details: {
      targetEnsemble: 'Symfonický orchestr + sólisté',
      faderLayerPreset: 'Bank 1: Smyčce (1-12) | Bank 2: Dřeva/Žestě (13-24) | Bank 3: Perkuse/Sóla (25-36)',
      mainFaderAssign: 'MAIN 1 (Master FOH)',
      customControlsProfile: 'U1: Hall Reverb Decay | U2: Delay Mute | U3: Solo Clear | U4: Archive Rec WING-LIVE',
      notes: 'Zpoždění maticových výstupů nastaveno: Matrix 1-2 PA 0ms, Matrix 3-4 Balkon 28.5ms, Matrix 5-6 Foyer 45.0ms.'
    },
    channels: [
      { chNum: 1, name: '1st Violins Spot A', sourceInput: 'AES50-A 1', gainDb: 38, phantom48V: true, phaseInvert: false, color: 'yellow', icon: 'Violin', faderDb: 0.0, pan: -65, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'SOUL 9000 Analog EQ', compOn: false, compModel: 'Bypass', dcaGroup: 1 },
      { chNum: 2, name: '1st Violins Spot B', sourceInput: 'AES50-A 2', gainDb: 38, phantom48V: true, phaseInvert: false, color: 'yellow', icon: 'Violin', faderDb: 0.0, pan: -50, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'SOUL 9000 Analog EQ', compOn: false, compModel: 'Bypass', dcaGroup: 1 },
      { chNum: 3, name: '2nd Violins Spot A', sourceInput: 'AES50-A 3', gainDb: 38, phantom48V: true, phaseInvert: false, color: 'yellow', icon: 'Violin', faderDb: -1.0, pan: -35, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'SOUL 9000 Analog EQ', compOn: false, compModel: 'Bypass', dcaGroup: 1 },
      { chNum: 5, name: 'Violas Spot', sourceInput: 'AES50-A 5', gainDb: 36, phantom48V: true, phaseInvert: false, color: 'yellow', icon: 'Violin', faderDb: 0.0, pan: 25, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: false, compModel: 'Bypass', dcaGroup: 1 },
      { chNum: 7, name: 'Cellos Section', sourceInput: 'AES50-A 7', gainDb: 34, phantom48V: true, phaseInvert: false, color: 'blue', icon: 'Cello', faderDb: 1.0, pan: 55, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Pulsar P1a', compOn: false, compModel: 'Bypass', dcaGroup: 2 },
      { chNum: 9, name: 'Double Bass Section', sourceInput: 'AES50-A 9', gainDb: 32, phantom48V: true, phaseInvert: false, color: 'blue', icon: 'Bass', faderDb: 0.5, pan: 75, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Pulsar P1a', compOn: true, compModel: 'LA Leveler (Transparent)', dcaGroup: 2 },
      { chNum: 13, name: 'Flutes & Oboe', sourceInput: 'AES50-A 13', gainDb: 40, phantom48V: true, phaseInvert: false, color: 'green', icon: 'Flute', faderDb: 0.0, pan: -20, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Even 84 (Neve)', compOn: false, compModel: 'Bypass', dcaGroup: 3 },
      { chNum: 15, name: 'Clarinets & Bassoon', sourceInput: 'AES50-A 15', gainDb: 38, phantom48V: true, phaseInvert: false, color: 'green', icon: 'Clarinet', faderDb: 0.0, pan: 20, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Even 84 (Neve)', compOn: false, compModel: 'Bypass', dcaGroup: 3 },
      { chNum: 17, name: 'French Horns (4x)', sourceInput: 'AES50-A 17', gainDb: 34, phantom48V: true, phaseInvert: false, color: 'orange', icon: 'Horn', faderDb: -1.0, pan: -40, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: false, compModel: 'Bypass', dcaGroup: 4 },
      { chNum: 19, name: 'Trumpets & Trombones', sourceInput: 'AES50-A 19', gainDb: 30, phantom48V: true, phaseInvert: false, color: 'orange', icon: 'Trumpet', faderDb: -2.0, pan: 35, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: false, compModel: 'Bypass', dcaGroup: 4 },
      { chNum: 25, name: 'Timpani Section', sourceInput: 'AES50-A 25', gainDb: 28, phantom48V: false, phaseInvert: false, color: 'purple', icon: 'Drum', faderDb: 0.0, pan: -15, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: false, compModel: 'Bypass', dcaGroup: 5 },
      { chNum: 31, name: 'Main Stereo ORTF Pair', sourceInput: 'AES50-A 31-32', gainDb: 42, phantom48V: true, phaseInvert: false, color: 'cyan', icon: 'Mic', faderDb: 2.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'SOUL 9000 Master EQ', compOn: false, compModel: 'Bypass', dcaGroup: 8 },
      { chNum: 37, name: 'Solo Violin Spot', sourceInput: 'Local In 1', gainDb: 40, phantom48V: true, phaseInvert: false, color: 'red', icon: 'Violin', faderDb: 3.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Pulsar P1a + SOUL 9000', compOn: true, compModel: 'LA Leveler', dcaGroup: 6 }
    ],
    buses: [
      { busNum: 1, name: 'Strings Submix (Stereo)', isStereo: true, role: 'Subgroup', faderDb: 0.0, color: 'yellow', pan: 0 },
      { busNum: 3, name: 'Woodwinds Submix', isStereo: true, role: 'Subgroup', faderDb: 0.0, color: 'green', pan: 0 },
      { busNum: 5, name: 'Brass Submix', isStereo: true, role: 'Subgroup', faderDb: -1.0, color: 'orange', pan: 0 },
      { busNum: 9, name: 'FX: Concert Hall Ambience', isStereo: true, role: 'FX Send', faderDb: 0.0, color: 'magenta', pan: 0 }
    ],
    dcas: [
      { dcaNum: 1, name: 'DCA 1: Strings All', color: 'yellow', faderDb: 0.0, muted: false, memberChannels: 'Ch 1-12' },
      { dcaNum: 2, name: 'DCA 2: Low Strings & Bass', color: 'blue', faderDb: 0.0, muted: false, memberChannels: 'Ch 7-10' },
      { dcaNum: 3, name: 'DCA 3: Woodwinds', color: 'green', faderDb: 0.0, muted: false, memberChannels: 'Ch 13-16' },
      { dcaNum: 4, name: 'DCA 4: Brass Section', color: 'orange', faderDb: 0.0, muted: false, memberChannels: 'Ch 17-24' },
      { dcaNum: 5, name: 'DCA 5: Percussion & Timpani', color: 'purple', faderDb: 0.0, muted: false, memberChannels: 'Ch 25-30' },
      { dcaNum: 6, name: 'DCA 6: Guest Soloists', color: 'red', faderDb: 2.0, muted: false, memberChannels: 'Ch 37-40' },
      { dcaNum: 8, name: 'DCA 8: Main Room Pair', color: 'cyan', faderDb: 0.0, muted: false, memberChannels: 'Ch 31-32' }
    ],
    fxSlots: [
      { slotNum: 1, model: 'TC Electronic VSS3', name: 'Vienna Concert Hall', type: 'Send/Return', source: 'Bus 9-10', target: 'FX 1 Return', keyParam: 'Decay: 3.4s, Early Refl: 120ms, Spatial: Wide' }
    ],
    matrices: [
      { matrixNum: 1, name: 'Matrix 1-2: Main Stage PA', source: 'MAIN 1', delayMs: 0.0, delayMeters: 0.0, eqType: 'Flat Acoustic EQ', faderDb: 0.0, destination: 'DL32 Out 1-2' },
      { matrixNum: 3, name: 'Matrix 3-4: Balcony Delay Zone', source: 'MAIN 1', delayMs: 28.5, delayMeters: 9.77, eqType: 'HF Compensation +2dB', faderDb: -3.0, destination: 'DL32 Out 3-4' },
      { matrixNum: 5, name: 'Matrix 5-6: Foyer & Under-Balcony', source: 'MAIN 1', delayMs: 45.0, delayMeters: 15.43, eqType: 'Speech Clarity Notch 300Hz', faderDb: -6.0, destination: 'DL32 Out 5-6' }
    ]
  },
  {
    id: 'scene-brass-band-openair',
    name: 'Dechový Orchestr Open Air Festival',
    type: 'snapshot',
    createdAt: '2026-06-05T13:40:00Z',
    updatedAt: '2026-07-28T19:00:00Z',
    tags: ['Dechovka', 'Brass Band', 'Open Air', 'Subwoofer'],
    description: 'Speciální preset pro dechové soubory s posíleným sub-basem pro tubu (Psycho Bass plugin), konkrétními křídlovkami a Automixem pro moderátory.',
    favorite: true,
    channelCount: 20,
    scope: {
      channels: true,
      aux: true,
      buses: true,
      mains: true,
      matrix: true,
      eq: true,
      dyn: true,
      gate: true,
      fx: true,
      routing: true,
      dca: true,
      muteGroups: true
    },
    details: {
      targetEnsemble: 'Velká dechovka (18-22 muzikantů)',
      faderLayerPreset: 'Bank 1: Trubky, Křídlovky, Tenory | Bank 2: Pozouny, Tuba, Bicí, Zpěvy',
      mainFaderAssign: 'MAIN 1 (FOH) + Matrix 7 (Subwoofer)',
      customControlsProfile: 'U1: Brass Plate Mute | U2: Automix X Toggle | U3: Horn Boost | U4: USB Rec',
      notes: 'Tuba směrována do Subwoofer Matrixu s Low-Pass 90 Hz a dynamickým ekvalizérem.'
    },
    channels: [
      { chNum: 1, name: '1. Křídlovka (Solo 1)', sourceInput: 'Local In 1', gainDb: 32, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Trumpet', faderDb: 1.0, pan: -40, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Even 84 (Neve warm)', compOn: true, compModel: 'LA Leveler', dcaGroup: 1 },
      { chNum: 2, name: '2. Křídlovka (Solo 2)', sourceInput: 'Local In 2', gainDb: 32, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Trumpet', faderDb: 0.5, pan: -25, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Even 84 (Neve)', compOn: true, compModel: 'LA Leveler', dcaGroup: 1 },
      { chNum: 3, name: 'Tenor Horn 1', sourceInput: 'Local In 3', gainDb: 30, phantom48V: false, phaseInvert: false, color: 'yellow', icon: 'Horn', faderDb: 0.0, pan: 30, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: false, compModel: 'Bypass', dcaGroup: 2 },
      { chNum: 4, name: 'Baritone Horn', sourceInput: 'Local In 4', gainDb: 30, phantom48V: false, phaseInvert: false, color: 'yellow', icon: 'Horn', faderDb: 0.0, pan: 45, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: false, compModel: 'Bypass', dcaGroup: 2 },
      { chNum: 5, name: 'Trombone 1', sourceInput: 'Local In 5', gainDb: 28, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Trombone', faderDb: -1.0, pan: 60, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: false, compModel: 'Bypass', dcaGroup: 3 },
      { chNum: 7, name: 'Heligon Tuba Basa (Clip Mic)', sourceInput: 'Local In 7', gainDb: 28, phantom48V: true, phaseInvert: false, color: 'blue', icon: 'Tuba', faderDb: 2.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Pulsar P1a + WING EQ (HPF 35Hz, Boost 60Hz)', compOn: true, compModel: '76 Limiter Amp', dcaGroup: 4 },
      { chNum: 8, name: 'Bicí souprava / Velký buben', sourceInput: 'Local In 8', gainDb: 26, phantom48V: false, phaseInvert: false, color: 'purple', icon: 'Drum', faderDb: 0.0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'WING Gate', eqModel: 'WING 6-Band EQ', compOn: true, compModel: 'BDX 160', dcaGroup: 5 },
      { chNum: 9, name: 'Malý bubínek & Činely', sourceInput: 'Local In 9', gainDb: 30, phantom48V: true, phaseInvert: false, color: 'purple', icon: 'Cymbal', faderDb: -2.0, pan: 10, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: false, compModel: 'Bypass', dcaGroup: 5 },
      { chNum: 10, name: 'Zpěv Muž (SM58)', sourceInput: 'Local In 10', gainDb: 34, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: 2.0, pan: -15, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ + BDX902', compOn: true, compModel: 'LA Leveler', dcaGroup: 6 },
      { chNum: 11, name: 'Zpěv Žena (Beta58)', sourceInput: 'Local In 11', gainDb: 36, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: 2.0, pan: 15, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: true, compModel: 'LA Leveler', dcaGroup: 6 },
      { chNum: 12, name: 'Moderátor / Průvodní slovo', sourceInput: 'Local In 12', gainDb: 34, phantom48V: false, phaseInvert: false, color: 'cyan', icon: 'Mic', faderDb: 1.0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'Dugan Automix Group X', eqModel: 'WING 6-Band EQ', compOn: true, compModel: 'WING Compressor' }
    ],
    buses: [
      { busNum: 1, name: 'Monitor Dechy L/R', isStereo: true, role: 'Wedge Monitor', faderDb: 0.0, color: 'orange', pan: 0 },
      { busNum: 3, name: 'Monitor Zpěvy L/R', isStereo: true, role: 'Wedge Monitor', faderDb: 0.0, color: 'red', pan: 0 },
      { busNum: 9, name: 'FX: Brass Warm Plate', isStereo: true, role: 'FX Send', faderDb: 0.0, color: 'magenta', pan: 0 }
    ],
    dcas: [
      { dcaNum: 1, name: 'DCA 1: Křídlovky (Solo)', color: 'orange', faderDb: 0.0, muted: false, memberChannels: 'Ch 1-2' },
      { dcaNum: 2, name: 'DCA 2: Tenory & Baryton', color: 'yellow', faderDb: 0.0, muted: false, memberChannels: 'Ch 3-4' },
      { dcaNum: 3, name: 'DCA 3: Pozouny & Doprovod', color: 'orange', faderDb: 0.0, muted: false, memberChannels: 'Ch 5-6' },
      { dcaNum: 4, name: 'DCA 4: Tuba Basa', color: 'blue', faderDb: 1.5, muted: false, memberChannels: 'Ch 7' },
      { dcaNum: 5, name: 'DCA 5: Rytmika (Bicí)', color: 'purple', faderDb: 0.0, muted: false, memberChannels: 'Ch 8-9' },
      { dcaNum: 6, name: 'DCA 6: Zpěvy & Sóla', color: 'red', faderDb: 1.0, muted: false, memberChannels: 'Ch 10-11' }
    ],
    fxSlots: [
      { slotNum: 1, model: 'Vintage Plate 140', name: 'Warm Brass Plate', type: 'Send/Return', source: 'Bus 9-10', target: 'FX 1 Return', keyParam: 'Decay: 1.8s, High Cut: 6.0kHz, Warm Drive' },
      { slotNum: 2, model: 'Sub-Harmonic Synthesizer', name: 'Psycho Bass for Tuba', type: 'Channel Insert', source: 'Ch 7 Insert', target: 'Ch 7 Post-Comp', keyParam: 'Range: 35-70Hz, Sub Gain: +4dB' }
    ],
    matrices: [
      { matrixNum: 1, name: 'Matrix 1-2: Main Open Air PA', source: 'MAIN 1', delayMs: 0.0, delayMeters: 0.0, eqType: 'Outdoor Wind & Distance EQ', faderDb: 0.0, destination: 'Local Out 1-2' },
      { matrixNum: 7, name: 'Matrix 7: Subwoofer Array', source: 'MAIN 1', delayMs: 3.5, delayMeters: 1.2, eqType: 'LPF 80Hz 24dB/oct Linkwitz-Riley', faderDb: 3.0, destination: 'Local Out 7' }
    ]
  },
  {
    id: 'scene-vocal-ensemble-satb',
    name: 'Pěvecký Sbor & Vokální Ansámbl',
    type: 'snapshot',
    createdAt: '2026-07-15T15:20:00Z',
    updatedAt: '2026-08-12T17:30:00Z',
    tags: ['Sbor', 'A Cappella', 'SATB', 'Chamber'],
    description: 'Sborové aranžmá s vícepásmovou kompresí C5-Combinator na hlavní sběrnici, přirozeným prostorem VSS3 Cathedral a přesným potlačením akustických vazeb.',
    favorite: false,
    channelCount: 16,
    scope: {
      channels: true,
      aux: true,
      buses: true,
      mains: true,
      matrix: true,
      eq: true,
      dyn: true,
      gate: false,
      fx: true,
      routing: true,
      dca: true,
      muteGroups: true
    },
    details: {
      targetEnsemble: 'Komorní i velký pěvecký sbor (SATB)',
      faderLayerPreset: 'Bank 1: Soprán (1-4), Alt (5-8) | Bank 2: Tenor (9-12), Bas (13-16)',
      mainFaderAssign: 'MAIN 1 (FOH PA Stereo)',
      customControlsProfile: 'U1: Cathedral Decay + | U2: Choir Mute | U3: Feedback Kill | U4: Rec SD1',
      notes: 'Použity kardioidní tužkové mikrofony v AB/ORTF uspořádání nad jednotlivými hlasovými sekcemi.'
    },
    channels: [
      { chNum: 1, name: 'Soprano Section Left', sourceInput: 'Local In 1', gainDb: 42, phantom48V: true, phaseInvert: false, color: 'magenta', icon: 'Mic', faderDb: 0.0, pan: -70, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'SOUL 9000 Analog EQ (Air +2dB at 12k)', compOn: true, compModel: 'LA Leveler (Soft 2dB GR)', dcaGroup: 1 },
      { chNum: 2, name: 'Soprano Section Right', sourceInput: 'Local In 2', gainDb: 42, phantom48V: true, phaseInvert: false, color: 'magenta', icon: 'Mic', faderDb: 0.0, pan: -40, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'SOUL 9000 Analog EQ', compOn: true, compModel: 'LA Leveler', dcaGroup: 1 },
      { chNum: 5, name: 'Alto Section Left', sourceInput: 'Local In 5', gainDb: 40, phantom48V: true, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: 0.0, pan: -20, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: true, compModel: 'LA Leveler', dcaGroup: 2 },
      { chNum: 6, name: 'Alto Section Right', sourceInput: 'Local In 6', gainDb: 40, phantom48V: true, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: 0.0, pan: 10, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: true, compModel: 'LA Leveler', dcaGroup: 2 },
      { chNum: 9, name: 'Tenor Section Left', sourceInput: 'Local In 9', gainDb: 38, phantom48V: true, phaseInvert: false, color: 'yellow', icon: 'Mic', faderDb: 0.0, pan: 35, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: true, compModel: 'LA Leveler', dcaGroup: 3 },
      { chNum: 10, name: 'Tenor Section Right', sourceInput: 'Local In 10', gainDb: 38, phantom48V: true, phaseInvert: false, color: 'yellow', icon: 'Mic', faderDb: 0.0, pan: 55, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'WING 6-Band EQ', compOn: true, compModel: 'LA Leveler', dcaGroup: 3 },
      { chNum: 13, name: 'Bass Section Left', sourceInput: 'Local In 13', gainDb: 36, phantom48V: true, phaseInvert: false, color: 'blue', icon: 'Mic', faderDb: 0.5, pan: 70, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Pulsar P1a (Low Body 100Hz)', compOn: true, compModel: 'LA Leveler', dcaGroup: 4 },
      { chNum: 14, name: 'Bass Section Right', sourceInput: 'Local In 14', gainDb: 36, phantom48V: true, phaseInvert: false, color: 'blue', icon: 'Mic', faderDb: 0.5, pan: 85, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Pulsar P1a', compOn: true, compModel: 'LA Leveler', dcaGroup: 4 },
      { chNum: 15, name: 'Akustický klavír (Stereo Pair)', sourceInput: 'Local In 15-16', gainDb: 34, phantom48V: true, phaseInvert: false, color: 'cyan', icon: 'Piano', faderDb: -1.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'SOUL 9000 EQ', compOn: false, compModel: 'Bypass', dcaGroup: 5 }
    ],
    buses: [
      { busNum: 1, name: 'Choir Subgroup (Stereo)', isStereo: true, role: 'Subgroup', faderDb: 0.0, color: 'magenta', pan: 0, fxInsert: 'C5 Combinator Multiband' },
      { busNum: 9, name: 'FX: Cathedral Space', isStereo: true, role: 'FX Send', faderDb: 0.0, color: 'cyan', pan: 0, fxInsert: 'TC VSS3 Reverb' }
    ],
    dcas: [
      { dcaNum: 1, name: 'DCA 1: Soprány (S)', color: 'magenta', faderDb: 0.0, muted: false, memberChannels: 'Ch 1-4' },
      { dcaNum: 2, name: 'DCA 2: Alty (A)', color: 'red', faderDb: 0.0, muted: false, memberChannels: 'Ch 5-8' },
      { dcaNum: 3, name: 'DCA 3: Tenory (T)', color: 'yellow', faderDb: 0.0, muted: false, memberChannels: 'Ch 9-12' },
      { dcaNum: 4, name: 'DCA 4: Basy (B)', color: 'blue', faderDb: 0.0, muted: false, memberChannels: 'Ch 13-16' },
      { dcaNum: 5, name: 'DCA 5: Klavírní doprovod', color: 'cyan', faderDb: -1.0, muted: false, memberChannels: 'Ch 15-16' },
      { dcaNum: 8, name: 'DCA 8: Celý sbor Master', color: 'purple', faderDb: 0.0, muted: false, memberChannels: 'Všechny hlasy' }
    ],
    fxSlots: [
      { slotNum: 1, model: 'TC Electronic VSS3', name: 'Cathedral Sacred Reverb', type: 'Send/Return', source: 'Bus 9-10', target: 'FX 1 Return', keyParam: 'Decay: 4.8s, Space: Cathedral, High Damp: 3.8kHz' },
      { slotNum: 2, model: 'C5 Combinator Multiband', name: 'Choir Dynamic Leveler', type: 'Bus Insert', source: 'Bus 1-2 Insert', target: 'Bus 1-2 Out', keyParam: '5 Bands, Smooth Threshold, Prevents Distortion' }
    ],
    matrices: [
      { matrixNum: 1, name: 'Matrix 1-2: Main Acoustic PA', source: 'MAIN 1', delayMs: 0.0, delayMeters: 0.0, eqType: 'Notch 315Hz, 1.25kHz, 4kHz (Feedback Safe)', faderDb: 0.0, destination: 'Local Out 1-2' }
    ]
  }
];

export const INITIAL_SCENES_WING = INITIAL_SCENES;

export const INITIAL_SCENES_X32: SavedScene[] = [
  {
    id: 'scene-x32-band-brabec',
    name: 'X32 Live Band: S Brabcem (32CH)',
    type: 'snapshot',
    createdAt: '2026-08-10T10:00:00Z',
    updatedAt: '2026-09-01T12:00:00Z',
    tags: ['X32', 'M32', 'Band', 'Official Dump', '32ch'],
    description: 'Oficiální živá scéna pro Behringer X32 / M32: 32 stop (Zpěvy Pavel, Brabec, Klára, Karel, dechy SAXY, bicí, baskytara, kytary, klávesy), 8 Auxů, 16 sběrnic a 8 DCA.',
    favorite: true,
    channelCount: 32,
    scope: {
      channels: true,
      aux: true,
      buses: true,
      mains: true,
      matrix: true,
      eq: true,
      dyn: true,
      gate: true,
      fx: true,
      routing: true,
      dca: true,
      muteGroups: true
    },
    details: {
      targetEnsemble: 'X32 / M32 Pop-Rock Band (S Brabcem)',
      faderLayerPreset: 'CH 1-16: Zpěvy & Rytmika | CH 17-32: Bicí & Linky',
      mainFaderAssign: 'Main Stereo L/R',
      customControlsProfile: 'FOH & Monitor Standard (X32)',
      notes: 'Midas předzesilovače s přesným analogovým gainem, 16 mix sběrnic pro odposlechy a 8 DCA skupin.'
    },
    channels: [
      { chNum: 1, name: 'Pavel', sourceInput: 'Local In 1 (XLR)', gainDb: 32, phantom48V: false, phaseInvert: false, color: 'cyan', icon: 'Mic', faderDb: 0.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 1 },
      { chNum: 2, name: 'Brabec', sourceInput: 'Local In 2 (XLR)', gainDb: 34, phantom48V: false, phaseInvert: false, color: 'cyan', icon: 'Mic', faderDb: 1.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 1 },
      { chNum: 3, name: 'Klara', sourceInput: 'Local In 3 (XLR)', gainDb: 32, phantom48V: false, phaseInvert: false, color: 'cyan', icon: 'Mic', faderDb: 0.5, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 1 },
      { chNum: 4, name: 'Karel', sourceInput: 'Local In 4 (XLR)', gainDb: 30, phantom48V: false, phaseInvert: false, color: 'cyan', icon: 'Mic', faderDb: -1.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 1 },
      { chNum: 5, name: 'SAXY', sourceInput: 'Local In 5 (XLR)', gainDb: 28, phantom48V: false, phaseInvert: false, color: 'magenta', icon: 'Music', faderDb: 0.0, pan: -20, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 2 },
      { chNum: 6, name: 'E Karel', sourceInput: 'Local In 6 (XLR)', gainDb: 26, phantom48V: false, phaseInvert: false, color: 'yellow', icon: 'Guitar', faderDb: -1.5, pan: -50, muted: false, solo: false, gateOn: true, gateModel: 'X32 Expander/Gate', eqModel: 'X32 4-Band Parametric EQ', compOn: false, compModel: 'Bypass', dcaGroup: 2 },
      { chNum: 7, name: 'E Brab', sourceInput: 'Local In 7 (XLR)', gainDb: 26, phantom48V: false, phaseInvert: false, color: 'yellow', icon: 'Guitar', faderDb: -1.5, pan: 50, muted: false, solo: false, gateOn: true, gateModel: 'X32 Expander/Gate', eqModel: 'X32 4-Band Parametric EQ', compOn: false, compModel: 'Bypass', dcaGroup: 2 },
      { chNum: 8, name: 'AC kytara', sourceInput: 'Local In 8 (XLR)', gainDb: 28, phantom48V: true, phaseInvert: false, color: 'yellow', icon: 'Acoustic', faderDb: -2.0, pan: -15, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 2 },
      { chNum: 9, name: 'Klav L', sourceInput: 'Local In 9 (XLR)', gainDb: 18, phantom48V: false, phaseInvert: false, color: 'green', icon: 'Keys', faderDb: -3.0, pan: -70, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ', compOn: false, compModel: 'Bypass', dcaGroup: 2 },
      { chNum: 10, name: 'Klav R', sourceInput: 'Local In 10 (XLR)', gainDb: 18, phantom48V: false, phaseInvert: false, color: 'green', icon: 'Keys', faderDb: -3.0, pan: 70, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ', compOn: false, compModel: 'Bypass', dcaGroup: 2 },
      { chNum: 11, name: 'Bass', sourceInput: 'Local In 11 (XLR)', gainDb: 24, phantom48V: false, phaseInvert: false, color: 'blue', icon: 'Bass', faderDb: 0.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 3 },
      { chNum: 12, name: 'BassDrum', sourceInput: 'Local In 12 (XLR)', gainDb: 22, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Drum', faderDb: 0.0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'X32 Expander/Gate', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 4 },
      { chNum: 13, name: 'SnareDrum', sourceInput: 'Local In 13 (XLR)', gainDb: 24, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Drum', faderDb: -1.0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'X32 Expander/Gate', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 4 },
      { chNum: 14, name: 'Hi-Hat', sourceInput: 'Local In 14 (XLR)', gainDb: 20, phantom48V: true, phaseInvert: false, color: 'orange', icon: 'Cymbal', faderDb: -5.0, pan: -30, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ (HPF 350Hz)', compOn: false, compModel: 'Bypass', dcaGroup: 4 },
      { chNum: 15, name: 'Tom 1', sourceInput: 'Local In 15 (XLR)', gainDb: 26, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Tom', faderDb: -2.0, pan: -25, muted: false, solo: false, gateOn: true, gateModel: 'X32 Expander/Gate', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 4 },
      { chNum: 16, name: 'Tom 2', sourceInput: 'Local In 16 (XLR)', gainDb: 26, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Tom', faderDb: -2.0, pan: 25, muted: false, solo: false, gateOn: true, gateModel: 'X32 Expander/Gate', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 4 },
      { chNum: 17, name: 'Overhead L', sourceInput: 'AES50-A 1 (XLR)', gainDb: 30, phantom48V: true, phaseInvert: false, color: 'yellow', icon: 'Cymbal', faderDb: -4.0, pan: -75, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ', compOn: false, compModel: 'Bypass', dcaGroup: 4 },
      { chNum: 18, name: 'Overhead R', sourceInput: 'AES50-A 2 (XLR)', gainDb: 30, phantom48V: true, phaseInvert: false, color: 'yellow', icon: 'Cymbal', faderDb: -4.0, pan: 75, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ', compOn: false, compModel: 'Bypass', dcaGroup: 4 }
    ],
    buses: [
      { busNum: 1, name: 'IEM Pavel (Stereo)', isStereo: true, role: 'IEM Monitor', faderDb: 0.0, color: 'cyan', pan: 0 },
      { busNum: 3, name: 'IEM Brabec (Stereo)', isStereo: true, role: 'IEM Monitor', faderDb: 0.0, color: 'cyan', pan: 0 },
      { busNum: 5, name: 'IEM Klara (Stereo)', isStereo: true, role: 'IEM Monitor', faderDb: 0.0, color: 'cyan', pan: 0 },
      { busNum: 7, name: 'Wedge Kytary', isStereo: false, role: 'Wedge Monitor', faderDb: -2.0, color: 'yellow', pan: 0 },
      { busNum: 9, name: 'Wedge Basa/Bicí', isStereo: false, role: 'Wedge Monitor', faderDb: 0.0, color: 'orange', pan: 0 },
      { busNum: 13, name: 'FX 1 Hall (Plate)', isStereo: true, role: 'FX Send', faderDb: 0.0, color: 'purple', pan: 0 },
      { busNum: 15, name: 'FX 2 Stereo Delay', isStereo: true, role: 'FX Send', faderDb: -2.0, color: 'purple', pan: 0 }
    ],
    dcas: [
      { dcaNum: 1, name: 'Zpěvy (Vocal All)', color: 'cyan', faderDb: 0.0, muted: false, memberChannels: 'CH 1-4' },
      { dcaNum: 2, name: 'Kytary & Dechy', color: 'yellow', faderDb: 0.0, muted: false, memberChannels: 'CH 5-10' },
      { dcaNum: 3, name: 'Baskytara', color: 'blue', faderDb: 0.0, muted: false, memberChannels: 'CH 11' },
      { dcaNum: 4, name: 'Bicí souprava', color: 'orange', faderDb: 0.0, muted: false, memberChannels: 'CH 12-18' },
      { dcaNum: 5, name: 'Audio linky & Playback', color: 'gray', faderDb: -2.0, muted: false, memberChannels: 'CH 19-24' }
    ],
    fxSlots: [
      { slotNum: 1, model: 'Vintage Room Reverb', name: 'Vocal Plate', type: 'Send/Return', source: 'Bus 13-14', target: 'FX 1 Return', keyParam: 'Decay: 2.2s, Pre: 20ms' },
      { slotNum: 2, model: 'Stereo Delay', name: '1/4 Note Delay', type: 'Send/Return', source: 'Bus 15-16', target: 'FX 2 Return', keyParam: 'Tempo: 120, Feed: 30%' },
      { slotNum: 3, model: 'Hall Reverb', name: 'Snare Ambience', type: 'Send/Return', source: 'Bus 11-12', target: 'FX 3 Return', keyParam: 'Decay: 1.4s' }
    ]
  },
  {
    id: 'scene-x32-producer-live-16',
    name: 'X32 Producer Club Setup (16ch Local)',
    type: 'snapshot',
    createdAt: '2026-08-15T14:00:00Z',
    updatedAt: '2026-09-02T16:00:00Z',
    tags: ['X32 Producer', 'Club', '16ch', 'Midas'],
    description: 'Klubový setup optimalizovaný přímo pro kompaktní rozhraní X32 Producer s 16 lokálními Midas XLR preampy a 6 TRS Auxy.',
    favorite: false,
    channelCount: 16,
    scope: {
      channels: true,
      aux: true,
      buses: true,
      mains: true,
      matrix: true,
      eq: true,
      dyn: true,
      gate: true,
      fx: true,
      routing: true,
      dca: true,
      muteGroups: true
    },
    details: {
      targetEnsemble: 'Klubová kapela (X32 Producer Rack/Desk)',
      faderLayerPreset: 'CH 1-8: Rytmika | CH 9-16: Melodie & Zpěv',
      mainFaderAssign: 'Main Stereo L/R',
      customControlsProfile: 'X32 Producer Mute Groups',
      notes: 'Plně vyhovuje fyzickým 16 XLR vstupům pultu X32 Producer bez nutnosti digitálního stageboxu.'
    },
    channels: [
      { chNum: 1, name: 'Kick In', sourceInput: 'Local In 1 (XLR)', gainDb: 22, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Drum', faderDb: 0.0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'X32 Expander/Gate', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 1 },
      { chNum: 2, name: 'Snare Top', sourceInput: 'Local In 2 (XLR)', gainDb: 24, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Drum', faderDb: 0.0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'X32 Expander/Gate', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 1 },
      { chNum: 3, name: 'Tom 1', sourceInput: 'Local In 3 (XLR)', gainDb: 26, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Tom', faderDb: -2.0, pan: -30, muted: false, solo: false, gateOn: true, gateModel: 'X32 Expander/Gate', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 1 },
      { chNum: 4, name: 'Tom 2', sourceInput: 'Local In 4 (XLR)', gainDb: 26, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Tom', faderDb: -2.0, pan: 30, muted: false, solo: false, gateOn: true, gateModel: 'X32 Expander/Gate', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 1 },
      { chNum: 5, name: 'Overheads (Stereo)', sourceInput: 'Local In 5-6 (XLR)', gainDb: 32, phantom48V: true, phaseInvert: false, color: 'yellow', icon: 'Cymbal', faderDb: -3.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ', compOn: false, compModel: 'Bypass', dcaGroup: 1 },
      { chNum: 6, name: 'Bass DI', sourceInput: 'Local In 7 (XLR)', gainDb: 20, phantom48V: false, phaseInvert: false, color: 'blue', icon: 'Bass', faderDb: 0.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 2 },
      { chNum: 7, name: 'El. Guitar L', sourceInput: 'Local In 8 (XLR)', gainDb: 26, phantom48V: false, phaseInvert: false, color: 'green', icon: 'Guitar', faderDb: -1.0, pan: -60, muted: false, solo: false, gateOn: true, gateModel: 'X32 Expander/Gate', eqModel: 'X32 4-Band Parametric EQ', compOn: false, compModel: 'Bypass', dcaGroup: 3 },
      { chNum: 8, name: 'El. Guitar R', sourceInput: 'Local In 9 (XLR)', gainDb: 26, phantom48V: false, phaseInvert: false, color: 'green', icon: 'Guitar', faderDb: -1.0, pan: 60, muted: false, solo: false, gateOn: true, gateModel: 'X32 Expander/Gate', eqModel: 'X32 4-Band Parametric EQ', compOn: false, compModel: 'Bypass', dcaGroup: 3 },
      { chNum: 9, name: 'Acoustic Guitar', sourceInput: 'Local In 10 (XLR)', gainDb: 28, phantom48V: true, phaseInvert: false, color: 'green', icon: 'Acoustic', faderDb: -2.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 3 },
      { chNum: 10, name: 'Keys Stereo', sourceInput: 'Local In 11-12 (XLR)', gainDb: 16, phantom48V: false, phaseInvert: false, color: 'magenta', icon: 'Keys', faderDb: -2.5, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ', compOn: false, compModel: 'Bypass', dcaGroup: 4 },
      { chNum: 11, name: 'Lead Vox', sourceInput: 'Local In 13 (XLR)', gainDb: 34, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: 2.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ + HPF 120Hz', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 5 },
      { chNum: 12, name: 'Backing Vox Gtr', sourceInput: 'Local In 14 (XLR)', gainDb: 32, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: -1.5, pan: -35, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 5 },
      { chNum: 13, name: 'Backing Vox Bass', sourceInput: 'Local In 15 (XLR)', gainDb: 32, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: -1.5, pan: 35, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp', dcaGroup: 5 },
      { chNum: 14, name: 'Talkback Mic', sourceInput: 'Local In 16 (XLR)', gainDb: 36, phantom48V: false, phaseInvert: false, color: 'gray', icon: 'Radio', faderDb: -90.0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'X32 Expander/Gate', eqModel: 'X32 4-Band Parametric EQ', compOn: true, compModel: 'X32 Channel Comp' }
    ],
    buses: [
      { busNum: 1, name: 'IEM Frontman', isStereo: false, role: 'IEM Monitor', faderDb: 0.0, color: 'red', pan: 0 },
      { busNum: 2, name: 'IEM Band', isStereo: false, role: 'IEM Monitor', faderDb: 0.0, color: 'cyan', pan: 0 },
      { busNum: 3, name: 'Wedge Kytary', isStereo: false, role: 'Wedge Monitor', faderDb: -2.0, color: 'yellow', pan: 0 },
      { busNum: 4, name: 'FX 1 Hall', isStereo: false, role: 'FX Send', faderDb: 0.0, color: 'purple', pan: 0 },
      { busNum: 5, name: 'FX 2 Delay', isStereo: false, role: 'FX Send', faderDb: 0.0, color: 'purple', pan: 0 }
    ],
    dcas: [
      { dcaNum: 1, name: 'Bicí', color: 'orange', faderDb: 0.0, muted: false, memberChannels: 'CH 1-5' },
      { dcaNum: 2, name: 'Basa', color: 'blue', faderDb: 0.0, muted: false, memberChannels: 'CH 6' },
      { dcaNum: 3, name: 'Kytary', color: 'green', faderDb: 0.0, muted: false, memberChannels: 'CH 7-9' },
      { dcaNum: 4, name: 'Klávesy', color: 'magenta', faderDb: 0.0, muted: false, memberChannels: 'CH 10' },
      { dcaNum: 5, name: 'Zpěvy', color: 'red', faderDb: 0.0, muted: false, memberChannels: 'CH 11-13' }
    ]
  }
];

export const INITIAL_SCENES_UI24: SavedScene[] = [
  {
    id: 'scene-ui24-full-band-live',
    name: 'Soundcraft Ui24R Live Band Standard',
    type: 'snapshot',
    createdAt: '2026-08-01T12:00:00Z',
    updatedAt: '2026-09-01T14:30:00Z',
    tags: ['Soundcraft', 'Ui24R', 'Studer', 'dbx', 'Lexicon', 'Live'],
    description: 'Kompletní sestava pro Soundcraft Ui24R: 20 mikrofonních vstupů Studer, Lexicon Reverb/Delay, dbx komprese na stopách a 8 nezávislých Aux odposlechů.',
    favorite: true,
    channelCount: 20,
    scope: {
      channels: true,
      aux: true,
      buses: true,
      mains: true,
      matrix: true,
      eq: true,
      dyn: true,
      gate: true,
      fx: true,
      routing: true,
      dca: true,
      muteGroups: true
    },
    details: {
      targetEnsemble: 'Live Kapela (Soundcraft Ui24R)',
      faderLayerPreset: 'Ui24R HTML5 Browser Faders',
      mainFaderAssign: 'Main L/R (XLR/TRS)',
      customControlsProfile: 'dbx AFS2 Zpětnovazební filtry',
      notes: 'Předzesilovače Studer s vysokým headroomem, 4 stereo Lexicon efekty a 6 VCA faderů.'
    },
    channels: [
      { chNum: 1, name: 'Kick In', sourceInput: 'Studer In 1 (Combo)', gainDb: 22, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Drum', faderDb: 0.0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'Ui dbx Noise Gate', eqModel: 'Ui 4-Band Parametric + HPF', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 1 },
      { chNum: 2, name: 'Snare Top', sourceInput: 'Studer In 2 (Combo)', gainDb: 24, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Drum', faderDb: 0.0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'Ui dbx Noise Gate', eqModel: 'Ui 4-Band Parametric + HPF', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 1 },
      { chNum: 3, name: 'Hi-Hat', sourceInput: 'Studer In 3 (Combo)', gainDb: 20, phantom48V: true, phaseInvert: false, color: 'orange', icon: 'Cymbal', faderDb: -5.0, pan: -25, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric + HPF 300Hz', compOn: false, compModel: 'Bypass', dcaGroup: 1 },
      { chNum: 4, name: 'Tom 1', sourceInput: 'Studer In 4 (Combo)', gainDb: 26, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Tom', faderDb: -2.0, pan: -30, muted: false, solo: false, gateOn: true, gateModel: 'Ui dbx Noise Gate', eqModel: 'Ui 4-Band Parametric', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 1 },
      { chNum: 5, name: 'Floor Tom', sourceInput: 'Studer In 5 (Combo)', gainDb: 26, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Tom', faderDb: -2.0, pan: 35, muted: false, solo: false, gateOn: true, gateModel: 'Ui dbx Noise Gate', eqModel: 'Ui 4-Band Parametric', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 1 },
      { chNum: 6, name: 'Overhead L', sourceInput: 'Studer In 6 (Combo)', gainDb: 30, phantom48V: true, phaseInvert: false, color: 'yellow', icon: 'Cymbal', faderDb: -3.0, pan: -70, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric', compOn: false, compModel: 'Bypass', dcaGroup: 1 },
      { chNum: 7, name: 'Overhead R', sourceInput: 'Studer In 7 (Combo)', gainDb: 30, phantom48V: true, phaseInvert: false, color: 'yellow', icon: 'Cymbal', faderDb: -3.0, pan: 70, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric', compOn: false, compModel: 'Bypass', dcaGroup: 1 },
      { chNum: 8, name: 'Bass DI', sourceInput: 'Studer In 8 (Combo)', gainDb: 22, phantom48V: false, phaseInvert: false, color: 'blue', icon: 'Bass', faderDb: 0.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 2 },
      { chNum: 9, name: 'El. Guitar L', sourceInput: 'Studer In 9 (Combo)', gainDb: 26, phantom48V: false, phaseInvert: false, color: 'green', icon: 'Guitar', faderDb: -1.5, pan: -60, muted: false, solo: false, gateOn: true, gateModel: 'Ui dbx Noise Gate', eqModel: 'Ui 4-Band Parametric', compOn: false, compModel: 'Bypass', dcaGroup: 3 },
      { chNum: 10, name: 'El. Guitar R', sourceInput: 'Studer In 10 (Combo)', gainDb: 26, phantom48V: false, phaseInvert: false, color: 'green', icon: 'Guitar', faderDb: -1.5, pan: 60, muted: false, solo: false, gateOn: true, gateModel: 'Ui dbx Noise Gate', eqModel: 'Ui 4-Band Parametric', compOn: false, compModel: 'Bypass', dcaGroup: 3 },
      { chNum: 11, name: 'Acoustic Gtr', sourceInput: 'Studer In 11 (XLR)', gainDb: 28, phantom48V: true, phaseInvert: false, color: 'green', icon: 'Acoustic', faderDb: -2.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric + DigiTech Modeling', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 3 },
      { chNum: 12, name: 'Keys L (Stereo)', sourceInput: 'Studer In 12 (XLR)', gainDb: 18, phantom48V: false, phaseInvert: false, color: 'magenta', icon: 'Keys', faderDb: -2.0, pan: -75, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric', compOn: false, compModel: 'Bypass', dcaGroup: 4 },
      { chNum: 13, name: 'Keys R (Stereo)', sourceInput: 'Studer In 13 (XLR)', gainDb: 18, phantom48V: false, phaseInvert: false, color: 'magenta', icon: 'Keys', faderDb: -2.0, pan: 75, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric', compOn: false, compModel: 'Bypass', dcaGroup: 4 },
      { chNum: 14, name: 'Lead Vocal', sourceInput: 'Studer In 14 (XLR)', gainDb: 34, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: 2.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric + HPF 120Hz + De-Esser', compOn: true, compModel: 'Ui dbx 160 Compressor', dcaGroup: 5 },
      { chNum: 15, name: 'Backing Voc Gtr', sourceInput: 'Studer In 15 (XLR)', gainDb: 32, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: -1.0, pan: -40, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric + De-Esser', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 5 },
      { chNum: 16, name: 'Backing Voc Bass', sourceInput: 'Studer In 16 (XLR)', gainDb: 32, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: -1.0, pan: 40, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric + De-Esser', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 5 },
      { chNum: 17, name: 'Saxophone', sourceInput: 'Studer In 17 (XLR)', gainDb: 30, phantom48V: false, phaseInvert: false, color: 'cyan', icon: 'Music', faderDb: 0.0, pan: -15, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 5 },
      { chNum: 18, name: 'Trumpet', sourceInput: 'Studer In 18 (XLR)', gainDb: 26, phantom48V: false, phaseInvert: false, color: 'cyan', icon: 'Music', faderDb: 0.0, pan: 15, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 5 },
      { chNum: 19, name: 'USB Player L', sourceInput: 'Line In L (RCA/USB)', gainDb: 0, phantom48V: false, phaseInvert: false, color: 'gray', icon: 'Music', faderDb: -6.0, pan: -100, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric', compOn: false, compModel: 'Bypass' },
      { chNum: 20, name: 'USB Player R', sourceInput: 'Line In R (RCA/USB)', gainDb: 0, phantom48V: false, phaseInvert: false, color: 'gray', icon: 'Music', faderDb: -6.0, pan: 100, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric', compOn: false, compModel: 'Bypass' }
    ],
    buses: [
      { busNum: 1, name: 'Aux 1: IEM Lead (XLR)', isStereo: false, role: 'IEM Monitor', faderDb: 0.0, color: 'red', pan: 0 },
      { busNum: 2, name: 'Aux 2: Wedge Band (XLR)', isStereo: false, role: 'Wedge Monitor', faderDb: 0.0, color: 'cyan', pan: 0 },
      { busNum: 3, name: 'Aux 3: Wedge Kytary (XLR)', isStereo: false, role: 'Wedge Monitor', faderDb: -2.0, color: 'yellow', pan: 0 },
      { busNum: 4, name: 'Aux 4: Wedge Bicí (XLR)', isStereo: false, role: 'Wedge Monitor', faderDb: 0.0, color: 'orange', pan: 0 },
      { busNum: 5, name: 'FX 1: Lexicon Hall', isStereo: true, role: 'FX Send', faderDb: 0.0, color: 'purple', pan: 0 },
      { busNum: 6, name: 'FX 2: Lexicon Delay', isStereo: true, role: 'FX Send', faderDb: -3.0, color: 'purple', pan: 0 },
      { busNum: 7, name: 'FX 3: Lexicon Chorus', isStereo: true, role: 'FX Send', faderDb: -6.0, color: 'purple', pan: 0 },
      { busNum: 8, name: 'FX 4: Lexicon Room', isStereo: true, role: 'FX Send', faderDb: -4.0, color: 'purple', pan: 0 }
    ],
    dcas: [
      { dcaNum: 1, name: 'VCA 1: Bicí souprava', color: 'orange', faderDb: 0.0, muted: false, memberChannels: 'CH 1-7' },
      { dcaNum: 2, name: 'VCA 2: Baskytara', color: 'blue', faderDb: 0.0, muted: false, memberChannels: 'CH 8' },
      { dcaNum: 3, name: 'VCA 3: Kytary', color: 'green', faderDb: 0.0, muted: false, memberChannels: 'CH 9-11' },
      { dcaNum: 4, name: 'VCA 4: Klávesy', color: 'magenta', faderDb: 0.0, muted: false, memberChannels: 'CH 12-13' },
      { dcaNum: 5, name: 'VCA 5: Zpěvy & Dechy', color: 'red', faderDb: 0.0, muted: false, memberChannels: 'CH 14-18' },
      { dcaNum: 6, name: 'VCA 6: FX Returns', color: 'purple', faderDb: 0.0, muted: false, memberChannels: 'FX 1-4' }
    ]
  },
  {
    id: 'scene-ui24-acoustic-club',
    name: 'Soundcraft Ui24R Akustické Trio',
    type: 'snapshot',
    createdAt: '2026-08-12T16:00:00Z',
    updatedAt: '2026-09-02T11:00:00Z',
    tags: ['Soundcraft', 'Ui24R', 'Akustika', 'Club', 'Lexicon'],
    description: 'Jemný klubový setup pro akustické trio (akustické kytary, cajon/perkuse, zpěvy) se Studer preampy a Lexicon Warm Hall.',
    favorite: false,
    channelCount: 8,
    scope: {
      channels: true,
      aux: true,
      buses: true,
      mains: true,
      matrix: true,
      eq: true,
      dyn: true,
      gate: true,
      fx: true,
      routing: true,
      dca: true,
      muteGroups: true
    },
    details: {
      targetEnsemble: 'Akustické trio (Folk / Jazz / Pop)',
      faderLayerPreset: 'Ui24R Acoustic Standard',
      mainFaderAssign: 'Main L/R',
      customControlsProfile: 'Acoustic Feedback Suppress',
      notes: 'Optimalizováno pro přirozený dozvuk dřeva a hlasů s minimální kompresí.'
    },
    channels: [
      { chNum: 1, name: 'Cajon Bass', sourceInput: 'Studer In 1 (Combo)', gainDb: 24, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Drum', faderDb: 0.0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'Ui dbx Noise Gate', eqModel: 'Ui 4-Band Parametric + HPF 40Hz', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 1 },
      { chNum: 2, name: 'Cajon Slap', sourceInput: 'Studer In 2 (Combo)', gainDb: 26, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Drum', faderDb: -1.0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'Ui dbx Noise Gate', eqModel: 'Ui 4-Band Parametric', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 1 },
      { chNum: 3, name: 'Akustika 1', sourceInput: 'Studer In 3 (Combo)', gainDb: 28, phantom48V: true, phaseInvert: false, color: 'yellow', icon: 'Acoustic', faderDb: 0.0, pan: -30, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric + HPF 80Hz', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 2 },
      { chNum: 4, name: 'Akustika 2', sourceInput: 'Studer In 4 (Combo)', gainDb: 28, phantom48V: true, phaseInvert: false, color: 'yellow', icon: 'Acoustic', faderDb: 0.0, pan: 30, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric + HPF 80Hz', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 2 },
      { chNum: 5, name: 'Housle Solo', sourceInput: 'Studer In 5 (Combo)', gainDb: 32, phantom48V: true, phaseInvert: false, color: 'green', icon: 'Music', faderDb: 0.5, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 2 },
      { chNum: 6, name: 'Lead Zpěv', sourceInput: 'Studer In 6 (Combo)', gainDb: 34, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: 2.0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric + De-Esser', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 3 },
      { chNum: 7, name: 'Vokál 2', sourceInput: 'Studer In 7 (Combo)', gainDb: 32, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: -1.0, pan: -40, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric + De-Esser', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 3 },
      { chNum: 8, name: 'Vokál 3', sourceInput: 'Studer In 8 (Combo)', gainDb: 32, phantom48V: false, phaseInvert: false, color: 'red', icon: 'Mic', faderDb: -1.0, pan: 40, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: 'Ui 4-Band Parametric + De-Esser', compOn: true, compModel: 'Ui dbx Compressor', dcaGroup: 3 }
    ],
    buses: [
      { busNum: 1, name: 'Aux 1: Odposlech L', isStereo: false, role: 'Wedge Monitor', faderDb: 0.0, color: 'cyan', pan: 0 },
      { busNum: 2, name: 'Aux 2: Odposlech R', isStereo: false, role: 'Wedge Monitor', faderDb: 0.0, color: 'cyan', pan: 0 },
      { busNum: 5, name: 'FX 1: Lexicon Warm Hall', isStereo: true, role: 'FX Send', faderDb: 0.0, color: 'purple', pan: 0 }
    ],
    dcas: [
      { dcaNum: 1, name: 'VCA 1: Perkuse', color: 'orange', faderDb: 0.0, muted: false, memberChannels: 'CH 1-2' },
      { dcaNum: 2, name: 'VCA 2: Strunné nástroje', color: 'yellow', faderDb: 0.0, muted: false, memberChannels: 'CH 3-5' },
      { dcaNum: 3, name: 'VCA 3: Zpěvy', color: 'red', faderDb: 0.0, muted: false, memberChannels: 'CH 6-8' }
    ]
  }
];

export const getInitialScenesForMixer = (mixerId: string): SavedScene[] => {
  if (mixerId === 'x32') return INITIAL_SCENES_X32;
  if (mixerId === 'ui24') return INITIAL_SCENES_UI24;
  return INITIAL_SCENES_WING;
};

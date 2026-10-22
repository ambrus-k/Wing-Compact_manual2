import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));

// GET /api/audit-scene: Status check for Gemini server proxy
app.get('/api/audit-scene', (_req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY);
  return res.json({
    status: 'online',
    hasServerKey: hasKey,
    model: 'gemini-3.8-flash',
    provider: 'Local / Cloud Run Express Server'
  });
});

// POST /api/audit-scene: Calls Gemini 3.8 Flash to audit mixing console scenes
app.post('/api/audit-scene', async (req, res) => {
  try {
    const { scene, mixerModel } = req.body;
    if (!scene || !Array.isArray(scene.channels)) {
      return res.status(400).json({ error: 'Missing scene or channels data' });
    }

    const apiKey = process.env.GEMINI_API_KEY || (req.headers['x-gemini-api-key'] as string);
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set on server. Rule-based client audit should be used.');
      return res.status(503).json({ error: 'GEMINI_API_KEY is not configured on server', code: 'NO_API_KEY' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are a world-class live sound engineer (FOH & Monitor engineer with 20+ years of touring experience on Behringer WING, Behringer X32, and Soundcraft Ui24R consoles, and deep daily use of the Mixing Station app).
Analyze this digital mixer scene / input patch list for live concert audio production.
Identify all audio engineering problems, safety risks, gain staging errors, frequency masking (lack of HPF), phase cancellation (e.g. snare bottom without 180° inversion), harsh noise gates on vocals, uncompressed lead vocals, or missing DCA grouping.

Mixer Model: ${mixerModel || 'Behringer WING'}
Scene Name: ${scene.name}
Ensemble: ${scene.details?.targetEnsemble || 'Live Band'}
Input Channels to audit:
${JSON.stringify(scene.channels.map((c: any) => ({
  chNum: c.chNum,
  name: c.name,
  sourceInput: c.sourceInput,
  gainDb: c.gainDb,
  phantom48V: c.phantom48V,
  phaseInvert: c.phaseInvert,
  gateOn: c.gateOn,
  gateModel: c.gateModel,
  eqModel: c.eqModel,
  compOn: c.compOn,
  compModel: c.compModel,
  dcaGroup: c.dcaGroup,
  faderDb: c.faderDb
})), null, 2)}

Provide structured, professional, actionable sound engineering suggestions in Czech language (čeština).
For every suggestion specify:
- id: unique string id (e.g. "sug-ch1-hpf")
- chNum: channel number (integer)
- channelName: name of the channel
- parameter: one of "gain", "hpf", "phantom48V", "phase", "gate", "eq", "comp", "dca", "fader"
- currentValue: current setting description in Czech
- suggestedValue: proposed setting description in Czech
- patchField: which channel field to update ('gainDb' | 'phantom48V' | 'phaseInvert' | 'gateOn' | 'gateModel' | 'eqModel' | 'compOn' | 'compModel' | 'dcaGroup' | 'faderDb')
- patchValueString: value to set (boolean as "true"/"false", number as numeric string, or string)
- reason: detailed sound engineer rationale in Czech explaining the acoustic trade-offs, feedback prevention, mask elimination, or safety hazard
- category: one of "gain_staging", "eq_clean", "dynamics", "safety", "routing"
- severity: one of "critical", "recommended", "refinement"
`;

    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('AI audit timed out after 9 seconds')), 9000)
    );

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallAssessment: { type: Type.STRING, description: 'Overall summary of the scene audit in Czech' },
            healthScore: { type: Type.INTEGER, description: 'Audio engineering quality score from 0 to 100' },
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  chNum: { type: Type.INTEGER },
                  channelName: { type: Type.STRING },
                  parameter: { type: Type.STRING },
                  currentValue: { type: Type.STRING },
                  suggestedValue: { type: Type.STRING },
                  patchField: { type: Type.STRING },
                  patchValueString: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  category: { type: Type.STRING },
                  severity: { type: Type.STRING }
                },
                required: ['id', 'chNum', 'channelName', 'parameter', 'currentValue', 'suggestedValue', 'patchField', 'patchValueString', 'reason', 'category', 'severity']
              }
            }
          },
          required: ['overallAssessment', 'healthScore', 'suggestions']
        }
      }
    });

    const response = await Promise.race([generatePromise, timeoutPromise]);

    const parsed = JSON.parse(response.text || '{}');
    
    // Normalize patch values
    if (Array.isArray(parsed.suggestions)) {
      parsed.suggestions = parsed.suggestions.map((s: any) => {
        let patchValue: any = s.patchValueString;
        if (s.patchField === 'phantom48V' || s.patchField === 'phaseInvert' || s.patchField === 'gateOn' || s.patchField === 'compOn') {
          patchValue = s.patchValueString === 'true' || s.patchValueString === true;
        } else if (s.patchField === 'gainDb' || s.patchField === 'dcaGroup' || s.patchField === 'faderDb') {
          patchValue = Number(s.patchValueString);
        }
        return {
          ...s,
          patchValue
        };
      });
    }

    return res.json(parsed);
  } catch (err: any) {
    console.error('Error during AI scene audit:', err);
    return res.status(500).json({ error: err.message || 'Internal AI audit error' });
  }
});

// Vite Middleware & Static Serving Setup
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();

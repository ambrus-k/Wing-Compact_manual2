import { InstrumentPreset } from '../types';
import { WOODWINDS_PRESETS } from './presets/woodwindsPresets';
import { BRASS_PRESETS } from './presets/brassPresets';
import { STRINGS_PRESETS } from './presets/stringsPresets';
import { HARP_PRESETS } from './presets/harpPresets';
import { KEYS_PRESETS } from './presets/keysPresets';
import { GUITARS_PRESETS } from './presets/guitarsPresets';
import { DRUMS_PRESETS } from './presets/drumsPresets';
import { VOCALS_PRESETS } from './presets/vocalsPresets';
import { CHOIRS_PRESETS } from './presets/choirsPresets';
import { ORCHESTRA_ADDITIONS } from './presets/orchestraAdditions';

// Combine all 9 exact European orchestra, band, and ensemble instrument categories
export const INSTRUMENT_PRESETS: InstrumentPreset[] = [
  ...WOODWINDS_PRESETS,
  ...BRASS_PRESETS,
  ...STRINGS_PRESETS,
  ...HARP_PRESETS,
  ...KEYS_PRESETS,
  ...GUITARS_PRESETS,
  ...DRUMS_PRESETS,
  ...VOCALS_PRESETS,
  ...CHOIRS_PRESETS,
  ...ORCHESTRA_ADDITIONS
];

import { SavedScene, SceneChannelPatch, AuditSuggestion, AuditReport } from '../types';

/**
 * Sound Engineer Expert Rules Engine
 * Implements real-world audio engineering best practices, FOH/monitor workflows,
 * and console configuration rules for Behringer WING, X32, and Soundcraft Ui24R.
 */
export const runSoundEngineerAudit = (scene: SavedScene, mixerModel: string = 'wing'): AuditReport => {
  const suggestions: AuditSuggestion[] = [];
  const channels = scene.channels || [];

  if (channels.length === 0) {
    return {
      overallAssessment: 'Scéna neobsahuje žádné kanály ke kontrole.',
      healthScore: 100,
      suggestions: []
    };
  }

  // Helper matchers
  const isVocal = (ch: SceneChannelPatch) => {
    const name = ch.name.toLowerCase();
    return name.includes('vox') || name.includes('vocal') || name.includes('zpěv') || 
           name.includes('lead') || name.includes('frontman') || name.includes('sbor') || 
           name.includes('choir') || name.includes('bv') || name.includes('harmonie') ||
           name.includes('moderátor') || name.includes('speech') || ch.icon?.toLowerCase() === 'mic' ||
           name.includes('pavel') || name.includes('brabec') || name.includes('klara') || name.includes('karel');
  };

  const isLeadVocal = (ch: SceneChannelPatch) => {
    const name = ch.name.toLowerCase();
    return name.includes('lead') || name.includes('hlavní') || name.includes('frontman') || 
           name.includes('zpěv 1') || name.includes('vox 1') || (isVocal(ch) && !name.includes('bv') && !name.includes('back'));
  };

  const isDrum = (ch: SceneChannelPatch) => {
    const name = ch.name.toLowerCase();
    const icon = ch.icon?.toLowerCase() || '';
    return name.includes('kick') || name.includes('kopák') || name.includes('bd') || name.includes('bassdrum') ||
           name.includes('snare') || name.includes('virbl') || name.includes('sd') ||
           name.includes('hihat') || name.includes('hat') || name.includes('hh') ||
           name.includes('tom') || name.includes('floor') || name.includes('overhead') || 
           name.includes('overhd') || name.includes('over ') || name.includes('oh') || name.includes('ride') || name.includes('crash') ||
           icon === 'drum' || icon === 'cymbal' || icon === 'tom';
  };

  const isKick = (ch: SceneChannelPatch) => {
    const name = ch.name.toLowerCase();
    return name.includes('kick') || name.includes('kopák') || name.includes('bd') || name.includes('bassdrum');
  };

  const isSnare = (ch: SceneChannelPatch) => {
    const name = ch.name.toLowerCase();
    return name.includes('snare') || name.includes('virbl') || name.includes('sd');
  };

  const isSnareBottom = (ch: SceneChannelPatch) => {
    const name = ch.name.toLowerCase();
    return (name.includes('snare') || name.includes('virbl') || name.includes('sd')) &&
           (name.includes('bot') || name.includes('down') || name.includes('under') || name.includes('spod') || name.includes('strun'));
  };

  const isOverhead = (ch: SceneChannelPatch) => {
    const name = ch.name.toLowerCase();
    return name.includes('overhead') || name.includes('overhd') || name.includes('over ') || name.includes('oh') || name.includes('činel') || name.includes('ride') || name.includes('hihat') || name.includes('hh');
  };

  const isGuitar = (ch: SceneChannelPatch) => {
    const name = ch.name.toLowerCase();
    const icon = ch.icon?.toLowerCase() || '';
    return name.includes('gtr') || name.includes('kytar') || name.includes('guitar') || 
           name.includes('akust') || name.includes('el.') || icon === 'guitar' || icon === 'acoustic' || icon === 'amp';
  };

  const isBass = (ch: SceneChannelPatch) => {
    const name = ch.name.toLowerCase();
    const icon = ch.icon?.toLowerCase() || '';
    return name.includes('baskytara') || name.includes('basa') || name.includes('bass') || icon === 'bass';
  };

  const isLineOrElectronic = (ch: SceneChannelPatch) => {
    const name = ch.name.toLowerCase();
    const src = ch.sourceInput.toLowerCase();
    return name.includes('synth') || name.includes('kláves') || name.includes('keys') || 
           name.includes('piano') || name.includes('rhodes') || name.includes('nord') ||
           name.includes('playback') || name.includes('laptop') || name.includes('pc') ||
           name.includes('ipad') || name.includes('dj') || name.includes('sampler') ||
           name.includes('spd') || name.includes('wireless') || name.includes('line') ||
           src.includes('aux in') || src.includes('usb');
  };

  const isCondenserExpected = (ch: SceneChannelPatch) => {
    const name = ch.name.toLowerCase();
    return name.includes('overhead') || name.includes('oh') || name.includes('hihat') ||
           name.includes('akust') || name.includes('flétn') || name.includes('sbor') ||
           name.includes('choir') || name.includes('harf') || name.includes('c414') || 
           name.includes('km184') || name.includes('di') || name.includes('dpa');
  };

  // AUDIT RULE 1: SAFETY & PHANTOM POWER (+48V)
  channels.forEach(ch => {
    // 1a: Line inputs / Synths / Wireless receivers with phantom power ON
    if (isLineOrElectronic(ch) && ch.phantom48V) {
      suggestions.push({
        id: `audit-${ch.chNum}-phantom-safety`,
        chNum: ch.chNum,
        channelName: ch.name,
        parameter: 'phantom48V',
        currentValue: 'Zapnuto (+48V AKTIVNÍ)',
        suggestedValue: 'Vypnout (0V)',
        patchField: 'phantom48V',
        patchValue: false,
        reason: 'KRITICKÉ BEZPEČNOSTNÍ RIZIKO: Phantomové napájení +48V na linkovém vstupu (klávesy, syntezátor, bezdrátový přijímač nebo PC) může způsobit zničení výstupních operačních zesilovačů zařízení nebo silné lupnutí do PA.',
        category: 'safety',
        severity: 'critical',
        status: 'pending'
      });
    }

    // 1b: Condensers / Overheads / DIs without phantom power
    if (isCondenserExpected(ch) && !ch.phantom48V && !ch.sourceInput.toLowerCase().includes('aux') && !ch.sourceInput.toLowerCase().includes('usb')) {
      suggestions.push({
        id: `audit-${ch.chNum}-phantom-condenser`,
        chNum: ch.chNum,
        channelName: ch.name,
        parameter: 'phantom48V',
        currentValue: 'Vypnuto (0V)',
        suggestedValue: 'Zapnout (+48V)',
        patchField: 'phantom48V',
        patchValue: true,
        reason: 'Kondenzátorový mikrofon nebo aktivní pódiový DI box (overheads, sbor, akustické nástroje) potřebuje +48V phantom pro polarizaci vložky a vnitřní předzesilovač. Bez 48V nepůjde žádný signál.',
        category: 'safety',
        severity: 'critical',
        status: 'pending'
      });
    }
  });

  // AUDIT RULE 2: PHASE INVERSION (POLARITY)
  channels.forEach(ch => {
    if (isSnareBottom(ch) && !ch.phaseInvert) {
      suggestions.push({
        id: `audit-${ch.chNum}-phase-snare-bot`,
        chNum: ch.chNum,
        channelName: ch.name,
        parameter: 'phase',
        currentValue: 'Normální fáze (0°)',
        suggestedValue: 'Otočit fázi (180° Invert)',
        patchField: 'phaseInvert',
        patchValue: true,
        reason: 'AKUSTICKÉ RUŠENÍ: Spodní mikrofon virblu snímá blánu z opačné strany než horní mikrofon. Při úderu se horní blána pohybuje dolů, zatímco spodní blána se prohýbá ven. Bez otočení fáze o 180° dochází k drastickému vyrušení basů a těla virblu.',
        category: 'safety',
        severity: 'critical',
        status: 'pending'
      });
    }
  });

  // AUDIT RULE 3: HIGH-PASS FILTER (HPF / LOW-CUT) & EQ
  channels.forEach(ch => {
    // 3a: Vocals without proper EQ / HPF
    if (isVocal(ch)) {
      if (ch.eqModel.includes('Flat') || !ch.eqModel.includes('HPF')) {
        suggestions.push({
          id: `audit-${ch.chNum}-vocal-hpf`,
          chNum: ch.chNum,
          channelName: ch.name,
          parameter: 'hpf',
          currentValue: 'Bypass / Bez Low-Cut',
          suggestedValue: 'Aktivovat HPF 110 Hz (18 dB/oct)',
          patchField: 'eqModel',
          patchValue: `${ch.eqModel.replace(' (Flat)', '')} + HPF 110Hz`,
          reason: 'ZKUŠENOST Z PRAXE: Zpěvový mikrofon na pódiu bez Low-Cut filtru (HPF) zachycuje mechanické bouchání stojanu, manipulační ruchy ruky, rázové souhlásky P/B a dunění z pódiových subwooferů. HPF na 110 Hz vyčistí spodek a uvolní headroom v mixu.',
          category: 'eq_clean',
          severity: 'recommended',
          status: 'pending'
        });
      }
    }

    // 3b: Overheads & Cymbals
    if (isOverhead(ch)) {
      if (!ch.eqModel.includes('HPF') && !ch.eqModel.includes('LowCut')) {
        suggestions.push({
          id: `audit-${ch.chNum}-oh-hpf`,
          chNum: ch.chNum,
          channelName: ch.name,
          parameter: 'hpf',
          currentValue: 'Plný frekvenční rozsah (od 20 Hz)',
          suggestedValue: 'Aktivovat HPF 300 Hz (Cymbals Only)',
          patchField: 'eqModel',
          patchValue: 'WING 6-Band PEQ (HPF 300Hz Cut)',
          reason: 'ČIŠTĚNÍ BICÍCH: Overheaddy mají snímat primárně činely a vzdušnost soupravy. Bez ořezu pod 300 Hz přes ně leze fázově zpožděný kopák a baskytara, což rozmazává konkrétnost spodků v celém sále.',
          category: 'eq_clean',
          severity: 'recommended',
          status: 'pending'
        });
      }
    }

    // 3c: Electric or Acoustic Guitars
    if (isGuitar(ch) && !ch.eqModel.includes('HPF')) {
      suggestions.push({
        id: `audit-${ch.chNum}-gtr-hpf`,
        chNum: ch.chNum,
        channelName: ch.name,
        parameter: 'hpf',
        currentValue: 'Bez ořezu basů (< 80 Hz)',
        suggestedValue: 'Zapnout HPF 95 Hz',
        patchField: 'eqModel',
        patchValue: `${ch.eqModel} (HPF 95Hz)`,
        reason: 'FREKVENČNÍ MASKOVÁNÍ: Kytara pod 90 Hz nemá žádný užitečný tón (nejhlubší struna E má cca 82 Hz). Vše pod 90 Hz se bije s basou a kopákem a vytváří nečitelné „bláto“.',
        category: 'eq_clean',
        severity: 'recommended',
        status: 'pending'
      });
    }
  });

  // AUDIT RULE 4: NOISE GATE / EXPANDER
  channels.forEach(ch => {
    // 4a: Vocal with aggressive gate
    if (isVocal(ch) && ch.gateOn) {
      suggestions.push({
        id: `audit-${ch.chNum}-vocal-gate-bypass`,
        chNum: ch.chNum,
        channelName: ch.name,
        parameter: 'gate',
        currentValue: `Gate Zapnut (${ch.gateModel})`,
        suggestedValue: 'Vypnout Gate (Bypass) nebo Expander (-6dB max)',
        patchField: 'gateOn',
        patchValue: false,
        reason: 'ZÁKAZ TVRDÉHO GATE NA HLAVNÍ ZPĚV: Zvukaři z praxe vědí, že tvrdý šumový gate na živém zpěvu „požírá“ tiché nádechy, souhlásky (T, K, P, S) a konce frází. Zpěvák zní useknutě. Raději použijte správný mikrofon a směrovost odposlechů.',
        category: 'dynamics',
        severity: 'recommended',
        status: 'pending'
      });
    }

    // 4b: Kick or Toms without Gate
    if (isKick(ch) && !ch.gateOn) {
      suggestions.push({
        id: `audit-${ch.chNum}-kick-gate-enable`,
        chNum: ch.chNum,
        channelName: ch.name,
        parameter: 'gate',
        currentValue: 'Gate Vypnut (Bypass)',
        suggestedValue: 'Zapnout WING Gate/Exp (Attack 1ms, Release 110ms)',
        patchField: 'gateOn',
        patchValue: true,
        reason: 'ÚDERNÝ SPODEK: Kopák potřebuje rychlý gate (attack 1ms, hold 40ms, release 120ms), aby po odeznění úderu nezůstával v subwooferech rezonanční hluk z pódia a přeslechy z baskytary.',
        category: 'dynamics',
        severity: 'recommended',
        status: 'pending'
      });
    }
  });

  // AUDIT RULE 5: COMPRESSOR & PEAK CONTROL
  channels.forEach(ch => {
    // 5a: Lead vocal without compressor
    if (isLeadVocal(ch) && !ch.compOn) {
      suggestions.push({
        id: `audit-${ch.chNum}-vocal-comp-enable`,
        chNum: ch.chNum,
        channelName: ch.name,
        parameter: 'comp',
        currentValue: 'Kompresor Vypnut (Bypass)',
        suggestedValue: 'Zapnout 1176 FET Comp / LA Leveler (Ratio 3:1, GR 3-5dB)',
        patchField: 'compOn',
        patchValue: true,
        reason: 'SROZUMITELNOST VOKÁLU: Zpěv má obrovský dynamický rozsah (šepot až křik). Bez kompresoru se tiché pasáže v kapele ztratí a hlasité pasáže přebudí sál. Jemná komprese 3–5 dB udrží zpěvákův hlas vždy na vrchu mixu.',
        category: 'dynamics',
        severity: 'recommended',
        status: 'pending'
      });
    }

    // 5b: Bass without compressor
    if (isBass(ch) && !ch.compOn) {
      suggestions.push({
        id: `audit-${ch.chNum}-bass-comp-enable`,
        chNum: ch.chNum,
        channelName: ch.name,
        parameter: 'comp',
        currentValue: 'Kompresor Vypnut (Bypass)',
        suggestedValue: 'Zapnout Opto / LA Leveler Comp (Ratio 4:1, Attack 25ms)',
        patchField: 'compOn',
        patchValue: true,
        reason: 'STABILITA BASOVÉHO ZÁKLADU: Různé tóny na baskytaře mají přirozeně odlišnou rezonanci. Optický kompresor (LA-2A / Leveler) srovná hlasitost jednotlivých tónů a poskytne kapele pevný, pumpující groove.',
        category: 'dynamics',
        severity: 'recommended',
        status: 'pending'
      });
    }
  });

  // AUDIT RULE 6: GAIN STAGING & HEADROOM
  channels.forEach(ch => {
    // 6a: Drums with excessively high gain
    if (isDrum(ch) && ch.gainDb > 32) {
      suggestions.push({
        id: `audit-${ch.chNum}-gain-staging-high`,
        chNum: ch.chNum,
        channelName: ch.name,
        parameter: 'gain',
        currentValue: `+${ch.gainDb} dB (Příliš vysoký zisk)`,
        suggestedValue: 'Snížit na +20 dB až +24 dB',
        patchField: 'gainDb',
        patchValue: 22,
        reason: 'PREVENCE DIGITÁLNÍHO KLIPU: Bicí mají vysokou špičkovou energii (transienty). Při živém koncertě bubeník hraje o 6–10 dB hlasitěji než při zvukovce. Gain nad +32 dB zaručeně způsobí červený CLIP na A/D převodníku.',
        category: 'gain_staging',
        severity: 'recommended',
        status: 'pending'
      });
    }

    // 6b: Quiet vocal with too low gain
    if (isLeadVocal(ch) && ch.gainDb < 20) {
      suggestions.push({
        id: `audit-${ch.chNum}-gain-staging-low`,
        chNum: ch.chNum,
        channelName: ch.name,
        parameter: 'gain',
        currentValue: `+${ch.gainDb} dB (Příliš nízký zisk)`,
        suggestedValue: 'Zvýšit na +32 dB až +36 dB (Cíl: -18 dBFS)',
        patchField: 'gainDb',
        patchValue: 34,
        reason: 'OPTIMÁLNÍ ODSTUP SIGNÁL/ŠUM: Pro dynamické mikrofony (např. SM58, Beta 58) je zisk pod +20 dB příliš malý. Zpěvák nedosáhne na nominální úroveň -18 dBFS a při následném zesílení v mixu vyleze šum.',
        category: 'gain_staging',
        severity: 'refinement',
        status: 'pending'
      });
    }
  });

  // AUDIT RULE 7: DCA GROUPING ASSIGNMENT
  channels.forEach(ch => {
    if (!ch.dcaGroup) {
      let targetDca: number | undefined;
      let dcaName = '';

      if (isDrum(ch)) {
        targetDca = 1;
        dcaName = 'DCA 1 (Bicí souprava)';
      } else if (isBass(ch)) {
        targetDca = 2;
        dcaName = 'DCA 2 (Basa & Sub)';
      } else if (isGuitar(ch) || isLineOrElectronic(ch)) {
        targetDca = 3;
        dcaName = 'DCA 3 (Nástroje / Harmonie)';
      } else if (isLeadVocal(ch)) {
        targetDca = 4;
        dcaName = 'DCA 4 (Hlavní zpěv)';
      } else if (isVocal(ch)) {
        targetDca = 5;
        dcaName = 'DCA 5 (Vokály & Sbory)';
      }

      if (targetDca) {
        suggestions.push({
          id: `audit-${ch.chNum}-dca-assign`,
          chNum: ch.chNum,
          channelName: ch.name,
          parameter: 'dca',
          currentValue: 'Nepřiřazeno (Bez DCA)',
          suggestedValue: `Přiřadit do ${dcaName}`,
          patchField: 'dcaGroup',
          patchValue: targetDca,
          reason: 'PŘEHLEDNOST MIXU: Přiřazení do DCA skupiny umožňuje jedním faderem plynule ovládat celou sekci nástrojů na pultu i v aplikaci Mixing Station bez nutnosti hýbat jednotlivými stopami.',
          category: 'routing',
          severity: 'refinement',
          status: 'pending'
        });
      }
    }
  });

  // Calculate health score: 100 base minus deductions
  const criticalCount = suggestions.filter(s => s.severity === 'critical').length;
  const recommendedCount = suggestions.filter(s => s.severity === 'recommended').length;
  const refinementCount = suggestions.filter(s => s.severity === 'refinement').length;

  const deductions = (criticalCount * 12) + (recommendedCount * 4) + (refinementCount * 1.5);
  const healthScore = Math.max(35, Math.min(100, Math.round(100 - deductions)));

  const overallAssessment = criticalCount > 0 
    ? `Prověrka odhalila ${criticalCount} kritických rizik (bezpečnost napájení +48V nebo fáze) a ${recommendedCount + refinementCount} doporučení pro čistější zvuk a lepší přehlednost v Mixing Station.`
    : `Scéna je ve velmi slušném stavu (${healthScore}/100). Bylo nalezeno ${recommendedCount + refinementCount} doporučených úprav pro optimalizaci gain stagingu, ořez basů (HPF) a dynamiku dle osvědčených standardů živého ozvučení.`;

  return {
    overallAssessment,
    healthScore,
    suggestions
  };
};

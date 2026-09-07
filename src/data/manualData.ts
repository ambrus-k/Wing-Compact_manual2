import { ManualChapter } from '../types';

export const MANUAL_CHAPTERS: ManualChapter[] = [
  {
    id: 'ch-1-introduction',
    number: 1,
    title: 'Úvod a architektura WING Compact',
    icon: 'Radio',
    summary: 'Koncepce mixážního pultu WING Compact s 24 mikrofonními vstupy Midas PRO, 12+1 motorickými fadery a 40-bitovým plovoucím zpracováním zvuku.',
    subsections: [
      {
        id: '1-1-concept',
        title: 'Koncepce a inovace WING Compact',
        badge: 'Architektura',
        summary: 'Proč je WING Compact revoluční a v čem spočívá nový koncept směrování signálu.',
        functionDiagram: {
          type: 'top_panel',
          title: 'Ovládací plocha & Fyzické rozvržení WING Compact',
          subtitle: '10.1" výklopný vícedotykový displej, 12+1 motorických faderů 100mm a 16 tlačítek rychlého přístupu'
        },
        content: `Mixážní pult Behringer WING Compact přináší kompletní výpočetní a procesingový výkon vlajkové lodi WING do kompaktního a snadno přenosného formátu. Na rozdíl od starších generací digitálních mixů (jako např. řada X32) pracuje WING s revoluční architekturou **oddělení fyzických zdrojů (Sources) od procesních kanálů (Channels)**.

Klíčové parametry konzole WING Compact:
- **24 prémiových mikrofonních předzesilovačů Midas PRO** na palubě s combo XLR/TRS konektory.
- **8 symetrických linkových výstupů XLR Midas PRO**.
- **10.1" kapacitní vícedotykový displej** s možností plynulého naklápění v rozsahu 15° až 60°.
- **12 motorických faderů 100 mm** na levé sekci + **1 dedikovaný motorický fader** na pravé Main sekci.
- **2.4" barevný LCD displej** na pravé sekci s 16 podsvícenými tlačítky rychlého přístupu pro bleskové Sends On Fader (SOF) a DCA Spill.
- **40 plně stereo vstupních kanálů** + **8 stereo Aux kanálů** (bez nutnosti párování sousedních stop!).
- **16 stereo sběrnic (Buses), 8 stereo matic (Matrices) a 4 stereo hlavní sběrnice (Mains)**.
- **Interní 40-bitové floating point zpracování při 48 kHz / 44.1 kHz** s ultra-nízkou latencí (konzole In->Out pouze 1.0 ms).`,
        keyPoints: [
          '48 stereo kanálů zpracování bez ztráty kapacity při stereo provozu',
          'Všechny sběrnice a matice jsou plně stereofonní s vlastní dynamikou a 8-pásmovým EQ',
          'Inline architektura umožňující přepínání MAIN a ALT vstupu na každém kanálu stiskem jediného tlačítka'
        ],
        wingCompactSpecific: 'WING Compact má 24 Midas PRO mikrofonních vstupů přímo na těle (oproti 8 u velkého WINGu) a kompaktní sekci 12+1 faderů optimalizovanou pro rychlé živé míchání.'
      },
      {
        id: '1-2-signal-flow',
        title: 'Signálový tok a plná stereofonie',
        badge: 'Signal Flow',
        summary: 'Každý ze 48 kanálů zvládá Mono, Stereo i Mid/Side signál v jediném stripu.',
        functionDiagram: {
          type: 'signal_flow',
          title: 'Signálový tok kanálového stripu a volitelné TAP body',
          subtitle: 'Blokové schéma: Preamp -> Trim -> HPF/LPF -> Gate -> 6-Band EQ -> Comp -> Fader -> Sběrnice'
        },
        content: `Na pultu WING je každý kanál v základu stereofonní. Nemusíte zabírat dva sousední fadery pro klávesy, overheady nebo stereo reverb returny.

Pokud na kanál přiřadíte:
1. **Mono zdroj**: Signál je automaticky zrcadlen do levého i pravého kanálu procesingu s možností panorámování.
2. **Stereo zdroj**: Signál prochází stereo procesingem s ovládáním šířky báze (Width -150% až +150%) a balance.
3. **Mid/Side (M/S) zdroj**: Konzole interně dekóduje M/S signál na standardní stereo L/R ještě před vstupem do filtrů a dynamiky.`,
        keyPoints: [
          'Width nastavitelná od -150% (obrácené stereo) přes 0% (mono) po +150% (rozšířené stereo)',
          'Nezávislé fázové otočení a zpoždění pro L i R větev',
          'Stereo kanály nezmenšují celkovou kapacitu 40 vstupních stripů'
        ]
      }
    ]
  },
  {
    id: 'ch-2-sources-channels-buses',
    number: 2,
    title: 'Zdroje, kanály, sběrnice a výstupy',
    icon: 'GitBranch',
    summary: 'Rozdíl mezi Sources a Channels, 16 stereo sběrnic, 8 matic, 4 hlavní výstupy, User Signals a User Patches.',
    subsections: [
      {
        id: '2-1-sources-vs-channels',
        title: 'Rozdíl mezi Zdroji (Sources) a Kanály (Channels)',
        badge: 'Klíčový koncept',
        summary: 'Základní stavební kámen WING: oddělení fyzického vstupu od kanálového stripu.',
        functionDiagram: {
          type: 'sources_vs_channels',
          title: 'Architektura Zdroje (Sources) vs. Kanály (Channels)',
          subtitle: 'Oddělení fyzického I/O konektoru od logického processing stripu a nezávislý MAIN/ALT routing'
        },
        content: `Na tradičních pultech je kanál 1 pevně svázán s fyzickým konektorem Input 1. Na pultu WING je **Zdroj (Source)** samostatná entita:

**Co obsahuje Zdroj (Source):**
- Fyzické parametry: Analogový Gain předzesilovače, fantomové napájení +48V, otočení fáze (POL), Mute.
- Identifikační data: Název (např. "Kick D112"), barva podsvícení, grafická ikona a tagy.
- Konfiguraci formátu: Mono, Stereo pár nebo Mid/Side.

**Co je Kanál (Channel):**
- Výpočetní procesní strip obsahující: Input Trim, HPF/LPF filtry, Gate/Expander, 6-pásmový EQ, Kompresor, Inserty INS1/INS2 a odesílání do sběrnic (Bus Sends).
- Každý kanál má dva přiřaditelné sloty: **MAIN Source** a **ALT Source** (ideální pro okamžité přepnutí z mikrofonu na virtuální zvukovou zkoušku z DAW nebo USB/SD karty).`,
        keyPoints: [
          'Jeden fyzický zdroj lze přiřadit na více kanálů současně bez Y-kabelu (např. FOH strip + Monitor strip s odlišným EQ)',
          'Změna názvu nebo barvy zdroje se může automaticky synchronizovat na kanálový displej',
          'Možnost přímého routingu ze Source přímo na Output bez průchodu kanálovým stripem (nulová latence pro direct outs)'
        ]
      },
      {
        id: '2-2-buses-and-mains',
        title: '16 Stereo sběrnic, 4 Main sběrnice a 8 Matic',
        badge: 'Sběrnice',
        summary: 'Tři provozní režimy sběrnic: TAP, POST a GROUP pro odposlechy, efekty a podskupiny.',
        content: `WING Compact nabízí 16 plně stereofonních sběrnic (B1–B16), 4 nezávislé stereo Main sběrnice (M1–M4) a 8 stereo matic (MX1–MX8).

Každý kanál může posílat signál do sběrnice v jednom ze tří režimů:
1. **TAP režim**: Signál je odebírán ze zvoleného TAP bodu kanálu (typicky Pre-Fader). Ideální pro **odposlechové cesty (IEM / pódiové monitory)**. Možnost zapnout *Ignore Channel Mute*, aby odposlech hrál i při ztlumeném FOH faderu.
2. **POST režim**: Signál je odebírán Post-Fader. Úroveň do sběrnice sleduje pohyb šavle kanálu. Typické pro **efektové sběrnice (Reverb, Delay)**.
3. **GROUP režim**: Úroveň sendu je vypnuta a signál jde 1:1 podle faderu kanálu. Slouží pro **audio podskupiny (Drums Subgroup, Vocals Subgroup)** s možností společné komprese na sběrnici.`,
        keyPoints: [
          'Všechny sběrnice 1-16 mají 8-pásmový parametrický EQ, dynamický procesor a dva insert sloty',
          '4 Main sběrnice umožňují současný nezávislý mix pro PA systém, Live Stream, foyer a nahrávání',
          '8 maticových sběrnic (MX1-MX8) pro zónové ozvučení, zpožděné reprosoustavy (Delay lines) a subwoofery'
        ]
      },
      {
        id: '2-3-user-signals-patches',
        title: 'User Signals a User Patches',
        badge: 'Pokročilý Routing',
        summary: 'Vytváření vlastních signálových odboček a kombinací nezařazených vstupů.',
        content: `Kromě standardních sběrnic nabízí WING dvě speciální směrovací vrstvy:

- **24 User Signals**: Umožňují vyvést kopii kteréhokoliv ze 40 kanálů, 8 auxů nebo 16 sběrnic v libovolném místě signálového řetězce (Pre-Fader / Post-Fader, L, R nebo L+R součet). Tyto signály lze použít jako vstup pro jiný kanál nebo poslat na StageConnect.
- **32 User Patches**: Slouží ke sloučení dvou nesouvisejících nebo nesousedících vstupů (např. Local In 1 + AES50 B14) do jednoho stereofonního nebo Mid/Side virtuálního zdroje s vlastním nastavením gainu a fantomu pro každý kanál zvlášť.`,
        keyPoints: [
          'Umožňuje vytvořit stereo zdroj ze dvou zcela libovolných fyzických konektorů',
          'Flexibilní řešení pro složité broadcastové a divadelní sestavy'
        ]
      }
    ]
  },
  {
    id: 'ch-3-rear-panel-connections',
    number: 3,
    title: 'Konektivita a zapojení pultu',
    icon: 'Cable',
    summary: '24 Midas PRO vstupů, 8 XLR výstupů, 3x AES50 porty, StageConnect, USB 48x48, WING-LIVE SD slot a GPIO.',
    subsections: [
      {
        id: '3-1-analog-io',
        title: 'Analogové vstupy a výstupy na WING Compact',
        badge: 'Hardware I/O',
        summary: '24 kombinovaných mikrofonních/linkových vstupů a 8 XLR výstupů Midas PRO.',
        functionDiagram: {
          type: 'rear_panel',
          title: 'Konektivita zadního panelu: Analog & Digitál',
          subtitle: '24 Midas PRO vstupů, 8 XLR výstupů, 3x AES50 etherCON, StageConnect 32ch a USB 48x48'
        },
        content: `Na zadním panelu pultu WING Compact se nachází:
- **24x Midas PRO Combo XLR / 1/4" TRS vstupů** (předzesilovače s dynamickým rozsahem 114 dB, THD+N <0.004% při unity gain a max. vstupem +21 dBu).
- **8x Midas PRO symetrických XLR výstupů** (maximální výstupní úroveň +21 dBu, impedance 75 Ω).
- **2x 1/4" TRS nezávislé sluchátkové výstupy** umístěné pod pravým horním a dolním rohem pultu (hardwarově přiřazené k AUX OUT 7 a 8).
- **1x 4-pin XLR konektor pro 12V lampičku** na horním panelu.
- **5-pin MIDI IN a OUT** pro řízení DAW, scén nebo externích MIDI zařízení.
- **1x 1/4" TRS GPIO konektor** poskytující 2 univerzální vstupy/výstupy (např. pro nožní pedály nebo signalizační světla On-Air).`,
        keyPoints: [
          'Všechny předzesilovače Midas PRO mají samostatně spínatelný +48V fantom a analogový gain 0 až +60 dB',
          'Sluchátkové zesilovače poskytují vysoký výkon 500 mW @ 75 Ω pro spolehlivý odposlech i v hlučném prostředí'
        ]
      },
      {
        id: '3-2-digital-connections',
        title: 'Digitální rozhraní: AES50, StageConnect a USB',
        badge: 'Digitální audio',
        summary: '3 porty AES50 (až 144 kanálů in/out), 32-kanálový StageConnect a 48x48 USB rozhraní.',
        functionDiagram: {
          type: 'stageconnect_topology',
          title: 'StageConnect 32-kanálová sběrnice & Topologie',
          subtitle: 'Ultra-nízká latence 0.05 ms po standardním symetrickém DMX/XLR kabelu s 18W napájením'
        },
        content: `WING Compact disponuje masivní digitální konektivitou:

1. **3x AES50 porty (Port A, Port B, Port C)**:
   - Každý port přenáší **48 vstupních a 48 výstupních kanálů** v rozlišení 48 kHz / 24-bit.
   - Celkem až **144 kanálů digitálního propojení** se stageboxy (Behringer S16, S32, SD8, SD16 nebo Midas DL16, DL32, DL251) a dalšími mixážními pulty.
   - **Požadavky na kabeláž**: Stíněný kabel CAT-5e s konektory etherCON, maximální délka 80 metrů.

2. **StageConnect (1x XLR konektor, 32 kanálů)**:
   - Přenáší **32 digitálních kanálů s latencí pod 1 milisekundu** přes standardní symetrický XLR kabel (doporučen digitální DMX kabel 110 Ω do 40 metrů).
   - Poskytuje napájení 12V / 18W pro připojená zařízení (např. osobní monitoring P16 nebo Behringer Ultranet/StageConnect expandéry).

3. **USB Audio Interface (USB typ B)**:
   - **48 kanálů vstup / 48 kanálů výstup** přes rozhraní USB 2.0.
   - Nízko-latenční ASIO ovladače pro Windows, Class Compliant režim pro macOS/iOS bez nutnosti instalace ovladačů.
   - Plná podpora DAW řízení přes protokoly Mackie Control (MCU) a HUI.

4. **Stereo AES/EBU (AES3)**:
   - 1x XLR digitální vstup a 1x XLR digitální výstup pro přímé připojení digitálních procesorů nebo PA procesorů.`,
        keyPoints: [
          'Automatická diagnostika chybovosti paketů na AES50 (COR a UNC čítače v reálném čase)',
          'StageConnect umožňuje řetězit odposlechové a I/O boxy jedním tenkým kabelem'
        ]
      },
      {
        id: '3-3-expansion-slot',
        title: 'Rozšiřující slot a karta WING-LIVE',
        badge: 'WING-LIVE',
        summary: '64-stopé nahrávání a přehrávání z duálních SD karet přímo v konzoli.',
        functionDiagram: {
          type: 'sd_live_recorder',
          title: 'Duální SD rekordér WING-LIVE',
          subtitle: 'Až 64 stop v 32-bit float nebo 32 stop redundantně pro absolutní jistotu na koncertech'
        },
        content: `Standardně je v rozšiřujícím slotu instalována karta **WING-LIVE**:
- Umožňuje **přímé 32-stopé nahrávání na jednu SD/SDHC kartu nebo 64-stopé na dvě propojené karty** v kvalitě 48 kHz / 32-bit float.
- Slot lze v případě potřeby vyměnit za rozšiřující karty pro **Dante (WING-DANTE)** nebo **MADI (WING-MADI)**.`,
        keyPoints: [
          'SD karty musí být formátovány na FAT32 s velikostí clusteru 32 kB (formátování lze provést přímo v pultu)',
          'Možnost záložní 3V lithiové baterie CR123 pro bezpečné uložení nahrávky při výpadku napájení'
        ]
      }
    ]
  },
  {
    id: 'ch-4-control-surface',
    number: 4,
    title: 'Ovládací plocha & Faderové vrstvy',
    icon: 'Sliders',
    summary: '12 motorických faderů, 2.4" Main Fader displej, 16 tlačítek rychlého přístupu, Sends On Fader (SOF) a DCA Spill.',
    subsections: [
      {
        id: '4-1-fader-layers',
        title: 'Faderové vrstvy a přepínání bank',
        badge: 'Fadery',
        summary: 'Uspořádání 12 faderů na levé sekci a dedikovaného Main faderu na pravé straně.',
        functionDiagram: {
          type: 'fader_layers',
          title: 'Faderové Vrstvy, Sends on Fader (SOF) & DCA Spill',
          subtitle: '12 motorických faderů + 1 dedikovaný Master fader s 2.4" OLED displejem a 16 tlačítky rychlého přístupu'
        },
        content: `Ovládací plocha WING Compact je rozdělena na dvě klíčové faderové sekce:

**Levá sekce (12 motorických faderů):**
Tlačítka vrstev na levé straně přepínají zobrazené kanály:
- **1–12**: Vstupní kanály 1 až 12
- **13–24**: Vstupní kanály 13 až 24
- **25–36**: Vstupní kanály 25 až 36
- **37–40 / AUX IN**: Vstupní kanály 37-40 a Aux vstupy A1-A8
- **BUS MASTER**: Sběrnice 1 až 16 (posuv po 4 nebo 12 kanálech šipkami)
- **MAIN MATRIX**: Hlavní výstupy Main 1-4 a Matice 1-8
- **DCA**: Skupiny DCA 1 až 16
- **USER 1 & USER 2**: Zcela volně uživatelsky konfigurovatelné vrstvy (libovolná směs vstupů, sběrnic, efektových faderů a MIDI CC)

**Pravá sekce (Main Fader Section s 2.4" displejem):**
- 1 samostatný motorický fader pro celkovou hlasitost (standardně MAIN 1).
- 4 tlačítka režimů: **BUS MASTER, DCA, MAIN/MATRIX a USER**.
- **16 podsvícených tlačítek rychlého přístupu** umožňujících okamžitý vstup do režimu Sends On Faders nebo DCA Spill.`,
        keyPoints: [
          'Scribble strip LCD displeje nad každým faderem zobrazují číslo, název, ikonu a barevný proužek',
          'Kapacitní dotykové knoby pod 10.1" displejem reagují na pouhé přiložení prstu',
          'Fader/Screen link lze zapnout nebo vypnout pro nezávislou navigaci na displeji a faderové bance'
        ],
        wingCompactSpecific: 'Na WING Compact ovládáte sběrnice a DCA primárně pomocí 16 rychlých tlačítek nad Main faderem, což je extrémně rychlé při živých koncertech.'
      },
      {
        id: '4-2-sends-on-faders',
        title: 'Režim Sends On Faders (SOF) & DCA Spill',
        badge: 'Live Workflow',
        summary: 'Jak během 1 sekundy nastavit odposlech pro muzikanta nebo rozbalit nástroje z DCA.',
        content: `Na mixu WING Compact je nastavení odposlechů a práce s DCA skupinami optimalizována pro maximální rychlost:

**1. Rychlé nastavení odposlechu (Sends On Fader):**
- Zmáčkněte tlačítko **BUS MASTER** na pravé Main sekci.
- Stiskněte jedno z **16 tlačítek rychlého přístupu** odpovídající požadovanému odposlechu (např. Tlačítko 1 pro "Vocal IEM").
- Všechny fadery na levé sekci se okamžitě přepnou a ukazují úrovně odesílané do této vybrané sběrnice!
- Tlačítko MUTE na faderu aktivuje/deaktivuje odesílání signálu do odposlechu.
- Pro návrat do hlavního mixu jednoduše vypněte tlačítko sběrnice.

**2. DCA Spill (Rozbalení kanálů):**
- Stiskněte tlačítko **DCA** na pravé Main sekci.
- Stiskněte tlačítko požadované DCA skupiny (např. DCA 1 "Drums").
- Levá faderová sekce se okamžitě přepne a zobrazí **POUZE kanály přiřazené do této DCA** (např. Kick, Snare, Hi-Hat, Tomy).
- Nemusíte složitě hledat kanály po jednotlivých bankách!

**Přiřazení kanálů do DCA:**
Podržte tlačítko **SELECT** na Main faderu a na levé sekci stiskněte SELECT u všech kanálů, které chcete do DCA přidat.`,
        keyPoints: [
          'Žlutý rámeček na displeji signalizuje aktivní režim Sends On Faders',
          'V menu SETUP -> SURFACE lze nastavit, zda výběr DCA automaticky aktivuje Spill mód'
        ]
      },
      {
        id: '4-3-custom-controls',
        title: 'Uživatelské ovládací prvky (Custom Controls)',
        badge: 'Custom Controls',
        summary: 'Přiřazení specifických funkcí tlačítkům a enkóderům pro bleskovou obsluhu.',
        content: `WING Compact nabízí vrstvy uživatelských tlačítek (User Layers U1–U4), kterým můžete přiřadit:
- **Tap Tempo** pro delay efekty (s nastavitelným blikáním LED).
- **Mute Groups** pro okamžité ztlumení bicích, efektových dozvuků nebo všech mikrofonů řečníků.
- **Přímé vyvolání scény (Scene Recall)** nebo Snippetu ze Show souboru.
- **DAW Transport** (Play, Stop, Record, Loop).
- **Přepnutí MAIN / ALT vstupů** pro celou kapelu najednou (virtuální soundcheck).
- **Generátor testovacích tónů** (Oscilátor On/Off).

**Speciální syntaxe v pojmenování:**
- Pokud před název tlačítka vložíte hvězdičku (\`*Tap\`), na displeji se vedle názvu zobrazí přesná hodnota parametru (např. \`120 BPM\`).
- Pokud před název vložíte svislou čáru (\`|Mute\`), invertuje se podsvícení tlačítka.`,
        keyPoints: [
          'Nastavení se provádí v menu SETUP -> CC EDIT (nebo dvojitým stiskem tlačítka SETUP)',
          'Podpora pro 16 uživatelských tlačítek na vrstvách U1-U4'
        ]
      }
    ]
  },
  {
    id: 'ch-5-main-screens',
    number: 5,
    title: 'Hlavní obrazovky a navigace',
    icon: 'LayoutGrid',
    summary: 'Prohlídka všech hlavních obrazovek: HOME, EFFECTS, METERS, ROUTING, SETUP, LIBRARY a MUTE GROUPS.',
    subsections: [
      {
        id: '5-1-home-meters',
        title: 'HOME & METERS obrazovky',
        badge: 'Navigace',
        summary: 'Přehled kanálového stripu, spektrální analýza RTA a komplexní měřáky úrovní.',
        content: `Obrazovka **HOME** je centrálním bodem pro práci s vybraným kanálem:
- Zobrazuje kompletní blokové schéma: Zdroj (MAIN/ALT), Trim, Filtr, Gate, EQ, Kompresor, Inserty a Sendy do Mainu/Sběrnic.
- Kliknutím na kterýkoliv blok se otevře detailní editační stránka daného procesoru.
- Integrovaný **RTA spektrální analyzátor v reálném čase** s volitelným zdrojem měření (IN, EQ nebo POST fader), nastavitelnou rychlostí odezvy (Peak, RMS, Avg) a barevným schématem.

Obrazovka **METERS**:
- Přehledné zobrazení všech 40 vstupů, 8 Auxů, 16 sběrnic, 16 DCA, 4 Mainů a 8 matic na jedné obrazovce.
- Klepnutím na kteroukoliv skupinu měřáků se okamžitě přepne faderová sekce na příslušné kanály.`,
        keyPoints: [
          'Kopírování a inicializace procesních bloků pomocí tlačítek COPY a INIT s volbou přesného rozsahu parametrů (Scope)',
          'Barevné kódování a přiřazení ikon v záložce ICON/COLOR'
        ]
      },
      {
        id: '5-2-routing-screen',
        title: 'ROUTING obrazovka (Channels, Sources, Outputs)',
        badge: 'Routing Matrix',
        summary: 'Matice propojování 500x502 signálů s podporou +1 AUTO krokování.',
        functionDiagram: {
          type: 'routing_matrix',
          title: 'Routing Matrix: Propojení Sources -> DSP Channels -> Outputs',
          subtitle: 'Patchování 24 Midas PRO vstupů, 3x AES50 stageboxů, USB 48x48 s podporou +1 AUTO'
        },
        content: `Směrování signálů na WING je organizováno do 3 podstránek:

1. **CHANNELS**:
   - V levém panelu vyberete cíl (kanál 1-40 nebo Aux 1-8).
   - V pravém panelu vyberete skupinu zdrojů (Local In, AES50 A/B/C, USB Audio, WING-LIVE, StageConnect, Sběrnice).
   - Tlačítko **+1 AUTO** po přiřazení automaticky posune kurzor na další kanál, což umožňuje napatchovat 24 stop během 10 sekund!
   - Přepínač **MAIN / ALT** určuje, kterou větev právě konfigurujete.

2. **SOURCES**:
   - Detailní konfigurace každého zdroje: Analogový Gain, +48V fantom, otočení fáze (POL), volba Mono / Stereo / Mid-Side, dálkové řízení předzesilovačů (HA REMOTE).

3. **OUTPUTS**:
   - Přiřazení libovolného signálu (Direct Out, Main 1-4, Bus 1-16, Matrix 1-8, Monitor/Phones) na fyzické výstupy XLR, AES50, StageConnect, USB Audio nebo WING-LIVE SD rekordér.`,
        keyPoints: [
          'Před editací routingu se ujistěte, že je ikona zámku zelená (odemčeno)',
          'Patchování nevyžaduje restart ani přerušení zvuku'
        ]
      },
      {
        id: '5-3-library-setup',
        title: 'LIBRARY & SETUP (Show, Snapshot, Snippet a bezpečné zálohování)',
        badge: 'Správa dat',
        summary: 'Práce se scénami, globální bezpečné kanály (Safes) a systémová konfigurace.',
        content: `Knihovna **LIBRARY** spravuje paměťové položky:
- **SHOW**: Kompletní soubor projektu sdružující scény, snippetové změny, zvukové klipy a MIDI příkazy.
- **SNAPSHOT**: Úplný snímek stavu pultu. Lze nastavit **Scope filtr**, který určí, které parametry se při vyvolání přepíšou a které zůstanou nedotčeny.
- **SNIPPET**: Cílený zápis pouze vybraných parametrů (např. pouze změna EQ na sólovém vokálu pro konkrétní skladbu).
- **GLOBAL SAFES**: Umožňuje uzamknout vybrané kanály (např. mikrofon moderátora nebo hudební podkres), aby se jejich hlasitost a nastavení NIKDY nezměnily při přepínání scén kapely.

**Automatické načtení při startu:**
Pojmenujte soubor scény s předponou \`STARTUP_\` (např. \`STARTUP_koncert.show\`) a uložte jej do složky \`STARTUP\` na USB disku – pult jej automaticky nahraje při každém zapnutí!`,
        keyPoints: [
          'Zálohování a export na běžný USB flash disk formátovaný na FAT32',
          'V menu SETUP najdete nastavení hodin (Clock 48k/44.1k), sítě (DHCP/Static IP pro WING Copilot a WING Edit) a kalibraci faderů'
        ]
      }
    ]
  },
  {
    id: 'ch-6-channel-processing',
    number: 6,
    title: 'Kanálový procesing v detailu',
    icon: 'Cpu',
    summary: '8 volitelných TAP bodů, Input slot, Gate/Expander, 6-pásmový EQ, kompresory s filtrem sidechainu a Automix.',
    subsections: [
      {
        id: '6-1-tap-points',
        title: '8 volitelných TAP bodů kanálu',
        badge: 'Signálový řetězec',
        summary: 'Možnost odebrat signál do odposlechů a nahrávání z kteréhokoliv místa řetězce.',
        content: `Na každém vstupním kanálu WING můžete kliknutím na ikonu montážního klíče změnit pořadí procesních bloků i pozici odběru signálu (TAP point):

1. **INPUT**: Ihned za předzesilovačem a A/D převodníkem, před jakýmkoliv zpracováním (čistý signál pro multitrack).
2. **FILTER**: Za Low-Cut a High-Cut filtry a Tool filtry.
3. **TAP 3**: Mezi 1. a 2. procesním blokem (dle vašeho uspořádání).
4. **TAP 4**: Mezi 2. a 3. procesním blokem.
5. **TAP 5**: Mezi 3. a 4. procesním blokem.
6. **PRE FDR**: Za všemi procesory před faderem hlasitosti (nejčastější volba pro pódiové monitory).
7. **POST FDR**: Za faderem hlasitosti před insertem INS2.
8. **POST PROC**: Za insertem INS2 těsně před ovládáním stereo šířky (Width).`,
        keyPoints: [
          'Bloky Gate, EQ, Comp a INS1 jsou vždy Pre-Fader',
          'Blok INS2 je vždy Post-Fader (vhodné pro master limitery nebo konečné úpravy)'
        ]
      },
      {
        id: '6-2-input-filter-delay',
        title: 'Input sekce: Trim, Balance, Tool Filter a Delay',
        badge: 'Vstupní modul',
        summary: 'Digitální trim ±18 dB, fázový invertor, pokročilé Tool filtry a zpoždění.',
        content: `Vstupní blok nabízí:
- **Digitální Trim**: Rozsah ±18 dB pro jemné doladění bez vlivu na analogový zisk předzesilovače.
- **Balance / Phase Invert**: Vyvážení L/R a otočení polarity o 180°.
- **Low-Cut (HPF) & High-Cut (LPF)**: Nastavitelná strmost 6, 12, 18 nebo 24 dB/oktávu.
- **TOOL FILTER**:
  * *Tilt EQ*: Jedním knoflíkem plynule naklání frekvenční křivku (přidává výšky a ubírá basy nebo naopak).
  * *Maxer*: Psychoakustický procesor zahušťující zvuk.
  * *All-Pass 90° / 180°*: Fázový posun bez změny frekvenční odezvy pro vyrovnání fázových konfliktů bicích nebo basy.
- **DELAY**: Zpoždění signálu (v milisekundách, metrech nebo stopách) pro fázové srovnání mikrofonů na pódiu.`,
        keyPoints: [
          'Zpoždění lze zadat přímo v metrech odpovídajících vzdálenosti mikrofonů',
          'Všechny filtry mají grafické zobrazení přímo na dotykovém displeji'
        ]
      },
      {
        id: '6-3-gate-eq-comp',
        title: 'Dynamika a Ekvalizace (Gate, EQ, Comp)',
        badge: 'Procesing',
        summary: 'Standardní digitální moduly i věrné analogové emulace přímo na každém kanálu.',
        functionDiagram: {
          type: 'eq_visualizer',
          title: '6-Pásmový Parametrický EQ & Spektrální RTA Analýza',
          subtitle: 'Křivky filtrů Low Cut, 4x Bell/Notch, High Cut a emulace vintage EQ (Even 84, Soul, Pulsar)'
        },
        content: `Na každém kanálu můžete v blocích Gate, EQ a Comp zvolit buď standardní čistý digitální procesor WING, nebo přepnout na špičkovou analogovou emulaci bez čerpání FX slotů a bez přidané latence!

**GATE slot:**
- *WING Gate / Expander*: S funkcí ACCENT (přechodové zesílení pro zachování dynamiky úderu) a sidechain filtrem (Key Filter).
- *Ducker*: Automatické ztlumení hudby při mluvení do mikrofonu (Radio Host efekt).
- *Analogové brány*: SOUL 9000 Gate, Even 88 Gate, Draw More 241, Source Extractor PSE-545.

**EQ slot:**
- *WING EQ*: 6-pásmový plně parametrický ekvalizér s přepínáním Low/High pásma na Shelving nebo Parametric.
- *Analogové EQ modely*: SOUL Analog (britský pultový charakter), Even 84 / 88 (legendární Neve styl s bohatým basem), Fortissimo 110 (SSL styl), Pulsar P1a (pasivní elektronkový Pultec styl s "Pultec trikem"), Mach EQ4 (čistý Maag styl s AIR pásmem).

**COMPRESSOR slot:**
- *WING Compressor / Expander*: S přepínáním detektoru Peak/RMS, lineární/logaritmickou obálkou a XOVER sidechain filtrem.
- *Legendární emulace kompresorů*: 76 Limiter Amp (FET styl 1176 s režimem ALL buttons in), LA Leveler (optický elektronkový LA-2A styl pro sametový zpěv), Fair Kid (vari-mu Fairchild 670), Even 88 Comp, BDX 160 / 560 (punchy VCA styl na bicí a basu), C5 Combinator (5-pásmový multiband), Auto Rider (automatické dorovnávání úrovně zpěváka).`,
        keyPoints: [
          'Procesory načtené v kanálových slotech GATE, EQ a COMP nemají ŽÁDNOU přidanou latenci',
          'Funkce XOVER na kompresoru umožňuje vícepásmovou kompresi pouze problematických frekvencí'
        ]
      },
      {
        id: '6-4-automix',
        title: 'Automatické mixování (Automix skupiny X a Y)',
        badge: 'Automix',
        summary: 'Algoritmus Dugan automixu pro diskusní panely a konference s více mikrofony.',
        functionDiagram: {
          type: 'dugan_automix',
          title: 'Dugan Speech Automixing: Skupiny X a Y',
          subtitle: 'Proporcionální váhové dělení zisku v reálném čase, potlačení zpětné vazby a funkce Last Mic On'
        },
        content: `V insertu INS2 všech 40 vstupních kanálů lze aktivovat režim **Automix** (skupina X nebo skupina Y):
- Automix monitoruje úroveň všech aktivních mikrofonů v reálném čase.
- Pokud hovoří jeden řečník, ostatní neaktivní mikrofony jsou bleskově a neslyšně zatlumeny, čímž se radikálně eliminuje zpětná vazba, přeslechy a akustický hluk v místnosti.
- Při současném hovoru více osob algoritmus proporcionálně rozdělí zisk tak, aby celková součtová hlasitost nepřekročila úroveň jednoho mikrofonu.
- Poslední aktivní mikrofon zůstává otevřený (Last Mic On), takže nedochází k nepříjemnému "pumpování" atmosféry sálu.`,
        keyPoints: [
          'Dvě nezávislé skupiny Automix X a Automix Y pro oddělené pódiové sekce',
          'Ideální pro konference, divadelní dialogy, diskusní panely a bohoslužby'
        ]
      }
    ]
  },
  {
    id: 'ch-7-monitoring-talkback',
    number: 7,
    title: 'Monitoring, Sluchátka a Talkback',
    icon: 'Headphones',
    summary: 'Dvojitý sluchátkový výstup, pódiové monitory, režimy Solo (Live, Studio, SIP) a Talkback routing.',
    subsections: [
      {
        id: '7-1-solo-modes',
        title: 'Režimy Solo systému: Live, Studio a SIP',
        badge: 'Solo systém',
        summary: 'Rozdíl mezi poslechem na pódiu, ve studiu a destruktivním Solo In Place.',
        functionDiagram: {
          type: 'solo_talkback',
          title: 'Solo Systém (Live PFL/AFL, Studio, SIP) & Talkback Auto-Dim',
          subtitle: 'Směrování odposlechu do sluchátek, Solo Safe izolace a automatické -20 dB potlačení pódiových monitorů'
        },
        content: `V menu SETUP -> AUDIO lze nastavit chování sběrnice Solo:

1. **LIVE mód**:
   - Každý kanál má nezávislé nastavení, zda se po stisku SOLO pošle do sluchátek (Phones) nebo do kontrolních monitorů (Speakers).
   - Hlavní výstupy (Main PA a sběrnice) zůstávají zcela neovlivněny.

2. **STUDIO mód**:
   - Solo signál automaticky směruje do aktuálně aktivní Solo sběrnice ve studiovém kontrolním poslechovém poli.

3. **SIP (Solo In Place)**:
   - **POZOR – DESTRUKTIVNÍ REŽIM PRO ŽIVÝ ZVUK!**
   - Po aktivaci sóla na jednom kanálu jsou VŠECHNY ostatní kanály v hlavním PA mixu ztlumeny.
   - Na horní liště bliká červená ikona SIP.
   - Pro ochranu klíčových stop (např. podkres, moderátor) zapněte na daném kanálu **SOLO SAFE**, aby nebyl ztlumen.`,
        keyPoints: [
          'Tlačítko CLR SOLO na horním panelu okamžitě zruší všechna aktivní sóla',
          'Možnost volby PFL (Pre-Fader Listen) nebo AFL (After-Fader Listen)'
        ]
      },
      {
        id: '7-2-talkback-dim',
        title: 'Talkback systém a funkce Auto Dim',
        badge: 'Komunikace',
        summary: 'Směrování řečnického mikrofonu do kapely s automatickým ztlumením odposlechů.',
        content: `WING Compact nabízí dvě nezávislé cesty **TALK A** a **TALK B**:
- **Přiřazení destinací**: Lze vybrat kterékoliv sběrnice 1-16, matice nebo hlavní výstupy, kam má hlas zvukaře směřovat.
- **Režimy spínání**:
  * *PUSH*: Talkback je aktivní pouze po dobu držení tlačítka.
  * *LATCH*: Stiskem se zapne, dalším stiskem vypne.
  * *AUTO*: Krátký stisk funguje jako Latch, dlouhé podržení jako Push.
- **AUTO DIM**: Při aktivaci talkbacku se úroveň vybraných odposlechových sběrnic (BUS DIM) a kontrolních monitorů (MON DIM) automaticky potlačí o nastavenou hodnotu (např. -20 dB), aby muzikanti zvukaře zřetelně slyšeli.`,
        keyPoints: [
          'Možnost využít interní mikrofon nebo připojit externí mikrofon na libovolný vstup',
          'Funkce USE SEND LEVELS umožňuje nastavit individuální hlasitost zvukaře pro každého hudebníka zvlášť'
        ]
      }
    ]
  },
  {
    id: 'ch-8-wing-live-usb-recorder',
    number: 8,
    title: 'WING-LIVE & 4-Stopý USB rekordér',
    icon: 'Disc',
    summary: '64-kanálové multitrack nahrávání na SD karty a 4-stopé stereo nahrávání na flash disk.',
    subsections: [
      {
        id: '8-1-wing-live-sd',
        title: 'Nahrávání 64 stop na SD karty (WING-LIVE)',
        badge: 'Multitrack',
        summary: 'Kompletní záznam koncertu bez nutnosti připojovat počítač.',
        content: `Karta WING-LIVE v rozšiřujícím slotu umožňuje:
- Nahrávat **až 64 stop 48 kHz / 32-bit float** na dvě SD/SDHC karty současně (nebo 32 stop na jednu kartu).
- **Nastavení stop**: Volba 8, 16 nebo 32 stop na kartu v menu karty.
- **Markery**: Během koncertu lze stiskem tlačítka \`+I\` vkládat orientační značky (např. začátky skladeb) pro bleskovou navigaci při virtuální zvukové zkoušce.
- **Režimy přehrávání**: Normal Play, A->B smyčka, nekonečná Loop smyčka.
- **Aplikace LiveSessions**: Bezplatná aplikace od Behringeru pro převod vícestopých WAV souborů mezi počítačem a strukturou složek \`X_LIVE\` na SD kartě.`,
        keyPoints: [
          'Formátování SD karet musí být FAT32 s velikostí alokační jednotky 32 kB',
          'Záložní baterie CR123 zajistí uložení a uzavření souborů i při nečekaném vytažení napájecího kabelu'
        ]
      },
      {
        id: '8-2-usb-player-recorder',
        title: '4-Stopý USB přehrávač a rekordér na čelním panelu',
        badge: 'USB Audio',
        summary: 'Stereo a 4-kanálový záznam ve formátu WAV přímo na USB flash disk.',
        functionDiagram: {
          type: 'usb_player_recorder',
          title: 'Přední 4-Stopý USB Rekordér & Přehrávač Pauzové Hudby',
          subtitle: '4-kanálový 24-bit 48kHz WAV záznam přímo na USB disk a přehrávání skladeb'
        },
        content: `Konektor USB-A na horním panelu slouží pro:
- **Záznam 2 nebo 4 stop ve formátu WAV (16 nebo 24 bitů, 44.1 / 48 kHz)**.
- **Přehrávání playlistů**: Podpora přehrávání skladeb pro pauzovou hudbu (BGM) před koncertem.
- **Režimy playlistu**: Repeat, Skip, Stop po odehrání skladby, Auto Advance.
- **Nabíjení**: Port poskytuje napájení 5V / 1A pro nabíjení telefonů nebo tabletů.`,
        keyPoints: [
          'Pro nahrávání 4 stop 24-bit musí být v menu SETUP -> GENERAL nastaven USB HOST SPEED na HS (High Speed)',
          'Flash disk odpojujte vždy, když nesvítí žlutá indikační LED dioda přenosu dat'
        ]
      }
    ]
  },
  {
    id: 'ch-9-firmware-update',
    number: 9,
    title: 'Aktualizace firmware a režim WING OS',
    icon: 'RefreshCw',
    summary: 'Postup nahrání nového firmware přes USB flash disk i režim virtuálního disku WING OS.',
    subsections: [
      {
        id: '9-1-firmware-flash',
        title: 'Postup aktualizace z USB disku',
        badge: 'Firmware Update',
        summary: 'Nejjednodušší způsob aktualizace pultu na nejnovější verzi.',
        content: `Postup krok za krokem:
1. Z webu **behringer.com** stáhněte nejnovější firmware soubor určený pro **WING COMPACT**.
2. Zkopírujte stažený soubor do kořenového adresáře USB flash disku naformátovaného na **FAT32**.
3. Zasuňte flash disk do horního USB portu pultu WING Compact.
4. Na dotykovém displeji přejděte do **SETUP -> GENERAL -> UPDATE**.
5. V seznamu vyberte soubor firmware a stiskněte **UPDATE**.
6. Po dokončení zápisu restartujte pult: přejděte do **SETUP -> SHUTDOWN -> CONFIRM**, počkejte na hlášení o bezpečném vypnutí a poté podržte tlačítko **EFFECTS** a stiskněte **HOME**.`,
        keyPoints: [
          'Během aktualizace firmware nikdy nevypínejte napájení konzole!',
          'Před aktualizací doporučujeme provést zálohu Show a scén na USB disk'
        ]
      },
      {
        id: '9-2-wing-os-pc',
        title: 'Režim WING OS a přenos dat přes počítač',
        badge: 'WING OS Mode',
        summary: 'Připojení pultu jako externího disku k PC nebo Macu.',
        content: `Pokud propojíte pult s počítačem přes zadní USB-B kabel:
1. Přejděte do **SETUP -> GENERAL** a klikněte na **WING OS** (pro firmware) nebo **WING DATA** (pro presety, scény a WAV soubory).
2. Na vašem počítači se pult přihlásí jako standardní vyměnitelný disk.
3. Přetáhněte požadované soubory do příslušných složek.
4. **DŮLEŽITÉ**: Před odpojením kabelu disk v počítači bezpečně vysuňte (Eject)!`,
        keyPoints: [
          'Umožňuje hromadnou správu presetů a knihoven přímo z Průzkumníka / Finderu'
        ]
      }
    ]
  },
  {
    id: 'ch-10-shortcuts-troubleshooting',
    number: 10,
    title: 'Klávesové zkratky & Řešení potíží',
    icon: 'Zap',
    summary: 'Nouzové spuštění (Emergency Boot), zámek pultu, kalibrace dotyku a diagnostické testy.',
    subsections: [
      {
        id: '10-1-hardware-shortcuts',
        title: 'Oficiální servisní klávesové zkratky',
        badge: 'Shortcuts',
        summary: 'Tabulka kombinací hardwarových tlačítek pro okamžitou diagnostiku a obnovu.',
        functionDiagram: {
          type: 'shortcuts_troubleshooting',
          title: 'Servisní Klávesové Zkratky & Diagnostické Funkce',
          subtitle: 'Nouzový Emergency USB Boot, zámek povrchu (Surface Lock), kalibrace dotyku a screenshoty'
        },
        content: `Tyto klávesové zkratky vyřeší krizové situace přímo na akci:`,
        tables: [
          {
            title: 'Přehled servisních zkratek pultu WING',
            headers: ['Účel / Funkce', 'Jak aktivovat', 'Jak ukončit', 'Poznámka'],
            rows: [
              ['Vypnutí dotykového displeje', 'Podržet SETUP, prázdné tlačítko a CLR SOLO', 'Podržet prázdné tlačítko a CLR SOLO', 'Na stavovém řádku svítí malé "X". Zabrání nechtěnému dotyku.'],
              ['Reset dotykového panelu', 'Podržet prázdné tlačítko a CLR SOLO na >1.5 s', 'Automaticky po resetu', 'Vyřeší problém s tzv. "ghost touches" (náhodnými dotyky).'],
              ['Ghost Click Test', 'Při zapínání pultu držet METERS a HOME 5 sekund', 'Vypnout pult', 'Diagnostický test citlivosti a stability dotykové vrstvy.'],
              ['Nouzový boot (Emergency Boot)', 'Při zapínání pultu držet prázdné tlačítko (vpravo u displeje)', 'Vysunout WING OS disk z PC', 'Umožní přepsat poškozený firmware z PC přes USB.'],
              ['Zámek povrchu (Surface Lock)', 'Podržet HOME (nebo HOME + kombinaci tlačítek jako heslo)', 'Podržet HOME a zvolenou kombinaci', 'Uzamkne fadery i displej, zvuk hraje bez přerušení.'],
              ['Inicializace pultu při startu', 'Při zapínání pultu držet CLR SOLO', 'Automaticky po startu', 'Vymaže dočasnou paměť před načtením chybné scény.'],
              ['Snímek obrazovky (Screenshot)', 'Podržet CLR SOLO a stisknout UTILITY', 'Okamžitě', 'Uloží BMP snímek na USB disk do složky /screens.'],
              ['Přeskočit auto-load scén', 'Při zapínání pultu držet LIBRARY', 'Automaticky po startu', 'Zabrání automatickému nahrání vadného STARTUP souboru.'],
              ['Test LED diod a povrchu', 'Při zapínání držet prázdné tlačítko', 'Restart konzole', 'Rozsvítí všechny LED diody a otestuje podsvícení.'],
              ['Nastavení jasu displeje', 'Podržet prázdné tlačítko a točit knobem pod měřákem', 'Uvolnit tlačítko', 'Rychlé přizpůsobení jasu na přímém slunci nebo ve tmě.']
            ]
          }
        ],
        keyPoints: [
          'Všechny zkratky fungují nezávisle na grafickém rozhraní operačního systému',
          'V případě zamrznutí scény stiskněte SETUP -> SHUTDOWN a restartujte kombinací EFFECTS + HOME'
        ]
      }
    ]
  },
  {
    id: 'ch-11-internal-effects',
    number: 11,
    title: 'Kompletní katalog efektů a analogových emulací',
    icon: 'Sparkles',
    summary: '16 efektových slotů (8 Premium + 8 Standard), slavné reverby TC Electronic VSS3, vintage kompresory a kytarové aparáty.',
    subsections: [
      {
        id: '11-1-fx-rack-structure',
        title: 'Struktura efektového racku (Premium vs Standard)',
        badge: 'FX Rack',
        summary: 'Rozdělení 16 efektových slotů a způsob nasazení (Bus Send vs Insert).',
        functionDiagram: {
          type: 'fx_rack',
          title: 'Efektový Rack: 16 Stereo DSP Slotů (8 Premium + 8 Standard)',
          subtitle: 'Emulace studiových legend TC Electronic VSS3, EMT 250, Lexicon 480L a páskových magnetofonů'
        },
        content: `WING obsahuje **16 stereofonních efektových procesorů**:
- **Sloty 1 až 8 (PREMIUM FX)**: Obsahují vyhrazenou externí paměť DSP. Jsou určeny pro nejnáročnější časové efekty: špičkové dozvuky (VSS3 Reverb, Vintage Room, Ambience), pásková a vícekroková echa (Ultratap, Tape Delay) a komplexní masteringové procesory. Mohou hostovat i libovolné standardní efekty.
- **Sloty 9 až 16 (STANDARD FX)**: Určeny pro dynamické procesory, grafické ekvalizéry, lampové excitery, simulace kytarových aparátů a channel stripy.

**Dva základní způsoby nasazení:**
1. **Přes Bus Send (Paralelní efekt)**: Ideální pro dozvuky (Reverby) a ozvěny (Delaye). Efekt je vložen do sběrnice (např. Bus 13 "Vocal Reverb") a kanály do něj posílají signál přes send fader. Návrat sběrnice je směrován do Main mixu.
2. **Přes Insert (Sériový efekt)**: Ideální pro kompresory, kytarové aparáty nebo excitery. Efekt je vložen přímo do bodu INS1 nebo INS2 konkrétního kanálu, sběrnice nebo Mainu.`,
        keyPoints: [
          'Pamatujte: Efekty v kanálových blocích Gate, EQ a Comp NEČERPAJÍ těchto 16 slotů!',
          'Funkce FX SPILL rozloží parametry vybraného efektu přímo na fyzické motorické fadery pro pohodlné míchání'
        ]
      },
      {
        id: '11-2-reverbs-delays',
        title: 'Dozvukové a zpožďovací efekty (Reverby a Delaye)',
        badge: 'Reverb & Delay',
        summary: 'VSS3 Studio Reverb, Vintage Plate, EMT emulace, Tape Echo a Ultratap.',
        content: `Klíčové algoritmy prostorových efektů:
- **VSS3 Reverb**: Přesná emulace legendárního studiového algoritmu od **TC Electronic**. Skutečné stereo zpracování s nezávislou kontrolou raných odrazů (Early Reflections), difúze a modulace dozvukového ocasu. Špičková volba pro zpěv a akustické nástroje.
- **Vintage Room / Vintage Reverb**: Inspirováno prvními německými digitálními reverby z konce 70. let (EMT 250). Teplý, hustý a přirozený dozvuk.
- **Vintage Plate & Blue Plate**: Emulace mechanických dozvukových desek (EMT 140) z 50. let. Jasný, lesklý a transparentní dozvuk pro bicí a perkuse.
- **Gated Reverb**: Legendární úderný dozvuk 80. let (Phil Collins styl), kde je dozvukový ocas useknut šumovou bránou.
- **Shimmer Reverb**: Vrstvení harmonických oktáv do dozvuku pro éterické ambientní kytary a syntezátory.
- **Tape Delay & BBD Delay**: Autentický zvuk páskového magnetofonového echa s regulací saturace (Drive) a kolísání pásku (Flutter) a analogového Bucket Brigade delaye.
- **Ultratap Delay**: Pokročilý vícekrokový delay s možností nastavení stereo šíření (Pan Spread, Focus, Linear Move).`,
        keyPoints: [
          'Všechny delaye podporují synchronizaci přes Tap Tempo přiřazené na Custom Control tlačítko',
          'Funkce Freeze na reverbech umožňuje nekonečné podržení dozvukové plochy'
        ]
      },
      {
        id: '11-3-vintage-dynamics-eq',
        title: 'Legendární analogové procesory a masteringové nástroje',
        badge: 'Vintage Classics',
        summary: '1176 FET, LA-2A Opto, Pultec EQ, Neve 1073, Fairchild a multiband mastering.',
        functionDiagram: {
          type: 'comp_visualizer',
          title: 'Analogové Dynamické Procesory & Převodní Křivky',
          subtitle: 'Křivky a chování kompresorů 76 FET, LA-2A Opto, Fairchild 670 a Master Bus kompresoru'
        },
        content: `Přehled nejvýznamnějších analogových modelů:
- **76 Limiter Amp**: Klasický FET kompresor. Bleskurychlý náběh (Attack 20 µs), agresivní a průrazný tón. Vynikající na basu, rockový zpěv a snare. Tlačítko **ALL** sepne všechny poměry současně.
- **LA Leveler**: Optický elektronkový kompresor. Hladký, přirozený a hudební průběh komprese, který udrží dynamiku zpěváka bez slyšitelného pumpování.
- **Fair Kid (Fairchild 670)**: Nejtěžší elektronkový kompresor s variabilním ziskem (Variable-Mu) a 6 časovými konstantami. Dodá teplo celému mixu nebo bicí sběrnici.
- **Pulsar P1a/M5 (Pultec)**: Pasivní elektronkový ekvalizér. Umožňuje současně přidávat i ubírat basy na stejné frekvenci, což vytváří legendární "Pultec dip" – mohutný bas s vyčištěnými nižšími středy.
- **Even 84 / Even 88 (Neve)**: Zvuk slavných britských konzolí. Hedvábné výšky a pevné, muzikální středy.
- **C5 Combinator**: 5-pásmový kompresor se systémem automatického vyvažování spektra (SBC) pro vysílání a finální mastering.
- **Precision Limiter**: Cihlový (Brickwall) limiter zabraňující přebuzení s minimálním zkreslením špiček.`,
        keyPoints: [
          'Kompletní parametry každého modelu lze sledovat v grafické vizualizaci',
          'Všechny procesory zachovávají 40-bitovou přesnost výpočtu'
        ]
      }
    ]
  },
  {
    id: 'ch-12-specifications-latency',
    number: 12,
    title: 'Technické specifikace & Tabulky latence',
    icon: 'BarChart2',
    summary: 'Kompletní tabulky latence v samplích a milisekundách, dynamický rozsah a fyzické rozměry.',
    subsections: [
      {
        id: '12-1-latency-guide',
        title: 'Latence systému a kompenzace zpoždění',
        badge: 'Latence',
        summary: 'Při standardním toku In -> Bus -> Main -> Matrix jsou všechny kanály fázově zarovnány bez nutnosti kompenzace!',
        content: `Při přirozeném směrování signálu:
\`Vstupní kanál -> Sběrnice (Bus) -> Hlavní sběrnice (Main) -> Matice (Matrix)\`
zůstávají všechny cesty **dokonale fázově zarovnané a nevzniká žádný fázový posun**, bez ohledu na to, jaké interní EQ či kompresory na kanálu zapnete.

K přidané latenci dochází pouze v těchto specifických případech:
- **Send ze sběrnice do sběrnice (Bus to Bus)**: +8 samplů (cca 0.17 ms při 48 kHz).
- **Sběrnice / Main / Matice přiřazená jako zdroj na vstupní kanál**: +38 samplů (cca 0.79 ms).
- **Efektový insert bod (Insert Point)**: +32 samplů základní insert latence + přidaná latence daného algoritmu.`,
        tables: [
          {
            title: 'Přídavná latence efektových algoritmů v insert bodech',
            headers: ['Efektový procesor', 'Latence při 44.1 kHz', 'Latence při 48 kHz', 'Čas při 48 kHz'],
            rows: [
              ['Stereo Pitch (při Delay = 0)', '178 samplů', '178 samplů', '3.71 ms'],
              ['Precision Limiter', '48 samplů', '52 samplů', '1.08 ms'],
              ['Exciter', '10 samplů', '11 samplů', '0.23 ms'],
              ['Pitch Fix (Auto-Tune)', '39 samplů', '39 samplů', '0.81 ms'],
              ['UK Rock Amp', '18 samplů', '18 samplů', '0.38 ms'],
              ['Angel Amp (Metal)', '18 samplů', '18 samplů', '0.38 ms'],
              ['Jazz Clean Amp', '14 samplů', '14 samplů', '0.29 ms'],
              ['Deluxe Amp', '16 samplů', '16 samplů', '0.33 ms'],
              ['Mastering Strip', '52 samplů', '52 samplů', '1.08 ms']
            ]
          }
        ],
        keyPoints: [
          'Celková hardwarová latence Analog In -> Analog Out je pouze 1.0 ms',
          'Síťová latence Stagebox In -> WING -> Stagebox Out je pouze 1.2 ms'
        ]
      },
      {
        id: '12-2-hardware-specs',
        title: 'Fyzické a elektrické specifikace WING Compact',
        badge: 'Specifikace',
        summary: 'Hmotnost, rozměry, spotřeba energie a technické parametry převodníků.',
        content: `Souhrn technických parametrů pultu WING Compact:
- **Rozměry**: 225 × 453 × 574 mm (V × Š × H).
- **Hmotnost**: 15.4 kg (34 lbs).
- **Napájení**: Univerzální zdroj 100–240 VAC (50/60 Hz), příkon 130 W.
- **Provozní teplota**: 5 °C až 45 °C.
- **A/D Převodníky**: 24-bit, 48 kHz, dynamický rozsah 114 dB.
- **D/A Převodníky**: 24-bit, 48 kHz, dynamický rozsah 120 dB.
- **Frekvenční rozsah**: 10 Hz – 20 kHz (±1 dB).
- **Odstup přeslechů**: >100 dB při 1 kHz mezi sousedními kanály.
- **Zbytkový šum na XLR výstupech**: -97 dBu (při jednotkovém zesílení).`,
        keyPoints: [
          'Konstrukce z masivního hliníku a ocelového šasi s bočními madly',
          'Všechny audio měření jsou vážena křivkou A-weighting'
        ]
      }
    ]
  },
  {
    id: 'ch-13-appendix-integration',
    number: 13,
    title: 'Příloha: Funkce modulů & Propojení s reálným mixem',
    icon: 'Sparkles',
    summary: 'Detailní rozbor Sound Labu, Knihovny scén, Diagnostiky a HW mapy. Vysvětlení, co je virtuální simulace a jak jednotlivé moduly propojit s fyzickou konzolí Behringer WING.',
    subsections: [
      {
        id: '13-1-sound-lab-guide',
        title: 'Zvukový Lab (Sound Lab) & Presety kanálů',
        badge: 'Příloha 1: Presety',
        summary: 'Jak funguje Zvukový Lab, co všechno lze konfigurovat a jak přenést presety do reálného pultu.',
        content: `### 1. Jak modul funguje a co představuje
**Zvukový Lab (Sound Lab)** je interaktivní zvuková laboratoř a knihovna kanálových nastavení (Channel Strips) pro všechny typy nástrojů a vokálů. Zahrnuje kompletní signálový řetězec:
- **Předzesilovač Midas PRO**: Nastavení vstupního zisku (Preamp Gain v dB), fantomového napájení +48V a fázového otočení (Phase Invert Ø).
- **Vstupní filtry a Šumová brána (Gate / Expander)**: Výběr algoritmu (WING Gate, Expander, Ducker), nastavení prahu (Threshold v dB), poměru (Ratio), času náběhu (Attack v ms), podržení (Hold) a uvolnění (Release). Zahrnuje i klíčovací sidechain filtr.
- **6-pásmový parametrický & Vintage ekvalizér (EQ)**: Modely WING EQ, Pultec (Pulsar P1a), Neve (Even 84), SOUL Analog s High-Pass filtrem (HPF), přepínatelnými typy křivek (Low Shelf, High Shelf, PEQ) a interaktivním vykreslováním křivky odezvy v reálném čase.
- **Dynamický procesor / Kompresor**: Modely 1176 FET (76 Limiter Amp), LA-2A (LA Leveler), Fairchild (Fair Kid), Even 88 a BDX 160 s kompresním poměrem, časy, knee křivkou a dorovnávacím ziskem (Make-up gain).
- **Efektové směrování (FX Inserts & Bus Sends)**: Integrace dozvuků VSS3 Reverb, páskových a vícekrokových delayů, chorusů a studiových plate reverbů s úrovněmi sendů v dB.

### 2. Co lze v modulu konfigurovat
1. Filtrování podle hudebního žánru (Rock, Pop, Symfonický orchestr, Dechy, Vokály).
2. Zvukové ladění v reálném čase pomocí vestavěného generátoru harmonických tónů a růžového šumu.
3. Export a kopírování textové specifikace parametrů do schránky jedním kliknutím pro rychlé ruční zadání nebo import.
4. Přímé uložení vybraného presetového stripu do Knihovny scén a snapshotů.

### 3. Je to jen virtuální, nebo to lze propojit s reálným pultem?
**Je to virtuální interaktivní laboratoř, kterou lze přímo a plnohodnotně přenést do reálného pultu Behringer WING třemi způsoby:**
- **Způsob A: USB Flash Disk (.chn / .pre kanálové knihovny)**
  1. Vložte USB disk naformátovaný na FAT32.
  2. Na konzoli WING přejděte do \`LIBRARY -> CHANNELS\` a stiskněte \`SAVE\`.
  3. Hodnoty z tohoto Sound Labu odpovídají 1:1 interním parametrům WINGu. Parametry zkopírované z naší aplikace můžete uložit do souborů \`.chn\` a nahrát do libovolného ze 40 kanálů konzole.
- **Způsob B: Síťové řízení přes OSC (Open Sound Control UDP port 2223)**
  Mixážní pult WING naslouchá na síťovém portu **UDP 2223**. Každý parametr v tomto Sound Labu má odpovídající OSC adresu, například:
  \`\`\`text
  /ch/1/preamp/gain +24.0
  /ch/1/eq/1/f 80.0
  /ch/1/dyn/thr -18.5
  /ch/1/dyn/ratio 4.0
  /ch/1/gate/on 1
  \`\`\`
- **Způsob C: Aplikace WING Edit a WING CoPilot**
  V oficiálních aplikacích Behringer pro PC/Mac nebo iPad můžete tyto presety zadat a odeslat do mixu bezdrátově přes Wi-Fi během zvukové zkoušky.`,
        keyPoints: [
          'Všechny parametry v Zvukovém Labu jsou navrženy podle reálných akustických standardů a algoritmů konzole WING',
          'Jedním kliknutím můžete zkopírovat kompletní signálový řetězec nebo otestovat frekvenční křivku',
          'Na reálném pultu odpovídá knihovně WING Channel Library a OSC příkazům'
        ]
      },
      {
        id: '13-2-scenes-guide',
        title: 'Knihovna scén & Snapshoty (Scenes Manager)',
        badge: 'Příloha 2: Scény',
        summary: 'Jak fungují scény, co je Scope Matrix (Recall Safe) a jak ukládat/nahrávat scény na USB a po síti.',
        content: `### 1. Jak modul funguje a co představuje
**Knihovna scén (Scenes Manager)** je systém pro správu kompletních snímků konzole (Snapshots), dílčích výřezů (Snippets) a celých představení (Shows).
- **Scope Matrix (Recall Safe / Filtrační maska)**: Zajišťuje, které části mixu se při vyvolání scény změní a které zůstanou nedotčeny. Umožňuje bezpečně přepínat skladby bez rizika, že by se přenastavilo směrování do hlavního PA systému nebo odposlechy kapely.
- **Detaily scény**: Definuje cílový ansámbl (kapela, orchestr, řečníci), organizaci faderových vrstev (Fader Layers), přiřazení Main faderu a profil 16 uživatelských tlačítek Custom Controls.

### 2. Co lze v modulu konfigurovat
- Vytváření nových scén s volbou typu (\`Snapshot\`, \`Snippet\`, \`Show\`).
- Úprava granularního Scope filtru pro 12 nezávislých subsystémů:
  * Kanály (Channels), Auxy, Sběrnice (Buses), Hlavní výstupy (Mains), Matice (Matrices).
  * Ekvalizéry (EQ), Dynamika (Dyn), Šumové brány (Gate), Efektový rack (FX).
  * Směrovací matice (Routing Patching), DCA skupiny a Mute Groups.
- Označování oblíbených položek (Favorites) a filtrování podle tagů.
- Export kompletní databáze do záložního souboru \`.json\` a import nových scén.

### 3. Propojení s reálným pultem WING
- **Přenos přes USB flash disk**:
  Na reálném pultu WING se scény a shows ukládají do interní paměti a exportují na USB disk do složky:
  \`USB_DRIVE:/WING/SHOWS/NazevShow.show\` nebo \`/WING/SCENES/NazevSceny.snap\`.
- **Automatizace přes MIDI a GPIO**:
  Reálný pult WING umožňuje vyvolávat scény z externích zařízení pomocí **MIDI Program Change** zpráv nebo nožního spínače zapojeného do konektorů GPIO 1 a 2 na zadním panelu.
- **Vyvolávání přes síťový protokol OSC**:
  Odesláním UDP paketu \`/show/recall "Rock_Fest"\` na IP adresu pultu a port 2223 dojde k okamžitému vyvolání scény s motorickým přenastavením všech faderů na konzoli.`,
        keyPoints: [
          'Scope maska chrání citlivé výstupní sběrnice a hlavní PA systém před nechtěným přepsáním',
          'Scény z aplikace lze exportovat do JSON a převést do WING snapshotových skriptů',
          'Plná podpora dálkového vyvolávání přes MIDI PC, GPIO nožní pedály a OSC příkazy'
        ]
      },
      {
        id: '13-3-diagnostics-guide',
        title: 'Diagnostika & Testovací centrum (Diagnostics Panel)',
        badge: 'Příloha 3: Diagnostika',
        summary: 'Měření chybovosti AES50, StageConnect 110Ω kabeláž, 40-bit kalkulátor latence a generátor signálů.',
        content: `### 1. Jak modul funguje a co představuje
**Diagnostický modul** integruje klíčové nástroje pro kontrolu integrity signálových cest, digitálních sběrnic a akustické kalibrace:
- **Monitor digitálních portů AES50 (Port A, B, C)**: Sleduje stav uzamčení hodin (Locked/Standby) a čítače chyb:
  * **COR (Corrected Errors)**: Opravené datové pakety – technologie SuperMAC automaticky opraví drobné výpadky.
  * **UNC (Uncorrected Errors)**: Neopravené pakety vedoucí k lupnutí ve zvuku nebo výpadku synchronizace.
- **StageConnect 32-kanálová sběrnice**: Monitoruje impedanci kabelu (požadováno 110 Ω DMX) a napájení 12V 18W přes XLR kabel pro pódiové krabičky.
- **Kalkulátor fázové latence v reálném čase**: Počítá přesné zpoždění v samplích a milisekundách s 40-bitovou přesností při zohlednění vzorkovací frekvence (48 kHz / 44.1 kHz), vnitřních smyček Bus-to-Bus (+8 samplů), loopbacků (+38 samplů) a insertních efektových pluginů (např. Precision Limiter +52 samplů, Pitch Fix +39 samplů).
- **Vestavěný generátor testovacích tónů (Web Audio API)**: Generuje reálné akustické a měřicí signály (1 kHz -18 dBFS kalibrační tón, 440 Hz komorní A, Růžový šum pro ladění PA a Bílý šum pro frekvenční testy).
- **Simulátor testu a kalibrace dotykového displeje (Ghost Touch)**.

### 2. Co lze v modulu konfigurovat
- Volba vzorkovací frekvence 48 000 Hz / 44 100 Hz.
- Simulace routingových smyček (Bus-to-Bus send, Bus jako Channel Input).
- Výběr insertních efektů pro sloty INS1 a INS2 s okamžitým přepočtem fázového zpoždění.
- Plynulá regulace hlasitosti a přepínání živých testovacích signálů přímo v prohlížeči.
- Resetování chybových čítačů AES50.

### 3. Propojení s reálným pultem WING
- **Reálné měření na pultu WING**:
  Na fyzické konzoli naleznete tyto diagnostické čítače v nabídce \`SETUP -> DIAGNOSTICS -> NETWORK / AES50\`. Pokud na pultu roste hodnota UNC, je nutné okamžitě vyměnit stíněný kabel CAT-5e s konektory EtherCON.
- **Audio propojení generátoru do pultu**:
  Zvukový výstup z vašeho počítače/notebooku (sluchátkový výstup nebo USB audio rozhraní) můžete připojit přímo do linkového vstupu **AUX IN 7/8 (RCA / Jack)** nebo mikrofonního vstupu pultu WING. Tím získáte plnohodnotný generátor růžového šumu pro nastavení fázového souběhu subwooferů a ekvalizaci sálu přes měřicí mikrofon a RTA.
- **Hardwarový servisní trojhmat pro Ghost Touch**:
  Pokud na reálném pultu dojde k falešným dotykům (způsobeným statickou elektřinou nebo zemními smyčkami), podržte prázdné hardwarové tlačítko u displeje společně s tlačítkem **CLR SOLO** po dobu 1.5 sekundy pro bleskovou rekalibraci kapacitní vrstvy.`,
        keyPoints: [
          'Generátor signálu v aplikaci využívá Web Audio API a lze jej fyzicky kabelem zapojit do mixu pro ladění PA',
          'Kalkulátor latence přesně odpovídá interní DSP architektuře a kompenzaci zpoždění pultu WING',
          'Diagnostická pravidla pro AES50 a StageConnect slouží jako spolehlivý manuál při výpadcích na pódiu'
        ]
      },
      {
        id: '13-4-hardware-map-guide',
        title: 'Hardware Mapa & Topologie konzole (Hardware Map)',
        badge: 'Příloha 4: HW Mapa',
        summary: 'Rozbor fyzické konstrukce WING Compact, 24 Midas vstupů, 12+1 faderů, 2.4" LCD a konektivity.',
        content: `### 1. Jak modul funguje a co představuje
**Hardware Mapa** je interaktivní vizuální topologie a schéma fyzické konzole Behringer WING Compact.
Zobrazuje uspořádání a technické parametry všech hardwarových subsystémů:
- **24 Midas PRO mikrofonních vstupů**: Integrované combo XLR/TRS konektory přímo na těle konzole.
- **8 Midas PRO XLR výstupů + 4 TRS Aux výstupy**.
- **10.1" naklápěcí vícedotykový displej**: Mechanismus s aretací v rozsahu 15° až 60°.
- **12+1 motorických 100mm faderů**: Levá 12-faderová sekce s rychlým přepínáním bank + 1 nezávislý master fader.
- **2.4" barevný LCD displej & 16 tlačítek rychlého přístupu**: Sekce pro okamžité Sends On Fader (SOF), DCA Spill a Custom Control makra.
- **Digitální I/O konektivita**: 3x AES50 porty (144x144 kanálů), 1x StageConnect (32ch @ 110Ω), USB-B 48x48 zvuková karta, duální SD slot WING-LIVE (64 stop) a expanzní slot pro karty Dante, MADI a Waves SoundGrid.

### 2. Co lze v modulu konfigurovat a zkoumat
- Přepínání a inspekce jednotlivých hardwarových bloků a jejich vnitřního zapojení.
- Náhled rozložení motorických faderů a podsvícených tlačítek.
- Přehled elektrických specifikací (130 W příkon, 15.4 kg hmotnost, 24-bit 48 kHz převodníky).

### 3. Propojení s reálným pultem WING
Tento modul slouží jako přesný návod k fyzickému zapojení a topologii vašeho pultu na akcích:
- **Pódiové stageboxy**: Zapojení stageboxů Behringer S16, S32, SD8, SD16 nebo Midas DL16, DL32 přes porty AES50 A/B/C.
- **Osobní odposlechy DP48 / P16-M**: Přímé napájení a přenos 32 kanálů přes jediný XLR kabel StageConnect.
- **USB nahrávání do DAW**: Propojení zadního USB-B portu s počítačem (Reaper, Pro Tools, Cubase, Logic) pro 48-kanálový záznam a virtuální zvukovou zkoušku (Virtual Soundcheck).`,
        keyPoints: [
          'Vizuální schéma usnadňuje orientaci v ovládacích prvcích WING Compact',
          'Obsahuje kompletní pinouty, specifikace sběrnic a doporučenou kabeláž',
          'Slouží jako školicí a referenční manuál pro zvukaře a techniky'
        ]
      },
      {
        id: '13-5-physical-mixer-bridge',
        title: 'Průvodce propojením v praxi (Virtualita vs. Realita)',
        badge: 'Propojení v praxi',
        summary: 'Praktický návod krok za krokem: Jak propojit počítač/tablet s reálným pultem přes síť, USB a audio kabel.',
        content: `### Přehled integrace: Z virtuální aplikace do reálného zvuku

Tato aplikace kombinuje **výkonný offline návrhový a školicí nástroj** s **reálnými přenosovými a měřicími schopnostmi**. Následující tabulka a postup shrnují, jak jednotlivé části využít v praxi:

| Modul v aplikaci | Virtuální funkce | Reálné propojení s pultem Behringer WING |
| :--- | :--- | :--- |
| **Zvukový Lab (Presety)** | Návrh EQ, komprese a gate řetězců s interaktivní vizualizací křivek | Export do schránky -> zadání v pultu / WING Edit, přenos \`.chn\` souborů přes USB, nebo přímé OSC řízení přes UDP 2223 |
| **Knihovna scén** | Tvorba snapshotů, správa oblíbených položek, nastavení Scope Safe masky | Uložení \`.json\` zálohy -> převod do \`.snap\` na USB disk (\`/WING/SHOWS/\`), vyvolávání po síti přes OSC nebo MIDI PC |
| **Diagnostika** | Kalkulace latence v samplích, simulace chyb AES50 a Ghost Touch | **Generátor tónů generuje skutečný zvuk!** Připojte Jack 3.5mm -> XLR do pultu pro ladění PA. Čítače chyb odpovídají \`SETUP -> DIAGNOSTICS\` |
| **Hardware Mapa** | Interaktivní architektura a schéma fyzických ovládacích prvků | Referenční příručka pro zapojení stageboxů AES50, StageConnect DP48, USB DAW a expanzních karet Dante |

---

### Krok za krokem: Jak nastavit síťové a fyzické propojení

#### 1. Propojení přes lokální počítačovou síť (Ethernet / Wi-Fi)
1. Připojte pult WING ethernetovým kabelem do Wi-Fi routeru (nebo přímo do síťové karty počítače).
2. Na konzoli přejděte do \`SETUP -> NETWORK\` a nastavte buď \`DHCP\` nebo pevnou IP adresu (např. \`192.168.1.100\`, maska \`255.255.255.0\`).
3. Váš počítač, tablet nebo telefon připojte ke stejné síti Wi-Fi.
4. Spusťte aplikaci **WING Edit** (pro PC/Mac) nebo **WING CoPilot** (pro iOS/Android). Aplikace automaticky detekuje pult na síti a synchronizuje veškeré parametry, fadery a presety v reálném čase.

#### 2. Dálkové ovládání přes OSC (Open Sound Control)
- Pult WING naslouchá na **UDP portu 2223**.
- Z jakéhokoliv softwaru podporujícího OSC (např. QLab, TouchOSC, Reaper, Companion pro StreamDeck) můžete odesílat zprávy odpovídající parametrům v této aplikaci.

#### 3. Přenos dat přes USB flash disk
1. Použijte USB flash disk naformátovaný na souborový systém **FAT32**.
2. Vytvořte standardní strukturu složek:
   - \`/WING/CHANNELS/\` pro kanálové presety (\`.chn\`).
   - \`/WING/PRESETS/\` pro efektové presety (\`.pre\`).
   - \`/WING/SHOWS/\` pro celá představení a scény (\`.show\`, \`.snap\`, \`.scn\`).
3. Zasuňte USB disk do horního portu u 10.1" displeje a v nabídce pultu \`LIBRARY\` načtěte požadovaná data.

#### 4. Akustické měření sálu pomocí vestavěného generátoru
1. Otevřete v této aplikaci záložku **Diagnostika**.
2. Propojte sluchátkový/linkový výstup vašeho zařízení s linkovým vstupem pultu WING (např. Aux In 7/8).
3. Spusťte **Růžový šum (Pink Noise)** s úrovní -18 dBFS.
4. Nastavte zisk na kanálu tak, aby meter ukazoval -18 dBFS.
5. Pomocí měřicího mikrofonu a RTA analyzátoru zkontrolujte frekvenční odezvu PA systému v sále a fázové zarovnání subwooferů.`,
        keyPoints: [
          'WING podporuje standardní síťový protokol OSC na UDP portu 2223 pro dálkové řízení',
          'USB disk musí být vždy naformátován na FAT32 s kořenovou složkou /WING/',
          'Generátor v sekci Diagnostika funguje jako skutečný akustický zdroj pro měření a ladění zvuku'
        ]
      }
    ]
  }
];

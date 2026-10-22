import { ManualChapter } from '../types';

export const MANUAL_CHAPTERS_UI24: ManualChapter[] = [
  {
    id: 'ui24-ch1-overview',
    number: 1,
    title: 'Přehled a surfaceless architektura Ui24R',
    icon: 'Radio',
    summary: '24-kanálový surfaceless digitální mix v rackovém formátu: 20 Studer preampů, duální Wi-Fi (2.4/5 GHz), HTML5 ovládání bez aplikace a novinky firmwaru v3.',
    subsections: [
      {
        id: 'ui24-1-1-concept',
        title: 'Koncepce a hardwarové vlastnosti Ui24R',
        badge: 'Architektura',
        summary: 'Kompletní mixážní pult zabudovaný do racku bez mechanických faderů, ovládaný z libovolného webového prohlížeče.',
        content: `Mixážní pult **Soundcraft Ui24R** představuje špičku v kategorii tzv. surfaceless (bezdisplejových a bezfaderových) pódiových mixů. Veškerá elektronika, předzesilovače Studer a DSP procesory jsou integrovány přímo do kompaktního 4U rackového šasi.

**Klíčové hardwarové přednosti:**
- **20 mikrofonních předzesilovačů navržených legendární značkou Studer** (10 kombinovaných combo XLR/TRS konektorů + 10 standardních XLR konektorů).
- **2 dedikované vysokoimpedanční nástrojové vstupy Hi-Z** na kanálech 1 a 2 s integrovanou emulací kytarových aparátů a efektů **DigiTech**.
- **2 linkové vstupy RCA** + stereofonní USB přehrávač pro pauzovou hudbu.
- **8 symetrických výstupů XLR Aux** pro odposlechy a zóny + hlavní symetrické výstupy Main L/R (XLR a 1/4" jack).
- **2 nezávislé sluchátkové výstupy (HD1 a HD2)** s vlastní regulací úrovně na čelním panelu.
- **Integrovaný dvoupásmový Wi-Fi router (2.4 GHz i 5 GHz)** umožňující současné připojení až 10 bezdrátových ovládacích zařízení.
- **2 nezávislé ethernetové porty:**
  - *Ethernet 1:* Pro připojení k externímu Wi-Fi routeru, switchi a LAN síti.
  - *Ethernet 2:* Dedikovaný port pro přímé **Cascade propojení** dvou pultů Ui24R!
- **Přímý HDMI video výstup:** Umožňuje připojit běžný monitor nebo dotykový displej a USB myš přímo do pultu pro ovládání bez jakéhokoliv počítače.`,
        keyPoints: [
          'Ovládání běží na čisté technologii HTML5 – není potřeba instalovat žádnou aplikaci z App Store ani Google Play',
          'Až 10 zařízení (tablety, telefony, notebooky) může současně ovládat mix v reálném čase',
          'Duální Wi-Fi 5 GHz zajišťuje spolehlivost i v zarušených koncertních sálech'
        ]
      },
      {
        id: 'ui24-1-2-html5-interface',
        title: 'HTML5 Web GUI a zobrazení Tablet vs. Phone',
        badge: 'Rozhraní',
        summary: 'Responzivní webové rozhraní optimalizované jak pro velké obrazovky a tablety, tak pro chytré telefony hudebníků.',
        content: `Po připojení k Wi-Fi síti pultu (\`Soundcraft Ui24R\`) stačí v libovolném internetovém prohlížeči (Chrome, Safari, Firefox, Edge) zadat adresu **ui.io** nebo IP adresu pultu (standardně \`10.10.1.1\` pro interní Wi-Fi).

**Dva režimy zobrazení:**
1. **Tablet View (Velké tablety, PC, Mac, HDMI monitor):**
   - Plné zobrazení faderů, detailních kanálových stripů, maticového routingu a efektových oken.
   - Podpora **Big Desktop módu** s mini grafy ekvalizéru, kompresoru a gate na každém faderu.
2. **Phone View (Chytré telefony hudebníků):**
   - Zjednodušené vertikální rozhraní navržené pro rychlé ovládání osobního odposlechu (Aux Sends) jednotlivými muzikanty přímo z jejich kapesního telefonu.
   - Novinka v3: Zobrazení **Pre-meter hodnot** modrou barvou za faderem a řazené View Groups.`,
        keyPoints: [
          'Funguje na iOS, Androidu, Windows, macOS i Linuxu bez ovladačů',
          'Podpora vícedotykových gest (Multi-Touch) na dotykových obrazovkách',
          'Zabezpečení ACCESS control: muzikantům lze povolit přístup pouze k jejich konkrétnímu odposlechu'
        ]
      }
    ]
  },
  {
    id: 'ui24-ch2-cascade-v3',
    number: 2,
    title: 'Kaskádový režim (Cascade Mode v3)',
    icon: 'Cable',
    summary: 'Revoluční propojení dvou pultů Ui24R přes přímý ethernetový kabel: obousměrný přenos 32 kanálů, synchronizace VCA, Mute groups a sdílené Solo na Ch 24.',
    subsections: [
      {
        id: 'ui24-2-1-cascade-setup',
        title: 'Zapojení a síťová konfigurace Cascade',
        badge: 'Cascade v3',
        summary: 'Fyzické propojení portů Ethernet #2 a konfigurace rolí HOST a REMOTE.',
        content: `Firmware verze 3 přináší zásadní rozšíření systému: **možnost kaskádového propojení dvou jednotek Ui24R do jednoho celku**. Mezi pulty je obousměrně streamováno 32 zvukových stop v reálném čase. Každý pult má schopnost míchat 26 kanálů do mixu.

**Fyzické propojení mezi porty Ethernet #2:**
- Propojte port **Ethernet 2** na boku prvního pultu s portem **Ethernet 2** na boku druhého pultu.
- **Použijte přímý standardní kabel CAT5e nebo CAT6.**
- *Pozor:* Spojení musí být přímé – nesmí procházet přes žádné mezilehlé switche ani routery! Soundcraft toto přímé spojení otestoval na vzdálenost až 100 stop (30 metrů).

**Nastavení IP adres v síti LAN:**
Každý pult musí mít v LAN síti unikátní IP adresu v rámci stejné podsítě:
- **Pult 1 (HOST):** nastavte LAN IP např. na \`192.168.1.80\`
- **Pult 2 (REMOTE):** nastavte LAN IP např. na \`192.168.1.81\`
- Porty Ethernet #1 obou pultů doporučujeme zapojit do společného gigabitového switche.

**Konfigurace v grafickém rozhraní:**
1. Přihlaste se do pultu, který bude řídící (**HOST**), a přejděte do **SETTINGS > CASCADE**:
   - Nastavte *CASCADE mode* na **ON**.
   - Nastavte *ROLE* na **HOST**.
   - Do pole *REMOTE IP* zadejte IP adresu druhého pultu (\`192.168.1.81\`).
2. Přihlaste se do druhého pultu (**REMOTE**):
   - Přejděte do **SETTINGS > CASCADE**.
   - Nastavte *CASCADE mode* na **ON**.
   - Nastavte *ROLE* na **REMOTE**.`,
        keyPoints: [
          'Přímé spojení kabelem CAT5e/6 výhradně mezi porty Ethernet #2',
          'Jednotky se dělí na roli HOST a REMOTE',
          'Z jediného okna prohlížeče lze přepínat mezi oběma pulty tlačítkem HOST/REMOTE v záhlaví'
        ]
      },
      {
        id: 'ui24-2-2-cascade-sync-solo',
        title: 'Synchronizace a CH24 Inherited Cascade Solo',
        badge: 'Synchronizace',
        summary: 'Společné ovládání Mute skupin, VCA úrovní, Snapshotů a sjednocený odposlech Solo.',
        content: `Na záložce **SETTINGS > CASCADE** na pultu HOST lze aktivovat pokročilé synchronizační volby:

- **Sync Snapshots:** Snapshoty se stejným názvem v rámci show se načtou současně na obou pultech.
- **Sync Mute Groups:** Aktivace Mute skupiny na pultu HOST automaticky sepne odpovídající Mute skupinu i na pultu REMOTE.
- **Sync VCA Levels:** Pohyb faderu VCA skupiny na HOSTu synchronizuje stejnojmennou VCA na REMOTE pultu.

**CH24 Inherits Cascade SOLO (Sjednocený monitoring):**
Tato funkce umožňuje poslouchat sóla z REMOTE pultu přímo ve sluchátkách nebo na kontrolních výstupech HOST pultu!
1. Na pultu **REMOTE** v matici routingu přiřaďte výstup sluchátek **HD1L** do volného Cascade slotu (např. *Cascade Slot 18* nebo *32*).
2. Na pultu **HOST** otevřete **SETTINGS > PATCHING > CHANNELS** a vstup kanálu 24 nasměrujte na tento *Cascade Slot 18*.
3. Na pultu HOST v **SETTINGS > CASCADE** zapněte volbu **CH24 Inherits Cascade Solo = ON**.
4. Kdykoliv na REMOTE pultu stisknete tlačítko SOLO u libovolného kanálu, na HOST pultu se automaticky sepne SOLO kanálu 24 a signál slyšíte ve svých sluchátkách!`,
        keyPoints: [
          'Mute skupiny se synchronizují z HOSTu na REMOTE',
          'Sjednocené SOLO šetří potřebu samostatných sluchátek pro druhý pult',
          'Plná vizuální kontrola obou jednotek z jedné obrazovky'
        ]
      }
    ]
  },
  {
    id: 'ui24-ch3-patching-matrix',
    number: 3,
    title: 'Směrovací matice (Patching Matrix)',
    icon: 'Layers',
    summary: 'Kompletní matice směrování: Hardwarové vstupy, USB DAW 1-32, Cascade sloty 1-32 a rozdělení pro nezávislý FOH a odposlechový mix.',
    subsections: [
      {
        id: 'ui24-3-1-patching-overview',
        title: 'Architektura matice a tlačítko Patch 1:1',
        badge: 'Routing',
        summary: 'Volné směrování libovolného fyzického vstupu do kteréhokoliv z 24 procesních kanálů.',
        content: `Na záložce **SETTINGS > PATCHING** naleznete přehlednou grafickou matici směrování:
- **Horní lišta matice:** Zobrazuje zdroje signálu (**HW INS, USB-A, USB-DAW 1-16, USB-DAW 17-32, CASCADE INS 1-16, CASCADE INS 17-32, MASTERS**).
- **Levý sloupec:** Zobrazuje cílová místa (**CHANNELS, HW OUTS, CASCADE OUTS, SOUNDCHECK**).

**Tlačítko Patch 1:1:**
V levém dolním rohu obrazovky se nachází tlačítko **PATCH 1:1**, které jedním kliknutím automaticky přiřadí vstupy 1:1 na odpovídající kanály, což eliminuje nutnost ručně klikat 24 bodů v matici.

**Příklad: Zrcadlení vstupů pro nezávislý FOH a Monitor mix:**
Pokud používáte dva pulty Ui24R propojené přes Cascade (jeden jako pódiový odposlechový pult pro muzikanty a druhý pro hlavní FOH mix v sále):
1. Na pultu **REMOTE** v Patching zvolte vlevo **CASCADE OUTS** a nahoře **HW INS**.
2. Klikněte na tlačítko **PATCH 1:1** – všech 20 mikrofonních vstupů se okamžitě pošle do slotů Cascade Out (post-preamp).
3. Na pultu **HOST** v Patching zvolte vlevo **CHANNELS** a nahoře **CASCADE INS 1-16** a klikněte na **PATCH 1:1**.
4. Nyní má zvukař u FOH i zvukař u monitorů kompletně nezávislé ekvalizéry, kompresory, šavle i efekty pro všech 24 kanálů!`,
        keyPoints: [
          'Umožňuje přemapovat vstupy bez přehazování kabelů na čelním panelu',
          'Jedním klikem přepnete celý pult na USB DAW playback pro virtuální soundcheck',
          'Signál z libovolného vstupu lze poslat současně do více kanálů (např. pro paralelní kompresi)'
        ]
      }
    ]
  },
  {
    id: 'ui24-ch4-cues-v3',
    number: 4,
    title: 'Nový systém CUE pamětí (v3)',
    icon: 'Zap',
    summary: 'Okamžité vyvolání stavu mixu bez zpoždění a přerušení zvuku: Mix Level/Pan/Mute, Aux a FX sendy a klávesové zkratky Z/X.',
    subsections: [
      {
        id: 'ui24-4-1-cues-concept',
        title: 'Rozdíl mezi Snapshotem a CUE',
        badge: 'CUE v3',
        summary: 'Proč CUE nemají žádnou latenci a jak se liší od plných snapshotů.',
        content: `Firmware v3 přinesl novou úroveň pamětí nazvanou **CUE**. 

**Proč vznikly CUE paměti:**
Zatímco klasický **Snapshot** ukládá kompletní vnitřní architekturu pultu včetně algoritmů efektů, zapojení sběrnic a routingu (což při načtení způsobí krátkou prodlevu DSP pro přenastavení procesorů), **CUE ukládá pouze stavové hodnoty mixu**, které se dají přenastavit **okamžitě bez jakékoliv latence či výpadku zvuku**!

**Parametry, které CUE vyvolává:**
- **Mix Level** (hlasitosti všech faderů do hlavního mixu)
- **Mix Pan** (panoráma)
- **Mix Mute** (umlčení kanálů)
- **Aux Send Level, Pan, Mute a Pre/Post nastavení** (všechny odposlechové cesty)
- **FX Send Level, FX Mute a Pre/Post** (všechny efektové poměry)
- **HOST Level, HOST AUX Level a HOST Balance**

*CUE záměrně neukládá:* typy kompresorů, křivky parametrického EQ ani směrování signálů. Díky tomu je přechod mezi jednotlivými písničkami nebo divadelními scénami naprosto plynulý.`,
        keyPoints: [
          'Okamžité přepnutí bez výpadku zvuku a bez prodlevy DSP',
          'Pokud je načten CUE, jeho název svítí v horním stavovém displeji',
          'Ideální pro změny poměrů odposlechů a faderů mezi písničkami koncertu'
        ]
      },
      {
        id: 'ui24-4-2-cues-shortcuts',
        title: 'Ovládání CUE z klávesnice a Slide-out panelu',
        badge: 'Ovládání',
        summary: 'Vyvolání dalšího/předchozího CUE klávesami Z a X na běžné QWERTY klávesnici.',
        content: `Pro divadelní zvukaře a rychlé živé míchání nabízí v3 několik možností bleskového přepínání CUE:

1. **Hardwarová klávesnice (QWERTY Keyboard):**
   - Klávesy **Z** a **X** jsou z výroby přiřazeny funkcím **F1 (Next CUE)** a **F2 (Previous CUE)**.
   - Stačí mít k pultu nebo notebooku připojenou USB klávesnici a stiskem jediného tlačítka skáčete na další scénu!
2. **Výsuvný panel (Bigger Slide-Out):**
   - V záložce *Functions* jsou permanentně k dispozici velká dotyková tlačítka **NEXT CUE** a **PREV CUE**.
3. **Malý boční panel:**
   - Tlačítka Next/Previous CUE lze přiřadit jako funkční tlačítka v **SETTINGS > LOCAL > BUTTON FUNCTION**.`,
        keyPoints: [
          'Klávesa Z = Předchozí CUE, Klávesa X = Další CUE',
          'Možnost ovládání nožním pedálem připojeným do jacku Foot Pedal',
          'Velká dotyková tlačítka přímo na hlavní obrazovce mixu'
        ]
      }
    ]
  },
  {
    id: 'ui24-ch5-big-desktop-info',
    number: 5,
    title: 'Big Desktop a INFO zobrazení (v3)',
    icon: 'Activity',
    summary: 'Nový přehled kanálů: miniaturní grafy Gate, Comp a EQ na každém faderu, dvojklik pro skok do editace a návrat zpět.',
    subsections: [
      {
        id: 'ui24-5-1-info-mode',
        title: 'Režim INFO a miniaturní grafy křivek',
        badge: 'Big Desktop',
        summary: 'Kompletní přehled o všech parametrech kanálu přímo nad faderem bez otevírání dalších oken.',
        content: `Režim **Big Desktop INFO** promění vaši obrazovku v komplexní přehledovou konzoli:

**Jak zapnout režim:**
1. V **SETTINGS > LOCAL** zapněte volbu **Big Desktop for Mix = ON**.
2. Zapněte volbu **Bigger Slideout = ON**.
3. Na velkém výsuvném panelu v sekci *EDIT VIEW* klikněte na tlačítko **INFO**.

**Co se zobrazuje nad každým kanálem:**
- **Nastavení mikrofonního předzesilovače (Mic Pre):** Zobrazení číselné hodnoty zisku v dB a stavu +48V fantomu.
- **Mini graf Gate:** Dynamická křivka šumové brány s prahem.
- **Mini graf Compressor:** Zmenšená přenosová charakteristika kompresoru.
- **Mini graf EQ curve:** Přesná frekvenční křivka ekvalizéru se všemi pásmy a Low-Cutem.
- **Sloupcové ukazatele SEND:** Barevné bary znázorňující úrovně odesílání do všech 4 efektových procesorů a 8 AUX výstupů!`,
        keyPoints: [
          'Okamžitý vizuální přehled o stavu všech 24 kanálů na jediné obrazovce',
          'Barevné sloupcové indikátory pro rychlou kontrolu poměrů odposlechů',
          'Vhodné pro velké dotykové monitory a počítače u FOH'
        ]
      },
      {
        id: 'ui24-5-2-double-click-nav',
        title: 'Blesková navigace dvojitým kliknutím (Double-Click)',
        badge: 'Navigace',
        summary: 'Dvojklik na mini graf EQ nebo kompresoru vás okamžitě přenese do detailního editoru a zpět.',
        content: `Aby zvukař neztrácel čas přepínáním záložek, přináší v3 intuitivní gesta dvojkliku:

- **Dvojklik na mini graf EQ:** Okamžitě otevře plnohodnotný grafický editor ekvalizéru daného kanálu.
- **Návrat zpět:** Jakmile ekvalizér upravíte, **dvojklikněte do jakéhokoliv volného místa na obrazovce EQ** a pult se okamžitě vrátí do přehledového zobrazení INFO!
- Stejný princip funguje i pro **Gate, Compressor a Automix**.
- **Přejetí prstem po popisku kanálu (Swipe):** V editačním stripu přejeďte prstem doprava pro přechod na další kanál, nebo doleva pro předchozí kanál bez nutnosti opustit editační okno.`,
        keyPoints: [
          'Dvojklik na křivku = skok do detailní editace',
          'Dvojklik do volného prostoru = bleskový návrat do mixu',
          'Gesto tažení prstem (Swipe) na názvu kanálu pro přepínání stop'
        ]
      }
    ]
  },
  {
    id: 'ui24-ch6-udp-control-v3',
    number: 6,
    title: 'Síťové příkazy UDP pro automatizaci a světla',
    icon: 'Sliders',
    summary: '30 uživatelsky definovatelných UDP tlačítek vysílaných přes Ethernet #1 pro ovládání pódiového osvětlení, videa a externích aplikací.',
    subsections: [
      {
        id: 'ui24-6-1-udp-commands',
        title: 'Konfigurace UDP tlačítek a vysílání',
        badge: 'UDP v3',
        summary: 'Ovládání světelných DMX pultů (např. QLC+, Chamsys, GrandMA) přímo z obrazovky mixu Ui24R.',
        content: `Mixážní pult Ui24R dokáže odesílat síťové **UDP zprávy** přes svůj port **Ethernet #1**. K dispozici je **30 plně programovatelných UDP tlačítek**.

**Jak povolit UDP zobrazení:**
1. V **SETTINGS > LOCAL** zapněte **Big Desktop Mode for Mix = ON**.
2. Na velkém výsuvném panelu klikněte na tlačítko **UDP** (nebo stiskněte klávesu **U** na klávesnici).

**Postup naprogramování tlačítka:**
1. Stiskněte tlačítko **EDIT** v pravém dolním rohu panelu UDP tlačítek.
2. Klikněte na kterékoliv z 30 tlačítek.
3. V dialogovém okně zadejte:
   - **NAME:** Text zobrazený na tlačítku (např. *Light Strobe* nebo *Fog Machine*).
   - **IP:** Cílová IP adresa počítače/světelného kontroléru (např. \`192.168.1.60\`).
   - **PORT:** Cílový UDP port (např. \`8080\` nebo \`9000\`).
   - **UDP COMMAND:** Textový nebo hexadecimální příkaz.
   - **BARVA:** Vyberte z barevné palety barvu tlačítka.
4. Klikněte na **EDIT** pro vypnutí editačního režimu – tlačítka jsou připravena k živému spouštění!`,
        keyPoints: [
          'Klávesa "U" na klávesnici funguje jako rychlý přepínač mezi MIXem a UDP obrazovkou',
          'Možnost ukládat, načítat a přejmenovávat kompletní sady UDP presetů',
          'Vynikající pro one-man show kapely, divadla a automatizovaná vystoupení'
        ]
      },
      {
        id: 'ui24-6-2-udp-encoding',
        title: 'Formát zpráv a URL procentuální kódování',
        badge: 'Syntaxe',
        summary: 'Odesílání binárních bajtů a speciálních znaků pomocí procentuálního kódování %hex.',
        content: `Ui24R nepodporuje céčkovou syntaxi escape sekvencí (\`\\r\`, \`\\n\`). Pro odesílání binárních dat nebo mezer se používá **standardní URL procentuální kódování**:

- Pro binární zprávy začněte příkaz řetězcem: \`?v=\`
- Příklad: \`?v=/bt1,f%00%00?%80%00%00\`
- Znak mezery se zapisuje jako \`%20\`
- Znak plus se zapisuje jako \`%2B\`
- Řádkový zlom (CR/LF) se zapisuje jako \`%0D%0A\`

Díky tomuto formátu můžete z pultu posílat i zprávy protokolu **OSC (Open Sound Control)** do softwarů jako QLab, Ableton Live nebo Resolume Arena!`,
        keyPoints: [
          'Binární zprávy musí začínat předponou "?v="',
          'Každý znak lze vyjádřit hexadecimálním kódem s prefixem "%"',
          'Plná kompatibilita se softwarem pro odbavování divadelních zvuků a efektů'
        ]
      }
    ]
  },
  {
    id: 'ui24-ch7-effects-pre-delay',
    number: 7,
    title: 'Lexicon efekty a nový Reverb Pre-Delay (v3)',
    icon: 'Sparkles',
    summary: '4 nezávislé procesory Lexicon (Reverb, Delay, Chorus, Room) s novým táhlem Pre-Delay pro přirozený dozvuk.',
    subsections: [
      {
        id: 'ui24-7-1-lexicon-pre-delay',
        title: 'Nový posuvník Pre-Delay u Lexicon dozvuků',
        badge: 'Lexicon v3',
        summary: 'Oddělení původního útoku nástroje od počátku odrazů pro zachování čitelnosti a srozumitelnosti.',
        content: `Firmware v3 doplňuje do všech algoritmů dozvuků **Lexicon Reverb a Room** vyhrazený parametr a posuvník **PRE-DELAY** na spodní liště editačního okna.

**Co je to Pre-Delay a proč je klíčový:**
- Pre-Delay představuje časový odstup (v milisekundách) mezi okamžikem, kdy zazní původní čistý zvuk (např. úder do virblu nebo slabika zpěvu), a okamžikem, kdy k posluchači dorazí **první odraz od virtuálních stěn místnosti**.
- Bez Pre-Delay se dozvuk ozývá okamžitě, což může způsobit zamlžení a ztrátu konkrétnosti zpěvu.
- Nastavením Pre-Delay na cca **20 až 60 ms** získá zpěv maximální srozumitelnost a přítomnost, zatímco dozvuk vytvoří luxusní prostor za ním bez zabarvení útoku!`,
        keyPoints: [
          'Pre-Delay umožňuje simulovat větší vzdálenost k první odrazné ploše',
          'Nezávislé na době dozvuku (Decay Time)',
          'Nenahraditelné pro hlavní sólové vokály a akustické bicí'
        ]
      },
      {
        id: 'ui24-7-2-fx-engines',
        title: 'Čtyři dedikované efektové motory',
        badge: 'FX Procesory',
        summary: 'Pevné rozdělení procesorů pro bleskovou obsluhu: FX 1 Reverb, FX 2 Delay, FX 3 Chorus, FX 4 Room.',
        content: `Soundcraft Ui24R obsahuje **4 samostatné efektové procesory Lexicon**, které neubírají žádný výkon z kanálových ekvalizérů ani kompresorů dbx:

1. **FX 1 (Reverb):** Klasické sálové a deskové reverby s nastavením času (Time), vysokofrekvenčního tlumení (HF Damping), basového podílu (Bass) a HPF/LPF filtrů.
2. **FX 2 (Delay):** Stereofonní zpoždění s možností vyťukávání tempa (Tap Tempo), filtrování zpětné vazby (Feedback) a duckingu.
3. **FX 3 (Chorus):** Zahuštění doprovodných vokálů, akustických kytar a elektrických pian.
4. **FX 4 (Room):** Simulace konkrétních studiových místností a klubových prostorů.

Odesílání do efektů se provádí na záložce **FX SENDS** na každém faderu, nebo v globálním přehledu.`,
        keyPoints: [
          'Legendární zvuk algoritmů Lexicon se Studer kvalitou signálové cesty',
          'Tap Tempo lze přiřadit na funkční tlačítko i nožní pedál',
          'Možnost okamžitého umlčení všech efektů tlačítkem MUTE FX'
        ]
      }
    ]
  },
  {
    id: 'ui24-ch8-vca-subgroups',
    number: 8,
    title: 'VCA skupiny, Subgroupy a View Groups (v3)',
    icon: 'Sliders',
    summary: 'Rychlá editace dlouhým stiskem, VCA Solo spouští sóla členů, řazené View Groups na telefonech a modré pre-fader měřáky.',
    subsections: [
      {
        id: 'ui24-8-1-vca-shortcuts',
        title: 'Zkratky dlouhého stisku (Hold to Edit)',
        badge: 'Skupiny v3',
        summary: 'Podržením názvu VCA nebo Subgroupy okamžitě otevřete okno pro výběr přiřazených členů.',
        content: `Od verze firmwaru 3 nemusíte složitě vyhledávat konfigurační menu přiřazení skupin:

- **Editace Subgroupy:** Klikněte a **podržte prst (nebo tlačítko myši) na názvu kterékoliv Subgroupy** (např. *SUB 1*) v zobrazení Mix. Okamžitě vyskočí dialogové okno **Edit Sub Group**, kde zaškrtnutím vyberete kanály!
- **Editace VCA skupiny:** Stejným způsobem **podržte název kterékoliv VCA skupiny** pro otevření okna **Edit VCA**.
- **Funkce VCA Solos (v3):** Aktivace tlačítka SOLO na VCA skupině nyní automaticky přepne do režimu SOLO všechny kanály, které jsou jejími členy! Pokud již některý člen v sólu byl, jeho stav zůstane zachován.`,
        keyPoints: [
          'Dlouhé podržení názvu šetří čas při soundchecku',
          'VCA Solo zaručuje, že ve sluchátkách uslyšíte přesně vybranou sekci kapely',
          'Funkce Edit Sub Group a Edit VCA je dostupná i v kontextovém menu kanálu'
        ]
      },
      {
        id: 'ui24-8-2-phone-view-enhancements',
        title: 'Vylepšení pro mobilní telefony (Phone View)',
        badge: 'Phone View',
        summary: 'Modré Pre-fader měřáky a řazené View Groups pro muzikanty na pódiu.',
        content: `Na displejích chytrých telefonů muzikantů přibyly dvě klíčové novinky:

1. **Modré Pre-Fader měřáky (Blue Meters):**
   - Vstupní úroveň signálu před faderem se nyní na faderu zobrazuje **modrou barvou** na pozadí za klasickým zeleným/žlutým měřákem.
   - Muzikant na pódiu okamžitě vidí, zda signál z jeho nástroje do pultu vůbec přichází, i když má fader stažený na nulu!
2. **Ordered View Groups (Řazené skupiny pohledů):**
   - V mobilním rozhraní otevřete boční panel, zvolte *GROUPS* a dlouze podržte *VIEW GROUPS*.
   - Můžete si navolit vlastní pořadí kanálů zleva doprava přesně tak, jak to muzikantovi vyhovuje (např. *Můj zpěv -> Moje akustika -> Klávesy -> Bicí*).
   - Tlačítko **SORT** srovná kanály podle pořadí klikání, tlačítko **RESET** výběr vyčistí.`,
        keyPoints: [
          'Muzikant vidí modrý bargraf i při staženém faderu',
          'Každý hudebník si na svém mobilu uspořádá nástroje v pořadí, které mu dává smysl',
          'Ochrana ACCESS control zabrání nechtěnému přenastavení cizích monitorů'
        ]
      }
    ]
  },
  {
    id: 'ui24-ch9-usb-recording-player',
    number: 9,
    title: 'Vícestopé nahrávání a přehrávač USB',
    icon: 'Disc',
    summary: 'Přejmenování multitrack relací přímo z HTML5 rozhraní, 32x32 USB DAW interface a přímý 22-stopý záznam na USB flashku v bezeztrátovém FLAC/WAV.',
    subsections: [
      {
        id: 'ui24-9-1-multitrack-recording',
        title: 'Přímý 22-stopý záznam na USB disk (bez PC)',
        badge: 'Multitrack',
        summary: 'Nahrávání všech jednotlivých stop koncertu na běžný USB disk v kvalitě 24-bit.',
        content: `Ui24R nabízí unikátní schopnost nahrávat až **22 nezávislých stop současně přímo na USB flash disk nebo externí pevný disk** zasunutý do čelního portu **RECORD**, bez nutnosti mít na koncertě počítač!

**Podporované formáty:**
- **WAV 24-bit / WAV 16-bit:** Maximální kompatibilita se všemi zvukovými editory.
- **FLAC 24-bit / FLAC 16-bit:** Bezeztrátová komprese, která ušetří až 40 % místa na disku při zachování 100% studiové kvality zvuku!

**Přejmenování relací přímo v prohlížeči (Novinka v3):**
1. Otevřete záložku **PLAYER > MULTITRACK**.
2. V levém sloupci vyberte nahranou relaci (Session).
3. Klikněte na tlačítko **RENAME SESSION** v levém dolním rohu.
4. Zadejte nový název (např. *Koncert_Lucerna_Pridavek*) a potvrďte tlačítkem **OK**.`,
        keyPoints: [
          'Nahrává čisté pre-fader stopy přímo za převodníky pro pozdější studiovou míchačku',
          'Podpora formátu FLAC šetří kapacitu USB disků',
          'Možnost virtuální zvukové zkoušky pouhým stiskem tlačítka Activate Soundcheck'
        ]
      },
      {
        id: 'ui24-9-2-daw-interface',
        title: '32-kanálové USB audio rozhraní pro DAW',
        badge: 'DAW USB',
        summary: 'Propojení s PC/Mac kabelem USB pro nahrávání v Logic Pro, Reaperu, Cubase a Pro Tools.',
        content: `Na bočním panelu Ui24R je umístěn port **USB-B (DAW)**, který z mixu vytvoří plnohodnotné 32vstupové a 32výstupové studiové rozhraní:

- Na počítačích **Apple Mac (macOS)** funguje okamžitě bez nutnosti instalovat ovladače přes standardní CoreAudio.
- Na počítačích **Windows** stačí nainstalovat oficiální Soundcraft multichannel ASIO driver.
- V DAW můžete nahrávat až 32 stop současně a vracet do pultu libovolné stopy pro živé míchání nebo mastering.`,
        keyPoints: [
          'Nízká latence vhodná i pro hraní přes softwarové virtuální nástroje',
          'Podpora nezávislého 2-stopého stereo USB přehrávače z čelního portu PLAY',
          'Vynikající převodníky s dynamickým rozsahem 114 dB'
        ]
      }
    ]
  },
  {
    id: 'ui24-ch10-safety-utility-v3',
    number: 10,
    title: 'Bezpečnost, HPF/LPF a Utility (v3)',
    icon: 'Cpu',
    summary: 'Ochrana mikrofonů při startu (Reset +48V on Boot), HPF/LPF filtry na všech AUX výstupech, offline JSON export/import a podpora HDMI dotykových monitorů.',
    subsections: [
      {
        id: 'ui24-10-1-safety-aux-filters',
        title: 'Reset +48V při startu a HPF/LPF filtry na AUXech',
        badge: 'Bezpečnost v3',
        summary: 'Dvě zásadní bezpečnostní vylepšení firmwaru v3 chránící mikrofony a odposlechové reproboxy.',
        content: `Verze 3 řeší dvě časté obavy zvukařů v živém provozu:

### 1. Reset Phantom Power on Boot (Ochrana citlivých mikrofonů)
- Zapojení páskového (ribbon) nebo citlivého dynamického mikrofonu do vstupu s aktivním fantomem +48V může mikrofon nenávratně poškodit.
- V **SETTINGS > GLOBAL** naleznete volbu: **RESET +48V ON BOOT = ON/OFF**.
- Když je volba zapnuta (**ON**), pult při každém zapnutí automaticky **vypne fantomové napájení na všech 20 kanálech**.
- Zvukař pak zapíná +48V vědomě a ručně pouze tam, kde je to potřeba.

### 2. HPF a LPF filtry na všech AUX výstupech
- Na všech 8 symetrických výstupech AUX (určených pro pódiové monitory a in-eary) přibyly v záložce ekvalizéru nastavitelné posuvníky **High Pass Filter (HPF)** a **Low Pass Filter (LPF)**!
- Kliknutím a tažením boxu filtru na grafickém zobrazení GEQ nastavíte požadovanou mezní frekvenci.
- **HPF:** Ořeže z odposlechů zbytečné infrazvuky pod 80-100 Hz, čímž uleví reproduktorům a zvýší celkovou hlasitost a srozumitelnost monitoru bez zahřívání kmitací cívky.
- **LPF:** Umožňuje ořezat vysoké frekvence u basových odposlechů nebo subbasů.`,
        keyPoints: [
          'Ochrana drahých páskových a dynamických mikrofonů před napěťovým rázem',
          'HPF/LPF na Auxech šetří výkon zesilovačů a odposlechových reproboxů',
          'Vizuální zobrazení strmosti filtru přímo na ploše grafického ekvalizéru'
        ]
      },
      {
        id: 'ui24-10-2-json-hdmi-specs',
        title: 'Offline JSON snapshoty a podpora HDMI monitorů',
        badge: 'Utility v3',
        summary: 'Příprava show offline v prohlížeči, export na USB a přímé připojení dotykových HDMI monitorů.',
        tables: [
          {
            title: 'Testované dotykové HDMI monitory (oficiální seznam v3)',
            headers: ['Značka & Model', 'Typ připojení', 'Poznámka'],
            rows: [
              ['Dell P2418HT (Touch)', 'HDMI + USB', 'Plná podpora multi-touch, 1080p škálováno'],
              ['Dell S2240T (Touch)', 'HDMI + USB', 'Ověřený 21.5" dotykový panel'],
              ['Iiyama ProLite T2236MSC-B2', 'HDMI + USB', 'Kapacitní dotykový displej'],
              ['Viewsonic TD2230 / TD2220', 'HDMI + USB', 'Kompaktní pódiový dotykový monitor'],
              ['Acer T232HL / UT220HQL', 'HDMI + USB', 'Stabilní podpora ovladačů'],
              ['GeChic 1002 10.1" Widescreen', 'HDMI + USB', 'Ultra-kompaktní přenosný monitor']
            ]
          }
        ],
        content: `### Offline JSON Snapshots (Příprava akce doma bez pultu)
Na webových stránkách Soundcraftu v bezplatném demo rozhraní můžete kompletně připravit celou akci: pojmenovat stopy, nastavit barvy, načíst presety, připravit poměry odposlechů i efektů.
- V záložce **SHOWS** klikněte na **EXPORT OFFLINE FILE** a uložte soubor \`.json\` na USB flashku.
- Na koncertě flashku zasuňte přímo do pultu Ui24R a v menu SHOWS zvolte **IMPORT OFFLINE FILE**. Celé nastavení se bleskově nahraje do hardwaru!

### Přípojka HDMI pro externí monitor
Přímý výstup HDMI na čelním panelu podporuje rozlišení až 720p. Připojením monitoru z výše uvedené tabulky a zapojením USB kabelu do portu USB získáte velký hardwarový dotykový mixážní pult bez nutnosti sítě Wi-Fi.`,
        keyPoints: [
          'Příprava celého koncertu doma na notebooku přes offline demo rozhraní',
          'Import/Export nastavení v otevřeném formátu JSON',
          'Nezávislost na tabletech díky přímému HDMI monitoru a USB myši'
        ]
      }
    ]
  }
];

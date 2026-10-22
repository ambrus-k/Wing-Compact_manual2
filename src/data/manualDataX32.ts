import { ManualChapter } from '../types';

export const MANUAL_CHAPTERS_X32: ManualChapter[] = [
  {
    id: 'x32-ch1-overview',
    number: 1,
    title: 'Přehled a filozofie ovládání X32 Producer',
    icon: 'Radio',
    summary: 'Koncepce konzole X32 Producer: 16 programovatelných Midas preampů, 17 motorizovaných faderů 100 mm, 5" barevný TFT displej a revoluční koncept tlačítek VIEW.',
    subsections: [
      {
        id: 'x32-1-1-concept',
        title: 'Koncepce a hardwarová architektura',
        badge: 'Přehled',
        summary: 'Výpočetní výkon vlajkové lodi X32 v kompaktním rackovém formátu s Midas předzesilovači a 40-bitovým DSP.',
        functionDiagram: {
          type: 'top_panel',
          title: 'Ovládací plocha konzole X32 Producer',
          subtitle: '5" denně čitelný TFT displej, 17 motorizovaných faderů 100 mm, 6 push-enkodérů a tlačítka VIEW'
        },
        content: `Mixážní pult **Behringer X32 Producer** integruje plný 40-bitový digitální mixážní engine vlajkové lodi X32 do kompaktního šasi o šířce 19" (vhodné do racku i na stůl). Nabízí 40 vstupních kanálů zpracování, 25 sběrnic, 16 špičkových programovatelných mikrofonních předzesilovačů navržených divizí MIDAS a 17 plně motorizovaných 100mm faderů s bleskovou odezvou.

**Klíčové hardwarové vlastnosti:**
- **16 analogových XLR mikrofonních vstupů** na zadním panelu s dálkově řízeným analogovým ziskem v rozsahu 72 dB (+23 dBu max před přebuzením) a spínatelným +48V fantomovým napájením.
- **8 analogových XLR linkových výstupů** (standardně OUT 7 a 8 jako hlavní stereo Main L/R).
- **6 přídavných symetrických Aux vstupů a 6 Aux výstupů** (1/4" TRS jacky a RCA konektory pro přehrávače a externí efekty).
- **5" barevný TFT displej s vysokým kontrastem (800 × 480 px)** doplněný o 6 rotačních push-enkodérů pro přímou editaci parametrů.
- **Duální síťové porty AES50 SuperMAC** (porty A a B) pro obousměrný přenos až 96 kanálů přes stíněný Cat-5e kabel (např. digitální stageboxy S16 / S32 / DL16).
- **Ultranet P-16 konektor** pro osobní monitoring hudebníků na pódiu (až 16 nezávislých stop po ethernetovém kabelu).
- **Rozšiřující slot s nainstalovanou kartou X-USB** poskytující 32 vstupů a 32 výstupů přes USB 2.0 do PC/Mac s podporou ASIO a CoreAudio.`,
        keyPoints: [
          '40 vstupních kanálů zpracování při 40-bit floating point a latenci pod 0.8 ms',
          '17 motorizovaných faderů 100 mm rozdělených na sekci Vstupů (vlevo) a Sběrnic/DCA/Main (vpravo)',
          'Plná kompatibilita se všemi zařízeními ekosystému X32 a MIDAS M32'
        ],
        tips: [
          'Pokud konzoli montujete do racku, zajistěte dostatečný průchod vzduchu kolem ventilačních otvorů.',
          'Před zapnutím ozvučovacího systému zapněte nejprve pult X32 a teprve poté koncové zesilovače a aktivní reproboxy.'
        ]
      },
      {
        id: 'x32-1-2-view-utility',
        title: 'Koncept tlačítek VIEW a kontextové UTILITY',
        badge: 'Navigace',
        summary: 'Okamžitý skok do hloubkové editace bez zdlouhavého procházení menu pomocí tlačítek VIEW.',
        content: `Jednou z největších předností konzolí X32 je **pravidlo tlačítek VIEW**. Po celé ploše horního panelu naleznete u jednotlivých hardwarových bloků (Gain, Low Cut, Gate, Dynamics, EQ, Sends, Main, Monitor, USB, Scenes, Assign) malé podsvícené tlačítko **VIEW**.

**Jak VIEW tlačítka fungují v praxi:**
1. Kdykoliv upravujete parametr na fyzickém panelu (např. otočíte frekvencí EQ) a chcete vidět detailní grafickou křivku nebo doplňkové parametry, stiskněte tlačítko **VIEW** přímo v sekci EQ.
2. Centrální 5" TFT displej se **okamžitě přepne na příslušnou editační stránku**.
3. Není potřeba hledat v menu ani se proklikávat složitou stromovou strukturou.
4. Chcete-li zkontrolovat nastavení sluchátek a monitoringu, stiskněte VIEW vedle ovladače Phones Level.
5. Chcete-li konfigurovat 2-stopý USB rekordér, stiskněte VIEW vedle USB portu.

**Kontextové tlačítko UTILITY:**
Tlačítko **UTILITY** napravo od displeje přináší funkce závislé na aktuálně otevřené stránce:
- **V sekci EQ / Dyn:** Umožňuje kopírovat (Copy), vkládat (Paste), ukládat nebo načítat presety ekvalizéru a kompresoru.
- **Při podržení tlačítka SELECT kanálu:** Stiskem UTILITY otevřete obrazovku pojmenování stopy (Scribble Strip), kde vyberete barvu, ikonu a text kanálu.
- **Na stránkách Routing:** Nabízí ukládání a načítání presetů kompletního směrování signálů.
- **V menu Scenes:** Umožňuje rychlé zálohování, kopírování, přejmenování a ukládání scén.`,
        keyPoints: [
          'Tlačítka VIEW eliminují složité procházení menu – jeden stisk vás přenese na detailní stránku displeje',
          'Tlačítko UTILITY je vždy kontextové a nabízí funkce pro aktuální obrazovku',
          'Tlačítka Layer Up/Down pod displejem přepínají mezi vrstvou 1/2 pro zobrazení dalších parametrů enkodérů'
        ],
        tips: [
          'V menu Setup > Global můžete nastavit chování tlačítek VIEW i SELECT (např. zda se má kanál automaticky vybrat dotykem faderu).'
        ]
      }
    ]
  },
  {
    id: 'x32-ch2-faders-sof',
    number: 2,
    title: 'Vstupní vrstvy a funkce "Sends on Faders"',
    icon: 'Sliders',
    summary: 'Rozdělení faderových vrstev, přepínání bank 1-8, 9-16, 17-24, 25-32, Aux/USB, FX Returns a dva způsoby použití Sends on Faders.',
    subsections: [
      {
        id: 'x32-2-1-channel-layers',
        title: 'Faderové vrstvy vstupů a sběrnic',
        badge: 'Fadery',
        summary: '8 faderů vstupů vlevo, 8 faderů sběrnic/DCA vpravo a 1 nezávislý Master fader.',
        content: `Pracovní plocha X32 Producer je rozdělena na dvě hlavní faderové skupiny:
1. **Levá sekce (Input Channels):** 8 motorizovaných faderů 100 mm s tlačítky SELECT, SOLO a MUTE + LED indikátory Gate, Comp a úrovně.
2. **Pravá sekce (Group/Bus Channels):** 8 motorizovaných faderů pro DCA, Mix Busy a Matice.
3. **Main Fader:** Zcela nezávislý fader pro hlavní stereo sběrnici (Main L/R), který je vždy dostupný bez ohledu na zvolenou vrstvu!

**Přepínání vrstev levé sekce (tlačítka vlevo od faderů):**
- **Channels 1-8:** Fyzické lokální vstupy 1 až 8.
- **Channels 9-16:** Fyzické lokální vstupy 9 až 16.
- **Channels 17-24:** Vstupy 17 až 24 (přednastaveno pro digitální stagebox AES50-A).
- **Channels 25-32:** Vstupy 25 až 32 (přednastaveno pro AES50-A nebo USB kartu).
- **Aux In 1-6 / USB:** 6 linkových vstupů Aux na zadním panelu + 2 kanály USB přehrávače.
- **FX Returns:** Návratové stereo stopy 4 interních efektových procesorů (FX1L/R až FX4L/R).
- **Bus Master 1-8 a 9-16:** Umožňuje přivést mastery mix sběrnic na levou faderovou sekci pro rychlé přiřazení do DCA skupin.

**Přepínání vrstev pravé sekce:**
- **DCA Groups 1-8:** 8 digitálně řízených zesilovacích skupin.
- **Bus 1-8:** Výstupní úrovně mix sběrnic 1 až 8 (např. odposlechové cesty).
- **Bus 9-16:** Výstupní úrovně mix sběrnic 9 až 16 (např. efektové sendy a další odposlechy).
- **Matrix 1-6 / Main C:** 6 maticových výstupů a mono/center sběrnice.`,
        keyPoints: [
          'Vždy je aktivní právě jeden vybraný kanál (tlačítko SELECT svítí)',
          'Main fader je fyzicky samostatný a ovládá hlavní PA systém bez nutnosti přepínat vrstvy',
          'DCA skupiny nesčítají audio signál do jedné stopy, ale digitálně škálují úrovně faderů přiřazených kanálů'
        ]
      },
      {
        id: 'x32-2-2-sends-on-faders',
        title: 'Funkce Sends on Faders (SOF)',
        badge: 'Monitoring',
        summary: 'Bleskové nastavení odposlechů pro hudebníky i rychlá kontrola odesílání ze stopy.',
        functionDiagram: {
          type: 'fader_layers',
          title: 'Princip režimu Sends on Faders na X32 Producer',
          subtitle: 'Stiskněte tlačítko SENDS ON FADER mezi faderovými sekcemi'
        },
        content: `Tlačítko **Sends on Faders** umístěné uprostřed mezi oběma faderovými bankami je stěžejním nástrojem každého zvukaře pro mixování živých odposlechů. Funguje ve dvou praktických režimech:

### Režim 1: Nastavení monitorového mixu pro konkrétního muzikanta
Tento režim použijete, když na pódiu muzikant (např. bubeník nebo zpěvák) řekne: *"Přidej mi do odposlechu klávesy a uber kytaru"*.
1. Na pravé sekci faderů zvolte vrstvu **Bus 1-8** (nebo 9-16) a stiskněte tlačítko **SELECT** u sběrnice, která napájí jeho odposlech (např. Bus 1 pro zpěv).
2. Stiskněte tlačítko **SENDS ON FADER** (začne svítit).
3. Na levé sekci faderů přepněte na požadovanou vrstvu vstupů (např. Channels 1-8 nebo 9-16).
4. **Všechny fadery na levé sekci se okamžitě přesunou do pozic, které představují poměr odesílání (Send) do vybraného odposlechu!**
5. Zvednutím faderu přidáte daný nástroj pouze do tohoto odposlechu.
6. Až budete hotovi, vypněte tlačítko SENDS ON FADER.

### Režim 2: Kontrola, kam všude odchází signál z jednoho nástroje
Tento režim se hodí, když chcete zkontrolovat, do kterých všech odposlechů hraje např. sólová kytara nebo zpěv.
1. Na levé sekci vyberte konkrétní vstup stiskem jeho tlačítka **SELECT** (např. Ch 1 Lead Vocal).
2. Stiskněte tlačítko **SENDS ON FADER** (rozsvítí se).
3. Na pravé sekci zvolte vrstvu **Bus 1-8** (nebo 9-16).
4. **Fadery na pravé straně se přesunou do poloh odesílání tohoto jednoho mikrofonu do jednotlivých sběrnic 1 až 8!**
5. Můžete okamžitě zkontrolovat a upravit úroveň vokálu ve všech odposleších současně.`,
        keyPoints: [
          'Dva obousměrné směry použití: výběr výstupní sběrnice vs. výběr vstupního kanálu',
          'Když svítí Sends on Faders, levé fadery NEŘÍDÍ hlasitost do hlavního PA, ale pouze úroveň odesílání do monitoru!',
          'Funkce nefunguje pro DCA skupiny a hlavní Main sběrnici'
        ],
        tips: [
          'Vždy zkontrolujte, zda tlačítko SENDS ON FADER nesvítí, když chcete upravovat hlavní mix kapely v sále!'
        ]
      }
    ]
  },
  {
    id: 'x32-ch3-channel-strip',
    number: 3,
    title: 'Kanálový strip a dynamické zpracování',
    icon: 'Activity',
    summary: 'Kompletní přehled kanálového stripu: Preamp +48V/Phase/Low-Cut, Gate & Ducker s Key filtrem, Compressor s Peak/RMS a 4-pásmový parametrický EQ.',
    subsections: [
      {
        id: 'x32-3-1-preamp-config',
        title: 'Předzesilovač (Preamp), Fantom +48V a Low Cut',
        badge: 'Preamp',
        summary: 'Nastavení vstupního zisku, otočení fáze a ořezání nežádoucích nízkých frekvencí.',
        content: `Sekce **Config / Preamp** na horním panelu a displeji slouží k optimálnímu vybuzení signálu (Gain Staging) a odstranění nežádoucích přeslechů či pódiového dunění.

**Prvky a parametry předzesilovače:**
- **Gain:** Rotační potenciometr s jantarovým LED věncem reguluje analogové zesílení Midas preampu. Optimální úroveň na vstupním LED bargrafu by se měla při špičkách pohybovat mezi **-18 dBFS až -12 dBFS** (oranžová zóna), nikdy nesmí dosáhnout červené LEDky CLIP!
- **Tlačítko 48 V:** Zapíná fantomové napájení pro kondenzátorové mikrofony a aktivní DI boxy. *Před zapnutím +48V vždy kanál zamutujte, aby nedošlo k hlasitému lupnutí do PA.*
- **Tlačítko Phase (Ø):** Otočení fáze o 180°. Nezbytné při snímání virblu zespodu (snare bottom), dvou mikrofonů u kytarového boxu nebo akustického nástroje.
- **Low Cut (HPF):** Tlačítko aktivuje strmý hornopropustný filtr (12 dB/oktávu). Rotační ovladač nastavuje zlomovou frekvenci v rozsahu **20 Hz až 400 Hz**. Odstraňuje dunění pódia, manipulační ruchy mikrofonu a větrný šum.
- **Digital Delay (v Config záložce):** Umožňuje zpozdit signál na vstupu až o stovky milisekund pro přesné fázové zarovnání různých mikrofonů na stejném pódiu.`,
        keyPoints: [
          'Pokud LED věnec kolem ovladače Gain nesvítí, znamená to, že máte vybraný výstupní bus (kde není analogový preamp)',
          'Při zapojení USB DAW stop funguje Gain jako digitální trim v rozsahu ±12 dB',
          'Vždy zapínejte Low Cut u všech vokálů a nástrojů kromě baskytary a velkého bubnu (kick)'
        ]
      },
      {
        id: 'x32-3-2-gate-ducker',
        title: 'Noise Gate a Ducker',
        badge: 'Dynamika',
        summary: 'Odstranění přeslechů bicích nástrojů a automatické potlačení podkresu při mluvení.',
        content: `Sekce **Gate** nabízí plnohodnotný noise gate i expander/ducker pro čištění mixu. Stiskem tlačítka **VIEW** v sekci Gate otevřete dvě stránky podrobných parametrů na displeji.

**Klíčové parametry Gate:**
- **Threshold (Práh):** Úroveň, pod kterou gate uzavře signál. Nastavuje se tak, aby úder na buben gate otevřel, ale přeslechy z činelů jej neotevřely.
- **Range (Rozsah útlumu):** Jak moc se signál ztlumí při zavření (až -60 dB pro úplné ticho, nebo např. -15 dB pro přirozenější útlum).
- **Attack:** Rychlost otevření gate (od 0.02 ms po 50 ms). Pro bicí se doporučuje nejrychlejší attack.
- **Hold:** Čas, po který zůstává gate otevřený po poklesu pod práh (zabraňuje nepříjemnému chvění).
- **Release:** Doba doznění a plynulého zavření brány.

**Key Filter a Ducker:**
- Na stránce **Page 2** lze aktivovat **Key Filter** – laditelný filtr (20 Hz - 20 kHz), který řídí detekci. Např. pro Gate velkého bubnu nastavte filtr na cca 80 Hz, takže gate nebude otevírán virblem ani basou!
- Funkce **Ducker** naopak umožňuje automaticky ztišit vybranou stopu (např. podkresovou hudbu), jakmile promluví moderátor na mikrofonu.`,
        keyPoints: [
          'Key Filter umožňuje přesné spouštění gate podle vybrané frekvence',
          'Tlačítko Solo v záložce Gate Page 2 umožňuje poslechnout si filtrovaný řídící signál',
          'Ducker je ideální pro rádiové vysílání, konference i firemní akce'
        ]
      },
      {
        id: 'x32-3-3-compressor',
        title: 'Kompresor a Expander (Dynamics)',
        badge: 'Dynamika',
        summary: 'Přepínání Peak vs RMS detekce a unikátní volba mezi Linear a Logarithmic kompresí.',
        content: `Kompresor na X32 Producer nabízí funkce, které se obvykle vyskytují pouze u špičkových studiových jednotek.

**Základní parametry (Page 1):**
- **Threshold & Ratio:** Práh komprese a poměr stlačení (od 1.1:1 až po limitaci 100:1).
- **Attack & Release:** Rychlost náběhu a doznění komprese.
- **Hold time:** Velmi užitečný parametr! Pokud je nastaven velmi rychlý attack/release, může u nízkých tónů vznikat slyšitelné zkreslení. Hold parametr podrží kompresor sepnutý po krátký časový okamžik a eliminuje toto zkreslení.
- **Make-up Gain:** Vyrovnání celkové hlasitosti po kompresi.

**Režimy detekce (Page 1 - Push Encoder 3):**
- **PEAK:** Reaguje okamžitě na okamžité špičky signálu. Vynikající pro ochranu před přebuzením a tvrdou kontrolu dynamických špiček (např. slap basy, perkuse).
- **RMS (Root-Mean-Squared):** Vyhodnocuje průměrnou energii signálu podobně jako lidské ucho. Vytváří velmi muzikální, měkkou a přirozenou kompresi ideální pro hlavní vokály a celkové mixy.

**Lineární vs. Logaritmický mód (Push Encoder 4):**
- **LOG:** Využívá exponenciální/logaritmickou křivku podobně jako slavné analogové optické a VCA kompresory. Čas komprese zůstává konzistentní a harmonické zkreslení kopíruje hlasitost materiálu. Nejpřirozenější volba pro živou hudbu.
- **LINEAR:** Konstantní rychlost změny zisku. Vhodné pro speciální dynamické efekty a agresivnější zvuk.`,
        keyPoints: [
          'Knee parametr na Page 2 umožňuje volbu z 5 strmostí náběhu od ostrého po ultra-měkký',
          'Tlačítkem na displeji lze prohodit pořadí: EQ před kompresorem nebo kompresor před EQ',
          'LED indikátor Comp na faderu svítí, kdykoliv probíhá redukce zisku (Gain Reduction)'
        ]
      },
      {
        id: 'x32-3-4-eq',
        title: '4-pásmový parametrický ekvalizér a Low-Cut',
        badge: 'Ekvalizér',
        summary: 'Plně parametrický 4-pásmový EQ na vstupech (6-pásmový na sběrnicích) s režimy VEQ a Crossover filtry.',
        content: `Každý vstupní kanál disponuje **4-pásmovým plně parametrickým ekvalizérem** doplněným o samostatný strmý Low-Cut filtr. Výstupní sběrnice (Mix Bus, Matrix a Main) mají dokonce **6 plně parametrických pásem**.

**Čtyři editační stránky EQ na displeji:**
1. **Page 1 (Gain):** Rotační enkodéry nastavují zisk jednotlivých pásem v rozsahu ±15 dB. Enkodér 1 řídí frekvenci Low-Cut filtru, enkodér 6 zapíná/vypíná EQ.
2. **Page 2 (Frequency):** Nastavení střední frekvence pásem v celém slyšitelném pásmu 20 Hz až 20 kHz.
3. **Page 3 (Q - Bandwidth):** Šířka pásma Q od úzkého zářezu (Q=10 pro potlačení rezonance či vazby) po široký muzikální zdvih (Q=0.3 pro vzdušné výšky).
4. **Page 4 (Mode):** Volba chování jednotlivých pásem:
   - **Low Cut:** Strmý ořez spodků.
   - **Low Shelf / High Shelf:** Zdvih nebo útlum všech basů/výšek od dané frekvence.
   - **PEQ (Parametric EQ):** Standardní zvonový symetrický filtr.
   - **VEQ (Vintage EQ):** Asymetrický britský analogový charakter s mírným prohybem protilehlých frekvencí pro muzikální barvu.
   - **High Cut:** Strmý ořez nejvyšších frekvencí.

**Filtry pro Crossover na maticích (Matrix 1-6):**
Na maticových výstupech se pásma 1 a 6 dají přepnout do režimu aktivní výhybky (**BU - Butterworth, BS - Bessel, LR - Linkwitz-Riley**) se strmostí 6, 12, 18 a 24 dB/oktávu. Tím z X32 Producer vytvoříte kompletní procesor pro subwoofery a satelity!`,
        keyPoints: [
          'Vstupy mají 4 pásma, výstupní sběrnice a matice mají 6 pásem',
          'Režim VEQ emuluje analogové pulty s přirozenou hudební fázovou charakteristikou',
          'Matrix výstupy nahradí externí speaker procesor díky filtrům Linkwitz-Riley 24 dB/oct'
        ]
      }
    ]
  },
  {
    id: 'x32-ch4-routing',
    number: 4,
    title: 'Směrování signálu (Routing I/O po 8 kanálech)',
    icon: 'Cable',
    summary: 'Architektura blokového routingu po osmi kanálech: Local In, AES50 A/B, Card USB, Analog Out 1-8 s nastavením TAP bodů a zpoždění.',
    subsections: [
      {
        id: 'x32-4-1-block-routing',
        title: 'Koncept blokového přiřazování vstupů (Blocks of 8)',
        badge: 'Routing',
        summary: 'Přiřazování fyzických konektorů do interního DSP v blocích po 8 signálech.',
        functionDiagram: {
          type: 'routing_matrix',
          title: 'Směrovací matice X32 Producer',
          subtitle: 'Bloky po 8: Local 1-16, AES50-A 1-48, AES50-B 1-48, Card 1-32'
        },
        content: `Na konzolích řady X32 se vstupy do procesního enginu přiřazují v **blocích po 8 kanálech**. Stiskněte tlačítko **ROUTING** vedle displeje a otevřete záložku **Home**:

**Struktura vstupních bloků:**
- **Inputs 1-8:** Prvním enkodérem vyberete zdroj (standardně **Local 1-8**).
- **Inputs 9-16:** Druhým enkodérem vyberete zdroj (standardně **Local 9-16**).
- **Inputs 17-24:** Třetím enkodérem (např. **AES50 A1-8** z jevištního stageboxu S16).
- **Inputs 25-32:** Čtvrtým enkodérem (např. **AES50 A9-16** ze stageboxu nebo **Card 1-8** pro virtuální soundcheck).
- **Aux In 1-4:** Pátým enkodérem zvolíte zdroj pro přídavné linkové vstupy (Aux 1-4, Local 1-4, AES50 A1-4 nebo Card 1-4).

*Poznámka:* Lokální vstupy 17-24 a 25-32 jsou na X32 Producer zobrazeny v hranatých závorkách \`[Local In 17-24]\`, což indikuje, že na tomto modelu fyzicky neexistují (jsou přítomny na velkém X32). Lze je však nahradit stageboxem přes AES50 nebo USB kartou.

**Jednotlivý Preamp Patch (Config záložka stopy):**
Od novějších verzí firmwaru lze navíc na kterémkoliv kanálu v záložce *Config* přepsat výchozí blokový vstup a vybrat konkrétní zdroj signálu individuálně!`,
        keyPoints: [
          'Blokové směrování po 8 kanálech zjednodušuje zapojení celých pódiových sestav',
          'Přepnutím bloků Inputs na Card 1-32 okamžitě přepnete pult do režimu virtuálního soundchecku z DAW',
          'Porty AES50-A a AES50-B poskytují každý 48 kanálů vstupu i výstupu'
        ]
      },
      {
        id: 'x32-4-2-analog-out',
        title: 'Výstupní směrování (Analog Out 1-8) a Delay kompenzace',
        badge: 'Výstupy',
        summary: 'Přiřazení výstupních signálů na 8 XLR konektorů s volbou TAP bodu a nastavením zpoždění.',
        content: `Na záložce **Routing > Analog Out** přiřazujete interní sběrnice a signály na fyzických 8 XLR výstupů na zadním panelu konzole:

**Postup nastavení výstupu:**
1. Enkodérem 1 vyberte výstupní konektor (**Output 01** až **Output 08**).
2. Enkodérem 3 zvolte kategorii (**Main (LRC) Mix, Mix Bus, Matrix, Direct Out, Monitor**).
3. Enkodérem 4 vyberte konkrétní stopu (např. *Mix Bus 01* pro první odposlech, nebo *Main L / Main R* pro ozvučení sálu). Stisknutím enkodéru 4 volbu potvrďte!
4. Enkodérem 5 nastavte **Signal Tap point** (odběrné místo signálu):
   - **Input:** Neovlivněný signál přímo ze vstupu.
   - **Pre-EQ:** Před ekvalizérem a dynamikou.
   - **Pre-Fader:** Po EQ a kompresi, ale **před faderem** (ideální pro pódiové odposlechy!). Pohyb faderu v sále nezmění hlasitost monitoru muzikanta.
   - **Post-Fader:** Až za faderem (nezbytné pro externí efektové jednotky a hlavní PA).
5. Enkodérem 6 nastavte **Line Delay** (zpoždění výstupu):
   - Umožňuje zpozdit signál v milisekundách, metrech nebo stopách (při výchozí teplotě 20 °C).
   - Nezbytné pro vyrovnání zpoždění vykrývacích reproboxů (delay towers) v sále nebo venku!`,
        keyPoints: [
          'Výstupy 7 a 8 jsou z výroby nastaveny jako Main Stereo L a R',
          'Pro odposlechy vždy volte Pre-Fader, aby změna hlasitosti na faderu neovlivnila muzikanty',
          'Vestavěné digitální zpoždění na výstupech eliminuje hřebenový filtr mezi předními a zadními reproboxy'
        ]
      }
    ]
  },
  {
    id: 'x32-ch5-buses-dca-matrix',
    number: 5,
    title: 'Sběrnice, Subskupiny, DCA a Matice',
    icon: 'Layers',
    summary: 'Rozdíl mezi sběrnicí a subskupinou, rychlé přiřazení 8 DCA skupin a 6 maticových výstupů s Linkwitz-Riley crossovery.',
    subsections: [
      {
        id: 'x32-5-1-buses-subgroups',
        title: '16 Mix Busů a konfigurace Subskupin',
        badge: 'Sběrnice',
        summary: 'Přednastavení chování sběrnic jako variabilní Aux sendy nebo pevné Subskupiny s jednotkovým ziskem.',
        content: `Konzole X32 Producer disponuje **16 mix sběrnicemi (Mix Buses)**. Ty lze v menu **Setup > Config** globálně nebo individuálně nastavit do dvou různých režimů:

1. **Klasický Bus (Aux Send):** Kanály do něj posílají signál s libovolnou nezávislou úrovní (pomocí faderu v režimu Sends on Faders nebo otočného enkodéru). Využívá se pro odposlechové cesty a interní efektové smyčky (Reverb, Delay).
2. **Subskupina (Sub Group):** Kanály odesílají do subskupiny signál s fixním zesílením 0 dB (unity gain) a jejich vzájemný poměr odpovídá poloze jejich hlavních faderů. Slouží ke sloučení skupiny nástrojů (např. všech mikrofonů bicí soupravy nebo sboru) do jedné stereo stopy pro společné zpracování ekvalizérem a kompresorem.

**Oblíbené předvolby sběrnic v Setup > Config:**
- **8 pre-fader aux, 8 post-fader aux:** 8 cest pro odposlechy + 8 pro interní/externí efekty.
- **8 pre-fader aux, 4 post-fader aux, 4 sub-groups:** 8 odposlechů, 4 efekty, 4 subskupiny (např. bicí a vokály).
- **6 pre-fader aux, 4 post-fader aux, 6 sub-groups:** Vhodné pro větší kapely vyžadující více podskupin.`,
        keyPoints: [
          'Každá ze 16 sběrnic má vlastní 6-pásmový plně parametrický EQ a kompresor',
          'Sběrnice lze libovolně stereofonně linkovat do stereo párů (např. Bus 1+2 pro stereo in-ear)',
          'Signál z libovolné sběrnice lze poslat do hlavní sběrnice Main LR i do matic'
        ]
      },
      {
        id: 'x32-5-2-dca-groups',
        title: '8 DCA skupin a bleskové přiřazování',
        badge: 'DCA',
        summary: 'Digitálně řízené zesilovače pro pohodlné řízení celých sekcí nástrojů jediným faderem.',
        content: `Na rozdíl od subskupiny DCA nesčítá zvukový signál dohromady a neprochází žádným společným DSP procesorem. **DCA skupina dálkově řídí úrovně faderů všech přiřazených kanálů.**

Pokud máte 4 vokalisty a přiřadíte je do DCA 1:
- Posunutím DCA faderu zvednete nebo ztišíte všechny 4 vokalisty současně, přičemž jejich vzájemný poměr hlasitostí zůstane přesně zachován.
- Kdykoliv můžete sáhnout na konkrétní fader třetího vokalisty a doladit pouze jeho úroveň.

**Jak bleskově přiřadit kanály do DCA na X32 Producer:**
1. Na pravé faderové sekci přepněte na vrstvu **DCA 1-8**.
2. **Stiskněte a držte tlačítko SELECT u požadované DCA skupiny** (např. DCA 1).
3. Zatímco tlačítko držíte, podívejte se na levou faderovou sekci: **stiskněte tlačítka SELECT u všech kanálů, které chcete do DCA přiřadit!** Tlačítka se rozsvítí.
4. Můžete přepnout i na jinou vrstvu (např. Channels 9-16 nebo FX Returns) a přidat další stopy.
5. Pusťte tlačítko DCA Select – hotovo!
6. Kdykoliv chcete zkontrolovat, které stopy do DCA patří, stačí stisknout tlačítko SELECT dané DCA – přiřazené kanály se okamžitě rozsvítí.`,
        keyPoints: [
          'DCA nemění fázové vztahy ani nezpůsobuje zpoždění signálu',
          'Pojmenování, ikony a barvy DCA skupin lze upravit v menu Setup > DCA Groups nebo stiskem Utility',
          'Ztišením (Mute) DCA skupiny okamžitě umlčíte všechny přiřazené nástroje'
        ]
      },
      {
        id: 'x32-5-3-matrix-crossover',
        title: '6 Maticových výstupů a Crossover výhybky',
        badge: 'Matrix',
        summary: 'Nezávislé zóny, zpožděné věže, VIP salonky a rozdělení pásem pro subwoofery a satelity.',
        content: `Konzole nabízí **6 maticových výstupů (Matrix 1-6)**. Matice se nenapájí přímo z jednotlivých mikrofonů, ale **z hlavního mixu Main L/R/C a ze 16 mix sběrnic**.

**Typická využití matic:**
1. **Zpožděné reproboxy (Delay Towers):** Pošlete Main L/R do Matrix 1 a 2, nastavte digitální zpoždění odpovídající vzdálenosti v metrech a pošlete do reproboxů uprostřed sálu.
2. **Nahrávací feed nebo živé streamování:** Vytvoření samostatného mixu pro kamery s vlastním kompresorem a ekvalizérem.
3. **Aktivní Crossover výhybka pro PA systém:**
   - Nastavte **Matrix 1** pro subwoofery a **Matrix 2** pro satelity (top bedny).
   - Otevřete EQ v záložce *Mode* a zvolte filtr **Linkwitz-Riley 24 dB/oct** nebo **Butterworth 24 dB/oct**.
   - Na Matrix 1 nastavte Low-Pass filtr na 90 Hz.
   - Na Matrix 2 nastavte High-Pass filtr na stejných 90 Hz.
   - Máte dokonale fázově sladěnou aktivní výhybku přímo v pultu bez potřeby externího procesoru!`,
        keyPoints: [
          'Matice mají plnou dynamiku, 6-pásmový EQ i delay až do 500 ms',
          'V záložce Config lze v případě potřeby otočit fázi pro subwoofer (Phase Invert)',
          'Od firmwaru 1.10 lze matice krmit i z pre-fader zdrojů'
        ]
      }
    ]
  },
  {
    id: 'x32-ch6-fx-rack',
    number: 6,
    title: 'Virtuální FX rack (8 stereo procesorů, 39 modelů)',
    icon: 'Sparkles',
    summary: 'Přehled interních efektů: Reverb Lexicon, EMT250, delaye, lampové saturátory, kytarové aparáty SansAmp, SPL Transient a De-Esser.',
    subsections: [
      {
        id: 'x32-6-1-fx-architecture',
        title: 'Architektura efektového racku a konfigurace',
        badge: 'FX Rack',
        summary: '8 true-stereo (16 mono) procesorů rozdělených na sendové a insertní sloty.',
        content: `Virtuální efektový rack X32 Producer eliminuje nutnost tahat s sebou těžké externí racky s procesory. Nabízí **8 true-stereo (nebo 16 mono) procesorů** s celkem 39 detailními modely.

**Rozdělení slotů:**
- **FX 1 až FX 4:** Výkonné procesory určené primárně pro **Side-Chain / Send efekty** (prostorné reverby, delaye, chorusy), ale lze je použít i jako inserty. Návraty těchto efektů se ovládají na 6. faderové vrstvě (FX Returns).
- **FX 5 až FX 8:** Vyhrazené pro **kanálové inserty** (grafické ekvalizéry GEQ, TruEQ, limitery, lampové saturátory, de-essery, transient designery).

**Jak vložit efekt do stopy (Insert):**
1. Stiskněte tlačítko **EFFECTS** a na záložce *Home* vyberte enkodérem slot FX 5 až 8.
2. Vyberte požadovaný efekt (např. *Precision Limiter* nebo *Wave Designer*).
3. Přejděte na vybraný kanál, stiskněte **HOME > Config** a enkodérem 6 vyberte bod **Ins FX 5L** a stisknutím jej aktivujte.`,
        keyPoints: [
          'FX 1-4 mají dedikované faderové návraty FX1L až FX4R',
          'Stereo efekty lze přepnout do režimu Dual pro nezávislé nastavení levého a pravého kanálu',
          'U grafických EQ lze stiskem enkodéru 1 aktivovat režim GEQ on Faders (ovládání pásem pomocí faderů!)'
        ]
      },
      {
        id: 'x32-6-2-fx-models',
        title: 'Klíčové algoritmy a legendární emulace',
        badge: 'Algoritmy',
        summary: 'Přehled nejpopulárnějších efektových modelů a jejich inspirací.',
        content: `X32 Producer obsahuje přesné fyzikální modelace slavných studiových legend:

### Dozvukové efekty (Reverby)
- **Hall Reverb (Lexicon Hall):** Bohatý, trojrozměrný dozvuk pro velké sály a koncertní atmosféru.
- **Plate Reverb (Lexicon PCM-70):** Rychlý, jasný a hustý plechový dozvuk. Klasika na bicí (snare) a sólové vokály.
- **Vintage Room (Quantec QRS):** Přirozená akustika malých a středních místností pro akustické kytary a perkuse.
- **Vintage Reverb (EMT250):** Legendární německý digitální reverb s jiskřivými výškami, který nezamlží mix.
- **Gated & Reverse Reverb (Lexicon 480L):** Typický mohutný zvuk bicích 80. let a dramatické vokální efekty.

### Zpoždění a modulace (Delay & Modulation)
- **Stereo Delay & Triple Delay:** Až 3 sekundy zpoždění s rytmickými zlomky, lo/hi-cut filtry a křížovým feedbackem.
- **Chorus / Flanger / Phaser / Tremolo:** Simulace páskového comb-filteringu, rotary leslie boxu a vintage vibráta.
- **Stereo Pitch Shifter:** Jemný detuning pro zdvojení vokálů nebo radikální transpozice o oktávu nahoru/dolů.

### Dynamické a barvící procesory
- **Wave Designer (SPL Transient Designer):** Zásadní nástroj pro bicí! Umožňuje nezávisle zesílit nebo zkrátit náběh (Attack) a dozvuk (Sustain).
- **Precision Limiter:** Nekompromisní špičkový limitér s autogainem pro ochranu reproboxů.
- **Stereo Tube Stage / Overdrive:** Lampová saturace od jemného zahřátí po distortion.
- **Dual Guitar Amp (Tech 21 SansAmp):** Kytarový aparát s emulací reproboxu pro přímé zapojení elektrické kytary bez zesilovače na pódiu!
- **Stereo De-Esser:** Frekvenčně závislý kompresor sykavek pro ženské i mužské hlasy.`,
        keyPoints: [
          'Všechny algoritmy běží na dedikovaném 40-bitovém DSP procesoru',
          'Vynikající kvalita dozvuků inspirovaná algoritmy Lexicon, EMT a Quantec',
          'Možnost ukládat presety jednotlivých efektů do knihovny na USB'
        ]
      }
    ]
  },
  {
    id: 'x32-ch7-usb-daw',
    number: 7,
    title: 'X-USB rozhraní a nahrávání',
    icon: 'Disc',
    summary: '32x32 USB audio interface pro DAW, virtuální soundcheck bez kapely a přímé 2-stopé nahrávání na USB flash disk.',
    subsections: [
      {
        id: 'x32-7-1-x-usb-daw',
        title: '32-kanálové USB 2.0 audio rozhraní (X-USB)',
        badge: 'DAW',
        summary: 'Nahrávání živých koncertů do PC/Mac a virtuální zvuková zkouška.',
        content: `Konzole X32 Producer je vybavena rozšiřující kartou **X-USB**, která z pultu činí výkonnou 32vstupovou a 32výstupovou zvukovou kartu.

**Režimy konfigurace v Setup > Card:**
- **32 in / 32 out:** Maximální kapacita pro plné vícestopé nahrávání i přehrávání.
- **16 in / 16 out:** Snižuje nároky na USB sběrnici počítače a umožňuje režim přímého overdubingu s nulovou latencí.
- **32 in / 8 out nebo 8 in / 32 out:** Pro mixdown z DAW do pultu nebo menší nahrávací relace.

**Virtuální zvuková zkouška (Virtual Soundcheck):**
1. Během krátké linkové zkoušky nahrajte do notebooku (Reaper, Pro Tools, Cubase, Studio One) všech 32 stop koncertu.
2. Kapela může odejít na večeři nebo odpočívat.
3. V menu **Routing > Home** přepněte bloky vstupů z Local/AES50 na **Card 1-8, Card 9-16, Card 17-24, Card 25-32**.
4. Spusťte přehrávání z notebooku – do pultu proudí nahrávka přesně v těch kanálech, jako by kapela stála na pódiu!
5. V klidu dolaďte ekvalizéry, kompresory, efekty i odposlechy.`,
        keyPoints: [
          'Windows vyžaduje instalaci oficiálního X32 ASIO driveru z behringer.com',
          'Na macOS funguje karta ihned bez ovladačů přes standardní CoreAudio',
          'Při přepnutí vstupů na Card funguje Gain ovladač na kanálu jako digitální trim ±12 dB'
        ]
      },
      {
        id: 'x32-7-2-usb-recorder',
        title: 'Přímé 2-stopé nahrávání na USB disk',
        badge: 'USB Disk',
        summary: 'Záznam stereo mixu přímo na USB flashku ve formátu 16-bit WAV.',
        content: `Na horním panelu vedle 5" displeje se nachází konektor USB Type-A pro připojení flash disku.

**Postup nahrávání:**
1. Zasuňte USB flash disk naformátovaný v souborovém systému **FAT32** (nebo FAT16).
2. Stiskněte tlačítko **VIEW** vedle USB konektoru.
3. Na displeji se zobrazí grafické rozhraní starého kotoučového magnetofonu.
4. Na záložce **Config** vyberte zdroj záznamu (standardně *Main L a R*, ale lze zvolit i libovolný Mix Bus nebo Matrix).
5. Stisknutím enkodéru 5 (**RECORD**) spustíte nahrávání.
6. Nahrávka se ukládá jako bezeztrátový soubor WAV (16-bit, vzorkovací frekvence 44.1 nebo 48 kHz dle nastavení pultu).
7. Maximální velikost jednoho souboru je omezena systémem FAT na 2 GB (cca 3 hodiny nepřetržitého stereo záznamu).

**Přehrávání pauzové hudby (Break Music):**
Z flash disku lze také přehrávat WAV soubory. V záložce *Config* můžete aktivovat **Playback Folder Mode**, který po dohrání skladby automaticky pokračuje další skladbou ve složce. Úroveň přehrávání se ovládá faderem **Aux 7/8**.`,
        keyPoints: [
          'USB disk musí být formátován jako FAT32, nikoliv exFAT nebo NTFS',
          'Doporučuje se před důležitou akcí disk otestovat a zformátovat',
          'USB port slouží také k bleskové aktualizaci firmwaru a zálohování scén'
        ]
      }
    ]
  },
  {
    id: 'x32-ch8-scenes-safes',
    number: 8,
    title: 'Scény, Paměti, Safes a Síťové řízení',
    icon: 'Radio',
    summary: 'Ukládání a vyvolávání scén, funkce Parameter Safe a Channel Safe pro ochranu nastavení a dálkové ovládání přes X32-Edit a X32-Mix.',
    subsections: [
      {
        id: 'x32-8-1-scenes-safes',
        title: 'Správa scén a ochrana parametrů (Safes)',
        badge: 'Scény',
        summary: 'Ukládání až 100 kompletních scén s detailní selektivní ochranou před nechtěným přepsáním.',
        content: `Konzole X32 Producer pojme **až 100 kompletních paměťových scén (Scenes)** včetně zisků preampů, faderů, routingu i efektů.

**Vyvolání a ukládání scén:**
- Tlačítky **PREV** a **NEXT** procházíte seznam scén na displeji.
- Stisknutím červeného tlačítka **GO** se scéna okamžitě načte.
- Tlačítkem **UNDO** se můžete kdykoliv vrátit k předchozímu stavu!

**Klíčový koncept: Parameter Safe a Channel Safe**
Při divadelních představeních nebo festivalech často potřebujete načíst novou scénu pro další kapelu, ale **nechcete, aby se změnilo nastavení hlavního moderátora nebo zisk mikrofonů**:
1. **Parameter Safe:** Umožňuje globálně uzamknout určité parametry před přepsáním (např. *HA Gain* – zisky preampů, *Routing* – směrování výstupů, *Output Patch*).
2. **Channel Safe:** Umožňuje zcela ochránit vybrané kanály (např. Channel 1 pro hlavního herce nebo bezdrátový mikrofon moderátora). I když načtete jinou scénu, tento kanál zůstane beze změny!`,
        keyPoints: [
          'Funkce UNDO umožňuje okamžitě vrátit omylem načtenou scénu',
          'Parameter Safe chrání typy parametrů napříč všemi kanály',
          'Channel Safe izoluje konkrétní kanály od jakýchkoliv změn scén'
        ]
      },
      {
        id: 'x32-8-2-network-remote',
        title: 'Dálkové ovládání (X32-Edit pro PC/Mac a X32-Mix pro iPad)',
        badge: 'Síť',
        summary: 'Ethernetové připojení, nastavení IP adresy a obousměrná synchronizace přes protokol OSC.',
        content: `Na zadním panelu X32 Producer je umístěn standardní síťový konektor **Ethernet (RJ45)** pro připojení k Wi-Fi routeru nebo počítači.

**Konfigurace sítě v Setup > Network:**
1. Nastavte IP adresu (např. \`192.168.1.100\`), masku podsítě (\`255.255.255.0\`) a bránu.
2. Připojte tablet (iPad/Android) nebo notebook do stejné Wi-Fi sítě.
3. Spusťte bezplatnou aplikaci **X32-Edit** (PC/Mac/Linux) nebo **X32-Mix** (iPad).
4. V aplikaci zadejte IP adresu pultu a zvolte **Connect**.

**Obousměrná synchronizace (X32-Edit):**
- **Console -> PC:** Stáhne aktuální nastavení z mixu do počítače.
- **PC -> Console:** Odešle show připravenou doma v počítači do pultu.
- Komunikace probíhá přes bleskový protokol **OSC (Open Sound Control)** s nulovým zpožděním.`,
        keyPoints: [
          'Možnost kompletního bezdrátového míchání z hlediště i z pódia',
          'Podpora nezávislého ovládání odposlechů muzikanty přes aplikaci X32-Q na mobilních telefonech',
          'Pro stabilní provoz na velkých akcích používejte kvalitní 5 GHz Wi-Fi router'
        ]
      }
    ]
  },
  {
    id: 'x32-ch9-custom-assign-midi',
    number: 9,
    title: 'Custom Assign sekce a MIDI ovládání',
    icon: 'Sliders',
    summary: '3 banky po 8 programovatelných tlačítkách A/B/C, Jump-to-Page zkratky a DAW dálkové ovládání Mackie Control & HUI.',
    subsections: [
      {
        id: 'x32-9-1-custom-assign',
        title: 'Uživatelská tlačítka Assign (Banky A, B, C)',
        badge: 'Assign',
        summary: '24 okamžitě dostupných tlačítek pro nejčastější úkony bez nutnosti hledání na displeji.',
        content: `V pravé části panelu X32 Producer se nachází sekce **Assign** s 8 dedikovanými tlačítky a třemi přepínatelnými bankami **A, B a C** (celkem 24 volně programovatelných funkcí).

**Typická přiřazení tlačítek Assign v praxi:**
- **Mute efektů (FX Mute):** Tlačítko 1 okamžitě umlčí reverb na vokálech při mluveném slově mezi písničkami.
- **Tap Tempo:** Vyťukávání tempa pro delay na vokálech přímo prstem na tlačítku.
- **Jump to Page:** Okamžitý skok na libovolnou stránku displeje (např. RTA měřáky, GEQ nebo USB rekordér).
- **Mute Groups:** Rychlé sepnutí vybrané Mute skupiny.
- **Přepínání stop DAW:** Tlačítka posunu v nahrávacím programu.

**Postup programování v menu Assign:**
1. Stiskněte tlačítko **VIEW** v sekci Assign.
2. Zvolte banku (**Set A, Set B nebo Set C**).
3. Vyberte tlačítko 1 až 8 a otočením enkodéru zvolte kategorii (*Mute Channel, Jump to Page, Inserts, Effect button, MIDI*).
4. Stisknutím enkodéru volbu potvrďte.`,
        keyPoints: [
          '3 banky po 8 tlačítkách poskytují 24 rychlých zkratek',
          'Ideální pro Tap Tempo a okamžité umlčení dozvuků mezi skladbami',
          'Jump to Page šetří čas při živém vystoupení'
        ]
      },
      {
        id: 'x32-9-2-daw-midi',
        title: 'DAW Remote Control (Mackie Control, HUI & MIDI)',
        badge: 'MIDI & DAW',
        summary: 'Využití motorizovaných faderů X32 Producer pro ovládání hlasitostí a automatizací v hudebních programech.',
        content: `Díky tlačítku **DAW REMOTE** nad pravou sekcí faderů se X32 Producer dokáže proměnit v profesionální hardwarový kontroler pro nahrávací software.

**Podporované protokoly (Setup > Remote):**
- **Mackie Control (MCU):** Podporováno v aplikacích Cubase, Nuendo, Reaper, Studio One, Logic Pro, Ableton Live.
- **HUI:** Určeno specificky pro Pro Tools.
- **Raw MIDI CC:** Vysílání standardních MIDI kontrolérů na libovolném MIDI kanálu.

**Funkce faderů v režimu DAW Remote:**
- 8 motorizovaných faderů pravé sekce ovládá hlasitosti vybraných 8 stop v DAW.
- Tlačítka SELECT a SOLO vybírají a sólují stopy v DAW.
- Tlačítko Sends on Fader aktivuje zápis dotykové automatizace faderu (Touch/Latch automation).
- Přepínání bank stop po 8 se provádí tlačítkem DCA 1-8.
- Tlačítka Bus 1-8 aktivují režim *Record Ready* pro dané stopy v DAW.`,
        keyPoints: [
          'Ovládání hlasitostí v DAW motorizovanými fadery s hmatovou odezvou',
          'Přenos probíhá přímo po USB kabelu přes X-USB kartu bez potřeby MIDI převodníku',
          'Podpora příjmu MIDI Program Change pro automatické přepínání scén z playbacku'
        ]
      }
    ]
  },
  {
    id: 'x32-ch10-hookup-specs',
    number: 10,
    title: 'Schémata zapojení, AES50 Stageboxy a Specifikace',
    icon: 'Cpu',
    summary: 'Propojení se stageboxem S16 přes stíněný Cat-5e kabel, digitální FOH/Monitor split a technická specifikace.',
    subsections: [
      {
        id: 'x32-10-1-aes50-stagebox',
        title: 'Zapojení digitálního stageboxu S16 a Ultranet P-16',
        badge: 'Zapojení',
        summary: 'Náhrada těžkého analogového páráku jediným ethernetovým kabelem do vzdálenosti 100 metrů.',
        content: `Digitální technologie **Klark Teknik SuperMAC AES50** umožňuje přenášet 48 kanálů zvuku obousměrně se zpožděním pouhých 3 vzorků (0.06 ms) přes standardní stíněný Cat-5e kabel zakončený konektory Neutrik etherCON.

**Zapojení se stageboxem Behringer S16:**
1. Propojte port **AES50 A** na zadním panelu pultu X32 Producer s portem **AES50 A** na pódiovém stageboxu S16.
2. Na pultu stiskněte **ROUTING > Home**:
   - Nastavte *Inputs 1-8* na **AES50 A 1-8**.
   - Nastavte *Inputs 9-16* na **AES50 A 9-16**.
3. Na pultu otevřete **ROUTING > AES50 A**:
   - Nastavte *Output 1-8* na **Out 1-8**.
   - Nyní všech 8 analogových XLR výstupů na jevištním stageboxu S16 nese výstupy pultu (Out 1-6 pro odposlechy, Out 7-8 pro hlavní PA systém)!

**Osobní monitoring Ultranet P-16:**
- Port **Ultranet** na pultu (nebo na stageboxu S16) napájí digitální osobní mixy P16-M.
- V menu **ROUTING > P16** můžete přiřadit 16 stop (např. přímé výstupy zpěvů, bicích, basy, kytar a stereo mix) a muzikanti na pódiu si sami míchají vlastní odposlech do sluchátek.`,
        keyPoints: [
          'Vždy používejte kvalitní stíněný kabel STP Cat-5e s kovovými konektory etherCON pro ochranu před statickou elektřinou (ESD)',
          'Maximální délka AES50 kabelu je 100 metrů (330 stop)',
          'Na jeden port AES50 lze kaskádově zapojit až tři stageboxy S16 za sebou'
        ]
      },
      {
        id: 'x32-10-2-specs',
        title: 'Kompletní technické parametry X32 Producer',
        badge: 'Specifikace',
        summary: 'Podrobné technické údaje, rozměry, zkreslení a latence z oficiální dokumentace.',
        tables: [
          {
            title: 'Zpracování zvuku a kapacity',
            headers: ['Parametr', 'Hodnota'],
            rows: [
              ['Počet procesních kanálů', '32 vstupů, 8 Auxů, 8 FX návratů, 16 Aux sběrnic, 6 matic, Main LRC'],
              ['Interní efektové motory', '8 true-stereo (16 mono) procesorů, 39 modelů'],
              ['Interní paměť scén', '100 kompletních scén s preampy a fadery'],
              ['Signálové zpracování', '40-bitové plovoucí řádové číslo (Floating Point)'],
              ['Převodníky A/D - D/A', 'Cirrus Logic 24-bit @ 44.1 / 48 kHz, 114 dB dynamický rozsah'],
              ['Latence In -> Out (konzole)', '0.8 ms (Local In -> DSP -> Local Out)'],
              ['Latence In -> Out (stagebox)', '1.1 ms (Stagebox In -> DSP -> Stagebox Out)']
            ]
          },
          {
            title: 'Mikrofonní předzesilovače (Midas)',
            headers: ['Parametr', 'Hodnota'],
            rows: [
              ['Počet vstupů s preampem', '16 XLR programovatelných analogových preampů'],
              ['Zkreslení THD + šum', '< 0.006% (A-váženo při zisku 20 dB, výstup 0 dBu)'],
              ['Maximální vstupní úroveň', '+23 dBu před přebuzením (Non-clip)'],
              ['Fantomové napájení', '+48 V nezávisle spínatelné na každý kanál'],
              ['Ekvivalentní vstupní šum (EIN)', '-128 dBu'],
              ['CMRR potlačení součtového signálu', '> 70 dB při 20 dB gainu (> 80 dB při 40 dB)']
            ]
          },
          {
            title: 'Fyzické rozměry a napájení',
            headers: ['Vlastnost', 'Hodnota'],
            rows: [
              ['Rozměry (Š × H × V)', '490 × 506 × 163 mm (19.3" × 19.9" × 6.4")'],
              ['Hmotnost', '11.4 kg (25.1 lbs)'],
              ['Displej', '5" TFT, 800 × 480 pixelů, 262 tisíc barev'],
              ['Napájecí zdroj', 'Spínaný autorange 100-240 V (50/60 Hz)'],
              ['Spotřeba energie', '70 W']
            ]
          }
        ],
        content: `Konzole X32 Producer představuje vyvážený etalon spolehlivosti a profesionální zvukové kvality prověřené na desetitisících pódií po celém světě. Všechny analogové obvody mikrofonních vstupů pocházejí z konstrukční dílny britského výrobce MIDAS.`
      }
    ]
  }
];

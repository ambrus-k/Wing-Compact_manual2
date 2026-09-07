import urllib.request
import urllib.parse
import json
import time
import sys

mics = [
    ("shure-sm58", "Shure SM58", "Dynamický", "Live vokály, mluvené slovo", "Nejpoužívanější vokální mikrofon na světě s kardioidní charakteristikou.", "Shure SM58"),
    ("shure-sm57", "Shure SM57", "Dynamický", "Snare drum, kytarová komba", "Průmyslový standard pro nástrojové snímání, zvládne velmi vysoký tlak.", "Shure SM57"),
    ("shure-sm7b", "Shure SM7B", "Dynamický", "Broadcast, vokály, podcasty", "Zlatý standard pro rozhlas a streaming s masivním potlačením okolí.", "Shure SM7B"),
    ("shure-beta58a", "Shure Beta 58A", "Dynamický", "Live vokály", "Superkardioidní vylepšená verze 58 s průraznějšími výškami.", "Shure Beta 58"),
    ("shure-beta57a", "Shure Beta 57A", "Dynamický", "Snare, tomy, dechy", "Velmi výkonný nástrojový mikrofon odolný proti zpětné vazbě.", "Shure Beta 57"),
    ("shure-beta52a", "Shure Beta 52A", "Dynamický", "Kick drum, basa", "Standard pro velký buben s hlubokým, konkrétním zvukem.", "Shure Beta 52A"),
    ("shure-beta91a", "Shure Beta 91A", "Kondenzátorový (PZM)", "Kick drum, piana", "Povrchový mikrofon dodávající obrovský 'attack' uvnitř bubnu.", "Shure Beta 91A"),
    ("shure-ksm8", "Shure KSM8", "Dynamický", "High-end vokály", "První dynamický mikrofon na světě se dvěma membránami, téměř nulový proximity efekt.", "Shure KSM8"),
    ("shure-ksm9", "Shure KSM9", "Kondenzátorový", "Live vokály (high-end)", "Špičkový kondenzátor s přepínatelnou charakteristikou pro prémiové zpěváky.", "Shure KSM9"),
    ("shure-ksm32", "Shure KSM32", "Kondenzátorový", "Studio, overheady", "Kondenzátor s mírným zvednutím výšek pro přirozenou čistotu.", "Shure KSM32"),
    ("shure-ksm44a", "Shure KSM44A", "Kondenzátorový (LDC)", "Studio univerzál", "Vícecharakteristikový prémiový studiový mikrofon s velmi tichou elektronikou.", "Shure KSM44"),
    ("shure-sm81", "Shure SM81", "Kondenzátorový (SDC)", "Overheady, hi-hat", "Legendární malomembránový mikrofon s rovnou frekvenční křivkou.", "Shure SM81"),
    ("shure-ksm137", "Shure KSM137", "Kondenzátorový (SDC)", "Orchestr, overheady", "Extrémně přesná tužka pro kritické akustické nástroje.", "Shure KSM137"),
    ("shure-pga48", "Shure PGA48", "Dynamický", "Mluvené slovo, karaoke", "Základní dostupný mikrofon pro amatérské účely a promlouvání.", "Shure PGA48"),

    ("senn-md421", "Sennheiser MD 421", "Dynamický", "Tomy, žestě, basa", "Ikonický dynamický mikrofon 'břitva' s přepínačem basů.", "Sennheiser MD421"),
    ("senn-md441", "Sennheiser MD 441", "Dynamický", "Vokály, dechy, snare", "Superkardioidní mikrofon s přesností kondenzátorového.", "Sennheiser MD441"),
    ("senn-e604", "Sennheiser e604", "Dynamický", "Tomy, snare", "Malý černý mikrofon s klipsnou, naprostý live standard pro bicí.", "Sennheiser e604"),
    ("senn-e904", "Sennheiser e904", "Dynamický", "Tomy, snare", "Kovový, robustnější bratr e604 s plnějším charakterem.", "Sennheiser e904"),
    ("senn-e906", "Sennheiser e906", "Dynamický", "Kytarová komba", "Plochý mikrofon ideální pro přehození přes hranu kytarového komba.", "Sennheiser e906"),
    ("senn-e835", "Sennheiser e835", "Dynamický", "Live vokály", "Cenově dostupný, spolehlivý mikrofon pro hlavní i doprovodný zpěv.", "Sennheiser e835"),
    ("senn-e935", "Sennheiser e935", "Dynamický", "Live vokály", "Jeden z nejoblíbenějších současných vokálních mikrofonů na pódia.", "Sennheiser e935"),
    ("senn-e945", "Sennheiser e945", "Dynamický", "Live vokály", "Superkardioidní varianta e935, poskytuje skvělou izolaci na hlučném pódiu.", "Sennheiser e945"),
    ("senn-e965", "Sennheiser e965", "Kondenzátorový", "High-end vokály", "Vrcholný live kondenzátorový mikrofon s velkou membránou od Sennheiseru.", "Sennheiser e965"),

    ("akg-d112", "AKG D112", "Dynamický", "Kick drum, basa", "Ikonické vajíčko pro snímání velkého bubnu s jasným kickem.", "AKG D112"),
    ("akg-c414", "AKG C414", "Kondenzátorový (LDC)", "Studio univerzál, overheady", "Naprostá legenda, až 9 charakteristik. Mimořádně univerzální a flexibilní.", "AKG C414"),
    ("akg-c214", "AKG C214", "Kondenzátorový (LDC)", "Studio, akustika", "Cenově dostupná verze s charakterem C414 (pouze kardioida).", "AKG C214"),
    ("akg-c451b", "AKG C451 B", "Kondenzátorový (SDC)", "Hi-hat, akustická kytara", "Jiskřivý zvuk s výraznými výškami pro dokonalý cinkot hi-hatky.", "AKG C451"),
    ("akg-c1000s", "AKG C1000 S", "Kondenzátorový (SDC)", "Live, sbory, zkušebny", "Švýcarský nůž mikrofonů, možnost napájení z AA baterií.", "AKG C1000"),
    ("akg-d5", "AKG D5", "Dynamický", "Live vokály", "Odolný vokální mikrofon, velký konkurent SM58 s mírně čistším podáním.", "AKG D5"),
    ("akg-d7", "AKG D7", "Dynamický", "Live vokály", "Prémiový dynamický mikrofon od AKG, křišťálově čistý vokál.", "AKG D7"),

    ("neu-u87", "Neumann U 87", "Kondenzátorový (LDC)", "Studio vokály", "Nejpoužívanější high-end studiový mikrofon současnosti.", "Neumann U87"),
    ("neu-u47", "Neumann U 47", "Kondenzátorový (LDC/Elektronka)", "Studio vokály", "Historický milník. Zvuk Franka Sinatry či The Beatles.", "Neumann U47"),
    ("neu-u67", "Neumann U 67", "Elektronkový", "Studio vokály, kytary", "Neskutečně hladký a teple znějící elektronkový mikrofon.", "Neumann U67"),
    ("neu-km184", "Neumann KM 184", "Kondenzátorový (SDC)", "Akustika, overheady", "Tužkový mikrofon s maximálně přirozeným zabarvením.", "Neumann KM184"),
    ("neu-tlm102", "Neumann TLM 102", "Kondenzátorový (LDC)", "Domácí studio", "Kompaktní vstup do světa velké značky Neumann.", "Neumann TLM 102"),
    ("neu-tlm103", "Neumann TLM 103", "Kondenzátorový (LDC)", "Voiceover, zpěv", "Silný signál s vysokým odstupem signálu od šumu, bez transformátoru.", "Neumann TLM 103"),
    ("neu-tlm107", "Neumann TLM 107", "Kondenzátorový (LDC)", "Studio, orchestr", "Moderní vícecharakteristikový mikrofon s neuvěřitelně neutrálním zvukem.", "Neumann TLM 107"),
    ("neu-kms105", "Neumann KMS 105", "Kondenzátorový", "Live vokály", "Dokonalý detailní kondenzátor pro živé zpěváky do ruky.", "Neumann KMS 105"),

    ("audix-d2", "Audix D2", "Dynamický", "Tomy (menší)", "Těsný a průrazný zvuk navržený speciálně pro rack tomy.", "Audix D2"),
    ("audix-d4", "Audix D4", "Dynamický", "Floor tom, djembe", "Kompaktní, ale schopen snímat extrémně hluboké frekvence pod 40 Hz.", "Audix D4"),
    ("audix-d6", "Audix D6", "Dynamický", "Kick drum, baskytara", "Cvakavý agresivní zvuk pro moderní metal a rock, 'pre-EQed'.", "Audix D6"),
    ("audix-i5", "Audix i5", "Dynamický", "Snare, kytary", "Bytelnější tělo než SM57 a modernější středový projev.", "Audix i5"),
    ("audix-om2", "Audix OM2", "Dynamický", "Live vokály", "Skvělý odstup od vazby za příznivou cenu pro zkušebny.", "Audix OM2"),
    ("audix-om5", "Audix OM5", "Dynamický", "Live vokály", "Vysoce směrový, vyřezává vokál z extrémně hlučného pódia.", "Audix OM5"),
    ("audix-om7", "Audix OM7", "Dynamický", "Live vokály (velmi hlasité)", "Nízký gain, vyžaduje kvalitní preamp, ale absolutně odolný vůči vazbě.", "Audix OM7"),

    ("at-at2020", "Audio-Technica AT2020", "Kondenzátorový", "Domácí studio, podcasty", "Nejprodávanější dostupný studiový mikrofon světa.", "Audio-Technica AT2020"),
    ("at-at4033", "Audio-Technica AT4033", "Kondenzátorový (LDC)", "Vokály, akustika", "Klasika z 90. let s velmi jasným a pevným projevem.", "Audio-Technica AT4033"),
    ("at-at4040", "Audio-Technica AT4040", "Kondenzátorový (LDC)", "Studio univerzál", "Vysoce hladký a přirozený zvuk na akustické nástroje.", "Audio-Technica AT4040"),
    ("at-at4050", "Audio-Technica AT4050", "Kondenzátorový (LDC)", "Vokály, ambient", "Transparentní vícemembránový mikrofon, na který spoléhají profesionálové.", "Audio-Technica AT4050"),
    ("at-ae6100", "Audio-Technica AE6100", "Dynamický", "Live vokály", "Výrazný a dravý dynamický mikrofon pro rockové a metalové zpěváky.", "Audio-Technica AE6100"),

    ("rode-nt1a", "Rode NT1-A", "Kondenzátorový (LDC)", "Zpěv, domácí studio", "Mikrofon s nejnižším vlastním šumem (5dB), ostrý na výškách.", "Rode NT1"),
    ("rode-nt2a", "Rode NT2-A", "Kondenzátorový (LDC)", "Studio univerzál", "Oceňovaný vícecharakteristikový sourozenec populární NT1.", "Rode NT2"),
    ("rode-nt5", "Rode NT5", "Kondenzátorový (SDC)", "Overheady, sbor", "Tužkové mikrofony vynikající pro čisté stereo snímání.", "Rode NT5"),
    ("rode-m5", "Rode M5", "Kondenzátorový (SDC)", "Akustika, domácí studio", "Cenově velmi dostupné 'tužky' s keramickým potahem.", "Rode M5"),
    ("rode-procaster", "Rode Procaster", "Dynamický", "Podcast, broadcast", "Dynamická alternativa k SM7B, vynikající potlačení sykavek.", "Rode Procaster"),

    ("beyer-m88", "Beyerdynamic M 88 TG", "Dynamický", "Kick drum, vokály", "Hyperkardioida s obrovským basovým potenciálem, milován Philem Collinsem.", "Beyerdynamic M88"),
    ("beyer-m160", "Beyerdynamic M 160", "Páskový (Ribbon)", "Kytary, dechy", "Dvojitý páskový mikrofon, neobvyklá směrovost, vyhlazuje digitální ostrost.", "Beyerdynamic M160"),
    ("beyer-m201", "Beyerdynamic M 201 TG", "Dynamický", "Snare, akustika", "Maličký tužkový dynamický mikrofon, král čistých bubnů bez přeslechů.", "Beyerdynamic M201"),
    ("beyer-tgv70d", "Beyerdynamic TG V70d", "Dynamický", "Live vokály", "Extrémně blízko posazený proximity efekt dodává zpěvu neuvěřitelnou hloubku.", "Beyerdynamic TG V70"),

    ("ev-re20", "Electro-Voice RE20", "Dynamický", "Broadcast, kick, basa", "Ikonický 'sloní' mikrofon. Nemění barvu zvuku při přiblížení.", "Electro-Voice RE20"),
    ("ev-re320", "Electro-Voice RE320", "Dynamický", "Podcast, kick drum", "Modernější, levnější bratr RE20 se speciálním EQ spínačem pro kopák.", "Electro-Voice RE320"),
    ("ev-nd68", "Electro-Voice ND68", "Dynamický", "Kick drum", "Hluboké basy a perfektní údernost díky obrovské membráně.", "Electro-Voice ND68"),

    ("royer-r121", "Royer R-121", "Páskový (Ribbon)", "Kytarová komba, žestě", "Záchrana pro příliš ostré digitální náběry kytar, naprostý průmyslový standard.", "Royer R-121"),
    ("coles-4038", "Coles 4038", "Páskový (Ribbon)", "Overheady, dechy", "Britská legenda z roku 1953 s tvarem žehličky. Tlustý a majestátní zvuk.", "Coles 4038"),
    ("se-vr1", "sE Electronics VR1", "Páskový (Ribbon)", "Kytary, smyčce", "Kompaktní páskáč, prodloužená odezva až ke 20 kHz.", "sE Electronics VR1"),
    
    ("dpa-4099", "DPA d:vote 4099", "Kondenzátorový", "Smyčce, piana", "Nejlepší miniaturní nástrojový mikrofon světa, zcela přesná věrnost zvuku.", "DPA 4099"),
    ("dpa-dfacto", "DPA d:facto", "Kondenzátorový", "High-end vokály", "Referenční zvuk pro náročná hudební turné, používaný top hvězdami.", "DPA d:facto"),
    ("schoeps-cmc6", "Schoeps CMC6", "Kondenzátorový", "Klasická hudba", "Modulární systém německé výroby pro maximálně čisté náběry orchestrů.", "Schoeps CMC"),
    ("telefunken-m80", "Telefunken M80", "Dynamický", "Live vokály, snare", "Lehká membrána dodává dynamickému mikrofonu detaily, které byste čekali od kondenzátoru.", "Telefunken M80"),
    ("earthworks-sr314", "Earthworks SR314", "Kondenzátorový", "Live vokály", "Dokonale plochá frekvenční odezva a ohromující futuristický retro-design z oceli.", "Earthworks microphone"),
    ("aston-origin", "Aston Origin", "Kondenzátorový (LDC)", "Zpěv, akustika", "Britský ocelový mikrofon s integrovaným kovovým pop filtrem a unikátním tvarem.", "Aston Origin")
]

def get_image(q):
    url = "https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=" + urllib.parse.quote(q) + "&srnamespace=6&format=json"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Wing App)'})
        res = urllib.request.urlopen(req)
        data = json.loads(res.read())
        results = data.get('query', {}).get('search', [])
        for r in results:
            title = r['title']
            if title.lower().endswith('.jpg') or title.lower().endswith('.png'):
                return f"https://commons.wikimedia.org/wiki/Special:FilePath/{urllib.parse.quote(title.replace('File:', ''))}?width=600"
    except Exception:
        pass
    
    # Second try with word "microphone" appended
    url = "https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=" + urllib.parse.quote(q + " microphone") + "&srnamespace=6&format=json"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Wing App)'})
        res = urllib.request.urlopen(req)
        data = json.loads(res.read())
        results = data.get('query', {}).get('search', [])
        for r in results:
            title = r['title']
            if title.lower().endswith('.jpg') or title.lower().endswith('.png'):
                return f"https://commons.wikimedia.org/wiki/Special:FilePath/{urllib.parse.quote(title.replace('File:', ''))}?width=600"
    except Exception:
        pass
    
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Microphone_icon.svg/512px-Microphone_icon.svg.png"

with open("src/data/microphonesData.ts", "w", encoding="utf-8") as f:
    f.write("import { Microphone } from '../types';\n\n")
    f.write("export const MICROPHONES_DATA: Microphone[] = [\n")
    for id, name, typ, app, desc, q in mics:
        img = get_image(q)
        f.write(f"  {{\n")
        f.write(f"    id: '{id}',\n")
        f.write(f"    name: '{name}',\n")
        f.write(f"    type: '{typ}',\n")
        f.write(f"    application: '{app}',\n")
        f.write(f"    description: '{desc}',\n")
        f.write(f"    imageUrl: '{img}'\n")
        f.write(f"  }},\n")
        time.sleep(0.05)
    f.write("];\n")

print("Generated 70 microphones.")

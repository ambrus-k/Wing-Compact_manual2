# Behringer WING Compact – Pro Guide & Sound Lab

Profesionální interaktivní aplikace, manuál, knihovna výchozích nastavení (Channel Presets), správce scén s exportem do PDF/JSON a diagnostické centrum pro digitální mixážní konzoli **Behringer WING Compact** (FW 3.1).

Aplikace je plně konfigurována jako **Progressive Web App (PWA)**, což umožňuje její instalaci na plochu počítače (Windows / macOS / Linux) i mobilních zařízení (Android / iOS) s plnou podporou **offline provozu bez nutnosti internetového připojení**.

---

## 🚀 Hlavní Funkce

1. **Kompletní interaktivní manuál WING Compact (13 kapitol)**
   - Rychlé fulltextové vyhledávání (klávesová zkratka `⌘K` / `Ctrl+K`).
   - Autentická technická schémata a diagramy (Sources vs. Channels, Fader Layers, Routing Matrix, Signal Flow, Dugan Automix, Solo & Talkback, USB Recorder, FX Rack).
   - Záložky pro rychlé uložení důležitých kapitol do lokální paměti.

2. **Zvukový Lab & Knihovna Presetů (Sound Lab)**
   - Přednastavené signálové řetězce (Midas Preamp, Gate, 6-pásmový EQ, kompresory 1176/LA-2A/Fairchild, FX Inserty).
   - Vizuální zobrazení frekvenčních křivek v reálném čase.
   - Kopírování parametrů do schránky pro snadné ruční zadání nebo OSC skripty.

3. **Knihovna scén & Generátor (Scenes Manager)**
   - Tvorba vlastních scén s granulárním filtrem **Scope Matrix (Recall Safe)**.
   - Export do **průhledného PDF přehledu** a záložních **JSON / WING souborů**.
   - Označování oblíbených položek (Favorites).

4. **Diagnostické centrum & Testovací signály**
   - 40-bit kalkulátor fázové latence v samplích a milisekundách (kompenzace zpoždění).
   - Měřič chybovosti AES50 (COR / UNC) a StageConnect sběrnice.
   - Skutečný akustický generátor měřicích tónů (Růžový šum, 1 kHz kalibrační tón, Bílý šum, 440 Hz) pro ladění PA systému.

5. **Instalace jako PWA (Progressive Web App)**
   - Možnost instalace přímo z prohlížeče na 1 kliknutí.
   - Samostatná aplikace s vlastní ikonou pultu WING na ploše.
   - Rychlé načítání díky vestavěnému Service Workeru (`sw.js`).

---

## 🛠️ Lokální Spuštění a Vývoj

### Požadavky
- **Node.js**: v18 nebo novější
- **npm** / **bun** / **yarn** / **pnpm**

### Postup instalace
```bash
# 1. Klonování repozitáře
git clone https://github.com/vase-jmeno/wing-compact-guide.git
cd wing-compact-guide

# 2. Instalace závislostí
npm install

# 3. Spuštění lokálního vývojového serveru
npm run dev
```
Aplikace se spustí na adrese `http://localhost:3000` (nebo jiném portu uvedeném v terminálu).

### Sestavení pro produkci (Production Build)
```bash
npm run build
```
Výsledné statické soubory budou uloženy do složky `dist/`.

---

## 📦 Nahrání na GitHub

Pro nahrání projektu na váš GitHub účet:

```bash
# Inicializace gitu (pokud ještě není)
git init

# Přidání souborů
git add .

# Vytvoření prvního commitu
git commit -m "feat: initial commit - WING Compact Pro Guide & PWA"

# Vytvoření větve main
git branch -M main

# Propojení se vzdáleným repozitářem na GitHubu
git remote add origin https://github.com/VASE_UZIVATELSKE_JMENO/NAZEV_REPOZITARE.git

# Odeslání kódu
git push -u origin main
```

---

## 🌐 Zveřejnění na Vercel (Deployment)

Aplikace je plně připravena pro okamžité nasazení na [Vercel](https://vercel.com) díky přiloženému souboru `vercel.json`.

### Metoda A: Přes webové rozhraní Vercel (Doporučeno)
1. Přihlaste se na [vercel.com](https://vercel.com).
2. Klikněte na **Add New...** $\to$ **Project**.
3. Importujte svůj repozitář z **GitHubu**.
4. Vercel automaticky rozpozná framework **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Klikněte na **Deploy**. Během několika sekund získáte veřejnou URL adresu s HTTPS certifikátem.

### Metoda B: Přes Vercel CLI
```bash
# Instalace CLI (pokud nemáte)
npm i -g vercel

# Přihlášení a nasazení
vercel

# Produkční nasazení
vercel --prod
```

---

## 📱 Instalace jako PWA na Zařízení

- **Desktop (Chrome / Edge / Brave)**: Klikněte na ikonu instalace v adresním řádku prohlížeče nebo na tlačítko **Instalovat PWA** v horní liště aplikace.
- **Android**: V prohlížeči Chrome zvolte **⋮ $\to$ Přidat na plochu / Nainstalovat aplikaci**.
- **iOS (iPhone / iPad)**: V prohlížeči Safari klepněte na **Sdílet $\to$ Přidat na plochu**.

---

## 📄 Licence
Projekt je vytvořen pro komunitu zvukařů a uživatelů mixážních pultů Behringer WING. Všechny názvy produktů a ochranné známky jsou majetkem příslušných vlastníků.

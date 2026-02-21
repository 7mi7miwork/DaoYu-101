# 🗺️ Dao-Yu-101 — Build-Plan (React + GitHub Pages)

> **Repo:** https://github.com/7mi7miwork/DaoYu-101  
> **Arbeitsverzeichnis:** `D:\Codes\Windsurf\Dao-Yu-101`  
> **Ziel:** React-Lernplattform, kostenlos gehostet auf GitHub Pages, Supabase als Backend  
> **Deployment:** GitHub Actions (automatisch bei jedem Push auf `main`)

---

## 📌 Wichtige Entscheidungen

| Thema | Entscheidung | Begründung |
|---|---|---|
| Framework | React + Vite | Stabil, kein Vue-Problem |
| Hosting | GitHub Pages | Kostenlos |
| Deploy | GitHub Actions | Automatisch bei jedem Push |
| Routing | `HashRouter` | Pflicht für GitHub Pages — kein Server |
| Tailwind | v3 via npm | v4 zu neu, v3 stabil mit Vite |
| Supabase | Ab Schritt 8 | Vorher Mock-Daten |
| i18n | `react-i18next` | Industriestandard |

---

## ⚠️ Einmalig in GitHub einstellen

1. Gehe zu: `https://github.com/7mi7miwork/DaoYu-101/settings/pages`
2. Unter **Source**: wähle **GitHub Actions**
3. Speichern

---

## 🔌 GitHub-Verbindung herstellen (einmalig beim ersten Start)

Bevor irgendetwas gepusht werden kann, muss die Verbindung zu GitHub stehen.
Diese Schritte einmalig im Arbeitsverzeichnis ausführen:

```bash
# 1. Sicherstellen dass wir im richtigen Verzeichnis sind
cd D:\Codes\Windsurf\Dao-Yu-101

# 2. Git initialisieren (falls noch nicht geschehen)
git init

# 3. Verbindung zu GitHub herstellen
#    (Falls remote schon existiert, wird der Fehler ignoriert)
git remote add origin https://github.com/7mi7miwork/DaoYu-101.git

# 4. Verbindung testen — dieser Befehl muss ohne Fehler durchlaufen:
git remote -v
#    Erwartete Ausgabe:
#    origin  https://github.com/7mi7miwork/DaoYu-101.git (fetch)
#    origin  https://github.com/7mi7miwork/DaoYu-101.git (push)

# 5. GitHub-Erreichbarkeit testen:
git ls-remote origin
#    → Gibt Refs aus? Verbindung OK ✓
#    → "Authentication failed"? → GitHub-Credentials prüfen (siehe unten)
#    → Timeout / kein Output? → Netzwerk / Firewall prüfen

# 6. Git-Identität setzen (einmalig pro Rechner):
git config user.name "7mi7miwork"
git config user.email "DEINE-EMAIL@beispiel.com"
```

### 🔑 Falls Authentifizierung fehlschlägt

GitHub akzeptiert kein Passwort mehr — nur noch **Personal Access Token (PAT)**:

1. GitHub → **Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. **Generate new token** → Scope: `repo` ankreuzen → Token kopieren
3. Token als Credential speichern (Windows Credential Manager):
   ```bash
   git config --global credential.helper manager
   ```
   Beim nächsten Push wird nach Benutzername + Token gefragt — danach wird es gespeichert.

---

## 🔄 Repo komplett zurücksetzen (einmalig bei Neustart)

Erst ausführen, **nachdem** die GitHub-Verbindung (siehe oben) funktioniert:

```bash
# Verbindung nochmal kurz bestätigen:
git ls-remote origin

# Dann Reset:
git checkout --orphan temp
git add -A
git commit -m "reset"
git branch -D main
git branch -m main
git push origin main --force
```

---

## 📎 Standard-Einleitung für jeden neuen Cline-Task

```
Arbeitsverzeichnis: D:\Codes\Windsurf\Dao-Yu-101
Repo: https://github.com/7mi7miwork/DaoYu-101

Lies zuerst README.md und dao-yu-101-buildplan.md im Arbeitsverzeichnis.
Wir sind aktuell bei: [HIER SCHRITT EINTRAGEN]
```

---

## 🔴 KRITISCHE REGELN — bei jedem Schritt einhalten

Diese Regeln gelten für JEDEN Schritt. Cline soll sie vor dem Erstellen
von Dateien lesen und nach jeder Datei dagegen prüfen:

```
KRITISCHE REGELN FÜR GITHUB PAGES + VITE + TAILWIND v3:

REGEL 1 — src/index.css Reihenfolge (ZWINGEND):
  @import-Anweisungen MÜSSEN vor @tailwind-Direktiven stehen.
  Korrekte Reihenfolge:
    @import './styles/themes/archipelago.css';   ← erst alle imports
    @import './styles/themes/modern.css';
    @import './styles/themes/dark.css';
    @tailwind base;                              ← dann tailwind
    @tailwind components;
    @tailwind utilities;
    /* eigene Klassen ganz unten */

REGEL 2 — Kein @apply mit CSS Custom Properties:
  FALSCH:  @apply font-family:[font:var(--font-display)];
  RICHTIG: font-family: var(--font-display);
  CSS Custom Properties (var(--...)) IMMER als normales CSS, nie mit @apply.

REGEL 3 — Exports müssen mit Imports übereinstimmen:
  Jeder Context exportiert drei Dinge:
    export const XyzContext = createContext();
    export const XyzProvider = ({ children }) => { ... };
    export const useXyz = () => useContext(XyzContext);
  Nach dem Erstellen: ALLE Dateien prüfen die diesen Context importieren.

REGEL 4 — HashRouter (NICHT BrowserRouter):
  import { HashRouter } from 'react-router-dom'
  GitHub Pages hat keinen Server — BrowserRouter funktioniert nicht.

REGEL 5 — vite.config.js base URL:
  base: '/DaoYu-101/'
  Ohne das funktionieren Assets auf GitHub Pages nicht.

REGEL 6 — PFLICHT-ABLAUF vor und nach jedem git push:

  ── GITHUB-VERBINDUNG PRÜFEN (vor jedem Push) ─────────────
  0) git remote -v
     → Zeigt origin mit https://github.com/7mi7miwork/DaoYu-101.git?
     → Falls nicht: git remote add origin https://github.com/7mi7miwork/DaoYu-101.git

     git ls-remote origin
     → Gibt Refs aus (keine Fehlermeldung)? → Verbindung OK, weiter zu a)
     → Fehler "Authentication failed"? → PAT-Token prüfen / neu erstellen
     → Timeout / kein Output? → Netzwerk / Firewall prüfen
     → Erst wenn Verbindung steht: weiter.

  ── VOR DEM PUSH ──────────────────────────────────────────
  a) npm run build
     → Warte auf "✓ built in Xs".
     → Bei JEDEM Fehler: sofort beheben, dann erneut builden.
     → Erst wenn Build grün ist, weiter zu b).

  b) npm run dev  (in neuem Terminal, parallel)
     → Seite im Browser öffnen: http://localhost:5173/DaoYu-101/
     → Die im jeweiligen Schritt definierten SOLL-Zustände manuell prüfen.
     → Alle Checkboxen des aktuellen Schritts abhaken.
     → Bei Fehlern: dev-Server stoppen, beheben, neu starten, erneut prüfen.

  c) Erst wenn BEIDE Prüfungen (Build + Browser) bestanden sind:
     git add .
     git commit -m "<commit-message>"
     git push origin main

  ── NACH DEM PUSH ─────────────────────────────────────────
  d) GitHub Actions überwachen:
     → https://github.com/7mi7miwork/DaoYu-101/actions
     → Warte bis der Workflow-Run grün (✓) ist.
     → Bei rotem Run (✗): Log lesen, Fehler lokal reproduzieren und beheben,
       dann wieder ab Schritt a).

  e) Live-Seite prüfen:
     → https://7mi7miwork.github.io/DaoYu-101/
     → Hard Refresh: Strg+Shift+R  ODER  Inkognito-Fenster öffnen.
     → Die SOLL-Zustände des aktuellen Schritts auf der Live-Seite bestätigen.
     → Erst wenn die Live-Seite korrekt ist, gilt der Schritt als ABGESCHLOSSEN.

  Niemals einen fehlerhaften Build pushen.
  Niemals den Schritt als fertig markieren, wenn die Live-Seite nicht stimmt.
```

---

## SCHRITT 1 — React + Vite + Tailwind Setup

**Ziel:** Lauffähiges React-Projekt, blaue Testseite live auf GitHub Pages.

### Cline-Anweisung

```
Arbeitsverzeichnis: D:\Codes\Windsurf\Dao-Yu-101
Repo: https://github.com/7mi7miwork/DaoYu-101

Lies zuerst README.md und dao-yu-101-buildplan.md.
Wir sind bei: Schritt 1 — Projekt-Setup

SCHRITT FÜR SCHRITT:

1. React + Vite Projekt erstellen (neueste stabile Version):
   npm create vite@latest . -- --template react
   (Bei "Use Vite 8 beta?" → No wählen)

2. Dependencies installieren:
   npm install

3. Tailwind CSS v3 installieren (NICHT v4):
   npm install -D tailwindcss@3 postcss autoprefixer
   npx tailwindcss init -p

4. Erstelle vite.config.js:
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   export default defineConfig({
     plugins: [react()],
     base: '/DaoYu-101/',
   })

5. Erstelle tailwind.config.js:
   export default {
     content: ['./index.html', './src/**/*.{js,jsx}'],
     theme: { extend: {} },
     plugins: [],
   }

6. Erstelle src/index.css (noch keine @imports in Schritt 1):
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

7. Erstelle src/App.jsx:
   import './index.css'
   function App() {
     return (
       <div className="min-h-screen bg-blue-50 flex items-center justify-center">
         <h1 className="text-4xl font-bold text-blue-700">🏝️ Dao-Yu-101</h1>
       </div>
     )
   }
   export default App

8. Erstelle .github/workflows/deploy.yml:
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   permissions:
     contents: read
     pages: write
     id-token: write
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: npm ci
         - run: npm run build
         - uses: actions/configure-pages@v4
         - uses: actions/upload-pages-artifact@v3
           with:
             path: ./dist
         - uses: actions/deploy-pages@v4
           id: deployment

── PRÜFUNG VOR DEM PUSH ───────────────────────────────────────────────────

9a. BUILD-PRÜFUNG:
    npm run build
    → Erfolgreich ("✓ built in Xs")? → weiter
    → Fehler? Beheben, dann erneut prüfen.
    → Prüfe: Wurde dist/ erstellt? Enthält dist/index.html?

9b. BROWSER-PRÜFUNG (lokal):
    npm run dev
    → http://localhost:5173/DaoYu-101/ öffnen
    ✅ Seite lädt ohne Fehler in der Browser-Konsole?
    ✅ Blaue Seite mit "🏝️ Dao-Yu-101" sichtbar?
    → Erst wenn beide ✅: weiter zum Push.

9c. GITHUB-VERBINDUNG PRÜFEN:
    git remote -v
    → origin muss auf https://github.com/7mi7miwork/DaoYu-101.git zeigen.
    git ls-remote origin
    → Muss Refs ausgeben — kein Fehler.
    → Bei Fehler: Verbindung herstellen (siehe Abschnitt "GitHub-Verbindung herstellen").

10. git add .
    git commit -m "feat: initialize React + Vite + Tailwind + GitHub Actions deploy"
    git push origin main

── PRÜFUNG NACH DEM PUSH ──────────────────────────────────────────────────

11a. GitHub Actions abwarten:
     → https://github.com/7mi7miwork/DaoYu-101/actions
     → Warte bis Workflow grün (✓) ist.
     → Bei Fehler: Log lesen, beheben, ab Schritt 9a wiederholen.

11b. LIVE-PRÜFUNG:
     → https://7mi7miwork.github.io/DaoYu-101/ (Strg+Shift+R oder Inkognito)
     ✅ Blaue Seite mit "🏝️ Dao-Yu-101" erscheint?
     → Wenn ja: Schritt 1 ABGESCHLOSSEN ✓
     → Wenn nein: Fehler analysieren, beheben, ab Schritt 9a wiederholen.
```

---

## SCHRITT 2 — Routing + App-Shell + Themes

**Ziel:** Navbar, Footer, HashRouter, 3 Themes — sichtbar auf GitHub Pages.

### Cline-Anweisung

```
Arbeitsverzeichnis: D:\Codes\Windsurf\Dao-Yu-101
Repo: https://github.com/7mi7miwork/DaoYu-101

Lies zuerst README.md und dao-yu-101-buildplan.md.
Wir sind bei: Schritt 2 — Routing + App-Shell + Themes

Halte ALLE KRITISCHEN REGELN aus dem Buildplan ein.

1. Installiere:
   npm install react-router-dom

2. Erstelle Dateistruktur:
   src/
   ├── components/
   │   ├── Navbar.jsx
   │   └── Footer.jsx
   ├── context/
   │   └── ThemeContext.jsx
   ├── pages/
   │   ├── Home.jsx
   │   ├── Courses.jsx
   │   ├── Login.jsx
   │   └── NotFound.jsx
   ├── styles/
   │   └── themes/
   │       ├── archipelago.css
   │       ├── modern.css
   │       └── dark.css

3. ThemeContext.jsx — MUSS alle drei exportieren:
   export const ThemeContext = createContext();
   export const ThemeProvider = ({ children }) => { ... };
   export const useTheme = () => useContext(ThemeContext);
   → Theme aus localStorage (key: 'dao-yu-theme'), default: 'archipelago'
   → Theme-Klasse auf document.body setzen: 'theme-archipelago' etc.

4. Theme-CSS-Dateien definieren diese Custom Properties:
   --color-primary, --color-secondary, --color-bg, --color-surface,
   --color-text, --color-text-muted, --color-border,
   --color-success, --color-warning, --color-error,
   --font-primary, --font-display,
   --radius-sm, --radius-md, --radius-lg
   Archipelago: Grün #2d5a1b, Braun #8b6914, Blau #1a4a7a
   Modern: Weiß #ffffff, Grau #6b7280, Indigo #4f46e5
   Dark: Dunkelgrau #1f2937, Lila #7c3aed

5. src/index.css — KRITISCHE REIHENFOLGE (Regel 1):
   @import './styles/themes/archipelago.css';
   @import './styles/themes/modern.css';
   @import './styles/themes/dark.css';
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   Eigene Klassen: NUR normales CSS — KEIN @apply mit var(--...)

6. App.jsx verwendet HashRouter (Regel 4):
   import { HashRouter, Routes, Route } from 'react-router-dom'
   import { ThemeProvider } from './context/ThemeContext'
   Struktur: <ThemeProvider><HashRouter><Navbar/><Routes.../><Footer/></HashRouter></ThemeProvider>
   Routen: / → Home, /courses → Courses, /login → Login, * → NotFound

7. Navbar: Logo, Nav-Links (mit t() für i18n vorbereitet), 3 Theme-Buttons, Language-Platzhalter

── PRÜFUNG VOR DEM PUSH ───────────────────────────────────────────────────

8a. BUILD-PRÜFUNG:
    npm run build
    Häufige Fehler und Lösungen:
    ❌ "@import must precede" → @imports in index.css VOR @tailwind verschieben
    ❌ "is not exported" → ThemeContext.jsx: alle 3 Exports prüfen + alle Imports anpassen
    ❌ "@apply ... does not exist" → @apply mit var(--...) durch normales CSS ersetzen
    → Erst wenn "✓ built" erscheint: weiter zu 8b.

8b. BROWSER-PRÜFUNG (lokal):
    npm run dev
    → http://localhost:5173/DaoYu-101/ öffnen
    ✅ Navbar sichtbar mit Logo und Links?
    ✅ Theme-Buttons wechseln die Farben der Seite?
    ✅ Footer am unteren Rand sichtbar?
    ✅ Navigation zu /courses, /login funktioniert (kein 404)?
    ✅ Keine Konsolen-Fehler?
    → Erst wenn alle ✅: weiter zum Push.

8c. GITHUB-VERBINDUNG PRÜFEN:
    git ls-remote origin
    → Kein Fehler? → Verbindung OK.

9. git add .
   git commit -m "feat: HashRouter, app shell, Navbar, Footer, 3 themes"
   git push origin main

── PRÜFUNG NACH DEM PUSH ──────────────────────────────────────────────────

10a. GitHub Actions abwarten:
     → https://github.com/7mi7miwork/DaoYu-101/actions → Workflow grün?

10b. LIVE-PRÜFUNG:
     → https://7mi7miwork.github.io/DaoYu-101/ (Strg+Shift+R oder Inkognito)
     ✅ Navbar sichtbar?
     ✅ Theme-Buttons wechseln die Farben?
     ✅ Links in der Navbar funktionieren?
     → Wenn ja: Schritt 2 ABGESCHLOSSEN ✓
```

---

## SCHRITT 3 — i18n (EN, DE, ES, ZH-TW)

**Ziel:** 4 Sprachen, Language Switcher in Navbar funktioniert.

### Cline-Anweisung

```
Arbeitsverzeichnis: D:\Codes\Windsurf\Dao-Yu-101
Repo: https://github.com/7mi7miwork/DaoYu-101

Lies zuerst README.md und dao-yu-101-buildplan.md.
Wir sind bei: Schritt 3 — i18n System

Halte ALLE KRITISCHEN REGELN aus dem Buildplan ein.

1. Installiere:
   npm install i18next react-i18next i18next-browser-languagedetector

2. Erstelle:
   src/i18n/index.js
   src/i18n/locales/en.json
   src/i18n/locales/de.json
   src/i18n/locales/es.json
   src/i18n/locales/zh-TW.json

3. src/i18n/index.js konfiguriert i18next:
   → Sprache aus localStorage (key: 'dao-yu-lang')
   → Fallback: 'en'
   → Alle 4 Sprachen als resources direkt importiert (kein lazy loading)

4. Übersetzungsschlüssel für alle 4 Sprachen vollständig übersetzen:
   {
     "nav": { "home":"Home/Startseite/...", "courses":"...", "store":"...",
              "profile":"...", "login":"...", "logout":"..." },
     "home": { "title":"...", "subtitle":"...", "startLearning":"..." },
     "courses": { "title":"...", "searchPlaceholder":"..." },
     "common": { "loading":"...", "error":"...", "back":"..." }
   }

5. src/main.jsx — i18n VOR App importieren:
   import './i18n/index.js'
   import App from './App.jsx'

6. Navbar bekommt funktionierenden Language Switcher:
   import { useTranslation } from 'react-i18next'
   const { t, i18n } = useTranslation()
   Buttons: 🇬🇧 EN | 🇩🇪 DE | 🇪🇸 ES | 🇹🇼 ZH
   onClick: i18n.changeLanguage('de') etc.
   Alle Navbar-Texte über t('nav.home') etc.

── PRÜFUNG VOR DEM PUSH ───────────────────────────────────────────────────

7a. BUILD-PRÜFUNG:
    npm run build → "✓ built"?
    → Bei Fehler: beheben, dann erneut builden.

7b. BROWSER-PRÜFUNG (lokal):
    npm run dev
    → http://localhost:5173/DaoYu-101/ öffnen
    ✅ Language Switcher Buttons in der Navbar sichtbar (🇬🇧 🇩🇪 🇪🇸 🇹🇼)?
    ✅ Klick auf 🇩🇪 → Navbar-Texte wechseln zu Deutsch?
    ✅ Klick auf 🇹🇼 → Navbar-Texte wechseln zu Chinesisch?
    ✅ Sprachwahl bleibt nach Seiten-Refresh erhalten (localStorage)?
    ✅ Keine Konsolen-Fehler?
    → Erst wenn alle ✅: weiter zum Push.

7c. GITHUB-VERBINDUNG PRÜFEN:
    git ls-remote origin
    → Kein Fehler? → Verbindung OK.

8. git add .
   git commit -m "feat: i18n system with EN/DE/ES/ZH-TW, language switcher in navbar"
   git push origin main

── PRÜFUNG NACH DEM PUSH ──────────────────────────────────────────────────

9a. GitHub Actions abwarten:
    → https://github.com/7mi7miwork/DaoYu-101/actions → Workflow grün?

9b. LIVE-PRÜFUNG:
    → https://7mi7miwork.github.io/DaoYu-101/ (Strg+Shift+R oder Inkognito)
    ✅ Language Switcher sichtbar?
    ✅ Sprachumschaltung funktioniert auf der Live-Seite?
    → Wenn ja: Schritt 3 ABGESCHLOSSEN ✓
```

---

## SCHRITT 4 — World Map

**Ziel:** Pixel-Insel-Weltkarte mit 4 Archipelagos auf GitHub Pages sichtbar.

### Cline-Anweisung

```
Arbeitsverzeichnis: D:\Codes\Windsurf\Dao-Yu-101
Repo: https://github.com/7mi7miwork/DaoYu-101

Lies zuerst README.md und dao-yu-101-buildplan.md.
Wir sind bei: Schritt 4 — World Map

Halte ALLE KRITISCHEN REGELN aus dem Buildplan ein.

1. Erstelle:
   src/data/archipelagos.js
   src/components/WorldMap/WorldMap.jsx
   src/components/WorldMap/ArchipelagoCard.jsx
   src/components/WorldMap/IslandNode.jsx

2. archipelagos.js — 4 Archipelagos als default export:
   [
     { id:"programming", title:"Programming", color:"#4F46E5", icon:"💻",
       description:"Learn to code from scratch",
       islands:[{id:"python-basics",title:"Python Basics",unlocked:true},{id:"web-dev",title:"Web Dev",unlocked:false}]},
     { id:"languages", title:"Languages", color:"#059669", icon:"🌐",
       description:"Speak the world",
       islands:[{id:"english-beginners",title:"English Beginners",unlocked:true},{id:"spanish-a1",title:"Spanish A1",unlocked:false},{id:"chinese-basics",title:"Chinese Basics",unlocked:false}]},
     { id:"finance", title:"Finance", color:"#D97706", icon:"💰",
       description:"Master money skills",
       islands:[{id:"budgeting-101",title:"Budgeting 101",unlocked:true},{id:"investing-simulator",title:"Investing Simulator",unlocked:false}]},
     { id:"school-subjects", title:"School Subjects", color:"#DC2626", icon:"📚",
       description:"Core school curriculum",
       islands:[{id:"math-grade-5",title:"Math Grade 5",unlocked:true},{id:"science-basics",title:"Science Basics",unlocked:false}]}
   ]

3. ArchipelagoCard: Icon, Titel, Beschreibung, Island-Anzahl, Fortschrittsbalken (0%)
   IslandNode: Titel, 🔒 wenn unlocked:false
   WorldMap: CSS Grid mit allen 4 Karten

4. Home.jsx ersetzt bisherigen Inhalt durch <WorldMap />

── PRÜFUNG VOR DEM PUSH ───────────────────────────────────────────────────

5a. BUILD-PRÜFUNG:
    npm run build → "✓ built"?

5b. BROWSER-PRÜFUNG (lokal):
    npm run dev
    → http://localhost:5173/DaoYu-101/ öffnen
    ✅ 4 Archipelago-Karten in einem Grid sichtbar?
    ✅ Jede Karte zeigt Icon, Titel und Beschreibung?
    ✅ Islands der Archipelagos sichtbar (gesperrt/offen)?
    ✅ Keine Konsolen-Fehler?
    → Erst wenn alle ✅: weiter zum Push.

5c. GITHUB-VERBINDUNG PRÜFEN:
    git ls-remote origin
    → Kein Fehler? → Verbindung OK.

6. git add .
   git commit -m "feat: world map with 4 archipelagos, island nodes, pixel theme"
   git push origin main

── PRÜFUNG NACH DEM PUSH ──────────────────────────────────────────────────

7a. GitHub Actions abwarten:
    → https://github.com/7mi7miwork/DaoYu-101/actions → Workflow grün?

7b. LIVE-PRÜFUNG:
    → https://7mi7miwork.github.io/DaoYu-101/ (Strg+Shift+R oder Inkognito)
    ✅ 4 Archipelago-Karten auf der Startseite?
    ✅ Layout korrekt (kein zerschossenes CSS)?
    → Wenn ja: Schritt 4 ABGESCHLOSSEN ✓
```

---

## SCHRITT 5 — Kurs-Browser, Lesson-Viewer, Quiz-Engine

**Ziel:** Kurse browsen, Markdown lesen, Quiz absolvieren.

### Cline-Anweisung

```
Arbeitsverzeichnis: D:\Codes\Windsurf\Dao-Yu-101
Repo: https://github.com/7mi7miwork/DaoYu-101

Lies zuerst README.md und dao-yu-101-buildplan.md.
Wir sind bei: Schritt 5 — Kurs-Browser, Lesson-Viewer, Quiz-Engine

Halte ALLE KRITISCHEN REGELN aus dem Buildplan ein.

1. Installiere:
   npm install react-markdown

2. Erstelle:
   src/pages/Courses.jsx
   src/pages/Island.jsx
   src/pages/Lesson.jsx
   src/pages/Quiz.jsx
   src/hooks/useQuiz.js
   src/data/lessons/programming/python-basics/lesson-01-variables.js

3. lesson-01-variables.js:
   export default {
     id: "lesson-01-variables",
     title: "Variables in Python",
     content: "# Variables\n\nA variable stores data...\n\n## Example\n\n```python\nname = 'Alice'\nage = 10\nprint(name)\n```\n\nVariables can store text, numbers, and more.",
     xp: 50,
     quiz: {
       questions: [
         { id:"q1", type:"multiple_choice", question:"What stores data in Python?",
           options:["Variable","Function","Loop","Class"], correct:0 },
         { id:"q2", type:"true_false", question:"Python is case-sensitive.", correct:true },
         { id:"q3", type:"fill_blank", question:"Complete: name ___ 'Alice'", correct:"=" }
       ]
     }
   }

4. useQuiz.js Hook:
   → State: currentIndex, answers, score, isComplete
   → submitAnswer(answer): speichert Antwort, prüft ob korrekt
   → nextQuestion(): weiter
   → reset(): von vorne

5. Neue Routen in App.jsx ergänzen:
   /courses → Courses.jsx (zeigt alle Archipelagos als klickbare Karten)
   /courses/:archipelagoId → Island.jsx (zeigt Islands des Archipelagos)
   /lesson/:lessonId → Lesson.jsx (Markdown + Quiz nacheinander)

── PRÜFUNG VOR DEM PUSH ───────────────────────────────────────────────────

6a. BUILD-PRÜFUNG:
    npm run build → "✓ built"?

6b. BROWSER-PRÜFUNG (lokal):
    npm run dev
    → http://localhost:5173/DaoYu-101/ öffnen
    ✅ /courses öffnen → Archipelago-Karten klickbar?
    ✅ Archipelago klicken → Islands-Übersicht erscheint?
    ✅ Island klicken → Lesson öffnet, Markdown-Inhalt sichtbar?
    ✅ Quiz starten → Fragen erscheinen nacheinander?
    ✅ Quiz abschließen → Score wird angezeigt?
    ✅ Keine Konsolen-Fehler?
    → Erst wenn alle ✅: weiter zum Push.

6c. GITHUB-VERBINDUNG PRÜFEN:
    git ls-remote origin
    → Kein Fehler? → Verbindung OK.

7. git add .
   git commit -m "feat: course browser, markdown lesson viewer, quiz engine"
   git push origin main

── PRÜFUNG NACH DEM PUSH ──────────────────────────────────────────────────

8a. GitHub Actions abwarten:
    → https://github.com/7mi7miwork/DaoYu-101/actions → Workflow grün?

8b. LIVE-PRÜFUNG:
    → https://7mi7miwork.github.io/DaoYu-101/#/courses (Strg+Shift+R oder Inkognito)
    ✅ Kurs-Browser lädt?
    ✅ Lesson-Navigation funktioniert?
    ✅ Quiz zeigt Fragen und Score?
    → Wenn ja: Schritt 5 ABGESCHLOSSEN ✓
```

---

## SCHRITT 6 — Gamification (XP, Level, Badges, Streaks)

**Ziel:** XP nach Quiz, Level in Navbar, Badges, Streak-Anzeige.

### Cline-Anweisung

```
Arbeitsverzeichnis: D:\Codes\Windsurf\Dao-Yu-101
Repo: https://github.com/7mi7miwork/DaoYu-101

Lies zuerst README.md und dao-yu-101-buildplan.md.
Wir sind bei: Schritt 6 — Gamification

Halte ALLE KRITISCHEN REGELN aus dem Buildplan ein.

1. Erstelle:
   src/context/GamificationContext.jsx
   src/hooks/useGamification.js   (re-exportiert useGamification aus Context)
   src/components/XPBar.jsx
   src/components/LevelBadge.jsx
   src/components/StreakCounter.jsx

2. GamificationContext.jsx — MUSS alle drei exportieren:
   export const GamificationContext = createContext();
   export const GamificationProvider = ({ children }) => { ... };
   export const useGamification = () => useContext(GamificationContext);
   State: { xp:0, level:1, badges:[], streak:0, lastActive:null, history:[] }
   In localStorage (key: 'dao-yu-progress') persistieren.
   Level-Schwellen: 1→0, 2→100, 3→250, 4→500, 5→900 XP
   Streak: bricht ab wenn lastActive älter als 24h

3. Badges vergeben wenn:
   "First Steps" → erste Lesson completed
   "Quiz Master" → 5 Quizzes mit score 100% abgeschlossen
   "On Fire" → streak >= 7

4. GamificationProvider in App.jsx um bestehende Provider wickeln.

5. Quiz.jsx: nach Abschluss useGamification().addXP(lesson.xp) aufrufen.

6. Navbar zeigt XPBar und StreakCounter (🔥 3 Tage etc.)

── PRÜFUNG VOR DEM PUSH ───────────────────────────────────────────────────

7a. BUILD-PRÜFUNG:
    npm run build → "✓ built"?
    → Alle 3 Context-Exports in GamificationContext.jsx vorhanden?

7b. BROWSER-PRÜFUNG (lokal):
    npm run dev
    → http://localhost:5173/DaoYu-101/ öffnen
    ✅ XPBar in der Navbar sichtbar?
    ✅ Streak-Anzeige (🔥) in der Navbar sichtbar?
    ✅ Quiz abschließen → XP-Wert in der Navbar steigt?
    ✅ Nach erstem Quiz → Badge "First Steps" vergeben?
    ✅ XP bleibt nach Seiten-Refresh erhalten (localStorage)?
    ✅ Keine Konsolen-Fehler?
    → Erst wenn alle ✅: weiter zum Push.

7c. GITHUB-VERBINDUNG PRÜFEN:
    git ls-remote origin
    → Kein Fehler? → Verbindung OK.

8. git add .
   git commit -m "feat: gamification - XP, levels, badges, streaks, localStorage"
   git push origin main

── PRÜFUNG NACH DEM PUSH ──────────────────────────────────────────────────

9a. GitHub Actions abwarten:
    → https://github.com/7mi7miwork/DaoYu-101/actions → Workflow grün?

9b. LIVE-PRÜFUNG:
    → https://7mi7miwork.github.io/DaoYu-101/ (Strg+Shift+R oder Inkognito)
    ✅ XPBar und Streak-Counter in der Navbar?
    ✅ XP nach Quiz-Abschluss sichtbar erhöht?
    → Wenn ja: Schritt 6 ABGESCHLOSSEN ✓
```

---

## SCHRITT 7 — Auth UI + Dashboards

**Ziel:** Login/Register, 5 Rollen-Dashboards, Protected Routes.

### Cline-Anweisung

```
Arbeitsverzeichnis: D:\Codes\Windsurf\Dao-Yu-101
Repo: https://github.com/7mi7miwork/DaoYu-101

Lies zuerst README.md und dao-yu-101-buildplan.md.
Wir sind bei: Schritt 7 — Auth UI + Dashboards

Halte ALLE KRITISCHEN REGELN aus dem Buildplan ein.

1. Erstelle:
   src/context/AuthContext.jsx
   src/pages/Login.jsx
   src/pages/dashboards/StudentDashboard.jsx
   src/pages/dashboards/ParentDashboard.jsx
   src/pages/dashboards/TeacherDashboard.jsx
   src/pages/dashboards/SchoolDashboard.jsx
   src/pages/dashboards/AdminDashboard.jsx
   src/components/ProtectedRoute.jsx

2. AuthContext.jsx — MUSS alle drei exportieren:
   export const AuthContext = createContext();
   export const AuthProvider = ({ children }) => { ... };
   export const useAuth = () => useContext(AuthContext);
   State: { user:null, isLoading:false }
   User-Objekt: { id, email, name, role }
   Rollen: student | parent | teacher | school | admin
   Mock-login: User direkt in State setzen, in localStorage (key: 'dao-yu-auth') speichern.

3. Login.jsx:
   → Tab "Login": Email + Passwort
   → Tab "Register": Name, Email, Passwort, Rolle-Dropdown
   → Nach Erfolg: navigate('/dashboard')

4. ProtectedRoute.jsx:
   Kein User → <Navigate to="/login" />
   User vorhanden → {children}

5. Neue Routen in App.jsx:
   /login → Login.jsx
   /dashboard → Redirect je nach user.role
   /dashboard/student → <ProtectedRoute><StudentDashboard/></ProtectedRoute>
   (gleiches Muster für alle 5 Rollen)

6. Jedes Dashboard: Begrüßung mit Name, Rollen-Badge, 3 Platzhalter-Feature-Karten

── PRÜFUNG VOR DEM PUSH ───────────────────────────────────────────────────

7a. BUILD-PRÜFUNG:
    npm run build → "✓ built"?
    → Alle 3 AuthContext-Exports vorhanden?

7b. BROWSER-PRÜFUNG (lokal):
    npm run dev
    → http://localhost:5173/DaoYu-101/ öffnen
    ✅ /dashboard direkt aufrufen → Redirect zu /login?
    ✅ Login-Formular mit beiden Tabs (Login / Register)?
    ✅ Registrieren als "student" → Weiterleitung zu /dashboard/student?
    ✅ StudentDashboard zeigt Begrüßung und Feature-Karten?
    ✅ Logout → zurück auf /login?
    ✅ Alle 5 Rollen-Dashboards erreichbar?
    ✅ Keine Konsolen-Fehler?
    → Erst wenn alle ✅: weiter zum Push.

7c. GITHUB-VERBINDUNG PRÜFEN:
    git ls-remote origin
    → Kein Fehler? → Verbindung OK.

8. git add .
   git commit -m "feat: auth UI, role dashboards, mock auth, protected routes"
   git push origin main

── PRÜFUNG NACH DEM PUSH ──────────────────────────────────────────────────

9a. GitHub Actions abwarten:
    → https://github.com/7mi7miwork/DaoYu-101/actions → Workflow grün?

9b. LIVE-PRÜFUNG:
    → https://7mi7miwork.github.io/DaoYu-101/#/login (Strg+Shift+R oder Inkognito)
    ✅ Login-Seite lädt?
    ✅ Registrierung und Dashboard-Weiterleitung funktioniert?
    → Wenn ja: Schritt 7 ABGESCHLOSSEN ✓
```

---

## SCHRITT 8 — Supabase Integration

**Ziel:** Echte Auth, Nutzerprofil in DB, Progress in DB.

### Vorbereitung (du einmalig)

1. [supabase.com](https://supabase.com) → kostenloses Projekt erstellen
2. **Project URL** und **anon public key** notieren
3. GitHub: `Settings → Secrets → Actions` → zwei Secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Cline-Anweisung

```
Arbeitsverzeichnis: D:\Codes\Windsurf\Dao-Yu-101
Repo: https://github.com/7mi7miwork/DaoYu-101

Lies zuerst README.md und dao-yu-101-buildplan.md.
Wir sind bei: Schritt 8 — Supabase Integration

Halte ALLE KRITISCHEN REGELN aus dem Buildplan ein.

1. Installiere:
   npm install @supabase/supabase-js

2. Erstelle src/lib/supabase.js:
   import { createClient } from '@supabase/supabase-js'
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
   const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
   export const supabase = createClient(supabaseUrl, supabaseKey)

3. Erstelle .env.local (WIRD NICHT committet — in .gitignore prüfen):
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJxxxxxxxxx

4. .github/workflows/deploy.yml — build-Step ergänzen:
   - run: npm run build
     env:
       VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
       VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

5. AuthContext.jsx ersetzen mit echtem Supabase Auth:
   → supabase.auth.signInWithPassword({ email, password })
   → supabase.auth.signUp({ email, password, options: { data: { name, role } } })
   → supabase.auth.signOut()
   → supabase.auth.onAuthStateChange() für Session

6. Supabase Studio SQL (dem User anzeigen zum Ausführen):
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users PRIMARY KEY,
     email TEXT, name TEXT, role TEXT DEFAULT 'student',
     language TEXT DEFAULT 'en', theme TEXT DEFAULT 'archipelago',
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   CREATE TABLE user_progress (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES profiles(id),
     lesson_id TEXT, completed BOOLEAN DEFAULT FALSE,
     score INT, xp_earned INT, completed_at TIMESTAMPTZ
   );
   CREATE TABLE user_gamification (
     user_id UUID REFERENCES profiles(id) PRIMARY KEY,
     total_xp INT DEFAULT 0, level INT DEFAULT 1,
     streak_days INT DEFAULT 0, last_active DATE, badges JSONB DEFAULT '[]'
   );
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
   ALTER TABLE user_gamification ENABLE ROW LEVEL SECURITY;

── PRÜFUNG VOR DEM PUSH ───────────────────────────────────────────────────

7a. BUILD-PRÜFUNG:
    npm run build → "✓ built"?
    → git status prüfen: .env.local erscheint NICHT in "Changes to be committed"!
    → Wenn doch: sofort .gitignore anpassen und .env.local entfernen!

7b. BROWSER-PRÜFUNG (lokal):
    npm run dev
    → http://localhost:5173/DaoYu-101/ öffnen
    ✅ Registrierung mit echter Email möglich?
    ✅ Supabase Dashboard → Authentication → neuer User sichtbar?
    ✅ Login mit den Zugangsdaten funktioniert?
    ✅ Logout funktioniert?
    ✅ Keine Konsolen-Fehler (insb. keine CORS- oder API-Key-Fehler)?
    → Erst wenn alle ✅: weiter zum Push.

7c. GITHUB-VERBINDUNG PRÜFEN:
    git ls-remote origin
    → Kein Fehler? → Verbindung OK.
    git status
    → .env.local erscheint NICHT in "Changes to be committed"?
    → Wenn doch sichtbar: sofort stoppen! .gitignore anpassen, dann erneut prüfen.

8. git add .
   git commit -m "feat: Supabase auth, user profiles, progress tracking in DB"
   git push origin main

── PRÜFUNG NACH DEM PUSH ──────────────────────────────────────────────────

9a. GitHub Actions abwarten:
    → https://github.com/7mi7miwork/DaoYu-101/actions → Workflow grün?
    → Bei Fehler "VITE_SUPABASE_URL undefined": GitHub Secrets prüfen.

9b. LIVE-PRÜFUNG:
    → https://7mi7miwork.github.io/DaoYu-101/#/login (Strg+Shift+R oder Inkognito)
    ✅ Registrierung auf der Live-Seite funktioniert?
    ✅ Supabase Dashboard zeigt den neuen User?
    → Wenn ja: Schritt 8 ABGESCHLOSSEN ✓
```

---

## SCHRITT 9 — Profil, Zertifikate, Leaderboard

**Ziel:** Profilseite, PDF-Download, globales Leaderboard.

### Cline-Anweisung

```
Arbeitsverzeichnis: D:\Codes\Windsurf\Dao-Yu-101
Repo: https://github.com/7mi7miwork/DaoYu-101

Lies zuerst README.md und dao-yu-101-buildplan.md.
Wir sind bei: Schritt 9 — Profil, Zertifikate, Leaderboard

Halte ALLE KRITISCHEN REGELN aus dem Buildplan ein.

1. Installiere:
   npm install jspdf

2. Erstelle:
   src/pages/Profile.jsx
   src/pages/Leaderboard.jsx
   src/pages/Certificate.jsx
   src/hooks/useCertificate.js

3. Profile.jsx:
   → Avatar (Initialen-Kreis), Name, Level, XP, Streak
   → Badge-Galerie
   → Abgeschlossene Lektionen (aus Supabase user_progress)
   → Sprach-Dropdown (speichert in Supabase profiles.language + i18n wechseln)
   → Theme-Buttons (speichert in Supabase profiles.theme)

4. useCertificate.js:
   generateCertificate({ studentName, courseName, date, certId })
   → PDF mit jsPDF erstellen
   → Inhalt: "Certificate of Completion", Name, Kurs, Datum, Cert-ID
   → Download als [certId].pdf auslösen

5. Leaderboard.jsx:
   → Top 10 aus user_gamification nach total_xp DESC
   → JOIN mit profiles für Namen
   → Tabelle: Rang, Name, Level, XP

6. Neue Routen:
   /profile → <ProtectedRoute><Profile/></ProtectedRoute>
   /leaderboard → Leaderboard.jsx (öffentlich)
   /certificate/:id → Certificate.jsx (öffentlich)

── PRÜFUNG VOR DEM PUSH ───────────────────────────────────────────────────

7a. BUILD-PRÜFUNG:
    npm run build → "✓ built"?

7b. BROWSER-PRÜFUNG (lokal):
    npm run dev
    → http://localhost:5173/DaoYu-101/ öffnen
    ✅ /profile öffnen → Profildaten aus Supabase laden?
    ✅ Sprach- und Theme-Wechsel im Profil funktioniert und wird gespeichert?
    ✅ Zertifikat-Button klicken → PDF-Download startet?
    ✅ /leaderboard öffnen → User in Tabelle sichtbar?
    ✅ Keine Konsolen-Fehler?
    → Erst wenn alle ✅: weiter zum Push.

7c. GITHUB-VERBINDUNG PRÜFEN:
    git ls-remote origin
    → Kein Fehler? → Verbindung OK.

8. git add .
   git commit -m "feat: profile page, PDF certificates, global leaderboard"
   git push origin main

── PRÜFUNG NACH DEM PUSH ──────────────────────────────────────────────────

9a. GitHub Actions abwarten:
    → https://github.com/7mi7miwork/DaoYu-101/actions → Workflow grün?

9b. LIVE-PRÜFUNG:
    → https://7mi7miwork.github.io/DaoYu-101/#/leaderboard (Strg+Shift+R oder Inkognito)
    ✅ Leaderboard lädt?
    → https://7mi7miwork.github.io/DaoYu-101/#/profile (eingeloggt)
    ✅ Profil-Daten korrekt?
    ✅ PDF-Download auf der Live-Seite funktioniert?
    → Wenn ja: Schritt 9 ABGESCHLOSSEN ✓
```

---

## 📋 Gesamt-Übersicht

| # | Schritt | Was entsteht | Commit-Message |
|---|---------|--------------|----------------|
| 1 | Projekt-Setup | React + Vite + Tailwind + GitHub Actions | `feat: initialize React project` |
| 2 | Routing + Themes | HashRouter, Navbar, Footer, 3 Themes | `feat: routing, themes, app shell` |
| 3 | i18n | 4 Sprachen, Language Switcher | `feat: i18n system` |
| 4 | World Map | Pixel-Karte, 4 Archipelagos | `feat: world map` |
| 5 | Lektionen + Quiz | Markdown-Viewer, Quiz-Engine | `feat: lesson viewer, quiz engine` |
| 6 | Gamification | XP, Level, Badges, Streaks | `feat: gamification system` |
| 7 | Auth + Dashboards | Login, 5 Dashboards, Protected Routes | `feat: auth UI, dashboards` |
| 8 | Supabase | Echte Auth, DB, Progress | `feat: Supabase integration` |
| 9 | Profil + Zertifikate | Profil, PDF, Leaderboard | `feat: profile, certificates` |

---

## 🌐 Deine Live-URL

**https://7mi7miwork.github.io/DaoYu-101/**
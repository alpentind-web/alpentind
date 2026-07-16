# AlpenTind Platform

**Operativt system för guideföretag – visuell preview och domänmodell**

---

## Vad är AlpenTind Platform?

AlpenTind Platform är ett operativt webbsystem för AlpenTind, ett professionellt guideföretag som arrangerar vandreexpeditioner, klätterresor och vildmarksupplevelser i Skandinavien och Alperna.

Systemet samlar alla operativa flöden på ett ställe:

- Hantering av upplevelser och avgångar
- Kundbokningar och betalningsuppföljning
- Guide- och boendebokning
- Intern kommunikation och dokumenthantering
- Väderbevakning och riskhantering

---

## Preview-projektet

Mappen `preview/` innehåller en **ren frontend-prototyp** (HTML + CSS + JavaScript) utan backend. Syftet är att:

1. Definiera och testa den visuella identiteten
2. Visa hur systemet ska kännas att arbeta i
3. Ge en konkret referens för framtida backend-integration

Preview fungerar lokalt utan installation – öppna bara `preview/index.html` i en webbläsare.

### Inloggning i demo-läge

```
E-post:   erik@alpentind.se
Lösenord: demo
```

---

## Preview-versioner

| Version | Sprint | Fokus |
|---------|--------|-------|
| v0.1 | PREVIEW-001 | Teknisk grund, designsystem, mockdata |
| v0.2 | PREVIEW-002 | Varumärke, svenska, informationsbanner, design tokens |

---

## Mappstruktur

```
preview/
├── index.html          – Inloggningssida
├── arbetsdag.html      – Dashboard (Min arbetsdag)
├── upplevelser.html    – Upplevelser (produktkatalog)
├── css/
│   ├── design-system.css   – Designtokens och grundstilar
│   ├── layout.css           – Layoutgrid, sidopanel, sidhuvud
│   ├── components.css       – Knappar, kort, tabeller, formulär
│   └── pages.css            – Sidspecifika stilar
└── js/
    ├── mock-data.js    – Exempeldata för demo
    ├── ui.js           – Renderingsfunktioner
    └── navigation.js   – Navigering och autentisering
```

---

## Teknikstack

| Lager | Teknologi |
|-------|-----------|
| Markup | HTML5 (semantisk) |
| Stil | CSS3 (custom properties, grid, flexbox) |
| Logik | Vanilla JavaScript (ES6+) |
| Ikoner | Feather Icons (tunna linjeikoner) |
| Typografi | Playfair Display (rubriker), system-font (brödtext) |

---

## Designprinciper

Se [docs/10-business/UPPLEVELSEMODELL.md](docs/10-business/UPPLEVELSEMODELL.md) för fullständig beskrivning.

Kortfattat:

- **Lugnt** – Inga distraktioner, fokus på data
- **Premium** – Professionell känsla med koppar/brons-accent
- **Skandinaviskt** – Enkelt, funktionellt, välarbetat
- **Tillgängligt** – Semantisk HTML, korrekta etiketter, kontraster

---

## Domänmodell och backend

Backend-arkitekturen (Python, FastAPI, SQLite) finns under `src/`.

Se [docs/20-architecture/ARCHITECTURE.md](docs/20-architecture/ARCHITECTURE.md) och [docs/20-architecture/DOMAIN_MODEL.md](docs/20-architecture/DOMAIN_MODEL.md) för mer information.

---

## Bygga och testa

```bash
# Installera Python-beroenden
pip install -e ".[dev]"

# Kör tester
pytest

# Lint
ruff check src tests

# Öppna Preview i webbläsare
open preview/index.html
```

---

## Roadmap

Se [docs/00-governance/ROADMAP.md](docs/00-governance/ROADMAP.md) för planerade sprints.

- PREVIEW-001 ✅ Teknisk grund
- PREVIEW-002 ✅ Varumärke och användarupplevelse
- PREVIEW-003 🔜 Avgångar, kunder, guider (fullständiga sidor)

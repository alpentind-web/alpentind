# AlpenTind Komponentbibliotek v1.0

> Komplett referensdokumentation för AlpenTind Platforms UI-komponenter.

---

## Innehåll

1. [Översikt](#översikt)
2. [Designprinciper](#designprinciper)
3. [Komma igång](#komma-igång)
4. [Designsystem](#designsystem)
   - [Färger](#färger)
   - [Typografi](#typografi)
   - [Mellanrum](#mellanrum)
   - [Radier och skuggor](#radier-och-skuggor)
5. [Komponenter](#komponenter)
   - [Knappar](#knappar)
   - [Kort](#kort)
   - [Statusetiketter](#statusetiketter)
   - [Tabeller](#tabeller)
   - [Formulär](#formulär)
   - [Navigation](#navigation)
   - [Dialogrutor](#dialogrutor)
   - [Aviseringar](#aviseringar)
6. [Hjälpklasser](#hjälpklasser)
7. [Mappstruktur](#mappstruktur)

---

## Översikt

AlpenTind Komponentbibliotek är grunden för AlpenTind Platforms användargränssnitt. Det tillhandahåller återanvändbara, dokumenterade och konsekvent utseende-komponenter som kan kombineras för att bygga nya sidor.

**Syfte:** Att säkerställa att alla sidor i AlpenTind Platform ser och känns likadana, och att nya sidor kan byggas snabbt genom att kombinera befintliga komponenter.

**Version:** 1.0 (PREVIEW-003)

**Teknik:**
- Ren HTML5 (semantisk)
- CSS med design-tokens (CSS Custom Properties)
- Feather Icons via CDN
- Playfair Display (Google Fonts) för rubriker
- Ingen JavaScript krävs för komponenter (utom Feather Icons)

---

## Designprinciper

### 1. Konsekvent namngivning
Alla CSS-klasser följer BEM-inspirerad namnkonvention:
- Block: `.card`, `.btn`, `.badge`
- Element: `.card-header`, `.card-body`, `.btn-primary`
- Modifierare: `.btn-sm`, `.btn-lg`, `.card-success`

### 2. Design Tokens
All styling använder CSS Custom Properties (design tokens) definierade i `design-system.css`:
```css
/* Aldrig */
color: #B8955A;

/* Alltid */
color: var(--color-primary);
```

### 3. Inga inline-stilar
CSS-klasser används alltid. Undantag: demo-syften i komponentbiblioteket.

### 4. Semantisk HTML
- Använd `<button>` för interaktiva knappar
- Använd `<a>` för navigeringslänkar
- Använd `<table>` för tabelldata
- Använd `role` och `aria-*` för tillgänglighet

### 5. Ingen duplicering
Samma komponent används överallt. Skapa aldrig sida-specifika versioner av en befintlig komponent.

---

## Komma igång

### Länka CSS-filer
Inkludera alla CSS-filer i rätt ordning:

```html
<link rel="stylesheet" href="../css/design-system.css">
<link rel="stylesheet" href="../css/components.css">
<link rel="stylesheet" href="../css/layout.css">
<link rel="stylesheet" href="../css/pages.css">
<link rel="stylesheet" href="../css/utilities.css">
```

### Länka Feather Icons
```html
<script src="https://unpkg.com/feather-icons"></script>
<!-- I slutet av body: -->
<script>feather.replace();</script>
```

### Sidlayout
Alla autentiserade sidor använder grid-layouten:
```html
<body>
  <aside class="sidebar" id="sidebar"></aside>
  <header class="header" id="header"></header>
  <main class="main">
    <!-- Sidinnehåll -->
  </main>
</body>
```

---

## Designsystem

### Färger

| Token | Värde | Användning |
|-------|-------|-----------|
| `--color-primary` | `#B8955A` | Primärfärg – koppar/brons |
| `--color-dark-primary` | `#8B6E47` | Hover-state för primär |
| `--color-light-primary` | `#D4AF86` | Ljusare variant |
| `--color-bg-dark` | `#1F2A33` | Sidans bakgrund, sidebar |
| `--color-bg-medium` | `#2E3A44` | Kortbakgrund, header |
| `--color-bg-light` | `#3A4550` | Hover-bakgrund, input |
| `--color-text-light` | `#F2F4F5` | Primär text |
| `--color-text-medium` | `#C5CDD2` | Sekundär text |
| `--color-text-dark` | `#8B95A1` | Hjälptext, metadata |
| `--color-success` | `#6B9E7F` | Bekräftad, aktiv |
| `--color-warning` | `#D4A574` | Varning, väntande |
| `--color-danger` | `#B85C5C` | Fel, avbruten |
| `--color-info` | `#7A9FB5` | Information, utkast |

### Typografi

| Token | Värde | Användning |
|-------|-------|-----------|
| `--font-family-serif` | Playfair Display | Alla rubriker (h1–h4) |
| `--font-family-sans` | Systemfont | Brödtext, knappar |
| `--font-size-xs` | 12px | Metadata, etiketter |
| `--font-size-sm` | 14px | Hjälptext, tabelldata |
| `--font-size-base` | 16px | Standard brödtext |
| `--font-size-lg` | 18px | Rubrik 4 |
| `--font-size-xl` | 24px | Rubrik 3 |
| `--font-size-2xl` | 32px | Rubrik 2 |
| `--font-size-3xl` | 40px | Rubrik 1 |

### Mellanrum

| Token | Värde | Användning |
|-------|-------|-----------|
| `--spacing-xs` | 4px | Mikromellanrum (ikoner) |
| `--spacing-sm` | 8px | Tight grupp |
| `--spacing-md` | 16px | Standard padding |
| `--spacing-lg` | 24px | Sektionsmellanrum |
| `--spacing-xl` | 32px | Sidmellanrum |
| `--spacing-2xl` | 48px | Stora sektioner |
| `--spacing-3xl` | 64px | Sidtopp |

### Radier och skuggor

| Token | Värde |
|-------|-------|
| `--radius-sm` | 4px |
| `--radius-md` | 8px |
| `--radius-lg` | 12px |
| `--radius-xl` | 16px |
| `--radius-full` | 9999px |
| `--shadow-sm` | Subtil skugga |
| `--shadow-md` | Kortskugga |
| `--shadow-lg` | Dialogskugga |
| `--shadow-xl` | Modal-skugga |

---

## Komponenter

### Knappar

**Fil:** `preview/components/buttons.html`

#### Primär knapp
Den viktigaste åtgärden på sidan. Högst en per sektion.

```html
<button class="btn btn-primary">Spara</button>
<button class="btn btn-primary btn-sm">Liten</button>
<button class="btn btn-primary btn-lg">Stor</button>
<button class="btn btn-primary btn-full">Full bredd</button>
<button class="btn btn-primary" disabled>Inaktiverad</button>
```

#### Sekundär knapp
Sekundära åtgärder. Kombineras med primär.

```html
<button class="btn btn-secondary">Avbryt</button>
```

#### Neutral knapp
Tertiär åtgärd, transparent bakgrund.

```html
<button class="btn btn-tertiary">Filtrera</button>
```

#### Faraknapp
Destruktiva åtgärder (radering). Kräver alltid bekräftelsedialog.

```html
<button class="btn btn-danger">
  <i data-feather="trash-2"></i>
  Ta bort
</button>
```

#### Ikonknapp
Cirkelformad knapp enbart med ikon. Kräver `title`- och `aria-label`-attribut.

```html
<button class="btn btn-icon" title="Sök" aria-label="Sök">
  <i data-feather="search"></i>
</button>
```

**När används vad:**
- Primär: "Spara", "Bekräfta", "Skapa ny"
- Sekundär: "Avbryt", "Tillbaka", "Exportera"
- Neutral: "Filtrera", "Visa mer"
- Fara: "Ta bort", "Avboka"
- Ikon: Verktygsfält, tabellrader

---

### Kort

**Fil:** `preview/components/cards.html`

#### Standardkort
```html
<article class="card">
  <div class="card-header">
    <h4>Rubrik</h4>
    <span class="badge badge-success">Status</span>
  </div>
  <div class="card-body">
    <p>Innehåll...</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary btn-sm">Åtgärd</button>
  </div>
</article>
```

#### Statistikkort
```html
<div class="stat-card">
  <div class="stat-card-icon">
    <i data-feather="calendar"></i>
  </div>
  <div class="stat-card-value">12</div>
  <div class="stat-card-label">Aktiva avgångar</div>
</div>
```

#### Åtgärdskort (klickbart)
```html
<a href="#" class="action-card">
  <div class="action-card-icon">
    <i data-feather="plus-circle"></i>
  </div>
  <div class="action-card-content">
    <div class="action-card-title">Ny avgång</div>
    <div class="action-card-desc">Skapa en ny avgång</div>
  </div>
  <i data-feather="chevron-right"></i>
</a>
```

#### Informationskort med statusborder
```html
<div class="card card-success">...</div>  <!-- Grön vänsterborder -->
<div class="card card-warning">...</div>  <!-- Orange vänsterborder -->
<div class="card card-danger">...</div>   <!-- Röd vänsterborder -->
<div class="card card-info">...</div>     <!-- Blå vänsterborder -->
```

---

### Statusetiketter

**Fil:** `preview/components/badges.html`

#### Standardetikett
```html
<span class="badge badge-success">Bekräftad</span>
<span class="badge badge-warning">Väntande</span>
<span class="badge badge-danger">Avbruten</span>
<span class="badge badge-info">Utkast</span>
<span class="badge badge-primary">Primär</span>
```

#### Med ikon
```html
<span class="badge badge-success">
  <i data-feather="check-circle" style="width:12px;height:12px;"></i>
  Aktiv
</span>
```

#### Filteretiketter (Chips)
```html
<span class="chip">Alla</span>
<span class="chip active">Vandring</span>
```

**Färgkodning för bokningsstatus:**
- `badge-success` → Bekräftad / Aktiv / Slutförd
- `badge-warning` → Väntande / Väntar på bekräftelse / Varning
- `badge-danger` → Avbruten / Inställd / Fel
- `badge-info` → Utkast / Information
- `badge-primary` → AlpenTind-specifika markering

---

### Tabeller

**Fil:** `preview/components/tables.html`

#### Standardtabell
```html
<div class="showcase-table-container">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Kund</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Anna Andersson</td>
        <td><span class="badge badge-success">Bekräftad</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

#### Markerad rad
```html
<tr class="table-row-selected">...</tr>
```

#### Sorterbar kolumnrubrik (visuell)
```html
<th scope="col" class="sortable sorted-asc">
  <span class="th-content">
    Datum
    <i data-feather="chevron-up" style="width:14px;height:14px;"></i>
  </span>
</th>
```

---

### Formulär

**Fil:** `preview/components/forms.html`

#### Textfält
```html
<div class="form-group">
  <label for="field-id" class="form-label">Namn</label>
  <input type="text" id="field-id" class="form-input" placeholder="Ange namn">
  <span class="form-help">Hjälptext visas här.</span>
</div>
```

#### Felmeddelande
```html
<input type="text" class="form-input form-input-error">
<span class="form-error">
  <i data-feather="alert-circle" style="width:14px;height:14px;display:inline;vertical-align:middle;"></i>
  Felmeddelandet visas här.
</span>
```

#### Välj-lista
```html
<select class="form-input">
  <option value="">Välj...</option>
  <option value="1">Alternativ 1</option>
</select>
```

#### Kryssruta
```html
<label class="checkbox">
  <input type="checkbox" name="name" value="value">
  Etiketttext
</label>
```

#### Radioknapp
```html
<label class="radio">
  <input type="radio" name="group" value="value">
  Etiketttext
</label>
```

#### Textområde
```html
<textarea class="form-input" rows="4" placeholder="Text..."></textarea>
```

---

### Navigation

**Fil:** `preview/components/navigation.html`

#### Sidomenylänk
```html
<button class="nav-item active">
  <span class="nav-icon"><i data-feather="home"></i></span>
  <span>Min arbetsdag</span>
</button>
```

#### Brödsmulor
```html
<nav aria-label="Brödsmulor" class="breadcrumb">
  <ol class="breadcrumb-list">
    <li class="breadcrumb-item"><a href="#">Upplevelser</a></li>
    <li class="breadcrumb-item">
      <i data-feather="chevron-right" style="width:14px;height:14px;"></i>
      <a href="#">Tour du Mont Blanc</a>
    </li>
    <li class="breadcrumb-item breadcrumb-current" aria-current="page">
      <i data-feather="chevron-right" style="width:14px;height:14px;"></i>
      Avgång 15 jul
    </li>
  </ol>
</nav>
```

#### Flikar
```html
<div class="tabs" role="tablist">
  <button class="tab active" role="tab" aria-selected="true">Översikt</button>
  <button class="tab" role="tab" aria-selected="false">Deltagare</button>
</div>
<div class="tab-content" role="tabpanel">...</div>
```

#### Steg-indikator
```html
<div class="steps">
  <div class="step completed">
    <span class="step-number"><i data-feather="check"></i></span>
    <span>Steg 1</span>
  </div>
  <div class="step-separator"></div>
  <div class="step active" aria-current="step">
    <span class="step-number">2</span>
    <span>Steg 2</span>
  </div>
</div>
```

---

### Dialogrutor

**Fil:** `preview/components/modals.html`

```html
<!-- Bekräftelsedialog -->
<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="modal-header">
    <h3 id="modal-title">Bekräfta åtgärd</h3>
    <button class="btn btn-icon btn-sm" aria-label="Stäng">
      <i data-feather="x"></i>
    </button>
  </div>
  <div class="modal-body">
    <p>Är du säker?</p>
  </div>
  <div class="modal-footer">
    <button class="btn btn-secondary">Avbryt</button>
    <button class="btn btn-primary">Bekräfta</button>
  </div>
</div>
```

**Dialogtyper:**
- Bekräftelse: Grön ikon + Primär knapp
- Radering: Röd ikon + Faraknapp
- Information: Blå ikon + Stäng-knapp
- Varning: Orange ikon + Primär/Sekundär knapp

---

### Aviseringar

**Fil:** `preview/components/alerts.html`

#### Inline-avisering
```html
<div class="alert alert-info" role="alert">
  <i data-feather="info"></i>
  <div><strong>Info:</strong> Meddelandetext här.</div>
  <button class="alert-close" aria-label="Stäng">
    <i data-feather="x" style="width:16px;height:16px;"></i>
  </button>
</div>
```

Varianter: `alert-info`, `alert-success`, `alert-warning`, `alert-danger`

#### Toast-avisering
```html
<div class="toast toast-success" role="status">
  <i data-feather="check-circle" style="color: var(--color-success);"></i>
  <span>Ändringen sparad!</span>
</div>
```

#### Tomt läge
```html
<div class="empty-state">
  <i data-feather="inbox"></i>
  <h3>Inga avgångar</h3>
  <p>Beskrivning av det tomma läget.</p>
  <button class="btn btn-primary mt-lg">Skapa ny</button>
</div>
```

---

## Hjälpklasser

**Fil:** `preview/css/utilities.css`

### Flex
```css
.flex           /* display: flex */
.flex-col       /* flex-direction: column */
.items-center   /* align-items: center */
.justify-between /* justify-content: space-between */
.gap-md         /* gap: var(--spacing-md) */
.flex-1         /* flex: 1 */
.flex-wrap      /* flex-wrap: wrap */
```

### Grid
```css
.grid           /* display: grid */
.grid-cols-2    /* grid-template-columns: repeat(2, 1fr) */
.grid-cols-3    /* grid-template-columns: repeat(3, 1fr) */
.grid-cols-4    /* grid-template-columns: repeat(4, 1fr) */
.col-span-full  /* grid-column: 1 / -1 */
```

### Marginaler och padding
```css
.mt-sm  .mt-md  .mt-lg  .mt-xl   /* margin-top */
.mb-sm  .mb-md  .mb-lg  .mb-xl   /* margin-bottom */
.p-sm   .p-md   .p-lg   .p-xl    /* padding */
.m-0    .p-0                      /* nollställ */
```

### Text
```css
.text-xs  .text-sm  .text-base  .text-lg   /* storlek */
.text-muted  .text-primary                  /* färg */
.text-center  .text-right  .text-left       /* justering */
.font-bold  .font-semibold                  /* vikt */
.truncate                                   /* overflow ellipsis */
.uppercase  .capitalize                     /* transform */
```

### Synlighet
```css
.hidden          /* display: none */
.sr-only         /* tillgänglighet, visuellt dolt */
.opacity-50      /* halvtransparent */
```

---

## Mappstruktur

```
preview/
├── index.html               # Inloggningssida
├── arbetsdag.html           # Workspace / Min arbetsdag
├── produkter.html           # Upplevelsekatalog
│
├── components/              # Komponentbibliotek (showcase-sidor)
│   ├── buttons.html         # Knappar
│   ├── cards.html           # Informationskort
│   ├── badges.html          # Statusetiketter
│   ├── tables.html          # Tabeller
│   ├── forms.html           # Formulär
│   ├── navigation.html      # Navigation
│   ├── modals.html          # Dialogrutor
│   ├── alerts.html          # Aviseringar och tomma lägen
│   └── typography.html      # Typografi, ikoner och färger
│
├── css/
│   ├── design-system.css    # Designtokens, reset, typografi
│   ├── components.css       # Knappar, kort, etiketter, tabeller, etc.
│   ├── layout.css           # Sidomeny, header, grid, responsivitet
│   ├── pages.css            # Sida-specifika stilar, komponentbibliotekslayout
│   └── utilities.css        # Hjälpklasser
│
└── js/
    ├── mock-data.js         # Testdata för alla sidor
    ├── ui.js                # Renderingsfunktioner
    └── navigation.js        # Sidnavigering
```

---

## Versionshistorik

| Version | Sprint | Ändringar |
|---------|--------|-----------|
| 1.0 | PREVIEW-003 | Komplett komponentbibliotek skapat |
| 0.2 | PREVIEW-002 | Varumärke, designsystem, svenska |
| 0.1 | PREVIEW-001 | Grundstruktur, layout, mockdata |

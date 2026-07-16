# Designsystem

*AlpenTind Platforms visuella grund och designprinciper.*

---

## Designprinciper

Se [../00-governance/ALPENTIND_WAY.md](../00-governance/ALPENTIND_WAY.md) för de grundläggande designprinciperna:
**Lugnt · Premium · Skandinaviskt · Professionellt · Tillgängligt**

---

## Färgpalett

| Token | Värde | Användning |
|-------|-------|------------|
| `--color-primary` | `#B8955A` | Koppar/brons – accenter och aktiva element |
| `--color-bg-dark` | `#1F2A33` | Djupgrå – sidans bakgrund |
| `--color-bg-medium` | `#2E3A44` | Stengrå – kort och paneler |
| `--color-text-primary` | `#E8E0D4` | Ljus text på mörk bakgrund |
| `--color-text-secondary` | `#A8A09A` | Sekundär text, metadata |
| `--status-success` | `#6B9E7F` | Bekräftade avgångar, slutförda uppgifter |
| `--status-warning` | `#D4A574` | Väntande bokningar, varningar |
| `--status-error` | `#B85C5C` | Fel och kritiska varningar |
| `--status-info` | `#7A9FB5` | Informationsmeddelanden |

---

## Typografi

| Nivå | Typsnitt | Användning |
|------|----------|------------|
| Rubriker | Playfair Display | H1–H3, logotyp |
| Brödtext | System-font stack | Allt övrig text |
| Kod | Monospace | Tekniska värden |

---

## Mellanrum

Systemet använder ett 4px-baserat mellanrumssystem:

| Token | Värde |
|-------|-------|
| `--space-xs` | `4px` |
| `--space-sm` | `8px` |
| `--space-md` | `16px` |
| `--space-lg` | `24px` |
| `--space-xl` | `32px` |
| `--space-2xl` | `48px` |

---

## Ikoner

**Feather Icons** används genomgående – tunna linjeikoner i konsekvent stil.

- Laddas via CDN i preview
- Inga emoji-ikoner i navigering eller datapresentation
- Ikonstorlek: 16px (inline), 20px (navigering), 24px (knappar)

---

## CSS-filer

Designsystemet implementeras i följande CSS-filer i `preview/css/`:

| Fil | Ansvar |
|-----|--------|
| `design-system.css` | Designtokens och grundstilar |
| `layout.css` | Layoutgrid, sidopanel, sidhuvud |
| `components.css` | Knappar, kort, tabeller, formulär |
| `pages.css` | Sidspecifika stilar |
| `utilities.css` | Hjälpklasser |

---

## Mer information

- [COMPONENT_LIBRARY.md](./COMPONENT_LIBRARY.md) – Fullständig komponentreferens
- [UX_GUIDELINES.md](./UX_GUIDELINES.md) – UX-riktlinjer och beteendemönster
- [BRAND_GUIDE.md](./BRAND_GUIDE.md) – Varumärkesidentitet

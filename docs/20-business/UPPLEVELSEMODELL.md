# AlpenTind Platform – Upplevelsemodell

*Dokument: UPPLEVELSEMODELL.md  
Version: 0.2  
Sprint: PREVIEW-002*

---

## Vision

AlpenTind Platform är det operativa navet för ett professionellt guideföretag.

Systemet ska göra det enkelt för guider och administratörer att:

- Planera och följa upp expeditioner
- Hantera bokningar och kunder
- Koordinera guider och boenden
- Kommunicera internt och med kunder

Målet är att en guide kan öppna "Min arbetsdag" på morgonen och omedelbart förstå vad som krävs av dem idag.

---

## Syfte med Preview-projektet

Preview är den **visuella referensen** för AlpenTind Platform.

Den innehåller ingen backend, ingen databas och ingen affärslogik.

Syftet är att:

1. Definiera hur systemet ska se ut och kännas
2. Validera navigeringsflödet och informationshierarkin
3. Ge en konkret referens för backend-integration
4. Visa potentiella användare vad de kan förvänta sig

---

## Designprinciper

### Lugnt

Gränssnittet ska aldrig stressa användaren. Informationen visas tydligt och i rätt sammanhang, utan onödiga distraktioner eller animationer.

### Premium

AlpenTind arrangerar premiumexpeditioner. Systemet ska spegla det. Koppar/brons-accenter, serif-typografi för rubriker och ett mörkt, djupt färgschema skapar en känsla av kvalitet och trovärdighet.

### Skandinaviskt

Enkelhet, funktionalitet och välarbetat hantverk. Inget element finns utan ett syfte. Ingen funktion läggs till utan att det löser ett verkligt behov.

### Professionellt

Systemet används av guider med hög kompetens och ansvar. Gränssnittet ska behandla dem som proffs: tydlig information, korta arbetsflöden, inga onödiga bekräftelsedialoger.

### Tillgängligt

Semantisk HTML, korrekta ARIA-etiketter och tillräckliga kontraster gör systemet användbart för alla.

---

## Färgpalett

| Token | Värde | Användning |
|-------|-------|------------|
| `--color-primary` | `#B8955A` | Koppar/brons – accenter och aktiva element |
| `--color-bg-dark` | `#1F2A33` | Djupgrå – sidans bakgrund |
| `--color-bg-medium` | `#2E3A44` | Stengrå – kort och paneler |
| `--status-success` | `#6B9E7F` | Bekräftade avgångar, slutförda uppgifter |
| `--status-warning` | `#D4A574` | Väntande bokningar, varningar |
| `--status-error` | `#B85C5C` | Fel och kritiska varningar |
| `--status-info` | `#7A9FB5` | Informationsmeddelanden |

---

## Ikoner

Feather Icons används genomgående – tunna linjeikoner i konsekvent stil. Inga emoji-ikoner i navigering eller datapresentation.

---

## Menystruktur

Menyn följer domänmodellen för ett guideföretag:

| Menypost | Beskrivning |
|----------|-------------|
| Min arbetsdag | Workspace med dagens viktigaste information |
| Upplevelser | Produktkatalog – guidade resor och aktiviteter |
| Avgångar | Planerade och bekräftade resor |
| Kunder | Kundregister och bokningshistorik |
| Guider | Guideregister och tillgänglighet |
| Boenden | Stugor, hytter och refuges |
| Ekonomi | Betalningar, fakturor och rapporter |
| Kartor | Rutter och GPS-spår |
| Dokument | Deltagaravtal, packlister, permit |
| Meddelanden | Intern och extern kommunikation |
| Inställningar | Systeminställningar och profil |

---

## Vad Preview INTE är

- Ingen backend, API eller databas
- Ingen autentisering (demo-inloggning är simulerad)
- Inga formulär som sparar data
- Ingen affärslogik

---

## Framtidsplan

| Sprint | Fokus |
|--------|-------|
| PREVIEW-001 | Teknisk grund, designsystem ✅ |
| PREVIEW-002 | Varumärke, svenska, design tokens ✅ |
| PREVIEW-003 | Fullständiga sidor för Avgångar, Kunder, Guider |
| PREVIEW-004 | Interaktiva formulär, sökfunktion |
| RELEASE-001 | Integration med FastAPI-backend |

# UX-riktlinjer

*Beteendemönster och interaktionsprinciper för AlpenTind Platform.*

---

## Principer

### Visa rätt information i rätt sammanhang

En guide ska inte behöva söka efter vad som är viktigt idag. Workspace ("Min arbetsdag") ska presentera prioriterad information direkt.

### Korta arbetsflöden

Vanliga uppgifter (bekräfta bokning, tilldela guide) ska kunna utföras med minimal navigation. Aldrig fler än tre klick till en kritisk funktion.

### Tydliga statusar

Varje objekt (avgång, bokning, kund) ska alltid ha en synlig status med tydlig färgkodning:

| Status | Färg | Betydelse |
|--------|------|-----------|
| Bekräftad | Grön (`--status-success`) | Klar att köra |
| Väntande | Orange (`--status-warning`) | Kräver åtgärd |
| Kritisk | Röd (`--status-error`) | Omedelbar åtgärd |
| Info | Blå (`--status-info`) | Generell information |

### Inga bekräftelsedialoger för säkra operationer

Onödiga "är du säker?"-dialoger stör flödet. Använd dem bara för destruktiva operationer som inte kan ångras.

---

## Navigationsmönster

Systemet använder en persistent sidopanel med huvudnavigering:

```
Sidopanel (alltid synlig)
├── Min arbetsdag (Workspace)
├── Upplevelser
├── Avgångar
├── Kunder
├── Guider
├── Boenden
├── Ekonomi
├── Kartor
├── Dokument
├── Meddelanden
└── Inställningar
```

Aktiv sida markeras med koppar/brons-accent (`--color-primary`).

---

## Formulärriktlinjer

- Labels ovanför fält (inte som placeholder)
- Felmeddelanden visas direkt under det felaktiga fältet
- Obligatoriska fält markeras med asterisk
- Spara-knappar ska alltid vara synliga utan scrollning

---

## Tillgänglighet

- Semantisk HTML5 (`nav`, `main`, `article`, `section`)
- Alla interaktiva element ska ha fokusindikator
- Färgkontrast: minst 4.5:1 för brödtext, 3:1 för stora rubriker
- Alla ikoner ska ha `aria-label` eller `title`
- Tangentbordsnavigering ska fungera för alla flöden

---

## Responsivitet

Preview är primärt designad för desktop-användning (1200px+). Mobil-stöd planeras i ett senare skede.

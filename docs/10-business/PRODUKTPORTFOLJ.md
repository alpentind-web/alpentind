# Produktportfölj

*Beskrivning av AlpenTind Platforms produktportfölj och expeditioner.*

---

## Nuvarande produkter

### Tour du Mont Blanc (TMB)

Europas mest kända vandring – en rundtur kring Mont Blanc på 170 km genom Frankrike, Italien och Schweiz.

- **Längd:** ~170 km
- **Etapper:** 11 etapper
- **Boenden:** Refuges och vandrarhem
- **Säsong:** Juni–September
- **Status:** Verifierat dataset under uppbyggnad

---

## Planerade produkter

| Produkt | Region | Status |
|---------|--------|--------|
| Walker's Haute Route | Alper (Chamonix–Zermatt) | Planerad |
| Jotunheimen-traverse | Norge | Planerad |
| Kungsleden | Sverige | Planerad |

---

## Produktprinciper

1. Varje produkt definieras av rutter, etapper och boenden i databasen.
2. Affärslogiken är **produkt-agnostisk** – samma system hanterar alla produkter.
3. Tour du Mont Blanc är pilotprodukten men inte den enda.
4. Produktportföljen utökas utan arkitekturella förändringar.

---

## Relationer

```
Produkt
    ↓
Avgång (schemalagd resa)
    ↓
Bokning (kund + avgång)
```

Se [DOMAIN_DICTIONARY.md](../20-architecture/DOMAIN_DICTIONARY.md) för fullständig domänmodell.

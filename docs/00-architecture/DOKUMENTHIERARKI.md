# Dokumenthierarki

*Den permanenta dokumentstrukturen för AlpenTind Platform.*

Dokument placeras efter **arkitekturansvar**, aldrig efter kronologi. Varje dokumenttyp äger ett ansvar och får inte överlappa en annan dokumenttyp.

---

## Permanent struktur

```text
docs/
├── 00-architecture/
├── 10-platform/
├── 20-business/
├── 30-engineering/
├── 40-reference/
├── 50-standards/
└── 60-validation/
```

---

## Ansvar per lager

| Lager | Ansvar | Primära artefakter |
|-------|--------|--------------------|
| `00-architecture/` | Arkitektoniskt uppsåt, klassificering, dokumentstyrning | ADR |
| `10-platform/` | Plattformsansvar över flera business engines | Plattforms-PDR |
| `20-business/` | Verksamhetsansvar och engine-specifik affärsarkitektur | Business-PDR, business governance |
| `30-engineering/` | Engineering-tolkning av godkänd arkitektur | ESR |
| `40-reference/` | Referensimplementation och stödmaterial | RI, guider, ordböcker |
| `50-standards/` | Delade normer och standarder | SDS, design- och interaktionsstandarder |
| `60-validation/` | Verifiering i verkligt arbete och releaseunderlag | BVR, valideringsbevis |

---

## Relationsmodell

Den normativa kedjan är:

**ADR → PDR → ESR → RI → BVR → Discovery**

- **ADR** klassificerar betydande arbete innan lösningsarbete startar.
- **PDR** fastställer ansvarig arkitektur.
- **ESR** beskriver engineering-tolkningen.
- **RI** fångar referensmönstret från genomförandet.
- **BVR** bevisar affärsmässig användbarhet.
- **Discovery** tar tillbaka validerat lärande till framtida arkitektur.

Discovery ligger alltså efter validering i styrmodellen. Placering av dokument styrs fortfarande av ansvar, inte av sekvens.

---

## Styrningsregler

1. ADR-klassificering krävs före betydande arbete.
2. PDR krävs före ESR.
3. ESR krävs före RI.
4. BVR krävs innan arkitektur anses komplett.
5. Arkitektur utvecklas genom validerat affärslärande, inte genom implementering ensam.
6. Ingen dokumenttyp får ta över en annan dokumenttyps ansvar.
7. Ingen dokumentplacering får motiveras av datum, sprint eller historik.

---

## Praktisk placering

| Dokumenttyp | Plats |
|-------------|------|
| `ADR-*` | `docs/00-architecture/` |
| plattformsövergripande `PDR-*` | `docs/10-platform/` |
| business-engine `PDR-*` | `docs/20-business/` |
| `ESR-*` | `docs/30-engineering/` |
| `RI-*` och referensguider | `docs/40-reference/` |
| `SDS-*` och delade standarder | `docs/50-standards/` |
| `BVR-*` och valideringsunderlag | `docs/60-validation/` |

---

## Tillämpning

| Situation | Åtgärd |
|-----------|--------|
| Ny betydande förmåga | Börja med ADR-klassificering |
| Nytt plattformsansvar | Skapa eller uppdatera PDR i `10-platform/` |
| Nytt business engine-ansvar | Skapa eller uppdatera PDR i `20-business/` |
| Engineering ska börja | Säkerställ godkänd PDR och skapa ESR |
| Implementering är genomförd | Dokumentera RI före BVR |
| Arkitektur ska betraktas som färdig | Säkerställ att BVR finns |
| Nytt lärande från verkligt arbete | För tillbaka det via Discovery till framtida ADR/PDR |

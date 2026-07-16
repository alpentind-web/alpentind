# AlpenTind Platform – Dokumentation

> Dokumentationen är en del av produkten.

---

## Syfte

Detta är AlpenTind Platforms kunskapssystem. Dokumenten beskriver varför plattformen byggs, hur den är uppbyggd och hur den ska utvecklas.

**AlpenTind Way är projektets högsta styrande referens.**
> Läs alltid AlpenTind Way innan övriga dokument.

Dokumentationen ska vara **konsekvent**, **lätt att navigera** och **läsas i ordning** – från övergripande mål ned till tekniska detaljer.

---

## Struktur

```
docs/
├── 00-governance/    – Styrande dokument och grundprinciper
├── 10-business/      – Affärsmål, krav och regler
├── 20-architecture/  – Teknisk arkitektur och beslut
├── 30-design/        – Designsystem och UX-riktlinjer
└── 40-reviews/       – Releasenoteringar och granskningar
```

Dokumenten ska läsas i nummerordning. Varje nivå bygger på den föregående.

---

## Dokumenthierarki

```
AlpenTind Way
    ↓
Affärsplan
    ↓
Produktkrav
    ↓
Affärsregler
    ↓
Arkitektur
    ↓
Designsystem
    ↓
Kod
```

Se [00-governance/DOKUMENTHIERARKI.md](./00-governance/DOKUMENTHIERARKI.md) för fullständig beskrivning.

---

## Principer

- **Dokumentation är en del av produkten** – inte ett tillägg.
- **Ordning spelar roll** – läs governance innan architecture, architecture innan design.
- **Ingen kod utan dokumentation** – varje arkitekturellt beslut dokumenteras som ett ADR.
- **Inga konflikter** – ett dokument får aldrig motsäga ett dokument ovanför i hierarkin.

---

## Kom igång

1. Läs [00-governance/ALPENTIND_WAY.md](./00-governance/ALPENTIND_WAY.md) – AlpenTinds grundvärderingar och arbetssätt
2. Läs [00-governance/DOKUMENTHIERARKI.md](./00-governance/DOKUMENTHIERARKI.md) – hur dokumenten relaterar till varandra
3. Läs [10-business/AFFARSPLAN.md](./10-business/AFFARSPLAN.md) – vad vi bygger och varför
4. Läs [20-architecture/ARCHITECTURE.md](./20-architecture/ARCHITECTURE.md) – hur systemet är uppbyggt

# Dokumenthierarki

*Dokumentens beroenden och prioriteringsordning för AlpenTind Platform.*

AlpenTind Way är utgångspunkten för dokumenthierarkin och projektets högsta styrande referens.

---

## Hierarkin

```
Affärsplan
    ↓
AlpenTind Way
    ↓
Produktkrav
    ↓
Affärsregler
    ↓
Arkitektur
    ↓
Designsystem
    ↓
Implementation
```

---

## Regel: Ingen konflikt uppåt

**Ett dokument får aldrig motsäga ett dokument ovanför i hierarkin.**

Om en arkitekturellt beslut (ADR) verkar strida mot affärsreglerna gäller affärsreglerna. Om koden strider mot designsystemet gäller designsystemet.

Vid konflikt:
1. Eskalera till närmast överordnat dokument
2. Uppdatera det lägre dokumentet – aldrig det högre
3. Om det lägre dokumentet är korrekt och det högre behöver ändras, kräver det ett formellt beslut med godkännande

---

## Dokumentbeskrivningar

### 1. Affärsplan

**Plats:** [../10-business/AFFARSPLAN.md](../10-business/AFFARSPLAN.md)

Beskriver affärens mål, riktning och varför plattformen byggs.

*Kan bara ändras av produktägaren.*

---

### 2. AlpenTind Way

**Plats:** [ALPENTIND_WAY.md](./ALPENTIND_WAY.md)

Projektets högsta styrdokument som definierar grundvärderingar, designprinciper och arbetssätt.

*Stabilt grunddokument. Ändringar kräver egen Pull Request.*

---

### 3. Produktkrav

**Plats:** [../10-business/PRODUKTKRAV.md](../10-business/PRODUKTKRAV.md)

Specificerar vilka behov och krav som ska uppfyllas i produkten.

*Uppdateras när nya krav identifieras eller prioriteras om.*

---

### 4. Affärsregler

**Plats:** [../10-business/AFFARSREGLER.md](../10-business/AFFARSREGLER.md)

Regler som styr affärslogiken och verksamhetens processer i systemet.

*Definieras av verksamheten, implementeras i Application Services.*

---

### 5. Arkitektur

**Plats:** [../20-architecture/ARCHITECTURE.md](../20-architecture/ARCHITECTURE.md)  
**ADRs:** [../20-architecture/ADR-*.md](../20-architecture/)

Teknisk arkitektur och ADR:er som definierar systemets struktur och tekniska ramar.

*Ändringar kräver ett nytt godkänt ADR.*

---

### 6. Designsystem

**Plats:** [../30-design/DESIGN_SYSTEM.md](../30-design/DESIGN_SYSTEM.md)

Färger, typografi, komponenter och UX-riktlinjer som styr produktens visuella uttryck.

*Uppdateras via designbeslut, aldrig utan förankring i varumärket.*

---

### 7. Implementation

**Plats:** `src/`

Källkod och implementation som realiserar alla nivåer ovan i hierarkin.

*Inga kodändringar utan godkänd ADR om de rör arkitektur.*

---

## Praktisk tillämpning

| Situation | Åtgärd |
|-----------|--------|
| Kod strider mot designsystemet | Ändra koden |
| Designsystem strider mot affärsregler | Ändra designsystemet |
| ADR strider mot affärsplan | Affärsplanen gäller, revidera ADR |
| Produktkrav är oklar | Eskalera till affärsplan för vägledning |
| Ny arkitekturell riktning behövs | Skapa ett ADR och godkänn det |

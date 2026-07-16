# Dokumenthierarki

*Dokumentens beroenden och prioriteringsordning för AlpenTind Platform.*

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
Kod
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

Beskriver vad AlpenTind Platform ska åstadkomma ur ett affärsperspektiv. Definierar vision, principer och definition of done på projektnivå.

*Kan bara ändras av produktägaren.*

---

### 2. AlpenTind Way

**Plats:** [ALPENTIND_WAY.md](./ALPENTIND_WAY.md)

Definierar grundvärderingar, designprinciper och tekniska regler. Det här är "The AlpenTind Way" – hur vi bygger och varför.

*Stabilt grunddokument. Ändringar kräver brett samförstånd.*

---

### 3. Produktkrav

**Plats:** [../10-business/PRODUKTKRAV.md](../10-business/PRODUKTKRAV.md)

Specificerar vad systemet ska göra ur användarens perspektiv. Funktionella och icke-funktionella krav som måste uppfyllas.

*Uppdateras när nya krav identifieras eller prioriteras om.*

---

### 4. Affärsregler

**Plats:** [../10-business/AFFARSREGLER.md](../10-business/AFFARSREGLER.md)

Regler som styr affärslogiken i systemet. Dessa regler reflekterar verksamhetens processer och begränsningar.

*Definieras av verksamheten, implementeras i Application Services.*

---

### 5. Arkitektur

**Plats:** [../20-architecture/ARCHITECTURE.md](../20-architecture/ARCHITECTURE.md)  
**ADRs:** [../20-architecture/ADR-*.md](../20-architecture/)

Teknisk arkitektur och alla arkitekturella beslut (ADRs). Definierar systemets struktur och tekniska ramar.

*Ändringar kräver ett nytt godkänt ADR.*

---

### 6. Designsystem

**Plats:** [../30-design/DESIGN_SYSTEM.md](../30-design/DESIGN_SYSTEM.md)

Färger, typografi, komponenter och UX-riktlinjer. Designsystemet implementerar AlpenTind Way visuellt.

*Uppdateras via designbeslut, aldrig utan förankring i varumärket.*

---

### 7. Kod

**Plats:** `src/`

Källkoden implementerar allt ovanstående. Koden är det sista ledet i hierarkin och måste följa alla nivåer ovan.

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

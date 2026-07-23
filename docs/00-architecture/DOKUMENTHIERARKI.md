# Dokumenthierarki

*Dokumentens beroenden och prioriteringsordning för AlpenTind Platform.*

AlpenTind Way är utgångspunkten för dokumenthierarkin och projektets högsta styrande referens.

---

## Hierarkin

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

### 1. AlpenTind Way

**Plats:** [ALPENTIND_WAY.md](../20-business/ALPENTIND_WAY.md)

Definierar grundvärderingar, designprinciper och tekniska regler. Det här är "The AlpenTind Way" – hur vi bygger och varför.

*Stabilt grunddokument. Ändringar kräver brett samförstånd.*

---

### 2. Affärsplan

**Plats:** [../20-business/AFFARSPLAN.md](../20-business/AFFARSPLAN.md)

Beskriver vad AlpenTind Platform ska åstadkomma ur ett affärsperspektiv. Definierar vision, principer och definition of done på projektnivå.

*Kan bara ändras av produktägaren.*

---

### 3. Produktkrav

**Plats:** [../20-business/PRODUKTKRAV.md](../20-business/PRODUKTKRAV.md)

Specificerar vad systemet ska göra ur användarens perspektiv. Funktionella och icke-funktionella krav som måste uppfyllas.

*Uppdateras när nya krav identifieras eller prioriteras om.*

---

### 4. Affärsregler

**Plats:** [../20-business/AFFARSREGLER.md](../20-business/AFFARSREGLER.md)

Regler som styr affärslogiken i systemet. Dessa regler reflekterar verksamhetens processer och begränsningar.

*Definieras av verksamheten, implementeras i Application Services.*

---

### 5. Arkitektur

**Plats:** [../10-platform/ARCHITECTURE.md](../10-platform/ARCHITECTURE.md)  
**ADRs:** [../00-architecture/ADR-*.md](../00-architecture/)

Teknisk arkitektur och alla arkitekturella beslut (ADRs). Definierar systemets struktur och tekniska ramar.

*Ändringar kräver ett nytt godkänt ADR.*

---

### 6. Designsystem

**Plats:** [../50-standards/DESIGN_SYSTEM.md](../50-standards/DESIGN_SYSTEM.md)

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

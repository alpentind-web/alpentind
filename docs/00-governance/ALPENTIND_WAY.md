# AlpenTind Way

*Grundvärderingar, designprinciper och arbetssätt för AlpenTind Platform.*

---

## Vision

AlpenTind Platform är det operativa navet för ett professionellt guideföretag. Systemet ska göra det enkelt för guider och administratörer att planera expeditioner, hantera bokningar och koordinera resurser.

Målet är att en guide kan öppna **"Min arbetsdag"** på morgonen och omedelbart förstå vad som krävs av dem idag.

---

## Grundvärderingar

### Lugnt

Gränssnittet ska aldrig stressa användaren. Information visas tydligt och i rätt sammanhang, utan onödiga distraktioner.

### Premium

AlpenTind arrangerar premiumexpeditioner. Systemet ska spegla det. Kvalitet och trovärdighet i varje detalj.

### Skandinaviskt

Enkelhet, funktionalitet och välarbetat hantverk. Inget element finns utan ett syfte. Ingen funktion läggs till utan att den löser ett verkligt behov.

### Professionellt

Systemet används av guider med hög kompetens och ansvar. Gränssnittet behandlar dem som proffs: tydlig information, korta arbetsflöden.

### Tillgängligt

Semantisk HTML, korrekta ARIA-etiketter och tillräckliga kontraster gör systemet användbart för alla.

---

## Tekniska principer

- **SQLite är masterdatabas** – all persistent data lagras i SQLite.
- **Verifierad data** – importera aldrig opålitlig data.
- **Excel och PDF är genererade artefakter** – aldrig källdata.
- **Affärslogik tillhör Application Services** – aldrig i CLI, repositories eller templates.
- **Återanvändbarhet** – varje implementation ska kunna användas av fler produkter än Tour du Mont Blanc.
- **Inga arkitekturella beslut utan ADR** – förändringar i arkitekturen kräver ett godkänt ADR.

---

## Verksamhetsprinciper

- AlpenTind Platform byggs för AlpenTind Guiding.
- Tour du Mont Blanc är den **första** produkten, inte den enda.
- Systemet ska kunna hantera vilken guidad expedition som helst.
- Affärsdata tillhör verksamheten och ska aldrig hårdkodas i systemet.

---

## Arbetssätt

- **Scrum** med semantisk versionshantering.
- **Definition of Done:** kod + tester + dokumentation + ändringslogg.
- **Sprintstruktur:** governance → business → architecture → design → implementation.
- **Varje sprint levererar ett fullständigt, fungerande inkrement.**

---

## Prioriteringsordning

När krav eller beslut konfliktar gäller följande ordning:

1. Affärsplan
2. AlpenTind Way (detta dokument)
3. Produktkrav
4. Affärsregler
5. Arkitektur (ADRs)
6. Designsystem
7. Kod

Se [DOKUMENTHIERARKI.md](./DOKUMENTHIERARKI.md) för fullständig beskrivning.

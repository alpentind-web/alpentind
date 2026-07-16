# Affärsregler

*Regler som styr affärslogiken i AlpenTind Platform. Implementeras i Application Services.*

---

## Regel: Dataintegritet

1. All data som importeras till systemet måste vara verifierad.
2. Affärsdata (rutter, priser, etapper) hårdkodas aldrig i källkod.
3. SQLite är den enda källan till sanning för persistent data.

---

## Regel: Bokning

1. En bokning kräver en bekräftad avgång.
2. En avgång kan inte avbokas om bekräftade bokningar finns.
3. En kund kan ha flera bokningar, men en bokning tillhör en kund.
4. Betalning måste registreras separat från bokning.

---

## Regel: Prissättning

1. Priser är alltid kopplade till produkter och perioder, aldrig till enskilda kunder.
2. Rabatter och undantag kräver explicit registrering.
3. Fakturor är genererade artefakter och speglar alltid aktuell prisdata.

---

## Regel: Guider och resurser

1. En guide kan bara tilldelas en avgång åt gången per datum.
2. Boenden bokas per avgång, inte per kund.
3. Kapacitetsgränser för boenden måste respekteras.

---

## Regel: Produktportfölj

1. Business logic ska aldrig ha hårdkodade referenser till Tour du Mont Blanc.
2. Alla expeditionsprodukter behandlas lika av systemet.
3. Produktspecifika data (rutter, boenden, priser) definieras i databasen.

---

## Regel: Dokumentgenerering

1. Excel och PDF är alltid genererade artefakter – aldrig källdata.
2. Genererade dokument kan inte redigeras tillbaka till systemet.
3. Varje dokument ska kunna regenereras från aktuell data.

---

## Arkitekturella regler

Se [../20-architecture/ADR-0001.md](../20-architecture/ADR-0001.md), [ADR-0003.md](../20-architecture/ADR-0003.md) och [ADR-0004.md](../20-architecture/ADR-0004.md) för arkitekturella beslut som stödjer dessa regler.

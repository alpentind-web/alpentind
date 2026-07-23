# Produktkrav

*Funktionella och icke-funktionella krav för AlpenTind Platform.*

---

## Funktionella krav

### Expeditionshantering

- Systemet ska hantera rutter, etapper och etappunkter
- Guider ska kunna planera och följa upp expeditioner
- Avgångar ska kunna skapas, bekräftas och avbokas

### Kundhantering

- Kunder ska kunna registreras med kontaktinformation
- Bokningar ska kopplas till avgångar och kunder
- Betalningsstatus ska vara spårbar

### Resursplanering

- Guider ska kunna tilldelas avgångar
- Boenden (refuges, hytter) ska kunna bokas
- Tillgänglighet ska vara synlig i systemet

### Ekonomi

- Priser ska kopplas till produkter och avgångar
- Fakturor och betalningar ska kunna genereras
- Ekonomisk rapportering ska finnas

### Dokumentgenerering

- Deltagaravtal ska kunna genereras som PDF
- Packlister ska kunna genereras per expedition
- Tillståndshandlingar (permits) ska hanteras

---

## Icke-funktionella krav

### Tillförlitlighet

- Data ska alltid vara korrekt och verifierad
- Systemet ska inte förlora data vid fel

### Användbarhet

- En guide ska kunna förstå dagens uppgifter på under 30 sekunder
- Systemet ska vara användbart utan träning för erfarna guider

### Skalbarhet

- Systemet ska kunna hantera flera produkter parallellt (ej bara TMB)
- Affärslogiken ska vara återanvändbar mellan produkter

### Teknisk standard

- Python 3.11+, SQLAlchemy 2.x, Pydantic 2.x, Typer, Pytest
- Typdefinitioner på all affärslogik
- Tester för alla kritiska flöden

---

## Prioritering

Krav prioriteras i denna ordning:
1. Affärskritiska flöden (bokningar, betalningar)
2. Operativa flöden (expeditionsplanering)
3. Supportfunktioner (dokument, rapporter)
4. Interna verktyg (analytics, CRM)

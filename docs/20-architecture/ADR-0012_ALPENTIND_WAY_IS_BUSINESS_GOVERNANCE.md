# ADR-0012: AlpenTind Way är ett verksamhetsdokument

## Status

Accepterat

## Datum

2026-07-18

## Kontext

Under tidigare sprintar innehöll ALPENTIND_WAY.md både verksamhetsprinciper och tekniska principer. Detta skapade otydlighet kring vem som äger dokumentet och vad det faktiskt reglerar.

För att bevara en tydlig ansvarsfördelning mellan verksamhet och teknik separeras dessa ansvarsområden i och med v2.0.

## Beslut

1. **AlpenTind Way är ett verksamhetsdokument.**
   Det beskriver AlpenTind Guidings filosofi, värderingar och arbetssätt. Det reglerar inte tekniska implementationer.

2. **Plattformen ska stödja AlpenTind Way.**
   Alla arkitektoniska beslut måste kunna härledas till AlpenTind Way. Om ett tekniskt beslut inte kan motiveras utifrån AlpenTind Ways principer ska det ifrågasättas.

3. **Tekniska principer dokumenteras separat.**
   Tekniskt innehåll som SQLite, Repository Pattern, Application Services, ADR-regler och liknande etableras i PLATFORM_PRINCIPLES.md i en kommande sprint.

4. **AlpenTind Way ägs av verksamheten.**
   Dokumentet ägs av Produktägaren. Ändringar i AlpenTind Way kräver Produktägarens godkännande och en egen Pull Request.

5. **Alla arkitektoniska beslut måste kunna härledas till AlpenTind Way.**
   Arkitektur, design och implementation ska följa de principer som AlpenTind Way fastställer.

## Konsekvenser

- AlpenTind Way v2.0 innehåller enbart verksamhetsprinciper.
- Tekniska principer som tidigare fanns i AlpenTind Way är borttagna och kommer att etableras separat.
- Copilot och andra tekniska bidragsgivare får inte ändra, omtolka eller utöka AlpenTind Way. Om en formulering upplevs oklar markeras den för diskussion, den ändras inte.
- Projektet är förberett för PRD-001 (nästa fas).

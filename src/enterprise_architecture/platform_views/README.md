# Platform Views

## Purpose
This layer makes approved orientation surfaces physically visible without introducing ownership behavior.

## Responsibilities
- define the four approved Platform View module locations
- keep future presentation concerns separate from business ownership
- preserve projection-only architecture

## Ownership
Platform Views own presentation concerns only.
RI-001 does not implement UI behavior, Business Objects, or business logic in these packages.

## Dependencies
- Platform Views may depend only on Business Domains, Application, and Shared Technical
- Platform Views may not depend on Infrastructure as an owner of behavior
- Platform Views may not become a substitute business layer

## Architectural Role
Orientation layer.

## Referenced ADRs
- ADR-003 Enterprise Architecture Standard

## Referenced PDRs
- PDR-011 Platform Architecture
- PDR-014 Execution Architecture

## Referenced ESRs
- ESR-001 Engineering Implementation Standard
- ESR-002 Minimum Viable Platform (MVP-001)

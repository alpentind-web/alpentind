# Business Domains

## Purpose
This layer makes approved business ownership boundaries physically visible.

## Responsibilities
- define the four approved Business Domain module locations
- keep future business ownership implementation isolated by owner
- prohibit shared business truth across domains

## Ownership
Only Business Domains may own business responsibility.
RI-001 does not implement Business Objects or Business Events inside these packages.

## Dependencies
- each Business Domain may depend only on itself and Shared Technical
- Business Domains may not depend on Platform Views or Infrastructure
- cross-domain coupling requires explicit future coordination contracts

## Architectural Role
Ownership layer.

## Referenced ADRs
- ADR-003 Enterprise Architecture Standard

## Referenced PDRs
- PDR-011 Platform Architecture
- PDR-012 Reference Domain Architecture
- PDR-013 Activity Design Architecture
- PDR-014 Execution Architecture

## Referenced ESRs
- ESR-001 Engineering Implementation Standard
- ESR-002 Minimum Viable Platform (MVP-001)

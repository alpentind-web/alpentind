# Calendar

## Purpose
Reserve the implementation boundary for the Calendar Platform View.

## Responsibilities
- make Calendar projection ownership visible
- keep future calendar presentation work separate from business ownership
- prevent the view from becoming a business domain

## Ownership
Calendar owns presentation concerns only.
RI-001 intentionally does not implement UI behavior or business behavior.

## Dependencies
- may depend only on its own package, Business Domains, Application, and Shared Technical
- must not depend on Infrastructure as a behavioral owner

## Architectural Role
Platform View.

## Referenced ADRs
- ADR-003 Enterprise Architecture Standard

## Referenced PDRs
- PDR-011 Platform Architecture

## Referenced ESRs
- ESR-001 Engineering Implementation Standard

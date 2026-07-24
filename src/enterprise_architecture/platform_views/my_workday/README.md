# My Workday

## Purpose
Reserve the implementation boundary for the My Workday Platform View.

## Responsibilities
- make My Workday projection ownership visible
- keep future daily orientation presentation work separate from business ownership
- prevent the view from becoming a business domain

## Ownership
My Workday owns presentation concerns only.
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

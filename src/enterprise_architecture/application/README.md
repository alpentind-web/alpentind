# Application Layer

## Purpose
Reserve the coordination layer between domain ownership and consuming views.

## Responsibilities
- provide the future home for orchestration only
- keep cross-domain coordination out of Business Domains and Platform Views
- expose a visible seam for application-level contracts

## Ownership
Application owns coordination only.
RI-001 intentionally does not implement business logic or runtime workflows.

## Dependencies
- may depend only on Business Domains and Shared Technical
- must not depend on Platform Views or Infrastructure

## Architectural Role
Application layer.

## Referenced ADRs
- ADR-003 Enterprise Architecture Standard

## Referenced PDRs
- PDR-011 Platform Architecture

## Referenced ESRs
- ESR-001 Engineering Implementation Standard
- ESR-002 Minimum Viable Platform (MVP-001)

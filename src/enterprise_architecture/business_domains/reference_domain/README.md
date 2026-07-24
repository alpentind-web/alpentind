# Reference Domain

## Purpose
Implement trusted professional reference knowledge as a complete Business Domain foundation.

## Responsibilities
- own trusted knowledge and reusable reference objects
- enforce reference validation, relationships, and lifecycle semantics
- expose domain services and repository contracts inside the domain boundary
- remain isolated from UI, orchestration, persistence implementation, and infrastructure

## Ownership
Reference Domain is the single owner of:
- trusted knowledge
- reference objects
- reference validation
- reference relationships
- reference lifecycle semantics

No external module owns Reference Domain data.

## Business Objects
- Area
- Accommodation
- Trail

No additional Business Objects are implemented in RI-002.

## Domain Services
- `ReferenceDomainService` coordinates domain operations on Reference Objects only.
- Service logic preserves domain invariants and lifecycle constraints.
- Service contains no application orchestration logic and no infrastructure dependency.

## Repository Contracts
- `AreaRepository`
- `AccommodationRepository`
- `TrailRepository`

These are interfaces owned by the domain. RI-002 provides no persistence implementation.

## Domain Validation
Validation is implemented inside domain models and domain services:
- object integrity (required identity and valid values)
- relationship integrity (Area must exist and be active)
- lifecycle integrity (Area deactivation blocked while listed accommodations exist)

Validation is not implemented in Platform Views or Infrastructure.

## Dependencies
- may depend only on `src.enterprise_architecture.business_domains.reference_domain` and `src.enterprise_architecture.shared_technical`
- must not depend on other Business Domains, Platform Views, Application, or Infrastructure

## Architectural Role
Business Domain.

## Architectural Boundaries
In scope:
- Business Objects
- ownership boundary
- domain services
- repository contracts (interfaces only)
- domain validation
- domain tests

Out of scope:
- UI and presentation
- application workflows/orchestration
- persistence implementation
- infrastructure implementation

## Referenced ADRs
- ADR-003 Enterprise Architecture Standard

## Referenced PDRs
- PDR-012 Reference Domain Architecture

## Referenced ESRs
- ESR-001 Engineering Implementation Standard
- ESR-002 Minimum Viable Platform (MVP-001)

## Referenced RI and Standards
- RI-001 Enterprise Architecture Reference Implementation
- PDS-001 Platform Development Standard

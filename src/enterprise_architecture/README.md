# RI-001 Enterprise Architecture Foundation

## Purpose
This package is the architecture-only reference implementation for ADR-003.
It makes approved enterprise boundaries visible before functional implementation begins.

## Responsibilities
- expose the approved Business Domain structure
- expose the approved Platform View structure
- expose application, infrastructure, shared technical, and testing layers
- publish enforceable dependency rules for future implementation
- remain free from business functionality

## Ownership
RI-001 owns architectural scaffolding only.
It does not own Business Objects, Business Events, runtime behavior, persistence, API, or UI behavior.

## Dependencies
- package rules are declared in `manifest.py`
- Business Domains may depend only on their own package and Shared Technical
- Platform Views may depend only on Business Domains, Application, and Shared Technical
- Application may depend only on Business Domains and Shared Technical
- Infrastructure may depend only on Business Domains, Application, and Shared Technical
- Shared Technical may not depend on business-specific packages

## Architectural Role
Shared architectural root for RI-001.

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

## Referenced Standards
- PDS-001 Platform Development Standard

## Structure
```text
src/enterprise_architecture/
├── business_domains/
│   ├── reference_domain/
│   ├── activity_design/
│   ├── journey/
│   └── execution/
├── platform_views/
│   ├── overview/
│   ├── calendar/
│   ├── follow_up/
│   └── my_workday/
├── application/
├── infrastructure/
├── shared_technical/
├── testing/
└── manifest.py
```

## Architectural Review Gate
- **Where are Business Domains?** `src/enterprise_architecture/business_domains/`
- **Where are Platform Views?** `src/enterprise_architecture/platform_views/`
- **Where does future implementation belong?** inside the owning domain, coordinating application layer, supporting infrastructure layer, or presentation-only platform view package
- **Where must implementation never be placed?** inside the wrong owner, inside Shared Technical as disguised business logic, or inside Platform Views as business ownership
- **How is ownership organized?** by package boundary and local module documentation
- **How do dependencies flow?** toward Business Domains and Shared Technical, never from domains toward views or infrastructure

# RI-001 – Enterprise Architecture Reference Implementation

**Status:** Approved
**Mode:** Reference Implementation (architecture-only foundation)

---

## Purpose
RI-001 physically represents ADR-003 in repository structure.
It establishes an enforceable architecture skeleton without implementing business functionality.

## References
- ADR-003 Enterprise Architecture Standard
- PDS-001 Platform Development Standard
- ESR-001 Engineering Implementation Standard
- ESR-002 Minimum Viable Platform (MVP-001)
- PDR-011 Platform Architecture
- PDR-012 Reference Domain Architecture
- PDR-013 Activity Design Architecture
- PDR-014 Execution Architecture

## Module and Layer Structure Summary
- `src/enterprise_architecture/business_domains/` contains the four approved Business Domains: Reference Domain, Activity Design, Journey, and Execution.
- `src/enterprise_architecture/platform_views/` contains the four approved Platform Views: Overview, Calendar, Follow-up, and My Workday.
- `src/enterprise_architecture/application/` reserves orchestration space only.
- `src/enterprise_architecture/infrastructure/` reserves supporting adapter space only.
- `src/enterprise_architecture/shared_technical/` reserves reusable technical capability only.
- `src/enterprise_architecture/testing/` reserves architecture-aligned testing guidance.

## Dependency Direction Summary
- Business Domains are isolated from each other and may depend only on Shared Technical.
- Application may coordinate across Business Domains but may not depend on Platform Views or Infrastructure.
- Platform Views may consume Business Domain and Application outputs but may not own business behavior.
- Infrastructure depends on Business Domain and Application contracts; domains do not depend on Infrastructure.
- Shared Technical owns no business responsibility and may not depend on business-specific packages.

## Ownership and Boundary Confirmation
- Business Domains are the only ownership layer.
- Platform Views are presentation-only orientation surfaces.
- Application is coordination-only.
- Infrastructure is support-only.
- Shared Technical is reusable technical foundation only.
- RI-001 introduces no Business Objects, Business Events, persistence, API, or UI behavior.

## Documentation and Test Foundation Coverage
- Every RI-001 architectural module includes a local `README.md` with purpose, responsibilities, ownership, dependencies, architectural role, and governing references.
- `tests/architecture/` establishes structural tests for Business Domains, Application, and Platform Views.
- `tests/integration/` validates dependency direction and boundary-marker discipline.
- `tests/operational/` validates review-gate discoverability for new contributors.

## Architectural Integrity Checks
- explicit ownership is preserved through dedicated domain and view packages
- architectural isolation is preserved through manifest-declared dependency rules
- dependency direction is verifiable through structural integration tests
- architectural visibility is high because structure and local docs answer review-gate questions directly
- no RI-001 module contains business functionality beyond architecture metadata

## Architectural Verification
A new contributor can identify where business ownership belongs, where platform views live, where future implementation should be placed, and where it must never be placed by reading the RI-001 package tree and local module documentation.

## Files and Directories Created or Updated
- created `src/enterprise_architecture/` with Business Domain, Platform View, Application, Infrastructure, Shared Technical, and Testing layers
- created local module documentation in each RI-001 architectural package
- created structural test foundations in `tests/architecture/`, `tests/integration/`, and `tests/operational/`
- created this RI-001 reference document in `docs/40-reference/`
- updated `docs/40-reference/README.md` and `README.md` for discoverability

# RI-002 – Reference Domain Foundation

**Status:** Implemented  
**Mode:** Reference Implementation (domain foundation)

---

## Objective

Implement the first complete Business Domain foundation as the canonical implementation pattern for future domains.

RI-002 delivers the Reference Domain only.

---

## Implemented Scope

### Business Objects
- Area
- Accommodation
- Trail

### Domain Ownership
- Trusted knowledge ownership declarations
- Explicit business object ownership map

### Domain Services
- `ReferenceDomainService` for reference-domain operations

### Repository Contracts (Interfaces only)
- `AreaRepository`
- `AccommodationRepository`
- `TrailRepository`

### Domain Validation
- Object invariants
- Relationship rules
- Lifecycle rules

### Domain Tests
- Business object creation and validation
- Ownership boundary checks
- Domain isolation/dependency checks

---

## Architectural Verification

Reference Domain implementation demonstrates:
- business truth owned inside Reference Domain
- independent testability without infrastructure
- no UI concerns
- no persistence implementation
- no orchestration concerns
- no infrastructure concerns

---

## Dependency Compliance

Reference Domain dependencies remain limited to:
- itself
- Shared Technical layer

No dependencies are introduced to:
- other Business Domains
- Platform Views
- Application orchestration
- Infrastructure

---

## Files and Directories Added or Updated

### Added
- `src/enterprise_architecture/business_domains/reference_domain/errors.py`
- `src/enterprise_architecture/business_domains/reference_domain/validation.py`
- `src/enterprise_architecture/business_domains/reference_domain/models.py`
- `src/enterprise_architecture/business_domains/reference_domain/contracts.py`
- `src/enterprise_architecture/business_domains/reference_domain/ownership.py`
- `src/enterprise_architecture/business_domains/reference_domain/services.py`
- `tests/domain/test_reference_domain_foundation.py`
- `docs/40-reference/RI-002_REFERENCE_DOMAIN_FOUNDATION.md`

### Updated
- `src/enterprise_architecture/business_domains/reference_domain/__init__.py`
- `src/enterprise_architecture/business_domains/reference_domain/README.md`
- `src/enterprise_architecture/manifest.py`
- `tests/integration/test_architecture_dependency_direction.py`
- `tests/architecture/test_business_domain_foundation.py`

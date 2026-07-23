# Documentation Architecture

## Documentation Philosophy

Documentation is part of the platform architecture.

AlpenTind documents are organized by **architectural responsibility**, never by chronology. A document exists to preserve intent, responsibility, implementation interpretation, validation, or reusable reference in the correct layer.

The purpose of this architecture is permanent clarity:

- architecture intent is explicit before implementation
- engineering interpretation is explicit before coding
- implementation validation is explicit before architecture is treated as complete
- business feedback evolves architecture through the approved lifecycle

## Documentation Layers

| Layer | Responsibility | Primary artifacts |
|---|---|---|
| `00-architecture/` | Architecture intent, classification, documentation governance | ADR |
| `10-platform/` | Cross-engine platform architecture | Platform PDR, platform architecture docs |
| `20-business/` | Business architecture and engine-specific responsibility | Business PDR, business governance docs |
| `30-engineering/` | Engineering interpretation and execution contracts | ESR |
| `40-reference/` | Reusable implementation reference and supporting knowledge | RI, guides, dictionaries, models |
| `50-standards/` | Normative standards shared across work | SDS, design and interaction standards |
| `60-validation/` | Business validation and release evidence | BVR, review and release records |

## Documentation Ownership

| Artifact | Owner | Responsibility |
|---|---|---|
| ADR | Architecture governance | Defines architectural intent and classification rules |
| Platform PDR | Platform architecture | Defines cross-engine platform responsibility |
| Business PDR | Business architecture / product ownership | Defines engine-specific business responsibility |
| ESR | Engineering with prior architecture approval | Defines the engineering interpretation of approved architecture |
| RI | Implementation ownership | Captures reusable reference implementation patterns |
| SDS | Standards ownership | Defines reusable normative standards |
| BVR | Business validation ownership | Confirms operational fitness and business learning |

Implementation may realize architecture, but implementation does not own architecture. Business Validation is the approved mechanism for evolving architecture after implementation has been tested against real work.

## Permanent Hierarchy

The hierarchy is responsibility-driven.

```text
docs/
  ├── 00-architecture/
  ├── 10-platform/
  ├── 20-business/
  ├── 30-engineering/
  ├── 40-reference/
  ├── 50-standards/
  └── 60-validation/
```

Each layer has one primary responsibility:

- **00-architecture** records architectural intent, classification, and governance
- **10-platform** records cross-engine platform responsibility
- **20-business** records business-engine responsibility and business governance
- **30-engineering** records engineering interpretation
- **40-reference** records reusable implementation reference
- **50-standards** records reusable normative standards
- **60-validation** records business validation and release evidence

## Documentation Navigation

### New capability path

New Idea → ADR → PDR → ESR → RI → BVR → Discovery

### Understand a Business Engine

PDR → ESR → RI → BVR → Discovery

### Understand Platform Architecture

ADR → PDR → SDS / RI → BVR

Use [docs/README.md](../README.md) as the entrypoint for these paths.

## Documentation Relationships

The lifecycle relationship model is normative:

**ADR → PDR → ESR → RI → BVR → Discovery**

Knowledge evolves through that chain:

1. **Architecture intent** is established in ADRs.
2. **Architectural responsibility** is fixed in the responsible PDR.
3. **Engineering interpretation** is established in ESRs after the responsible PDR exists.
4. **Implementation reference** is captured in RI artifacts before architecture is treated as complete.
5. **Business validation** confirms operational fitness in BVR artifacts.
6. **Discovery** returns validated learning to future ADR/PDR work.

This model ensures that architecture is intentional, implementation is traceable, and learning is captured through approved governance rather than accidental drift.

## Documentation Migration

Existing documentation has been migrated into the permanent responsibility-based hierarchy.

### Placement rules

- `ADR-*` → `00-architecture/`
- cross-engine and platform-level `PDR-*` → `10-platform/`
- business-engine and business-domain `PDR-*` → `20-business/`
- `ESR-*` → `30-engineering/`
- `RI-*` and implementation guides → `40-reference/`
- `SDS-*` and shared standards → `50-standards/`
- `BVR-*` and validation evidence → `60-validation/`

### PDR-011 rationale

`PDR-011` belongs in `10-platform/` because it defines **cross-engine platform architecture**.

It distinguishes Business Engines, Platform Services, and Platform Views as platform-wide architectural concepts. It does not define the business responsibility of a single engine. For that reason it is a Platform document, not a Business document.

The same placement rule applies to cross-engine documents such as register, planning, workspace, and platform architecture references.

## Documentation Governance

The following rules are normative:

- **ADR-001 classification is required for significant capabilities.**
- **PDR is required before ESR.**
- **ESR is required before RI.**
- **BVR is required before architecture is considered complete.**
- **Architecture evolves through validated business learning, not implementation alone.**

Additional governance rules:

- no document may bypass its upstream architectural owner
- path placement must follow architectural responsibility, never chronology
- no document class may overlap another document class's responsibility
- numbering must remain stable after publication
- links must always point to the current authoritative path

## Development Methodology

The official development lifecycle is normative:

**New Idea → ADR → PDR → ESR → RI → BVR → Discovery**

Mandatory gates:

- no skipped stages
- no PDR without prior classification
- no ESR without approved PDR
- no RI without approved ESR
- no BVR without RI
- no architecture considered complete before Business Validation

## Documentation Lifecycle

The lifecycle is both a delivery sequence and a governance sequence.

1. A **New Idea** triggers architecture work.
2. An **ADR** establishes architectural intent and classification.
3. A **PDR** records the approved architectural responsibility.
4. An **ESR** records the engineering contract for implementation.
5. An **RI** records the reusable implementation outcome.
6. A **BVR** records business validation and operational feedback.
7. **Discovery** feeds validated knowledge back into future architectural evolution.

Architecture is not complete when code exists. Architecture is complete only when Business Validation confirms the implemented capability in real operational use.

## Documentation Scalability

The hierarchy is designed for growth without restructuring.

### Numbering conventions

- ADR numbering is global and sequential in `00-architecture/`
- PDR numbering is global and sequential, placed by responsibility in `10-platform/` or `20-business/`
- ESR numbering is global and sequential in `30-engineering/`
- RI numbering is global and sequential in `40-reference/`
- SDS numbering is global and sequential in `50-standards/`
- BVR numbering is global and sequential in `60-validation/`

### Placement conventions

- use the existing top-level layer before adding any new folder
- create new documents inside the responsibility layer that owns the decision
- keep filename prefixes stable so the artifact class is visible from the path
- add new supporting reference material to `40-reference/` instead of introducing parallel hierarchies
- add new standards to `50-standards/` and new validation artifacts to `60-validation/`

This keeps long-term growth predictable for both platform-wide architecture and individual Business Engines.

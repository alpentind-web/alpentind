# AlpenTind Documentation

This documentation is organized by **architectural responsibility** so that new capability work, platform understanding, and business understanding all follow the same permanent structure.

## Where do I start?

- **I have a new idea** → start with [ADR-001 – Architecture Classification](./00-architecture/ADR-001_ARCHITECTURE_CLASSIFICATION.md), then follow the [documentation lifecycle](./00-architecture/DOCUMENTATION_ARCHITECTURE.md#documentation-lifecycle).
- **I need to understand a Business Engine** → start in [20-business/](./20-business/) with the relevant PDR, then continue through ESR, RI, and BVR artifacts.
- **I need to understand platform architecture** → start with [00-architecture/](./00-architecture/) for ADR intent, then continue into [10-platform/](./10-platform/).
- **I need the governance model** → read [Documentation Architecture](./00-architecture/DOCUMENTATION_ARCHITECTURE.md).

## Primary navigation paths

### 1. New capability path

New Idea → ADR → Classification → Discovery → PDR → ESR → RI → BVR → Further Discovery

- **New Idea** captures the capability proposal.
- **ADR** establishes architectural intent and mandatory classification.
- **Discovery** refines the problem space before architectural responsibility is fixed in a PDR.
- **PDR** defines the responsible platform or business architecture.
- **ESR** defines the engineering interpretation.
- **RI** records the reference implementation pattern.
- **BVR** validates the implementation against real business work.
- **Further Discovery** feeds validated learning back into future architecture work.


### 2. Understand a Business Engine


PDR → ESR → RI → BVR


Start with the engine's business architecture in [20-business/](./20-business/), continue to the implementation contract in [30-engineering/](./30-engineering/), then to reference material in [40-reference/](./40-reference/) and validation evidence in [60-validation/](./60-validation/).


### 3. Understand Platform Architecture


ADR → Platform docs


Read ADR intent in [00-architecture/](./00-architecture/), then continue to cross-engine platform architecture in [10-platform/](./10-platform/), supporting reference material in [40-reference/](./40-reference/), and normative standards in [50-standards/](./50-standards/).


## Documentation hierarchy


```text

docs/
├── 00-architecture/  – ADRs, documentation governance, architectural classification
├── 10-platform/      – cross-engine platform architecture and platform PDRs
├── 20-business/      – business architecture, business governance, engine-specific PDRs
├── 30-engineering/   – ESRs and engineering execution governance
├── 40-reference/     – RI artifacts, guides, dictionaries, implementation references
├── 50-standards/     – SDS artifacts and shared standards
└── 60-validation/    – BVR artifacts, reviews, and release validation records
```


For the normative lifecycle, ownership model, migration rationale, and scalability rules, see [00-architecture/DOCUMENTATION_ARCHITECTURE.md](./00-architecture/DOCUMENTATION_ARCHITECTURE.md).

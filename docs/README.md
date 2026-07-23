# AlpenTind Documentation

This documentation is organized by **architectural responsibility**. Placement is permanent, never chronology-based, and each document class owns one responsibility only.

## Where do I start?

- **I have significant new work** → start with [ADR-001 – Architecture Classification](./00-architecture/ADR-001_ARCHITECTURE_CLASSIFICATION.md), then continue through the approved chain in [Documentation Architecture](./00-architecture/DOCUMENTATION_ARCHITECTURE.md).
- **I need documentation governance** → start in [00-architecture/README.md](./00-architecture/README.md).
- **I need to understand a Business Engine** → start in [20-business/README.md](./20-business/README.md) with the responsible PDR, then continue through ESR, RI, BVR, and Discovery.
- **I need to understand platform architecture** → start in [10-platform/](./10-platform/), then follow supporting standards, references, and validation evidence as needed.

## Primary navigation paths

### 1. New capability path

New Idea → ADR → PDR → ESR → RI → BVR → Discovery

- **ADR** establishes architectural intent and mandatory classification before significant work.
- **PDR** fixes the responsible platform or business architecture.
- **ESR** defines the engineering interpretation of the approved PDR.
- **RI** captures the reusable implementation reference.
- **BVR** validates the capability against real business work.
- **Discovery** captures validated business learning that may evolve future architecture.

### 2. Understand a Business Engine

PDR → ESR → RI → BVR → Discovery

Start with the engine's business architecture in [20-business/](./20-business/), continue to the implementation contract in [30-engineering/](./30-engineering/), then to reference material in [40-reference/](./40-reference/) and validation evidence in [60-validation/](./60-validation/).

### 3. Understand Platform Architecture

ADR → PDR → SDS / RI → BVR

Read architecture intent in [00-architecture/](./00-architecture/), continue to cross-engine platform PDRs in [10-platform/](./10-platform/), then use [50-standards/](./50-standards/) and [40-reference/](./40-reference/) for normative and reference material.

## Documentation hierarchy

```text
docs/
├── README.md
├── 00-architecture/  – ADRs, classification, governance, methodology
├── 10-platform/      – cross-engine platform PDRs and platform architecture
├── 20-business/      – business-engine PDRs and business governance
├── 30-engineering/   – ESRs and engineering execution governance
├── 40-reference/     – RI artifacts, guides, dictionaries, reference material
├── 50-standards/     – SDS artifacts and shared standards
└── 60-validation/    – BVR artifacts and validation evidence
```

## Placement rules

- Place documents by **architectural responsibility**, never by publication date.
- Do not let two document classes own the same responsibility.
- Keep existing content authoritative; change navigation and structure only when needed to preserve the model.

For philosophy, ownership, lifecycle, governance, methodology, and migration rationale, see [00-architecture/DOCUMENTATION_ARCHITECTURE.md](./00-architecture/DOCUMENTATION_ARCHITECTURE.md).

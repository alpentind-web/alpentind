# Engineering Specifications (ESR)

ESR documents are implementation contracts between Business Architecture and Implementation.

---

## Purpose

An Engineering Specification defines exactly what shall be built and how. It bridges the intent captured in business and architecture documents with the concrete work performed during implementation.

Business Architecture owns the requirements. Implementation owns the execution. The ESR is the shared agreement between them.

---

## Lifecycle

| Status | Meaning |
|---|---|
| **Draft** | Document is being authored. Not yet approved for implementation. |
| **Approved** | Business Architecture has approved the specification. Implementation may begin. |
| **Implementation** | Active development is in progress against this specification. |
| **Review** | Implementation is complete. Awaiting review and acceptance. |
| **Merged** | Implementation has been accepted and merged. Document is final. |

---

## Structure

```
docs/50-engineering/
├── README.md       – this document
├── TEMPLATE.md     – standard template for new ESR documents
└── ESR-NNN-Name.md – individual specifications
```

Each ESR is numbered sequentially and named after the feature or workflow it specifies.

---

## Usage

1. Copy `TEMPLATE.md` and rename it `ESR-NNN-Name.md`.
2. Fill in all sections.
3. Submit for approval before starting implementation.
4. Update status at each lifecycle transition.

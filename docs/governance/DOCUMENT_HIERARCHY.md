# Document Hierarchy

This file maps every document in the repository by type, location, and purpose.
It is the authoritative index for the AlpenTind documentation set.

---

## 1. Project Root

| Document | Path | Purpose |
|----------|------|---------|
| README | `README.md` | Project entry point — status and sprint reference |
| Architecture | `ARCHITECTURE.md` | Package layout, conventions, ADR index |
| Domain Dictionary | `DOMAIN_DICTIONARY.md` | Canonical list of all domain entities |
| Changelog | `CHANGELOG.md` | Version history; one entry per sprint |
| Roadmap | `ROADMAP.md` | Sprint checklist and future work |
| Copilot Instructions | `COPILOT.md` | Standing instructions and rules for GitHub Copilot |

---

## 2. Architecture Decision Records

Location: `docs/adr/`

ADRs are immutable once accepted. Every architectural decision must be documented here before implementation.

| ADR | Path | Decision |
|-----|------|----------|
| ADR-0001 | `docs/adr/ADR-0001.md` | SQLite is the master database |
| ADR-0003 | `docs/adr/ADR-0003.md` | All implementations must be reusable; no TMB dependency |
| ADR-0004 | `docs/ADR-0004.md` | AuditMixin and VerificationMixin on persistent entities |
| ADR-0007 | `docs/adr/ADR-0007.md` | Single codebase in `src/`; `app/` removed |

> **Process:** Propose → Review → Accept → Implement. Never implement before acceptance.

---

## 3. Specification

Location: `docs/specification/`

| Document | Path | Purpose |
|----------|------|---------|
| Platform Specification v1.0 | `docs/specification/AlpenTind_Specification_v1.0.md` | Vision, principles, and Definition of Done |

---

## 4. Domain Documentation

Location: `docs/`

| Document | Path | Purpose |
|----------|------|---------|
| Domain Model | `docs/DOMAIN_MODEL.md` | Entity list produced in sprint CORE-004 |
| Expedition Domain | `docs/EXPEDITION_DOMAIN.md` | Route / Stage / StagePoint / Refuge / Lodging relationships |

---

## 5. Design Documentation

Location: `docs/design/`

| Document | Path | Purpose |
|----------|------|---------|
| Design README | `docs/design/README.md` | Module index and design principles |

> New module design documents go here as `docs/design/<module>.md`.

---

## 6. Release Notes

Location: `docs/`

| Document | Path | Release |
|----------|------|---------|
| Release Notes v3.0.1 | `docs/ReleaseNotes_v3.0.1.md` | Database engine, session factory, base repository |
| Release Notes v3.0.2 | `docs/ReleaseNotes_v3.0.2.md` | Central config, logging, dependency container |
| Release Notes v3.0.3 | `docs/ReleaseNotes_v3.0.3.md` | AuditMixin, VerificationMixin, first relationships |

> New release notes go in `docs/ReleaseNotes_vX.Y.Z.md`.
> A consolidated summary is kept in `CHANGELOG.md` at the root.

---

## 7. Governance

Location: `docs/governance/`

| Document | Path | Purpose |
|----------|------|---------|
| Document Hierarchy *(this file)* | `docs/governance/DOCUMENT_HIERARCHY.md` | Authoritative index of all project documentation |

---

## 8. Supplementary READMEs

| Document | Path | Purpose |
|----------|------|---------|
| Sprint CORE-003 notes | `README_CORE003.md` | Historical sprint notes |
| Sprint CORE-004 notes | `README_CORE004.md` | Historical sprint notes |
| Sprint CORE-004.1 notes | `README_CORE004_1.md` | Historical sprint notes |
| ADR index | `docs/adr/README.md` | ADR process and index |
| Design index | `docs/design/README.md` | Design module index |
| Migrations README | `database/migrations/README.md` | Alembic migration instructions |

---

## Rules

1. Every new document must be registered in this file before merging.
2. A new ADR is required before any architectural change is implemented.
3. `CHANGELOG.md` is updated in every sprint PR.
4. Specification documents are versioned (`v1.0`, `v1.1`, …) and never edited in place.
5. Sprint README files (`README_*.md`) at the root are historical artifacts — no new ones shall be added; use `CHANGELOG.md` instead.

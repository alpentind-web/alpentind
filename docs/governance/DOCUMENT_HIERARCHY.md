# AlpenTind Platform

## Document Hierarchy v1.0

### Purpose

This document defines the priority order of all governing documents in AlpenTind Platform.

If two documents appear to conflict, the document with the higher priority always takes precedence.

This hierarchy ensures that architectural decisions, business rules and implementation remain consistent over time.

---

# Priority Order

## Level 1 — Business Rules

**Authority**

Highest

Documents:

* BUSINESS_RULES.md
* Legal requirements
* Regulatory requirements

Purpose:

Defines how AlpenTind Guiding operates as a business.

Business rules always override technical implementation.

---

## Level 2 — Architecture Decision Records (ADR)

Documents:

```
docs/adr/
```

Purpose:

Defines permanent architectural decisions.

Examples:

* Database strategy
* Repository pattern
* Layered architecture
* Platform principles

No implementation may contradict an accepted ADR.

If an ADR must change, create a new ADR.

Never silently change architecture.

---

## Level 3 — Development Charter

Document:

```
docs/governance/DEVELOPMENT_CHARTER.md
```

Purpose:

Defines how the software project is managed.

Includes:

* Roles
* Workflow
* Definition of Done
* Definition of Merge
* AI collaboration
* Engineering responsibilities

---

## Level 4 — Engineering Principles

Documents:

* ENGINEERING_PRINCIPLES.md
* CODE_STYLE.md
* REVIEW_GUIDELINES.md
* RELEASE_POLICY.md
* CONTRIBUTING.md

Purpose:

Defines engineering standards.

These documents guide implementation but never override ADRs.

---

## Level 5 — Technical Specification

Documents:

```
docs/specification/
```

Purpose:

Describes the technical design of the platform.

Includes:

* Domain model
* Database structure
* Services
* Repositories
* APIs
* Workflows

Specifications implement the architecture.

They do not redefine it.

---

## Level 6 — Pull Request Specifications

Purpose:

Defines the implementation work for a specific Pull Request.

A Pull Request specification may only implement approved architecture.

It may never redefine:

* business rules
* ADRs
* governance

---

## Level 7 — Source Code

Purpose:

Implements the approved design.

Source code must reflect:

Business Rules

↓

ADR

↓

Governance

↓

Specification

↓

Pull Request

↓

Implementation

---

# AI Governance

GitHub Copilot shall follow this hierarchy.

If two instructions conflict:

1. Follow the higher-priority document.
2. Report the conflict.
3. Do not invent a solution.

ChatGPT shall use the same hierarchy when reviewing implementations.

---

# Change Management

This document may only be changed when:

* a new governance model is adopted;
* document ownership changes; or
* an accepted ADR requires it.

Changes should normally be documented through a new ADR.

---

# Summary

The platform is governed in the following order:

1. Business Rules
2. Architecture Decision Records (ADR)
3. Development Charter
4. Engineering Principles
5. Technical Specification
6. Pull Request Specifications
7. Source Code

Every implementation should be traceable back through this hierarchy.

If a design decision cannot be traced to a governing document, it should be questioned before implementation.

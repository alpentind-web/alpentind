# PDR-011 – Platform Architecture

**Status:** Approved
**Revision:** AVR-001 – Platform Architecture Revision

---

## 1. Purpose

PDR-011 defines platform architecture outside Business Domains.

It answers one architectural question:

> **"How does the platform support work without becoming part of the business domain?"**

This decision establishes Platform Services and Platform Views as first-class architectural concepts alongside the Business Domains that own business truth.

It does not redesign Business Domain ownership.
It does not introduce implementation detail.
It does not include UI or engineering specification.

---

## 2. Platform Philosophy

The platform is structured around a clear separation of responsibility:

- Business Domains own business truth
- Platform components support work
- Platform components never own business concepts

Platform architecture must reinforce business boundaries, not blur them.

---

## 3. Architectural Layers (Three-Layer Model)

AlpenTind Platform architecture is expressed as three cooperating layers.

### Business Domains

Business Domains are the ownership layer.

Responsibilities:

- Own business concepts
- Own business objects
- Own business truth

Confirmed Business Domains:

- Reference Domain
- Activity Design
- Journey
- Execution

### Platform Services

Platform Services are the reusable capability layer.

Responsibilities:

- Provide reusable capabilities
- Attach to Business Objects
- Never own Business Objects

Examples:

- Attachments
- Search
- Activity Log
- Calendar Notes
- Permissions

### Platform Views

Platform Views are the orientation layer.

Responsibilities:

- Project Business Objects from one or more Business Domains
- Own no business information
- Provide orientation for user work

Confirmed Platform Views:

- Overview
- Calendar
- Follow-up
- My Workday

---

## 4. Business Domains (Confirmed)

The following Business Domains are confirmed as part of this architecture:

| Business Domain | Responsibility |
|---|---|
| **Reference Domain** | Owns trusted professional reference knowledge |
| **Activity Design** | Owns professional design decisions |
| **Journey** | Owns approved operational intent |
| **Execution** | Owns operational commitments |

Rule: Business Domains own business truth. No other platform component may own or duplicate Business Domain responsibilities.

---

## 5. Business Objects (Confirmed)

The following Business Objects are confirmed:

| Business Object | Owner |
|---|---|
| **Reference Object** | Reference Domain |
| **Selection Object** | Activity Design |
| **Journey** | Journey |
| **Operational Commitment** | Execution |

Explicit non-Business-Object confirmation:

- **Follow-up** is NOT a Business Object — it is a Platform View
- **Observation** is NOT a Business Object — observations are inputs to Platform Views
- **Task** is NOT a Business Object — tasks are not first-class business entities

No additional Business Objects are introduced by this revision.

---

## 6. Business Events (Confirmed)

Business Events transfer responsibility between Business Domains.

Business Events own no business data.

Confirmed Business Events:

| Business Event | Responsibility Transfer |
|---|---|
| **Professional Approval** | Activity Design → Journey |
| **Journey Creation** | Journey → Execution |
| **Publication** (optional) | Journey → public operational context |
| **Activate Journey** | Journey → active execution state |

Rule: Events mark responsibility transitions. They do not carry business data.

---

## 7. Platform Service Principle

A Platform Service is a reusable capability attached to Business Objects.

A Platform Service may support multiple Business Domains, but it never changes business ownership boundaries.

Attaching a service to an object does not transfer ownership of that object.

---

## 8. Platform View Principle

Platform Views never own information.

A Platform View presents information produced and owned elsewhere.

Platform Views are projections for orientation and coordination, not ownership environments.

---

## 9. Projection Principle (Normative)

The Projection Principle is a first-class normative architecture principle.

Normative rules:

- Platform Views **never** own business data
- Platform Views **never** store business data
- Platform Views **never** modify business data
- Platform Views project Business Objects from one or more Business Domains
- The same Business Object may appear in multiple Platform Views simultaneously
- Platform Views represent operational and user-oriented perspectives
- Platform Views never create alternative business models

Business ownership remains in Business Domains.

Projection never duplicates ownership.

Presentation scope may be broad; ownership remains singular and explicit.

---

## 10. User-Centric Principle

The architecture separates business structure from user orientation:

- Business Domains organize business responsibility
- Platform Services enhance business operation
- Platform Views organize user work and orientation

This keeps business ownership precise while supporting practical daily work.

---

## 11. Business Object Integration

Platform Services integrate by attachment to Business Objects.

Integration rules:

- Services attach to Business Objects
- Business Objects remain independent
- Services do not modify business responsibilities

A service can enrich operational capability without becoming a business owner.

---

## 12. Platform View Responsibilities

Each Platform View answers one operational orientation question.

### Overview

> **"What is happening?"**

Overview projects across Business Domains to provide an operational situation picture.

### Calendar

> **"When is it happening?"**

Calendar projects time-based operational state from Business Objects with temporal relevance.

### Follow-up

> **"What currently requires human attention?"**

Follow-up projects operational state from Execution (Operational Commitments) and surfaces situations requiring human attention.

Follow-up is a Platform View.
Follow-up is not a Business Object, Business Domain, or Platform Service.

### My Workday

> **"What should I focus on today?"**

My Workday projects prioritized operational state for individual daily work orientation.

---

## 13. Calendar Architecture (Platform View)

Calendar is a Platform View.

Calendar owns no business information.

Calendar presents Calendar Events projected from multiple origins, including:

- Journeys
- Operational Commitments with temporal relevance
- Calendar Notes
- Future Business Objects and Platform Services

Calendar is an orientation surface for time-based work, not an ownership boundary.

---

## 14. Calendar Notes Discovery Outcome

Users may create Calendar Notes directly.

Calendar Notes are independent Platform objects.

Calendar Notes produce Calendar Events that appear in the Calendar Platform View.

This preserves business ownership boundaries while enabling user-driven scheduling context.

---

## 15. Platform Services

Platform Services provide reusable capabilities that attach to Business Objects without owning them.

Confirmed and likely Platform Services include:

- Attachments
- Search
- Activity Log
- Calendar Notes
- Permissions
- Notifications

These services are reusable capabilities and do not redefine Business Domain ownership.

---

## 16. Platform Views (Confirmed)

Platform Views provide cross-Business-Domain orientation and own no business information.

Confirmed Platform Views:

| Platform View | Orientation Question |
|---|---|
| **Overview** | "What is happening?" |
| **Calendar** | "When is it happening?" |
| **Follow-up** | "What currently requires human attention?" |
| **My Workday** | "What should I focus on today?" |

Platform Views project Business Objects. Platform Views never own, store, or modify business data.

---

## 17. Relationship to Execution

Execution owns Operational Commitments and exposes operational reality.

The relationship between Execution and Platform Views:

- Execution owns Operational Commitments
- Platform Views consume and project Operational Commitments
- Execution does not own operational attention
- Execution does not own attention prioritization
- Execution exposes operational reality and state
- Platform Views project that reality for orientation and focus

Explicit clarification:

- Execution does not create Follow-ups
- Follow-up is a Platform View that projects Execution state
- Attention management belongs to Platform Views, not to Execution

---

## 18. Architectural Boundaries

Platform components must never:

- Own business concepts
- Replace Business Domains
- Duplicate business ownership
- Contain operational workflows belonging to Business Domains

Support capability must remain separate from business ownership.

---

## 19. Alignment Confirmation

PDR-011 (revised) is aligned with:

| Document | Alignment |
|---|---|
| **PDR-012** | Reference Domain confirmed as Business Domain; Reference Object confirmed as Business Object |
| **PDR-013** | Activity Design confirmed as Business Domain; Selection Object confirmed as Business Object |
| **PDR-014** | Execution confirmed as Business Domain; Operational Commitment confirmed as Business Object; Execution exposes operational reality without owning attention |

Platform Views project across all confirmed Business Domains without owning business data.

---

## 20. Relationship to Existing Documents

PDR-011 aligns with and complements:

| Reference | Title | Relationship |
|---|---|---|
| **ADR-001** | Architecture Classification | Governs classification of all architectural decisions |
| **ADR-002** | Professional Responsibility Principle | Governs responsibility boundaries respected by this document |
| **PDR-012** | Reference Domain Architecture | Defines Reference Domain as the trusted knowledge Business Domain |
| **PDR-013** | Activity Design Architecture | Defines Activity Design as the professional design Business Domain |
| **PDR-014** | Execution Architecture | Defines Execution as the Operational Commitment Business Domain; Platform Views project Execution state |

PDR-011 does not replace those decisions.

It defines how platform-level services and views support work while preserving Business Domain boundaries.

---

## 21. Architectural Summary

> **Business Domains own business truth. Platform Services and Platform Views support work without owning business concepts.**

The model is explicit:

- Ownership remains in Business Domains
- Services add reusable capability by attachment
- Views provide cross-Business-Domain projection and orientation
- Projection never duplicates ownership
- Platform Views never own, store, or modify business data
- Follow-up is a Platform View — it is not a Business Object, Business Domain, or Platform Service
- Platform architecture supports user work without absorbing business responsibility

This preserves ownership discipline, operational clarity, and architectural coherence across AlpenTind Platform.

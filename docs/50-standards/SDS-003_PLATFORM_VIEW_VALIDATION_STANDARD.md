# Platform View Validation Standard

**Standard:** SDS-003  
**Status:** Approved

---

## Purpose

SDS-003 defines architectural validation rules that ensure every Platform View complies with PDR-011.

This standard is normative and applies to all present and future Platform Views.

It does not define implementation detail.  
It does not redefine PDR-011.  
It does not blur Platform View boundaries with Business Workspace boundaries.

---

## References

- ADR-001 Architecture Classification
- PDR-011 Platform Architecture
- SDS-002 Platform Interaction Standard

---

## Scope

SDS-003 applies to all Platform Views, including:

- Overview
- Calendar
- My Workday
- Search Results
- All future Platform Views

---

## Normative Language

The key words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** in this document are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119):

- **MUST** — absolute requirement; no deviation is permitted.
- **MUST NOT** — absolute prohibition; the behaviour is never allowed.
- **SHOULD** — recommended behaviour; deviation is permitted only with a documented reason.
- **SHOULD NOT** — behaviour that is not recommended; deviation is permitted only with a documented reason.
- **MAY** — optional behaviour; implementations may include or omit it at their discretion.

---

## Platform View Principles

### 1. Projection Principle

Platform Views project information.

They MUST NOT own business information.  
Business information MUST remain in its originating Business Engine or Platform Service.

### 2. Ownership Principle

Business ownership MUST NOT change as a result of introducing a Platform View.

Platform Views MUST NOT become owners of business objects or business state.

### 3. Read-First Principle

Platform Views MUST support orientation first.

Operational work MUST occur in Business Workspaces.  
Platform Views MUST NOT perform operational workflow tasks.

### 4. User-Centric Principle

Platform Views MUST help users understand and prioritise work.

They MUST NOT perform the work.

### 5. Navigation Principle

Platform Views MUST guide users naturally to appropriate Business Workspaces.

They MUST NOT replace those workspaces.

---

## Validation Checklist (Normative)

Every Platform View MUST be reviewed against the following checklist before it is considered architecturally complete.

| # | Test | Condition | Result |
|---|------|-----------|--------|
| 1 | **Ownership Test** | Does the view own business information? | YES = architecture violation |
| 2 | **Projection Test** | Is all displayed information projected from source components? | NO = architecture violation |
| 3 | **Business Ownership Integrity Test** | Does ownership remain in the originating engine or service? | NO = architecture violation |
| 4 | **Rebuild Test** | Can the view be rebuilt from existing engines and services without ownership loss? | NO = architecture violation |
| 5 | **Data Loss Test** | Can the view be removed without losing business information? | NO = architecture violation |
| 6 | **Operational Work Test** | Does the view perform operational workflow tasks? | YES = architecture violation |
| 7 | **Navigation Test** | Does the view guide users naturally to business workspaces? | NO = review required |
| 8 | **Orientation Test** | Does the view improve user orientation? | NO = review required |

Tests 1–6 are blocking. A Platform View that fails any of these tests MUST NOT proceed until the violation is resolved.

Tests 7–8 are advisory. A Platform View that fails these tests SHOULD be reviewed and the reason documented.

---

## Architecture Violations

The following patterns are non-compliant and MUST NOT appear in a Platform View:

- Direct editing of business-owned data within a Platform View
- A Platform View owning business state
- Duplicated business ownership across a Platform View and a Business Engine
- Operational workflow embedded in a Platform View
- Duplicated business data persistence introduced by a Platform View
- A Platform View replacing Business Workspace behaviour

---

## Definition of Done (Platform View Compliance)

A Platform View is architecturally complete only when all of the following conditions are true:

1. The view owns no business information
2. All displayed information is projected from source components
3. Source ownership remains unchanged after the view is introduced
4. Operational work happens in Business Workspaces, not in the view
5. Navigation to appropriate Business Workspaces is natural
6. User orientation is improved by the presence of the view
7. All items in the Validation Checklist pass

---

## Usage Guidelines

- Requirement Implementations (RIs) defining or implementing Platform Views MUST comply with SDS-003.
- Engineering Specification Requests (ESRs) that introduce Platform Views MUST reference SDS-003.
- Business Validation Reviews (BVRs) covering Platform Views MUST use the SDS-003 Validation Checklist.

---

## Relationship to Platform Architecture

SDS-003 is a validation complement to PDR-011.

PDR-011 defines the three-layer model in which Platform Views are the orientation layer: they present information from multiple Business Engines and Platform Services, own no business information, and provide orientation for user work.

SDS-003 operationalises that definition by providing the checklist and compliance criteria that verify a given Platform View conforms to the model PDR-011 establishes.

SDS-003 does not extend or amend PDR-011.

# PDR-007 – Inquiry Architecture

**Status:** Approved

---

## 1. Executive Summary

Inquiry is the entry point for incoming work.

Inquiry receives and preserves incoming inquiries until operational work begins.

Inquiry is intentionally simple.  
Inquiry is intentionally low cognitive load.  
Inquiry is intentionally limited in operational behaviour.

Operational work belongs to Dialog.

---

## 2. Purpose

Inquiry exists to receive and organise incoming inquiries.

Its responsibility is to preserve the incoming request until operational work begins.

---

## 3. Inquiry Philosophy

Inquiry is an operational inbox.

It is not an assessment environment.  
It is not a recommendation environment.  
It is not a decision-making environment.

Inquiry holds incoming work.  
Dialog performs the work.

---

## 4. Inquiry Responsibilities

### Inquiry Owns

- Incoming inquiries
- Basic contact information
- Editable notes
- Inquiry persistence

### Inquiry Does Not Own

- Operational dialogue
- Recommendations
- Decision making
- Operational workflow
- Long-term relationships

Operational dialogue, recommendations, decision making, and workflow guidance belong to Dialog architecture.

---

## 5. Inquiry Lifecycle

```text
Incoming Inquiry
    → Stored Inquiry
    → Create Dialog → Dialog Engine
    or
    → Delete Inquiry
```

An inquiry is received and stored.

The professional either creates a Dialog to begin operational work, or deletes the inquiry.

---

## 6. Inquiry Workspace

### Structure

```
Inquiry List
→ Inquiry Editor
```

### Inquiry Fields

- Name
- Email
- Telephone
- Notes

### Actions

- **Delete Inquiry** — removes the inquiry permanently
- **Create Dialog** — transfers the inquiry into Dialog Engine for operational work

No additional Inquiry actions exist.

---

## 7. Removed Legacy Concepts

The following concepts have been removed from Inquiry scope.  
They belong to Dialog architecture:

- Operational Assessment
- Recommendation
- Current Objective
- Decision
- Outcome
- Booking Preparation
- Workflow Guidance

---

## 8. Integration Boundaries

### Inquiry → Dialog

Inquiry is the entry point into Dialog.

When a Dialog is created from an Inquiry, operational work transfers to Dialog Engine.

### Relationship Architecture

Relationship architecture is unchanged (PDR-008).

Inquiry does not create Contacts or long-term relationships.

### Planning Architecture

Planning architecture is unchanged (PDR-005).

Inquiry does not interact with Planning.

### Platform Domain

Platform Domain is unchanged (PDR-000).

Inquiry is a bounded operational inbox within the platform domain.

---

## 9. Architectural Summary

> **Inquiry receives work.  
> Dialog performs work.**

This separation follows KISS and reduces cognitive load.

| Environment | Responsibility |
|---|---|
| **Inquiry** | Receive and preserve incoming work |
| **Dialog** | Perform operational work |

Each environment addresses a distinct operational concern.

No environment assumes the responsibility of another.

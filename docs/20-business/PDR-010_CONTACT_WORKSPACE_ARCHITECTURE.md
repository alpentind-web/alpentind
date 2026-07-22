# PDR-010 – Contact Workspace Architecture

**Status:** Approved

---

## 1. Purpose

Contact Workspace is the permanent representation of a person in AlpenTind Platform.

Contact answers one architectural question:

> **"Who is this person?"**

Contact presents permanent person information.  
Contact provides long-term context and continuity.  
Contact is not an operational workspace.

---

## 2. Primary Responsibility

Contact Workspace is responsible for presenting who a person is — not for performing work related to that person.

- Contact presents permanent person information
- Contact provides long-term context and continuity across all interactions
- Contact is the central navigation point for person-related information
- Contact is not an operational workspace

---

## 3. Business Question Principle

Contact answers a specific business question.

| Question | Owner |
|---|---|
| **Who is this person?** | Contact |
| **What work should I perform?** | Dialog |

Contact answers: **Who is this person?**

Contact does not answer: **What work should I perform?**

Operational work belongs to Dialog.  
Contact provides context to support that work.

---

## 4. Workspace Responsibilities

Contact Workspace is responsible for:

- Presenting permanent person information
- Presenting the relationship between AlpenTind and the person
- Providing long-term context to support operational work performed elsewhere
- Serving as the navigation hub for person-related information across the platform

Contact is a context workspace.  
Contact is not an operational workspace.

---

## 5. Contact Ownership

Contact owns permanent person information.

Permanent person information includes:

- Name
- Telephone
- Email
- Address

This information may be created or updated via Dialog, in accordance with the transfer rules defined in PDR-009.

Ownership remains with Contact regardless of where the information was entered.

> **Dialog may edit permanent person information. Contact owns it.**

See PDR-009 — Business Transfer Architecture for the complete transfer model governing how Dialog transfers permanent person information to Contact.

---

## 6. Relationship Information (Contextual, Non-operational)

Contact may present contextual relationship information to support the professional's understanding of the person.

Examples of contextual relationship information:

- First Contact
- Latest Journey
- Interest Overview
- Historical Overview

This context informs understanding of who the person is.  
This does not constitute operational work execution.

Contextual relationship information is presented for the purpose of understanding — not for triggering operational workflows.

---

## 7. Displayed Information vs Ownership

Contact may display information owned by other engines.

Display does not imply ownership.

| Displayed information | Architectural owner |
|---|---|
| Latest Journey | Journey / Booking |
| Dialog History | Dialog |
| Interest Overview | To be defined (future engine) |

Contact presents this information as context.  
Ownership of that information remains with the responsible engine.

---

## 8. Interest Overview (Discovery Outcome)

Contact may present expressed interests identified during Dialog, for example:

- TMB
- Dolomites
- Winter Courses

The purpose of presenting expressed interests is to provide better person context for the professional.

No campaign or marketing behaviour is defined here.  
Future ownership of interest data may be assigned to a dedicated engine.

---

## 9. Contact Actions

The following actions are available at Contact level:

- **Create Dialog** — initiate a new operational conversation for this person
- **Edit Contact** — update permanent person information

Contact does not own booking workflows.  
Operational flows continue in Dialog.  
Contact provides the starting context; Dialog performs the work.

---

## 10. Architectural Principles

### Permanent Representation Principle

Contact is the permanent representation of a person in AlpenTind Platform.

A person's identity in the platform is anchored in Contact.  
This representation persists independently of any individual Dialog, Journey, or Booking.

### Ownership Principle

Permanent person information belongs to Contact.

Operational engines may create or update permanent person information through controlled transfer as defined in PDR-009.  
Ownership does not transfer.  
Contact remains the architectural owner of permanent person information regardless of where it was entered.

### Workspace Principle

Contact provides context. Dialog performs work.

Contact answers who a person is.  
Dialog answers what work should be performed.  
These responsibilities are distinct and must not be merged.

### Navigation Principle

Contact is the central navigation point for person-related information.

It is not a hub for operational execution.  
It provides access to the accumulated context — journeys, dialogs, interests — that helps the professional understand the person and begin the appropriate operational work.

---

## 11. Business Boundaries

Contact is NOT responsible for:

- Managing Dialogs
- Managing Bookings
- Managing Documents
- Managing Campaigns
- Managing Marketing
- Managing Operational Notes
- Managing Workflows

Contact may display information related to these areas as contextual information.  
Contact does not own or manage that information.

---

## 12. Relationship to Existing PDRs

PDR-010 aligns with and complements:

| PDR | Relationship |
|---|---|
| **PDR-000** — Platform Domain Model | Contact is a defined domain entity in the platform model |
| **PDR-008** — Relationship Architecture | Contact serves as the workspace representation of the long-term person relationship |
| **PDR-009** — Business Transfer Architecture | Contact receives permanent person information via controlled transfer from Dialog |
| Future **Booking Architecture** | Booking information may be displayed in Contact as context; Booking owns it |
| Future **Journey Architecture** | Journey information may be displayed in Contact as context; Journey owns it |

PDR-010 does not replace these decisions.  
It defines the purpose, responsibilities, ownership, and boundaries of Contact Workspace within the platform architecture they collectively describe.

---

## 13. Architectural Summary

> **Contact is the permanent representation of a person. It answers who a person is — not what work should be performed.**

The architectural model is explicit:

- Contact owns permanent person information
- Contact may display information owned by other engines
- Contact provides context; Dialog performs work
- Operational flows are initiated from Contact but executed in Dialog
- Ownership of permanent person information remains with Contact regardless of where it was entered

This preserves the clarity of person representation, ownership discipline, and platform coherence across AlpenTind Platform.

# PDR-009 – Business Transfer Architecture

**Status:** Approved

---

## 1. Purpose

PDR-009 defines how Business Engines transfer operational responsibility and information across AlpenTind Platform while preserving ownership boundaries.

It answers one architectural question:

> **"How does one Business Engine hand work over to another?"**

This PDR defines controlled hand-off principles.

It does not introduce implementation detail.  
It does not redesign existing domain architecture.

---

## 2. Transfer Philosophy

Business Engines cooperate by preparing work for the next Business Engine without performing that next engine's work.

### Principles

- Business Engines own their own business concepts
- Business Engines do not perform neighbouring engine work
- Each engine prepares the next
- Each transfer is controlled and explicit

Transfers exist to preserve operational clarity.

Every hand-off must show what work is ready, what information moves forward, and what remains with the originating Business Engine.

---

## 3. Transfer Principle

Business Engines prepare work.  
Business Engines do not complete the next business process.  
Each engine performs a controlled hand-off.

This means readiness can move forward without collapsing ownership boundaries.

---

## 4. Ownership Principle

- Information is edited where work naturally occurs
- Information is owned by the responsible Business Engine
- Transfers never change ownership

Ownership remains stable even when information is used by more than one Business Engine across a business lifecycle.

The receiving Business Engine takes responsibility only for the work and information that belong naturally within its own business purpose.

---

## 5. Transfer Model Standard

Every Business Engine hand-off must be documented using the following format:

- **Trigger**
- **Information transferred**
- **Ownership after transfer**
- **Information remaining in originating engine**

This standard makes every transfer explicit, reviewable, and consistent across the platform.

---

## 6. Transfer Models

### Inquiry → Dialog

**Trigger**
- Create Dialog

**Information transferred**
- Name
- Email
- Telephone
- Notes

**Ownership after transfer**
- Dialog owns conversation work
- Inquiry remains owner of the original incoming request

**Information remaining in originating engine**
- Inquiry retains the incoming request as the original entry object

### Dialog → Contact

**Trigger**
- Create Contact
- Update Contact

**Information transferred**
- Permanent contact information

**Ownership after transfer**
- Contact owns permanent person information
- Dialog continues owning operational notes

**Information remaining in originating engine**
- Dialog retains operational conversation context and working notes

### Dialog → Booking

**Trigger**
- Book Guest

**Information transferred**
- Required booking input information

**Ownership after transfer**
- Booking owns participation planning
- Dialog remains the unchanged owner of dialog work context

**Information remaining in originating engine**
- Dialog retains the operational conversation, decisions, and working context

### Booking → Participant

**Trigger**
- Booking confirmed

**Information transferred**
- Participant information

**Ownership after transfer**
- Participant owns journey participation

**Information remaining in originating engine**
- Booking retains booking process history and booking responsibility

---

## 7. Ownership Matrix

| Business Engine | Owns |
|---|---|
| **Inquiry** | Incoming requests |
| **Dialog** | Operational conversations, topics, working notes |
| **Contact** | Permanent person information |
| **Booking** | Booking process |
| **Participant** | Journey participation |

This matrix defines the architectural owner of each business concern.

Transfers may connect these concerns.  
Transfers do not combine them.

---

## 8. Architectural Boundaries

Transfers must never:

- Move ownership
- Duplicate ownership
- Merge Business Engines

A transfer is not a redesign of responsibility.

It is a controlled change in operational stage, where one Business Engine prepares the next without absorbing its role.

---

## 9. Integration with Platform Domain

PDR-009 complements the existing platform domain architecture by defining how separate Business Engines cooperate through hand-off rather than shared ownership.

Within the wider AlpenTind Platform lifecycle:

- Inquiry receives incoming work
- Dialog performs operational conversation work
- Contact holds permanent person information
- Booking manages booking process responsibility
- Participant represents confirmed journey participation

PDR-009 therefore defines the transfer architecture that connects the business lifecycle while preserving engine boundaries.

---

## 10. Relationship to Existing PDRs

PDR-009 complements:

- **PDR-000** — Platform Domain Model
- **PDR-007** — Inquiry Architecture
- **PDR-008** — Relationship Architecture
- Future **Contact Architecture**
- Future **Booking Architecture**
- Future **Participant Architecture**

PDR-009 does not replace those decisions.

It provides the transfer architecture that sits between them.

---

## 11. Architectural Summary

> **Business Engines prepare work for the next engine without taking over that engine's ownership.**

The architectural model is explicit:

- Each Business Engine owns its own business concepts
- Each transfer is controlled and documented
- Information is edited where work naturally occurs
- Ownership remains with the responsible Business Engine
- Hand-offs connect the lifecycle without merging business responsibilities

This preserves operational clarity, ownership discipline, and platform coherence across AlpenTind Platform.

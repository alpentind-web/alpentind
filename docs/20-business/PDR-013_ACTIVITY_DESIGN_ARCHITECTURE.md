# PDR-013 – Activity Design Architecture

**Status:** Approved

---

## 1. Purpose

Activity Design exists to transform trusted professional knowledge into professionally approved operational activities.

It answers one architectural question:

> **"How is professional activity design separated from trusted reference knowledge and from operational Journey execution?"**

Activity Design supports:

- design exploration
- design comparison
- design decision support

Activity Design does not perform operational work.  
Operational work starts after Journey creation.

This decision is architecture only.  
It does not include implementation detail.  
It does not define data schema, API, or UI.

---

## 2. Ownership

Activity Design is a Business Engine that owns professional design decisions.

Its ownership boundary is explicit and permanent:

- **Reference Domain** owns trusted professional knowledge
- **Activity Design** owns professional design decisions
- **Journey** owns approved operational reality

Activity Design never owns the world it designs within.  
It designs using trusted knowledge owned elsewhere and hands approved operational commitment forward to Journey.

---

## 3. Responsibilities

### Activity Design owns

- professional design decisions
- Selection Objects
- design status
- design review
- professional approval state and transition
- design rationale
- design history

### Activity Design does NOT own

- Areas
- Accommodation
- Trails
- Transport
- geographic information
- Journeys
- operational planning
- bookings
- execution

Activity Design owns decisions about operational activity.  
It does not own the trusted knowledge those decisions depend on, and it does not own the operational reality created after approval.

---

## 4. Architectural Principles

### 4.1 Design Principle

Activity Design explores alternatives before committing to approved activity.

Professional work begins with exploration, comparison, and evaluation.  
Commitment occurs only after professional approval.

### 4.2 Ownership Principle

Reference Domain owns knowledge.  
Activity Design owns decisions.  
Journey owns operational commitment and operational reality.

These ownership boundaries are permanent and explicit.

### 4.3 Progressive Design Principle

Activity Design starts with a minimal object and accumulates professional decisions progressively over time.

The design object is enriched through judgement, comparison, and review.  
It is not required to be complete at creation.

### 4.4 Professional Responsibility Principle

Professional responsibility always belongs to the certified guide.

Activity Design supports professional judgement.  
It never replaces professional judgement.

### 4.5 Professional Approval Principle

Professional Approval is the architectural boundary from design to operations.

Approval is never automated.  
Only a certified guide may conclude design by approving it.

---

## 5. Professional Design Lifecycle

Activity Design progresses through professional design states:

```text
Exploring
    ↓
Designing
    ↓
Reviewing
    ↓
Approved
    ↓
Journey Created
```

These states represent professional design progress.  
They do not represent operational workflow progress.

The lifecycle remains within Activity Design until approval concludes professional design.  
Journey Created marks the transition into operational reality.

---

## 6. Minimum Activity Design

Activity Design begins from a minimum initial object:

- Working Name
- Activity Type
- Status = Exploring

Nothing else is required initially.

The object is intentionally minimal at the start.  
It is enriched progressively through professional decisions.

---

## 7. Selection Objects

Selection Objects are first-class business objects owned by Activity Design.

Initial Selection Object categories:

- Area Selection
- Accommodation Selection
- Trail Selection
- Transport Selection

Selection Objects:

- own professional choices
- reference Reference Objects
- never duplicate Reference Objects
- represent the guide's professional decisions

Selection Objects belong to Activity Design because they express design intent and choice, not trusted knowledge ownership.

---

## 8. Professional Design Lifecycle Responsibilities

Activity Design exists to support how guides design before operations begin.

Discovery confirms that:

- Activity Design begins with geography
- guides explore before deciding
- professional design balances safety, logistics, economy, and experience
- decisions accumulate progressively

This means Activity Design is responsible for supporting professional exploration, comparison, rationale, and review before approval.

---

## 9. Professional Approval

Professional Approval concludes professional design.

The approval boundary is explicit:

- only a certified guide can approve Activity Design
- the platform supports approval flow
- the platform never performs the approval decision
- approval creates eligibility for Journey creation

Approval does not transfer professional responsibility to software.  
It confirms that the certified guide has completed the professional design decision.

---

## 10. Relationship to Reference Domain

Reference Domain owns trusted knowledge.

Activity Design consumes that trusted knowledge in order to make professional design decisions.

The relationship is permanent:

- Reference Domain owns trusted knowledge
- Activity Design consumes trusted knowledge
- Reference Domain remains reusable across unlimited future Activity Designs

Activity Design depends on Reference Domain for trusted professional context.  
It does not absorb, duplicate, or locally own that knowledge.

---

## 11. Relationship to Journey

The transition from design to operations is:

```text
Reference Domain
    ↓
Activity Design
    ↓
Professional Approval
    ↓
Journey
```

In this model:

- Activity Design = professional exploration and design
- Journey = operational commitment and execution context
- the boundary is permanent

Activity Design does not execute the activity it designs.  
Journey begins only after professional approval has created eligibility for Journey creation.

---

## 12. Discovery Findings Preserved

The following findings from Activity Design Discovery are preserved in this architecture:

- Activity Design begins with geography
- guides explore before deciding
- professional design balances safety, logistics, economy, and experience
- decisions accumulate progressively
- Activity Design owns decisions, not reference knowledge
- Reference Domain owns trusted knowledge
- Journey owns operational reality
- Professional Approval is the boundary between design and operations

These findings confirm that Activity Design is a professional decision domain positioned between trusted knowledge and operational execution.

---

## 13. Non-Goals

This architecture does not define:

- database schema
- API
- implementation logic
- UI
- map rendering
- filtering
- import mechanisms
- Journey implementation
- execution workflows
- Follow-up service
- Business Validation mechanics
- AI implementation

These concerns belong to later documents and to their proper architectural owners.

---

## 14. Relationship to Existing Documents

| Reference | Title | Relationship |
|---|---|---|
| **ADR-001** | Architecture Classification | Confirms Activity Design as a Business Engine architecture decision |
| **ADR-002** | Professional Responsibility Principle | Governs the permanent responsibility boundary that Activity Design must respect |
| **PDR-011** | Platform Architecture | Preserves the separation between Business Engine ownership and platform support capability |
| **PDR-012** | Reference Domain Architecture | Defines the trusted knowledge domain consumed by Activity Design |
| **Activity Design Discovery** | Discovery findings | Provides the professional design findings preserved by this document |

PDR-013 does not replace these decisions.  
It defines the purpose, ownership, responsibilities, lifecycle, and boundaries of Activity Design within the architecture they collectively establish.

---

## 15. Architectural Summary

> **Activity Design transforms trusted professional knowledge into professionally approved operational activities without replacing professional judgement or absorbing operational execution.**

The architecture is explicit:

- Reference Domain owns trusted knowledge
- Activity Design owns professional design decisions
- Journey owns approved operational reality
- Selection Objects are first-class Activity Design objects
- professional design progresses through explicit design states
- Professional Approval is the permanent boundary from design to operations
- operational work starts after Journey creation

This preserves ownership clarity, professional responsibility, and the architectural separation between trusted knowledge, professional design, and operational execution.

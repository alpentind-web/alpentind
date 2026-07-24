# PDR-014 – Execution Architecture

**Status:** Approved

---

## 1. Purpose

Execution exists to realize approved Journey intent operationally.

Execution does this by:

- representing operational commitments
- recording operational progress
- recording operational history
- exposing operational reality

Execution boundaries are explicit:

- Execution never creates Journeys
- Execution never performs professional design decisions
- Execution never owns operational attention

This decision is architecture only.
It does not include implementation detail.
It does not define schema, API, UI, or workflow states.

---

## 2. Ownership

Execution owns:

- Operational Commitments
- Commitment Status
- Commitment Deadlines
- Commitment History
- Commitment Comments

Execution never owns:

- Reference Knowledge
- Professional Design Decisions
- Selection Objects
- Journey
- Follow-ups
- Operational Priorities

Ownership boundaries are explicit and permanent.

---

## 3. Responsibilities

### Execution is responsible for

- representing operational commitments
- recording progress
- recording history
- recording operational comments
- recording operational deadlines

### Execution is not responsible for

- professional design
- planning
- prioritization
- reminder management
- human attention
- daily work management

Execution records operational reality.
Execution does not perform design, planning, or attention ownership.

---

## 4. Architectural Principles

### 4.1 Commitment Principle

Execution owns Operational Commitments as obligations required to realize approved Journey.

### 4.2 Operational Reality Principle

Execution records what has happened (operational reality), not professional intent.

### 4.3 Independent Workflow Principle

Each commitment type owns its own workflow.
Execution does not enforce a universal workflow model.

### 4.4 Deadline Principle

Deadlines belong to Operational Commitments, never to Follow-up.

### 4.5 Observation Principle

Execution observes and records operational reality.
Execution does not decide what deserves attention.

---

## 5. Operational Commitments

Operational Commitments are the primary business objects of Execution.

Each commitment:

- references an operational object
- owns its workflow
- owns deadlines
- owns history
- owns operational comments

Constraints:

- commitments do not own referenced operational objects
- commitments do not own professional decisions

Operational Commitments capture obligations and their observable progress.

---

## 6. Commitment Lifecycle

Every commitment owns its own lifecycle.

Lifecycle semantics are commitment-specific.

This architecture does not define concrete commitment states.

---

## 7. Minimum Commitment

A minimum initial commitment contains:

- referenced operational object
- operational status

Additional information accumulates progressively during execution.

---

## 8. Commitment Objects

Initial Operational Commitment types are:

- Accommodation Commitment
- Guide Commitment
- Partner Commitment
- Transport Commitment

Additional commitment types may be introduced over time.

Operational Commitments are business objects that reference operational objects.
They do not duplicate those operational objects.

---

## 9. Relationship to Journey

Journey owns approved operational intent.

Journey creates or initiates Execution context.

Execution realizes Journey operationally through Operational Commitments.

Execution never modifies Journey ownership boundaries or intent semantics.

---

## 10. Relationship to Follow-up

Execution and Follow-up are separate architectural concerns.

Execution:

- exposes operational reality
- does not decide operational attention

Follow-up observes operational reality and may create Attention Objects from:

- operational state
- deadline violations
- manual observations

Rules:

- Execution never owns Follow-ups
- Execution remains independent from Follow-up

---

## 11. Relationship to Adjacent Domains

Execution boundary interface model:

### Consumes

- Journey

### Produces

- Operational Commitments
- Operational State

### Consumed by

- Follow-up

Explicit note:

- My Workday consumes Follow-ups, not Execution directly

---

## 12. Discovery Findings Preserved

The following Execution Discovery findings are preserved:

- Execution begins after Journey creation
- public Journeys may require Publication before Execution starts
- private Journeys may start Execution immediately
- Execution owns Operational Commitments
- commitment types need independent workflows
- deadlines belong to commitments
- Execution represents and exposes operational reality/state
- Follow-up may originate from operational observations
- Follow-up may also be manual
- manual and automatic Follow-ups are the same business object type

These findings confirm that Execution owns operational commitments and observable operational reality, while attention remains outside Execution ownership.

---

## 13. Relationship to Existing Documents

Architecture extension chain:

- Reference Domain owns trusted knowledge
- Activity Design owns professional decisions
- Journey owns approved operational intent
- Execution owns operational commitments
- Execution exposes reality consumed by Follow-up

Relationship references:

| Reference | Title | Relationship |
|---|---|---|
| **ADR-001** | Architecture Classification | Preserves Execution as a Business Engine ownership decision with explicit boundaries |
| **ADR-002** | Professional Responsibility Principle | Confirms Execution records operational reality and never assumes professional responsibility |
| **PDR-011** | Platform Architecture | Preserves separation between Business Engine ownership and platform-level support/projection |
| **PDR-012** | Reference Domain Architecture | Preserves that trusted knowledge ownership remains in Reference Domain |
| **PDR-013** | Activity Design Architecture | Preserves that professional design decisions remain outside Execution |
| **Execution Discovery** | Discovery findings | Provides operational findings preserved by this document |

PDR-014 extends this chain without replacing prior ownership decisions.

---

## 14. Architectural Summary

Required architecture chain:

```text
Reference Domain
    ↓
Professional Knowledge
    ↓
Activity Design
    ↓
Professional Decisions
    ↓
Journey
    ↓
Operational Intent
    ↓
Execution
    ↓
Operational Commitments
    ↓
Follow-up
    ↓
Operational Attention
    ↓
My Workday
    ↓
Operational Priorities
```

Execution exists between Journey and Follow-up as the owner of operational commitments and operational reality recording.

---

## 15. Ownership Confirmation

The following ownership boundaries are permanent:

- Reference Domain owns trusted knowledge
- Activity Design owns professional design decisions
- Journey owns approved operational intent
- Execution owns operational commitments
- Follow-up owns operational attention
- My Workday owns operational priorities

Execution does not absorb ownership from adjacent domains.

---

## 16. Non-Goals

This architecture does not define:

- database schema
- API
- implementation details
- UI
- notifications or reminder scheduling
- priority calculation
- Follow-up implementation
- My Workday implementation
- AI implementation

---

## 17. Architectural Statement

> **Execution realizes approved Journey intent through Operational Commitments and observable operational reality recording, while preserving permanent ownership boundaries with Journey, Follow-up, and My Workday.**

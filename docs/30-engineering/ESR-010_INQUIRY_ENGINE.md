# ESR-010 – Inquiry Engine

## Status

Approved

---

## Objective

Define the Inquiry Engine as the engineering specification for the operational workspace that supports dialogue, assessment, recommendation, decision, and outcome handling from first contact to resolved inquiry.

This specification translates PDR-007 Inquiry Architecture into engineering design without redefining business architecture and without introducing implementation detail.

---

## Architecture Conformance

This ESR shall conform to:

- PDR-000 Platform Domain Model
- PDR-004 Register vs Workspace
- PDR-005 Planning Architecture
- PDR-006 Register Architecture
- PDR-007 Inquiry Architecture
- PDR-008 Relationship Architecture

This ESR does not redefine ownership, business terminology, or domain boundaries established by those documents.

---

## 1. Engine Purpose

The Inquiry Engine is the operational workspace for managing an active inquiry from first contact to outcome.

It exists to support:

- dialogue with the person making the inquiry
- operational assessment of suitability and next steps
- evolution of recommendations over time
- business decision-making leading to booking, relationship, or closure

The Inquiry Engine supports Product Owner workflow explicitly by providing one operational environment in which the Product Owner can:

- receive and open a new inquiry
- conduct and continue dialogue
- review supporting context
- maintain current assessment and recommendation
- decide when to recommend, progress, create relationship, register booking, or close the inquiry

The Inquiry Engine is workspace-first and temporary by design. It owns the active inquiry process, not long-term shared knowledge.

---

## 2. Inquiry Workspace Structure

The Inquiry Engine shall follow the established workspace pattern:

**Situation → Work → Context → Actions**

### Situation

The Situation area presents the current operational state of the inquiry:

- current inquiry
- operational assessment
- current recommendation
- current objective

### Work

The Work area supports the active execution of inquiry work:

- dialogue
- questions
- notes
- recommendations
- booking preparation

### Context

The Context area provides the supporting knowledge needed for professional judgement:

- journey information
- previous inquiries
- existing relationship
- documents
- communication history

### Actions

The Actions area exposes the available operational decisions:

- reply
- recommend journey
- register booking
- create relationship
- close inquiry

---

## 3. Workspace Behaviour Model

### Inquiry Creation

An inquiry begins when incoming contact is intentionally opened as an Inquiry Workspace.

Inquiry creation establishes a temporary operational object for the conversation. It does not duplicate register-owned knowledge and does not create a long-term relationship by default.

### Inquiry Update Lifecycle

The workspace behaviour follows the approved inquiry flow:

**Incoming Inquiry → Dialogue → Assessment → Decision → Outcome**

The engine shall support continuous updates to the inquiry as the conversation develops, while keeping the current operational picture visible to the professional at all times.

### Recommendation Changes Over Time

Recommendations are expected to evolve during the life of an inquiry.

The engine shall support:

- early recommendations that are provisional
- refinement as more information is gathered
- change of direction when a better recommendation emerges
- explicit conclusion that no suitable journey exists when appropriate

The current recommendation must remain clear without losing the history of previous recommendation thinking.

### Maintenance of Operational Assessments

Operational assessment is maintained throughout the inquiry, not only at the end.

The engine shall support ongoing professional judgement by allowing the current assessment to be revisited, clarified, and updated as new dialogue and context emerge.

### Preservation of Inquiry History and Traceability

Inquiry history shall be preserved as part of the inquiry record.

The engine shall maintain traceability for:

- dialogue progression
- assessment changes
- recommendation changes
- decision points
- final outcome

This preserves operational continuity during the inquiry and supports later review when the inquiry becomes relationship history or is revisited in a future inquiry.

---

## 4. Register Integration Model

The Inquiry Engine consumes register-owned knowledge through clear boundaries. Registers remain authoritative.

### Boundary Principles

- no ownership duplication
- registers remain authoritative
- inquiry consumes register-owned knowledge
- inquiry may reveal missing or outdated knowledge, but does not become the owner of that knowledge

### Relationship Register

The Inquiry Engine consults the Relationship Register to discover whether an established person relationship already exists and to access qualified person context through the appropriate relationship boundary.

### Journey Register

The Inquiry Engine consumes journey knowledge in order to form and evolve recommendations. Journey definition remains outside Inquiry ownership.

### Accommodation Register

The Inquiry Engine may consume accommodation knowledge as supporting context for recommendation and booking preparation. Accommodation knowledge remains register-owned and is never duplicated into inquiry ownership.

### Document Register

The Inquiry Engine may consume documents as contextual support for dialogue, assessment, and preparation. Documents remain authoritative in the Document Register.

### Register Interaction Rule

Register information may be surfaced inside the Inquiry Workspace for operational use, but the workspace does not redefine, duplicate, or assume ownership of any register object.

---

## 5. Relationship Integration Model

The Inquiry Engine shall define a clear boundary between temporary inquiry work and long-term relationship continuity.

### Discovery of Existing Relationships

When a person makes contact, the engine shall support discovery of any existing relationship so that the inquiry can begin with the benefit of known history instead of treating the person as unknown by default.

### Creation of New Relationships

A new relationship is created only when appropriate and intentional.

Inquiry does not create a relationship automatically. Relationship creation is a business decision reached through dialogue and assessment.

### Linking Inquiries to Relationships

When a relationship exists or is created, the inquiry shall be linked into that relationship history so that the conversation becomes part of long-term continuity.

### Long-term History Continuity

The Inquiry Engine does not own long-term person history. It contributes completed inquiry history into the Relationship domain so that future inquiries can be handled as continuation rather than restart.

---

## 6. Planning Integration Model

Planning supports Inquiry by defining what can be recommended. Inquiry does not perform Planning work.

### Planning Support to Inquiry Decisions

The Inquiry Engine consumes planning outputs and availability context to help the professional determine what journey is suitable, realistic, and timely for the current person.

### Planning Boundary

Planning does not execute inquiry work.

Planning defines journeys, readiness, and operational viability. Inquiry uses that information to support conversation, assessment, and recommendation.

### Consumption of Planning Outputs

The Inquiry Engine may rely on planning outputs such as journey definition, participant-facing material, booking preparation guidance, and operational availability context as inputs to inquiry decisions.

---

## 7. Decision Flow

The operational decision flow for the Inquiry Engine is:

**Incoming Inquiry → Dialogue → Assessment → Decision**

Possible outcomes are:

- **Booking** – the inquiry progresses into booking
- **Relationship** – the inquiry establishes or strengthens a long-term relationship without immediate booking
- **Closed Inquiry** – the inquiry is concluded without booking or relationship progression

The engine shall keep this flow visible as the governing operational path of inquiry work.

---

## 8. UX Principles

The Inquiry Engine shall follow these engine-level UX principles:

- **conversation support** – dialogue is the primary operational mode
- **form minimization** – the engine avoids turning inquiry into form-driven administration
- **progressive information gathering** – information is gathered as the conversation requires it
- **support for professional judgement** – the workspace helps the professional assess and decide without replacing judgement
- **fast navigation** – relevant work, context, and actions are available without unnecessary movement across environments
- **minimal data entry** – reusable knowledge is consumed from authoritative sources instead of re-entered locally

---

## 9. Engineering Principles

The Inquiry Engine shall follow these engineering principles:

- **workspace-first operation** – Inquiry is an execution environment for active inquiry work
- **register-owned data** – reusable knowledge remains owned by registers
- **no duplicated business logic** – inquiry behaviour shall not recreate logic already defined by architecture or authoritative domains
- **pattern consistency with platform architecture** – the engine follows approved workspace, ownership, and domain-boundary patterns
- **real engine behavior** – the engine is designed for real operational inquiry work and shall not depend on mock-behaviour assumptions

---

## 10. Future Extension Points

The following are extension boundaries for future evolution. They are not part of current implementation scope.

### Email Integration

Boundary for sending, receiving, and relating inquiry communication through email channels while preserving the inquiry workspace as the operational home.

### Calendar Integration

Boundary for exposing timing and coordination context relevant to inquiry progression, recommendation timing, and booking preparation.

### Maps

Boundary for presenting journey-location context that may support recommendation and dialogue.

### AI-assisted Drafting

Boundary for assisting the professional with draft replies or draft recommendations while keeping judgement and final decision with the human professional.

### Communication Timeline

Boundary for presenting a unified chronology of inquiry communications and related events across channels.

These extension points define future integration boundaries only. They do not imply current capability.

---

## Out of Scope

This ESR does not define:

- implementation
- UI components
- database schema
- API design
- testing details

---

## Definition of Done

- Inquiry Engine defined
- Workspace behaviour documented
- Register integration documented
- Relationship integration documented
- Planning integration documented
- Operational flow documented
- Engineering principles documented
- Future extension points documented
- No implementation details included

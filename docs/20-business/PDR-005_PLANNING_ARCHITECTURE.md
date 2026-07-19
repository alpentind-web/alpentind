# PDR-005 – Planning Architecture

**Status:** Approved

---

## 1. Executive Summary

Planning is the process of transforming an idea into a sellable, operationally viable journey.

Planning is question-driven, non-linear, and persistent across days, weeks, and months.

Planning starts as a **Planning Project** when the user selects **"Planera ny resa"** and continues until all operational questions have been answered.

Planning is a separate architectural concept alongside Register Architecture and Workspace Architecture because it addresses a fundamentally different business problem.

---

## 2. Purpose

Planning bridges the gap between product conception and operational execution.

Without Planning:

- Journeys lack clear definition
- Operational unknowns remain unresolved
- Economic viability is unclear
- Participant communication is incomplete

With Planning:

- All operational questions are answered
- Journey becomes economically viable
- Participants are informed
- Operations can execute with confidence

---

## 3. What is Planning?

Planning is the structured process of transforming a journey idea into a fully defined, operationally ready, and economically viable product.

### Core Characteristics

- **Question-driven:** Planning asks and answers operational questions
- **Non-linear:** There is no correct sequence; planning areas may be addressed in any order
- **Dependency-aware:** Planning areas may have dependencies, but dependencies do not enforce a strict sequence
- **Uncertainty reduction:** Each planning step reduces operational uncertainty
- **Persistent:** Planning can pause and resume while preserving full context
- **End condition:** Planning ends when all operational questions have been answered
- **Output-focused:** Planning produces artefacts necessary for operations

---

## 3.1 Planning as Uncertainty Reduction

Planning is fundamentally about reducing operational uncertainty.

The objective of Planning is not to complete forms.

The objective is to answer the operational questions that prevent a journey from becoming sellable.

Every unanswered operational question represents uncertainty.

Every answered question increases confidence and moves the journey toward operational readiness.

### Core Principle

The metric for planning progress is not completion percentage.

The metric is **remaining unanswered questions**.

Example indicators:

- "3 planning questions remain"
- "All questions answered. Ready for review."

The platform should surface unanswered questions, not completed forms.

---

## 3.2 Planning is Persistent

Planning is a long-lived business process, not a single work session.

Planning may continue over days, weeks, or months.

Users must be able to stop planning at any time and continue later without losing context.

The platform must preserve:

- Remaining planning questions
- Current planning state
- Outstanding uncertainties
- Planning Areas and their dependencies

Planning should always resume from **what remains**, not from what has already been entered.

---

## 3.3 Planning Project

A **Planning Project** is created immediately when the user selects **"Planera ny resa"**.

The Planning Project exists independently of whether any planning questions have been answered.

Planning Projects represent journeys under development and remain active throughout the planning phase.

Terminology:

- Use **Planning Project** or **Pågående planering**
- Avoid the term **Draft**

---

## 4. Planning vs Registers

**Registers discover existing objects.**

```text
Register Purpose: "What exists?"

User Flow:
Browse Contacts Register
    ↓
Locate a guest
    ↓
Open Person Workspace
```

**Planning creates new objects.**

```text
Planning Purpose: "What should exist?"

User Flow:
Conceive journey idea
    ↓
Answer operational questions
    ↓
Define sellable journey
    ↓
Journey becomes operational object
```

**Key Difference:**

Registers answer: "Where can I find X?"

Planning answers: "How do I create Y?"

---

## 5. Planning vs Workspaces

**Workspaces perform operational work.**

```text
Workspace Purpose: "How do I manage this?"

User Flow:
Open Person Workspace
    ↓
See work queue
    ↓
Perform operational actions
```

**Planning defines what work needs to be done.**

```text
Planning Purpose: "What work needs to happen?"

User Flow:
Plan journey
    ↓
Define guide requirements
    ↓
Define participant requirements
    ↓
Define operational timeline
    ↓
Operational work is now defined
```

**Key Difference:**

Workspaces execute defined work.

Planning defines the work that needs to be executed.

---

## 6. Journey Lifecycle

**A journey follows a lifecycle from conception to completion:**

```text
Idea
  ↓
Planning Project
  ↓
Planning
  ↓
Sellable Journey
  ↓
Bookings
  ↓
Operational Journey
  ↓
Execution
  ↓
Completed Journey
```

### Stage 1: Idea

- **What:** A concept for a new journey
- **Questions:** What type of journey? Where? When?
- **Output:** Journey outline
- **Participants:** Product team, marketing
- **Next Gate:** Start new planning?

### Stage 2: Planning Project

- **What:** A persistent planning container for one journey idea
- **Created when:** User selects **"Planera ny resa"**
- **State:** **Pågående planering**, even before any question is answered
- **Purpose:** Ensure planning can continue across sessions without context loss

### Stage 3: Planning

- **What:** Structured questioning and definition
- **Questions:** See Planning Model
- **Output:** Journey Plan, Cost Calculation, Pricing, Participant Letter, Guide Documentation, Packing List, Booking Instructions, Operational Runbook (order mirrors Section 9)
- **Participants:** Planning coordinator, guides, operations
- **Duration:** Days to months
- **Next Gate:** All operational questions answered? Planning Review completed? Economic viability confirmed? Sufficient participant interest?

### Stage 4: Sellable Journey

- **What:** Planning complete and validated
- **Conditions:**
  - All planning questions answered
  - Economic model validated
  - Guide availability confirmed
  - Participant requirements defined
  - Operational procedures documented
- **Output:** Approved journey ready for booking

### Stage 5: Bookings

- **What:** Participant enrollment and booking administration
- **Participants:** Operations, coordinators

### Stage 6: Operational Journey

- **What:** Journey has confirmed participants and operational commitments
- **Participants:** Operations, guides

### Stage 7: Execution

- **What:** Journey is actively running
- **Participants:** Enrolled guests, guides, coordinators
- **Operations:** Person Workspaces manage individual participant needs

### Stage 8: Completed Journey

- **What:** Journey has finished
- **Outcome:** Historical record maintained
- **Participants:** Archive

---

## 7. Planning Model

Planning is structured around answering operational questions.

### Planning Areas

Planning Areas represent operational domains rather than technical system components.

Typical Planning Areas include:

- Route
- Daily Stages
- Accommodation
- Transportation
- Meals
- Guide
- Cost
- Pricing
- Risk Assessment
- Documents

Planning Areas are not steps.

Users may address Planning Areas in any order.

Some areas may be temporarily blocked until dependency questions are resolved.

### Planning Questions

Planning questions belong to Planning Areas.

Each Planning Area can contain one or many operational questions.

#### Example: Accommodation Planning Area

- Can accommodation be booked for every stage?
- Are all reservations confirmed?
- Do capacities match group size?

The platform should surface unanswered questions, not completed forms.

#### Geographic & Route Questions

- Where exactly does the journey take place?
- What is the route profile?
- What are the altitude challenges?
- Are there natural hazards or restrictions?
- What is the technical difficulty rating?

#### Participant Questions

- Who is the target participant?
- What fitness level is required?
- What experience level is required?
- Are there age restrictions?
- What special training is needed?

#### Guide Questions

- How many guides are required?
- What certifications must guides have?
- What is the required guide-to-participant ratio?
- What languages must guides speak?
- What special skills are needed?

#### Equipment Questions

- What equipment must participants provide?
- What equipment will AlpenTind provide?
- What rental equipment is available?
- What emergency equipment is required?
- What is the equipment cost?

#### Accommodation Questions

- Where will participants stay?
- What accommodation quality/type?
- Are there special needs (dietary, accessibility)?
- What is the accommodation cost?

#### Transport Questions

- How do participants get to the start?
- What transport is included in the package?
- What are transport costs?
- What are luggage restrictions?

#### Timing Questions

- When does the journey run?
- What is the total duration?
- What is the daily schedule?
- What rest days are included?
- What is the departure pattern?

#### Safety Questions

- What is the medical protocol?
- What emergency procedures exist?
- What insurance is required?
- What evacuation options exist?
- What communication systems are in place?

#### Economic Questions

- What is the cost per participant?
- What is the minimum viable participant count?
- What is the cost structure (fixed vs variable)?
- What is the pricing?
- What discounts or variations apply?

#### Communication Questions

- What information do participants need?
- What is the participant letter format?
- What pre-journey communication happens?
- What post-journey communication happens?

#### Operational Questions

- Who coordinates this journey?
- What is the operational runbook?
- What checklists are required?
- What contingencies exist?
- How are changes managed?

### Planning Dependencies

Planning Areas may depend on one another.

Example dependency chain:

Route Definition → Daily Stages → Accommodation Locations → Transportation Routing → Cost Calculation

Key principle: the platform recognizes dependencies without enforcing planning order.

---

## 8. Planning Readiness

A journey is operationally ready when:

1. **All operational questions have been answered**
   - Geographic definition complete
   - Route defined and validated
   - Route difficulty assessed

2. **Participant requirements are clear**
   - Fitness level specified
   - Experience level specified
   - Special training identified
   - Equipment list finalized
   - Medical requirements documented

3. **Guide requirements are defined**
   - Number of guides confirmed
   - Certifications required
   - Skills required
   - Languages required
   - Availability confirmed

4. **Economic model is validated**
   - Cost per participant calculated
   - Minimum viable participant count confirmed
   - Pricing strategy approved
   - Break-even analysis completed

5. **Accommodation & Transport are confirmed**
   - All stops booked or confirmed available
   - Transport providers confirmed
   - Contingency options exist

6. **Safety & Insurance protocols are established**
   - Medical protocol defined
   - Emergency procedures documented
   - Insurance requirements specified
   - Evacuation options confirmed

7. **Operational artefacts are produced**
   - Journey Plan created
   - Cost Calculation documented
   - Pricing defined
   - Participant Letter prepared
   - Guide Documentation prepared
   - Packing List prepared
   - Booking Instructions prepared
   - Operational Runbook (Körschema) created

8. **Stakeholder approval is obtained**
   - Guide(s) approve plan
   - Operations approve plan
   - Product/Marketing approve plan
   - Finance approve pricing

### Readiness Progress Indicators

Progress should be expressed as **remaining unanswered questions**.

Example indicators:

- "8 planning questions remain"
- "Accommodation area: 2 questions remain"
- "All planning questions answered. Ready for review."

Avoid percentage-complete and form-completion metrics where they do not improve operational understanding.

---

## 8.1 Planning Dashboard

The Planning Environment shall present **Current Planning Projects**.

This list is for continuation of ongoing work.

It is not a register and not an archive.

Each Planning Project should communicate what remains, for example:

- "Tour du Mont Blanc — 3 planning questions remain"
- "Haute Route — Accommodation unresolved"
- "Corporate Journey — Idea stage"

The dashboard purpose is to help users continue unfinished planning immediately.

---

## 8.2 Planning Resume

When a Planning Project is reopened, the platform restores complete planning context:

- Remaining planning questions
- Current planning state
- Outstanding uncertainties
- Planning Areas
- Dependencies

The user should never need to remember where planning stopped.

---

## 8.3 Planning Review

Before a journey becomes Sellable, the Product Owner performs a complete Planning Review.

The review walks through the journey from start to finish.

The purpose is to verify that no operational questions remain unanswered.

This review is the final Planning activity.

---

## 9. Planning Outputs

Operational artefacts are generated after Planning has been completed.

All outputs originate from one Planning model.

Planning produces the following artefacts:

### 9.1 Journey Plan

- Complete definition of the journey
- Route description with waypoints
- Daily itinerary
- Altitude profile
- Technical difficulty assessment
- Risk assessment

### 9.2 Cost Calculation

- Fixed costs (guide, transport, accommodation)
- Variable costs (equipment, meals, contingency)
- Cost per participant
- Minimum viable participant count
- Break-even analysis

### 9.3 Pricing

- Price per participant
- Early-bird pricing (if applicable)
- Group discounts (if applicable)
- Seasonal variations (if applicable)
- Cancellation policy

### 9.4 Participant Letter

- Welcome message
- Journey overview
- Fitness requirements
- Experience requirements
- What to bring
- What AlpenTind provides
- Safety information
- Schedule
- Contact information
- FAQ

### 9.5 Guide Documentation

- Guide assignments
- Guide responsibilities
- Guide checklists
- Guide communication protocols
- Contingency procedures
- Emergency contacts

### 9.6 Packing List

- Required clothing layers
- Required equipment by season
- Optional equipment guidance
- Weight and volume recommendations
- Safety-critical items checklist

### 9.7 Booking Instructions

- Reservation process by Planning Area dependency
- Supplier/provider booking sequence
- Payment and confirmation checkpoints
- Escalation path for unconfirmed bookings

### 9.8 Operational Runbook (Körschema)

- Day-by-day operational procedures
- Timing requirements
- Check-in procedures
- Equipment distribution
- Meals and breaks
- Camp setup procedures
- Emergency procedures
- Contingency options
- Participant communication schedule

---

## 10. Planning Principles

### Principle 1: Uncertainty Reduction (Primary)

Planning eliminates operational uncertainty.

Progress is measured by remaining unanswered questions.

### Principle 2: Persistent Planning

Planning is long-lived and may span days, weeks, or months.

Users can pause and resume planning at any time without losing context.

### Principle 3: Question-Driven

Planning progresses by asking and answering operational questions.

Every decision should be traceable to a question it answers.

### Principle 4: Non-Linear

Planning has no mandatory sequence.

Planning Areas can be addressed in any order as information becomes available.

Completion is measured by answered questions, not by following predefined steps.

### Principle 5: Dependency Recognition

Planning Areas may depend on one another.

The platform identifies what is blocked and what is ready without enforcing order.

### Principle 6: Viability Gating

A journey becomes operational only when:

- It is economically viable
- Sufficient participant demand exists (or is forecasted)
- All operational questions have been answered

These conditions must be validated before moving to Sellable Journey and Bookings stages.

### Principle 7: Artefact Generation

Planning produces tangible artefacts that guide operations.

These artefacts (Plan, Pricing, Participant Letter, Runbook) become the source of truth for operational execution.

### Principle 8: Coordinator Ownership

Planning is owned and driven by a Planning Coordinator.

The coordinator ensures all questions are asked, answered, and documented.

The coordinator drives stakeholder alignment (guides, operations, product, finance).

### Principle 9: Focused Progress Indicators

Planning progress is reported as remaining unanswered questions.

The Planning Environment should communicate **"What remains?"** rather than **"What has already been entered?"**

Percentage-complete and form-completion indicators are secondary and should not drive planning decisions.

---

## 11. Relationship to Workspace Architecture

Workspaces perform operational work. Planning defines what work needs to happen.

### Example

During Planning:

- Question: "How many guides do we need?"
- Answer: "2 guides"
- Operational consequence: "We must hire 2 guides"

In Workspace:

- Guide Workspace displays: "You are assigned to journey X"
- Work queue shows: "Complete pre-journey briefing"
- Actions: Mark briefing complete, upload documents, etc.

### Relationship

Planning produces the requirements that become Person Workspace work items.

Person Workspace executes the work that Planning defined.

```text
Planning
    ↓
(Defines: Guide needed, Participant needs, Equipment, Accommodation)
    ↓
Workspace
    ↓
(Executes: Coordinate guide, Confirm participant, Procure equipment, Book accommodation)
```

---

## 12. Relationship to Register Architecture

Registers discover existing objects. Planning may create new objects.

### Example

During Planning:

- Question: "Do we have a guide available for this journey?"
- Answer: "Yes, but we need to hire a second guide"
- Consequence: "A new Guide contact needs to be created"

After Planning:

- New guide appears in Contacts Register (Guider)
- Can be discovered and opened in Person Workspace

### Relationship

Planning may discover that new Contacts are needed.

New Contacts become discoverable in Registers after Planning completes.

```text
Planning
    ↓
(Identifies need for new guide)
    ↓
Create Guide contact
    ↓
Registers
    ↓
(Guider register now includes new guide)
```

---

## 13. Architectural Separation

Three distinct architectural concepts:

### Register Architecture (PDR-004)

- **Purpose:** Discover existing objects
- **Question:** "Where can I find X?"
- **User flow:** Browse → Locate → Open Workspace

### Workspace Architecture

- **Purpose:** Perform operational work on objects
- **Question:** "How do I manage this?"
- **User flow:** Open object → See work queue → Perform actions

### Planning Architecture (PDR-005)

- **Purpose:** Define new operational objects
- **Question:** "How do I create Y?"
- **User flow:** Conceive idea → Create Planning Project → Answer questions → Produce plan → Journey becomes sellable

These concepts are distinct but interconnected:

```text
Planning
(Create new journey)
    ↓
Journey Plan + Operational Requirements
    ↓
Registers
(Discover people/contacts needed for journey)
    ↓
Workspaces
(Coordinate individuals to execute journey)
    ↓
Journey Execution
```

---

## 14. Future Architectural Implications

Planning Architecture will impact future Engineering Specifications:

### ESR-10x: Planning Coordinator Workspace

- Planning tool interface
- Question templates
- Decision tracking
- Artefact generation
- Stakeholder alignment tools

### ESR-20x: Planning Dashboard

- Current Planning Projects (Pågående planering)
- Remaining questions and unresolved areas
- Resume support with restored planning context
- Continuation-first view (not register, not archive)

### ESR-30x: Integration with Experiences Register

- Links between journeys and plans
- Historical planning data
- Plan versioning

### ESR-40x: Automation & Templates

- Question templates for journey types
- Pre-filled planning workflows
- Automatic artefact generation

---

## 15. Out of Scope

This PDR does not address:

- User interface design for Planning
- Implementation of Planning tools
- Database schema
- API design
- Workflow automation
- Specific planning tools or software
- Financial forecasting algorithms
- Pricing strategy

These will be addressed in future Engineering Specifications and Product Decisions.

---

## 16. Next Steps

Planning Architecture is now documented as a core AlpenTind concept.

Future work:

1. **ESR-10x:** Implement Planning Coordinator Workspace
2. **ESR-20x:** Implement Planning Dashboard
3. **ESR-30x:** Implement Experiences domain
4. **Ongoing:** Update product strategy based on Planning model

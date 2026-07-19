# PDR-005 – Planning Architecture

**Status:** Approved (Revision 1)

---

## 1. Status & Executive Summary

Planning is the process that transforms a journey idea into a sellable operational product.

Planning is fundamentally the progressive elimination of operational uncertainty.

Planning is a separate architectural concept from Register Architecture and Workspace Architecture because it addresses a different business question: **What must be true before this journey can be sold and operated?**

---

## 2. Purpose

Planning bridges product conception and operational execution.

Without Planning:

- Operational uncertainty remains
- Economic viability is unknown
- Constraints and risks are unresolved
- Execution lacks clear operational guidance

With Planning:

- Operational questions are answered
- Dependencies are understood
- Economic viability is validated
- Operational artefacts are produced for execution

---

## 3. What is Planning?

Planning is the structured process of defining a journey so it can transition from idea to sellable operation.

Planning is not form completion.

Planning is the work of identifying and answering the operational questions that block readiness.

---

## 4. Planning as Uncertainty Reduction

Planning is fundamentally about **reducing operational uncertainty**.

Every unanswered operational question represents uncertainty.

Every answered question increases confidence and moves the journey toward operational readiness.

### Core Principle

The metric for planning progress is not completion percentage.

The metric is **remaining unanswered questions**.

Example progress indicators:

- "8 planning questions remain"
- "Accommodation: 2 questions remain"
- "All questions answered. Ready for review."

### Operational Consequence

Planning tools should:

- Focus on unanswered questions (not completed forms)
- Surface which questions remain
- Show which areas have open questions
- Not display progress as percentage-complete

Planning is complete when zero unanswered questions remain.

---

## 5. Planning Areas

Planning Areas represent operational domains, not implementation modules.

Planning Areas structure the planning process by grouping related operational questions.

### Typical Planning Areas

- **Route** – Geographic and route definition
- **Daily Stages** – Daily itinerary and logistics
- **Accommodation** – Lodging and facilities
- **Transportation** – Movement between locations
- **Meals** – Food, water, nutrition logistics
- **Guide** – Guide selection and requirements
- **Cost** – Cost structure and modeling
- **Pricing** – Commercial pricing strategy
- **Risk Assessment** – Safety and hazard mitigation
- **Documents** – Required documentation and permits

Planning Areas are not steps.

They are operational domains.

Users may address Planning Areas in any order.

Example:

- If a route becomes available, Route questions can be answered immediately.
- If guide availability is uncertain, Guide questions can be deferred.

---

## 6. Planning Areas and Questions

Planning questions belong to Planning Areas.

Each Planning Area contains one or more planning questions.

### Route Planning Area

Questions:

- What is the exact geographic location?
- What is the route profile?
- What are the altitude challenges?
- Are there natural hazards?
- What is the technical difficulty rating?
- Are there environmental restrictions?

### Daily Stages Planning Area

Questions:

- What is the stage-by-stage itinerary?
- What are daily timing windows?
- Which stages require acclimatization or recovery?
- Which handovers or transitions must be coordinated?

### Accommodation Planning Area

Questions:

- Can accommodation be booked for every stage?
- Are all reservations confirmed?
- Do accommodation capacities match the planned group size?
- What is the cost per person per night?
- What facilities are available (bathrooms, heating, etc.)?
- Are accessibility accommodations available?

### Transportation Planning Area

Questions:

- How do participants move between locations?
- Are transportation routes aligned with stage endpoints?
- Are transport providers available at required times?
- What are baggage and equipment transport constraints?

### Meals Planning Area

Questions:

- What meals are provided at each stage?
- How are water and nutrition needs covered?
- How are allergies and dietary requirements handled?
- What meal logistics dependencies exist per stage?

### Guide Planning Area

Questions:

- How many guides are required?
- What certifications must guides have?
- What languages must guides speak?
- What special skills are needed?
- Is guide availability confirmed?
- What is the guide compensation?

### Cost Planning Area

Questions:

- What is the fixed vs variable cost structure?
- What is the cost per participant?
- What is the break-even point?
- What contingencies are budgeted?

### Pricing Planning Area

Questions:

- What is the commercial price per participant?
- Are early-bird or group pricing models used?
- What cancellation policy applies?
- How does pricing reflect risk and seasonality?

### Risk Assessment Planning Area

Questions:

- What hazards are identified?
- What mitigations are required?
- What emergency response procedures are defined?
- What insurance and compliance constraints apply?

### Documents Planning Area

Questions:

- What participant documents are required?
- What permits or licenses are required?
- What guide documents must be completed?
- What operational documents are mandatory before activation?

### Platform Focus

The platform should surface unanswered questions within each Planning Area.

Not completed forms.

---

## 7. Planning Dependencies

Planning Areas may depend on one another.

Example dependency chain:

```text
Route Definition
    ↓
(Determines)
    ↓
Daily Stages
    ↓
(Determines)
    ↓
Accommodation Locations
    ↓
(Determines)
    ↓
Transportation Routing
    ↓
(Determines)
    ↓
Cost Calculation
```

### Key Principle

The platform shall recognize dependencies without enforcing a planning order.

Users may answer questions in any order.

The platform should:

- Identify which Planning Areas are blocked (waiting for answers from other areas)
- Surface which Planning Areas are ready (all dependencies answered)
- Allow users to skip blocked areas and work on others

### Non-Linear Planning

Planning is not sequential.

Users discover information asynchronously.

Dependencies exist, but do not dictate the planning sequence.

---

## 8. Planning vs Registers

Registers discover existing objects.

Planning defines what must exist before a journey can operate.

**Key distinction:**

- Registers answer: "Where can I find X?"
- Planning answers: "What must be true before Y becomes sellable?"

---

## 9. Planning vs Workspaces

Workspaces perform operational work.

Planning defines what work needs to happen.

**Key distinction:**

- Workspaces execute defined work
- Planning defines the operational instruction set for that work

---

## 10. Journey Lifecycle

A journey follows a lifecycle from conception to execution:

```text
1. IDEA
   - Concept exists
   - Not yet operationally defined

2. PLANNING
   - Planning Areas addressed non-linearly
   - Operational questions answered
   - Uncertainty progressively reduced

3. OPERATIONAL READINESS

   What: Journey is ready for booking and operation

   Process:
   - All planning questions answered
   - Product Owner performs Planning Review
   - Journey walkthrough completed
   - Approval received

   Output: Journey marked as "Sellable"

   Next Stage: Active (participant bookings accepted)

4. ACTIVE
   - Participant bookings accepted
   - Operational execution managed in Workspaces

5. COMPLETED
   - Journey execution finished
   - Historical and learning records retained
```

### Planning Review (Final Planning Activity)

Before a journey becomes **Sellable**, the Product Owner performs a complete Planning Review.

1. **Journey Walkthrough**
   - The Planning Coordinator walks the Product Owner through the complete journey plan
   - From start to finish
   - All stages, all decisions

2. **Question Verification**
   - Verify that all operational questions have been answered
   - Identify any remaining uncertainties
   - Request clarification or additional planning if needed

3. **Operational Validation**
   - Confirm all operational requirements are defined
   - Confirm all constraints are identified
   - Confirm all risks are mitigated

4. **Approval**
   - Product Owner approves the journey for operation
   - Journey is marked as "Sellable"
   - Journey moves to Active Booking state

After the review:

- Planning is complete
- Journey becomes operational
- Operational Workspaces take over execution

---

## 11. Planning Completion Criteria

A journey transitions from Planning to Operational Readiness when:

1. **All Planning Questions Answered**
   - Zero unanswered questions across all Planning Areas
   - All dependencies resolved
   - All constraints documented

2. **Planning Review Completed**
   - Product Owner has reviewed the journey
   - All stakeholder feedback incorporated
   - Approval has been given

3. **Operational Artefacts Generated**
   - Journey Plan complete
   - Cost Calculation finalized
   - Pricing approved
   - Participant Letter prepared
   - Guide Documentation completed
   - Operational Runbook finalized

4. **Stakeholder Sign-Off**
   - Guide(s) confirm readiness
   - Operations confirm readiness
   - Finance confirms pricing
   - Product Owner approves for operation

---

## 12. Planning Principles (Revised)

1. **Uncertainty Reduction (Primary Principle)**
   - Planning's core objective is to eliminate operational uncertainty
   - Every question answered reduces uncertainty
   - Progress is measured by remaining unanswered questions
   - Planning is complete when uncertainty reaches zero

2. **Question-Driven Decision Making**
   - Planning progresses by asking and answering operational questions
   - Every decision is traceable to a question
   - Questions may be discovered during planning
   - Platform should surface unanswered questions

3. **Non-Linear Progression**
   - Planning does not have a correct sequence
   - Planning Areas may be addressed in any order
   - Dependencies exist but do not mandate order
   - Users work on any Planning Area when information is available

4. **Dependency Recognition**
   - Planning Areas may depend on one another
   - Platform should identify blocked areas (waiting for upstream answers)
   - Platform should surface ready areas (all dependencies answered)
   - Dependencies guide but do not enforce planning order

5. **Viability Gating**
   - A journey becomes operational only when:
     - All operational questions are answered
     - Economic model is validated
     - Sufficient participant demand exists (or is forecasted)
     - Product Owner review is complete

6. **Artefact Generation**
   - Planning produces tangible artefacts that guide operations
   - All artefacts originate from one Planning model
   - Artefacts are generated after Planning is complete
   - Artefacts become the source of truth for execution

7. **Coordinator Ownership**
   - Planning is owned and driven by a Planning Coordinator
   - Coordinator ensures all questions are asked, answered, and documented
   - Coordinator drives stakeholder alignment (guides, operations, product, finance)
   - Coordinator initiates Planning Review before transition to Operational Readiness

8. **Focused Progress Indicators**
   - Progress is measured by remaining unanswered questions
   - Avoid percentage-complete indicators
   - Avoid form-completion metrics
   - Focus on operational understanding and readiness

---

## 13. Updated Planning Readiness

A journey is operationally ready when:

**All planning questions have been answered.**

### Progress Indicator

The preferred progress indicator is **remaining unanswered questions**.

Example:

- "8 planning questions remain"
- "Accommodation area: 2 questions remain"
- "All questions answered. Ready for Product Owner review."

### Avoid

- Percentage-complete indicators (e.g., "60% complete")
- Form-completion metrics (e.g., "5 of 7 sections filled")
- Arbitrary checkpoints

### Focus

- Operational uncertainty (unanswered questions)
- Readiness for the next stage
- Clear visibility into what remains

---

## 14. Planning Outputs

Planning produces operational artefacts that guide execution.

**All outputs originate from one Planning model.**

Planning outputs are generated after Planning has been completed.

### Planning Outputs

- **Journey Plan** – Complete definition of the journey from start to finish
- **Cost Calculation** – Fixed and variable costs, cost per participant, break-even analysis
- **Pricing** – Price per participant, early-bird rates, group discounts, cancellation policy
- **Participant Letter** – Welcome message, requirements, what to bring, schedule, contact info
- **Guide Documentation** – Guide assignments, responsibilities, checklists, procedures
- **Packing List** – What participants should bring, what AlpenTind provides
- **Booking Instructions** – How participants book, payment terms, cancellation policy
- **Operational Runbook (Körschema)** – Day-by-day procedures, timings, checklists, contingencies

### Key Principle

All outputs are derived from the Planning model.

A change to the Planning model updates all related outputs.

---

## 15. Relationship to Workspace Architecture

Workspaces perform operational work. Planning defines what work needs to happen.

Planning produces specific outputs (Guide Documentation, Operational Runbook, etc.) that become the instruction set for Workspaces.

### Example

During Planning:

- Question: "How many guides do we need?"
- Answer: "2 guides"
- Output: "Guide Documentation" specifies guide roles

In Workspace:

- Guide Workspace displays: "You are assigned to journey X"
- Work queue shows tasks from Guide Documentation
- Actions: Complete pre-journey briefing, review runbook, etc.

### Connection

Planning outputs → Workspace execution

---

## 16. Relationship to Register Architecture

Registers discover existing objects.

Planning determines what additional operational objects and relationships are required for a journey to become sellable.

Planning may identify missing contacts, suppliers, documents, or constraints that must be resolved and then reflected in Registers.

---

## 17. Architectural Separation

Three distinct but connected architectural concepts:

- **Register Architecture (PDR-004):** Discover existing objects
- **Workspace Architecture (PDR-003):** Execute operational work
- **Planning Architecture (PDR-005):** Eliminate uncertainty and define sellable journeys

Flow of responsibility:

```text
Planning outputs
    ↓
Registers expose relevant objects
    ↓
Workspaces execute operational tasks
```

---

## 18. Future Architectural Implications

Planning Architecture drives future capabilities:

1. Planning Coordinator Workspace
2. Planning dependency visibility
3. Question lifecycle and readiness tracking
4. Artefact generation and synchronization
5. Integration between Planning outputs and Workspace execution queues

---

## 19. Out of Scope

This PDR does not define:

- UI design
- Technical implementation
- Data schema or APIs
- Automation details
- Engineering specifications

These are handled in future ESRs and implementation decisions.

---

## 20. Next Steps

1. Align ESR scope with revised Planning principles
2. Define Planning question libraries per journey type
3. Define dependency visibility model for Planning Areas
4. Define output-generation rules from the Planning model

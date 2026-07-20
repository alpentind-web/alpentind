# PDR-000 – Platform Domain Model

**Status:** Approved

---

## 1. Purpose

PDR-000 defines the complete AlpenTind Platform business domain model.

It answers one foundational question:

> **"How does the entire platform fit together?"**

PDR-000 is the architectural entry point for future PDRs, ESRs, and Business Engines.

It does not introduce new business capabilities.

It describes how approved business domains cooperate as one coherent model.

---

## 2. Domain Philosophy

AlpenTind Platform is structured as cooperating business domains, each with a single clear responsibility.

### Principles of Domain Structure

- No domain performs another domain's responsibility
- Architecture follows business operations
- Implementation follows architecture

Each domain exists because a distinct business problem requires a distinct owner.

No domain is an implementation convenience.

Every domain reflects a real operational concern in the business.

---

## 3. Core Domains

### Planning

**Core Question:** What journey can we offer?

Planning transforms a journey idea into a sellable, operationally viable product.

Planning is the process of resolving operational uncertainty through structured questions.

Planning is not execution.

Planning creates journeys and produces operational readiness.

---

### Registers

**Core Question:** What do we know about our business objects?

Registers own and maintain AlpenTind's operational knowledge as long-lived, curated, reusable business objects.

Registers are the persistent knowledge environment of the platform.

Registers are not temporary. Registers are not workspaces.

Registers provide durable knowledge that Planning and Workspaces depend upon.

---

### Inquiry

**Core Question:** Which journey is right for this person?

Inquiry is the process of establishing whether AlpenTind and a person can undertake a journey together.

Inquiry is conversation-led, professional, and assessment-driven.

Inquiry is a temporary operational object scoped to a single conversation.

Inquiry does not own long-term business objects.

---

### Relationship

**Core Question:** What do we know about this person that helps us build a long-term relationship?

Relationship is the long-term continuity architecture for understanding people over time.

Relationship is the authoritative owner of long-term person history.

Relationship is independent from any individual journey.

Relationship persists as a durable business object across all interactions.

---

### Participant

**Core Question:** Who is undertaking this journey?

Participant represents a person's participation in a specific journey.

A Participant record is created when a booking is confirmed.

Participant records belong to journeys, not to long-term person history.

Participant records do not own long-term knowledge.

---

### Workspace

**Core Question:** How do we execute our operational work?

Workspaces execute operational work.

Workspaces use registered business objects and support daily operations.

Workspaces are structured using the Situation → Work → Context → Actions pattern (PDR-004).

Workspaces are not the source of truth for shared operational knowledge.

---

## 4. Domain Relationships

The domains interact across the full business lifecycle.

### Planning creates journeys

Planning defines the journeys that exist.

Planning produces the operational objects that Inquiry, Registers, and Workspaces depend upon.

### Inquiry creates and discovers relationships

Inquiry consumes the journeys produced by Planning.

Inquiry may result in a confirmed booking, in the establishment of a long-term Relationship, or in a closed conversation.

Inquiry creates a Participant record when a booking is confirmed.

Inquiry creates a Relationship when a long-term connection is intentionally recognised.

### Relationship owns long-term history

Relationship accumulates the complete history of a person across all Inquiries, Journeys, and interactions.

Relationship provides full context for every future Inquiry conducted with that person.

Relationship connects Inquiries and Participant records into a single long-term view.

### Participant represents journey participation

Each confirmed journey produces a Participant record for each person undertaking it.

Participant records are scoped to the journey, not to the long-term Relationship.

All Participant records for a person are accessible through the Relationship.

### Registers provide persistent knowledge

Registers hold the shared operational knowledge that Planning, Inquiry, and Workspaces depend upon.

Planning selects from Registers rather than creating knowledge locally.

Workspaces reference Register objects rather than owning them.

### Workspaces execute operational work

Workspaces provide the operational environment for daily work.

Workspaces reference registered knowledge and operate within the context provided by Planning, Inquiry, and Relationship.

Workspaces do not own knowledge.

---

## 5. Ownership Model

Ownership is explicit.

Every business object must have a clear architectural owner.

| Domain | Ownership |
|---|---|
| **Planning** | Owns journeys under development |
| **Inquiry** | Owns active enquiries |
| **Relationship** | Owns long-term person history |
| **Participant** | Owns journey participation records |
| **Registers** | Own structured operational knowledge |
| **Workspaces** | Own nothing — execution environment only |

### Planning owns journeys

Planning creates and owns all journeys under development.

A journey moves from Planning ownership to operational status when it reaches economic viability.

### Inquiry owns active enquiries

Inquiry owns the active conversation.

An Inquiry is temporary and is resolved when it produces a Booking, a Relationship, or a closed outcome.

Inquiry does not accumulate long-term ownership of any business object.

### Relationship owns long-term person history

Relationship is the single authoritative owner of long-term knowledge about a person.

Inquiries and Participant records do not own long-term knowledge.

Only Relationship retains knowledge across all interactions over time.

### Participant owns journey participation records

Participant records represent the fact of a person's participation in a specific journey.

Participant ownership is scoped to that journey.

The Relationship aggregates all Participant records for a person.

### Registers own structured operational knowledge

Registers are the single source of truth for reusable operational knowledge.

Knowledge that is reusable across journeys or daily operations belongs in a Register.

If operational knowledge changes, the change must happen in the relevant Register.

### Workspaces own nothing

Workspaces are execution environments.

Workspaces use knowledge owned by Registers and context provided by Inquiry and Relationship.

Workspaces do not create or retain operational knowledge on behalf of the platform.

---

## 6. Platform Principles

### Pattern Before Engine

Define the business pattern before building the system.

Operational patterns must be understood and approved before any implementation begins.

Architecture is defined first. Engines are built to serve the architecture.

### Architecture Before Implementation

Architecture decisions are made before engineering begins.

No system component is built without an approved architectural basis.

### Human Judgement

The platform supports professional judgement. It does not replace it.

No system logic makes professional determinations on behalf of the human professional.

The professional remains the decision-maker in every operational situation.

### Conversation Before Forms

Inquiry is a conversation, not a form-filling exercise.

The platform supports dialogue. It does not impose data collection workflows.

### Registers Own Knowledge

If knowledge is reusable across journeys or daily operations, it belongs in a Register.

Registers are the authoritative source of truth for shared operational knowledge.

Knowledge is not created or owned locally within Planning or Workspaces.

### Workspaces Execute Work

Workspaces are execution environments.

Workspaces use knowledge. They do not own it.

### Long-term Relationships

AlpenTind Platform is built for long-term human relationships.

The Relationship domain ensures that every person who engages with AlpenTind is understood over time, not only within a single interaction.

### Every Action Has Purpose

Every Workspace action, every planning step, and every operational process must have a clear operational purpose.

The platform does not support administrative activity without a business reason.

---

## 7. Architectural Boundaries

Each domain has a defined responsibility.

Each domain must never assume the responsibility of another domain.

| Domain | Must Never Become |
|---|---|
| **Planning** | An operational execution environment |
| **Inquiry** | A CRM or data collection system |
| **Relationship** | An address book or contact list |
| **Participant** | A people register |
| **Registers** | An execution layer |
| **Workspaces** | A knowledge ownership layer |

### Planning ≠ operational execution

Planning resolves uncertainty and produces journeys.

Planning does not execute operations.

When a journey becomes operational, operational responsibility moves to the relevant Workspace.

### Inquiry ≠ CRM

Inquiry is a temporary, conversation-led process for determining journey suitability.

It is not a CRM intake form.

It is not a data collection system.

An Inquiry does not create a Contact automatically.

### Relationship ≠ address book

Relationship is a long-term connection between AlpenTind and a person.

It is not a list of contact details.

It is a structured, accumulating record of everything known about a person's journey with AlpenTind.

### Participant ≠ people register

Participant records represent participation in a specific journey.

They are not general-purpose person records.

They do not constitute a register of all people who have engaged with AlpenTind.

### Registers ≠ execution layer

Registers provide curated, reusable knowledge.

They are not Workspaces.

They do not perform operational tasks.

### Workspaces ≠ knowledge ownership layer

Workspaces execute work using knowledge they reference.

They do not own the knowledge they use.

Any operational knowledge change must happen in the relevant Register.

---

## 8. Business Lifecycle

The full business lifecycle of a person's engagement with AlpenTind Platform is:

```text
Person
    → Inquiry
    → Decision
    → Relationship
    → Participant
    → Future Inquiries
    → Additional Journeys
    → Long-term History
```

### Person

A person expresses interest in a journey with AlpenTind.

An Inquiry is opened.

No Contact or Relationship is created at this stage.

### Inquiry

The professional conducts a conversation to assess journey suitability.

The Inquiry is a temporary operational object scoped to this conversation.

### Decision

The person responds to the professional's recommendation.

Three outcomes are possible:

- **Booking** — A journey is confirmed. A Participant record is created. A Relationship may be created.
- **Relationship** — A long-term relationship is established without an immediate booking.
- **Closed Inquiry** — The conversation concludes without a booking or relationship.

### Relationship

When a long-term connection is intentionally recognised, a Relationship is created.

The Relationship becomes the owner of all long-term knowledge about this person.

### Participant

A Participant record is created for each confirmed journey.

The Participant record represents this person's participation in this specific journey.

### Future Inquiries

A person with an established Relationship may make further enquiries.

Each new Inquiry operates with the full context of the Relationship.

Returning people are known relationships, not new enquiries.

### Additional Journeys

A person with an established Relationship may undertake further journeys.

Each Journey produces a new Participant record.

All Participant records are accessible through the Relationship.

### Long-term History

Over time, the Relationship accumulates a complete record of all Inquiries, Journeys, and interactions.

This history is the primary operational value of the Relationship environment.

---

## 9. Relationship to Existing PDRs

PDR-000 is the parent domain model for the following approved architectural decisions:

| PDR | Title | Domain |
|---|---|---|
| **PDR-004** | Register and Workspace Separation | Registers, Workspaces |
| **PDR-005** | Planning Architecture | Planning |
| **PDR-006** | Register Architecture | Registers |
| **PDR-007** | Inquiry Architecture | Inquiry |
| **PDR-008** | Relationship Architecture | Relationship |

Each PDR defines a single domain in depth.

PDR-000 defines how all domains fit together as a coherent platform model.

Future architectural PDRs extend this model by defining additional domains or deepening existing domain definitions.

No future PDR may contradict the ownership model, domain boundaries, or platform principles established in PDR-000 without a documented architectural decision to revise this model.

---

## 10. Architecture Summary

AlpenTind Platform is structured around six cooperating business domains:

| Domain | Core Question | Owns |
|---|---|---|
| **Planning** | What journey can we offer? | Journeys under development |
| **Inquiry** | Which journey is right for this person? | Active enquiries |
| **Relationship** | What do we know about this person? | Long-term person history |
| **Participant** | Who is undertaking this journey? | Journey participation records |
| **Registers** | What do we know about our business objects? | Structured operational knowledge |
| **Workspaces** | How do we execute our operational work? | Nothing — execution environment only |

The architectural model is explicit:

- **Planning creates**
- **Inquiry connects person to journey**
- **Relationship accumulates long-term history**
- **Participant records journey participation**
- **Registers own knowledge**
- **Workspaces execute**

No domain assumes the responsibility of another.

Every business object has a clear architectural owner.

That clarity is required to preserve quality, reuse, and long-term architectural coherence across the platform.

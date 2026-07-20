# PDR-008 – Relationship Architecture

**Status:** Approved

---

## 1. Executive Summary

Relationship is the long-term continuity architecture for understanding people over time.

Relationship is how AlpenTind maintains a complete and structured history of a person across all interactions, journeys, and enquiries.

Relationship is not a contact list.  
Relationship is not a journey-specific record.  
Relationship is a long-term connection between AlpenTind and a person.

---

## 2. Purpose

Every established relationship presents a question that must be answered:

> **"What do we know about this person that helps us build a long-term relationship?"**

Everything in Relationship must support answering that question.

Without a defined Relationship architecture:

- Long-term knowledge is fragmented across individual Inquiries and Participant records
- Returning people are treated as new enquiries rather than known relationships
- Organisational memory depends on individuals rather than structure
- The platform cannot support the professional in building long-term trust

With a defined Relationship architecture:

- Long-term knowledge accumulates in one place, independent of individual journeys
- Returning people are recognised and understood from the first contact
- Professional knowledge is structured and retained over time
- The platform actively supports the building of long-term human relationships

---

## 3. Relationship Definition

A **Relationship** is a long-term connection between AlpenTind and a person.

A Relationship is the owner of long-term person history.

A Relationship is independent from any individual journey.

### Key Properties

- **Long-term:** Relationship exists beyond any single Inquiry or Journey. It persists as a durable business object.
- **History-owning:** Relationship is the authoritative holder of accumulated knowledge about a person.
- **Journey-independent:** Relationship is not scoped to a single journey. It spans the complete history of a person's connection with AlpenTind.
- **Intentionally created:** Relationship begins only when ongoing connection is intentionally recognised. Not every Inquiry creates a Relationship.

### Relationship May Include

A Relationship may contain multiple:

- Inquiries
- Participant records
- Journeys
- Notes
- Documents

### Explicit Constraints

- Not every Inquiry creates a Relationship.
- Relationship is not created automatically.
- Relationship creation is a deliberate act reflecting established long-term connection.

---

## 4. Relationship Philosophy

### Purpose is Continuity, Not Administration

Relationship exists so that AlpenTind can understand people over time.

It is not a data management exercise.  
It is not a CRM record.  
It is a structured commitment to knowing and serving a person well over the long term.

### Supports Understanding People Over Time

A Relationship accumulates knowledge that would otherwise be lost.

What was discussed in a previous Inquiry, what journeys a person has undertaken, what was learned about their preferences and needs — all of this lives within the Relationship and is available to the professional at every future interaction.

### Strengthens Human Relationships, Does Not Replace Them

The Relationship environment supports the professional in maintaining human connections.

It does not replace those connections.

The professional remains the primary relationship holder.  
The platform provides memory, structure, and context to make that relationship stronger.

---

## 5. Operational Principles

### 1. Long-term Ownership

Relationship is the owner of long-term knowledge about a person.

Inquiries and Participant records do not own long-term knowledge.  
Inquiries are temporary.  
Participant records belong to journeys.  
Only Relationship accumulates and retains knowledge across all interactions.

### 2. Structured Knowledge

Relationship provides structured, accessible knowledge.

The professional can review the complete history of a person — enquiries, journeys, notes, and documents — from the Relationship Workspace.

### 3. Human Knowledge

Relationship captures knowledge that goes beyond data fields.

Notes, observations, conversation context, and professional judgement are part of the Relationship record.

### 4. Multiple Inquiries

One Relationship may contain many Inquiries.

A person may enquire multiple times over many years.  
Each Inquiry is independent and temporary.  
All Inquiries belonging to a person are accessible through the Relationship.

### 5. Multiple Journeys

One Relationship may contain many Journeys.

A person may undertake multiple journeys with AlpenTind over time.  
Each Journey produces a Participant record.  
All Participant records belonging to a person are accessible through the Relationship.

### 6. Relationship First

When a person with an established Relationship makes a new enquiry, the Relationship is consulted first.

The Inquiry operates with the benefit of full Relationship context.  
The professional approaches the new enquiry as a continuation of a known relationship, not as a new unknown person.

---

## 6. Relationship Lifecycle

```text
Relationship Created
    → Active Relationship
    → Additional Inquiries
    → Additional Journeys
    → Long-term History
    → Archived (if appropriate)
```

### Relationship Created

A Relationship is created when a long-term connection is intentionally recognised.

This typically follows:

- A confirmed booking
- A stated future intention to undertake a journey
- An explicitly agreed ongoing relationship

The Relationship record is opened by the professional, reflecting deliberate recognition of an established connection.

### Active Relationship

The Relationship is active when a person is engaged with AlpenTind in an ongoing way.

The Relationship Workspace is the operational home for managing this ongoing connection.

Knowledge accumulates as enquiries are processed, journeys are undertaken, and notes are recorded.

### Additional Inquiries

A person with an established Relationship may make further enquiries.

Each new Inquiry is conducted using the full context of the Relationship.

Each completed Inquiry is added to the Relationship history.

### Additional Journeys

A person with an established Relationship may undertake further journeys.

Each Journey produces a Participant record.

Each completed Journey is linked to the Relationship and becomes part of the long-term history.

### Long-term History

Over time, the Relationship accumulates a complete record of all interactions, journeys, and knowledge.

This history is the primary operational value of the Relationship environment.

### Archived

A Relationship may be archived if the ongoing connection has ended.

Archived Relationships remain accessible as historical context.

Archiving is a deliberate act, not an automated outcome.

---

## 7. Relationship Workspace

The Relationship Workspace is structured using the established Situation → Work → Context → Actions pattern (PDR-004).

### Situation

Current operational state of this Relationship:

- Relationship status (active, archived)
- Current active Inquiry, if any
- Next Journey, if applicable
- Summary of most recent interaction

### Work

Active operational tasks within this Relationship:

- Open Inquiries
- Journeys in preparation
- Pending actions relating to this person
- Notes under development

### Context

Supporting knowledge for the professional:

- Complete Inquiry history for this person
- Complete Journey and Participant history for this person
- Notes and observations recorded over time
- Documents associated with this Relationship

### Actions

Operations available from the Relationship Workspace:

- Start new Inquiry
- Add note
- Add document
- Link Journey
- Archive Relationship

---

## 8. Relationship with Other Environments

Relationship is a fifth architectural environment, complementing the four environments established in PDR-004 through PDR-007.

### Planning

Planning creates journeys.

Relationship consumes journey information to provide context for returning participants.

The professional can review a person's previous journeys when planning future recommendations.

### Inquiry

Inquiry is temporary.

Relationship is long-term.

Inquiry may result in a Relationship being created, if a long-term connection is established.

Inquiry does not own long-term knowledge.  
All long-term knowledge from an Inquiry belongs to the Relationship, not to the Inquiry.

When a person with an existing Relationship makes a new enquiry, the Inquiry operates within the context of that Relationship.

### Participant

Participant records belong to journeys.

Participant records do not own long-term person knowledge.

The Relationship aggregates all Participant records for a person, providing complete journey history across all journeys undertaken.

### Registers

Registers own long-term operational knowledge (PDR-006).

The Relationship is the person-specific counterpart to the broader Register architecture.

Where Registers hold shared operational knowledge about business objects, Relationship holds person-specific knowledge accumulated over time.

### Workspaces

Workspaces execute operational work (PDR-004).

The Relationship Workspace is a long-lived workspace.

Unlike the Inquiry Workspace, which is temporary and scoped to a single conversation, the Relationship Workspace persists for the duration of the relationship.

It follows the Situation → Work → Context → Actions structure defined in PDR-004.

---

## 9. Architectural Principles Summary

| Principle | Statement |
|---|---|
| **One Relationship, Many Inquiries** | One Relationship may contain many Inquiries |
| **One Relationship, Many Journeys** | One Relationship may contain many Journeys |
| **Relationships Persist** | Relationships persist over time as long-term business objects |
| **Inquiries Are Temporary** | Inquiries exist for the duration of a conversation and do not persist long-term |
| **Participant Records Belong to Journeys** | Participant records are scoped to a journey, not to the long-term relationship |
| **Relationship Connects Complete History** | Relationship connects the complete AlpenTind history for a person — Inquiries, Journeys, Notes, and Documents |

---

## 10. Integration with Existing Architecture

### PDR-004 – Register and Workspace Separation

PDR-004 established the separation between Registers (discovery) and Workspaces (execution) and defined the Situation → Work → Context → Actions workspace pattern.

PDR-008 applies the workspace pattern directly to the Relationship environment.

The Relationship Workspace follows the structure established in PDR-004.

The separation between Relationship (long-term business object) and Inquiry (temporary operational object) is a direct application of the Register and Workspace Separation principle.

### PDR-005 – Planning Architecture

PDR-005 established Planning as the process that transforms a journey idea into a deliverable product.

PDR-008 positions Relationship as the long-term home for a person's journey history.

Planning defines what journeys exist.  
Inquiry determines which journey is right for a specific person.  
Relationship retains the complete record of all journeys a person has undertaken.

### PDR-006 – Register Architecture

PDR-006 established Registers as the owners of long-term operational knowledge and defined the Contact Register as the home of qualified, curated relationship records.

PDR-008 extends this architecture by defining Relationship as the person-specific owner of long-term history.

The Contact Register identifies and curates people at the organisational level.  
The Relationship provides structured, deep, long-term knowledge for each individual person.

These two architectural components are complementary.  
They do not overlap in ownership.

### PDR-007 – Inquiry Architecture

PDR-007 established Inquiry as a temporary operational object representing a conversation about possible journeys.

PDR-008 defines the boundary between Inquiry and Relationship clearly:

- Inquiry is temporary. Relationship is long-term.
- Inquiry does not own long-term knowledge. Relationship does.
- Inquiry may result in the creation of a Relationship. Relationship is not created by default.
- An Inquiry conducted within an existing Relationship benefits from full Relationship context.

PDR-007 and PDR-008 together define the complete architecture for person engagement:  
Inquiry for initial and ongoing conversations.  
Relationship for long-term continuity.

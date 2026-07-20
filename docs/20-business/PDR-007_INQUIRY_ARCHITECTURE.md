# PDR-007 – Inquiry Architecture

**Status:** Approved

---

## 1. Executive Summary

Inquiry is the process of establishing whether AlpenTind and a person can undertake a journey together.

Inquiry is conversation-led, professional, and assessment-driven.

Inquiry is a primary business process and a distinct architectural environment within AlpenTind Platform.

Inquiry is not a CRM intake form.  
Inquiry is not a data collection exercise.  
Inquiry is a conversation.

---

## 2. Purpose

Every incoming enquiry presents a question that must be answered:

> **"Can AlpenTind and this person undertake a journey together?"**

Everything in Inquiry must support answering that question.

Without a defined Inquiry process:

- Enquiries are handled inconsistently
- Suitability is not assessed before commitment
- Contact Register accumulates unqualified records
- Professional judgement has no structured operational support

With a defined Inquiry process:

- Every enquiry receives a conversation-led assessment
- Suitability is established before any relationship is formed
- Contact Register reflects only qualified, long-term relationships
- Platform supports the professional in making the right recommendation

---

## 3. Inquiry Definition

An **Inquiry** is a temporary operational object.

An Inquiry represents an ongoing conversation about one or more possible journeys.

### Key Properties

- **Temporary:** Inquiry exists for the duration of the conversation. It does not persist as a long-term business object unless it results in a booking or relationship.
- **Conversation-centred:** Inquiry is defined by dialogue, not by data fields.
- **Journey-oriented:** Inquiry explores which journey, if any, is right for this person.
- **Independent from Contact Register:** An Inquiry is not a Contact. It does not become a Contact automatically.

### Explicit Constraints

- Not every Inquiry becomes a Contact.
- Not every Inquiry becomes a Participant.
- Inquiry existence does not imply relationship.

---

## 4. Inquiry Philosophy

### Inquiry is a Conversation

Inquiry is not a form.

The platform supports the professional in conducting a dialogue — asking the right questions, exploring the person's situation, and forming a professional view of suitability.

### Platform Supports Dialogue

The platform facilitates the conversation.

It provides context, history, and workspace for the professional to work effectively.

### Platform Supports Professional Judgement

The platform makes professional judgement easier.

It does not replace professional judgement.

The decision to recommend, to progress, or to close an inquiry rests with the professional — not with a system rule or automated scoring.

### Platform Does Not Replace Professional Judgement

No system logic makes the suitability determination.

The Inquiry environment exists to support the professional in reaching their own well-informed conclusion.

---

## 5. Operational Principles

### 1. Conversation Driven

Inquiry is driven by conversation, not by form completion.

The operational unit of an Inquiry is a dialogue exchange, not a data record.

### 2. Human Judgement

Suitability is a professional determination.

The platform provides information and structure. The professional provides judgement.

### 3. Recommendation Driven

The output of an Inquiry is a recommendation.

A recommendation may be:

- A specific journey suitable for this person
- An alternative approach
- A conclusion that no suitable journey exists at this time

### 4. Inquiry Before Relationship

A relationship is created only when long-term relationship criteria exist.

Long-term relationship criteria include:

- A confirmed booking
- Stated future interest in a journey
- An explicitly agreed ongoing relationship

An Inquiry does not create a Contact.  
A confirmed intention to work together creates a Contact.

---

## 6. Inquiry Lifecycle

```text
Incoming Inquiry
    → Dialogue
    → Operational Assessment
    → Recommendation
    → Decision
    → Outcome
```

### Incoming Inquiry

An enquiry is received.

The professional opens an Inquiry Workspace and begins the conversation.

No Contact is created at this stage.

### Dialogue

The professional conducts a conversation with the person.

The platform provides workspace to record questions, responses, observations, and recommendations as the dialogue develops.

### Operational Assessment

The professional assesses suitability.

This may involve reviewing relevant journeys, exploring the person's background, and evaluating fit against AlpenTind's operational standards.

### Recommendation

The professional forms a recommendation.

The recommendation states whether a journey is suitable and, if so, which journey is proposed.

### Decision

The person responds to the recommendation.

The professional registers the decision.

### Outcome

Three outcomes are possible:

- **Booking**
- **Relationship**
- **Closed Inquiry**

---

## 7. Inquiry Outcomes

### Booking

The person accepts a journey recommendation and a booking is confirmed.

The Inquiry becomes part of Participant history.

A Participant record is created as part of the booking process.

### Relationship

The conversation establishes a long-term relationship, even without an immediate booking.

The Inquiry becomes part of Contact history.

A Contact record is created explicitly, reflecting an established ongoing relationship.

### Closed Inquiry

The Inquiry does not result in a booking or a relationship.

The Inquiry is archived.

No Contact is created.

The archived Inquiry remains available as operational context for any future enquiry from the same person.

---

## 8. Inquiry Workspace

The Inquiry Workspace is structured using the established Situation → Work → Context → Actions pattern (PDR-004).

### Situation

Current operational state of this Inquiry:

- Current conversation summary
- Current recommendation
- Operational assessment status

### Work

Active operational tasks:

- Questions being explored in dialogue
- Ongoing dialogue exchanges
- Recommendations under development
- Journey-fit planning

### Context

Supporting information for the professional:

- Conversation history
- Relevant journey information
- Notes from this inquiry
- Previous enquiries from this person

### Actions

Operations available from the Inquiry Workspace:

- Reply
- Recommend journey
- Register booking
- Create contact
- Close inquiry

---

## 9. Relationship with Other Environments

Inquiry is a fourth architectural environment, complementing the three environments established in PDR-006.

### Planning

Planning creates journeys.

Inquiry consumes journeys produced by Planning.

The professional selects from available journeys when forming a recommendation.

### Inquiry

Inquiry matches a person with a journey.

Inquiry does not create journeys.  
Inquiry does not own long-term business objects.  
Inquiry operates in a temporary workspace scoped to one conversation.

### Registers

Registers own long-term operational knowledge (PDR-006).

Inquiry may reference Registers — for example, to review journey details or past contact records.

Inquiry creates a Contact only when a long-term relationship is established. That Contact then belongs to the Contact Register, not to the Inquiry.

### Workspaces

Workspaces execute operational work (PDR-004).

The Inquiry Workspace is a temporary workspace.

It follows the Situation → Work → Context → Actions structure defined in PDR-004.

It is scoped to a single Inquiry and does not persist as a long-lived workspace.

---

## 10. Architectural Summary

AlpenTind Platform is structured around four complementary environments:

| Environment | Core Question |
|---|---|
| **Planning** | What journey can we offer? |
| **Inquiry** | Which journey is right for this person? |
| **Registers** | What do we know about our business objects? |
| **Workspaces** | How do we execute our operational work? |

The three-question summary for the primary operational environments:

- **Planning:** "What journey can we offer?"
- **Inquiry:** "Which journey is right for this person?"
- **Relationship:** "How do we build long-term relationships?"

Each environment addresses a distinct business problem.

No environment should assume the responsibility of another.

---

## 11. Integration with Existing Architecture

### PDR-004 – Register and Workspace Separation

PDR-004 established the separation between Registers (discovery) and Workspaces (execution) and defined the Situation → Work → Context → Actions workspace pattern.

PDR-007 applies the workspace pattern directly to the Inquiry environment.

The Inquiry Workspace follows the structure established in PDR-004.

The separation between Inquiry (temporary operational object) and Contact Register (long-term business object) is a direct application of the Register and Workspace Separation principle.

### PDR-005 – Planning Architecture

PDR-005 established Planning as the process that transforms a journey idea into a deliverable product.

PDR-007 positions Inquiry downstream of Planning.

Planning defines what journeys exist.  
Inquiry determines which journey is right for a specific person.

Inquiry consumes the output of Planning.

### PDR-006 – Register Architecture

PDR-006 established Registers as the owners of long-term operational knowledge, and defined the Contact Register as the home of qualified, curated relationship records.

PDR-007 is explicitly designed to protect Register quality.

An Inquiry does not create a Contact.  
A Contact is created only when long-term relationship criteria are met.

This preserves the integrity of the Contact Register by ensuring it reflects only established, qualified relationships — not every incoming enquiry.

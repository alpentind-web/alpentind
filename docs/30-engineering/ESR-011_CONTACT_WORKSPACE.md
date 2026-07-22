# ESR-011 – Contact Workspace

## Status

Approved

---

## Objective

Define Contact Workspace as the engineering specification for the read-first context workspace that presents who a person is, how AlpenTind knows them, what is relevant to remember, and where the professional continues working.

This specification translates PDR-010 Contact Workspace Architecture into engineering design without redefining business architecture and without introducing implementation detail.

---

## Architecture Conformance

This ESR shall conform to:

- PDR-000 Platform Domain Model
- PDR-009 Business Transfer Architecture
- PDR-010 Contact Workspace Architecture
- SDS-002 Platform Interaction Standard

This ESR does not redefine ownership, business terminology, or domain boundaries established by those documents.

---

## 1. Workspace Purpose

Contact Workspace is the permanent representation of a person in AlpenTind Platform.

It exists to answer four questions for the professional:

- **Who is this person?**
- **How do we know them?**
- **What is relevant to remember?**
- **Where do I continue working?**

Contact Workspace is calm, structured, and low-complexity by design.

It is a read-first context workspace. It is not an operational workspace. Operational work belongs to Dialog.

---

## 2. Workspace Structure

Contact Workspace shall be composed of the following sections, presented in a clear, structured layout that minimises cognitive load.

### 2.1 Contact Information

Displays permanent person information owned by Contact:

- Name
- Telephone
- Email
- Address

This information is the permanent record of who the person is. It is editable from this workspace. See Section 4 — Editing Behaviour.

### 2.2 Relationship

Displays long-term contextual information that communicates how AlpenTind knows this person, for example:

- First Contact (date or period)
- Latest Journey (name or reference)

The purpose is to give the professional immediate long-term context without requiring navigation elsewhere.

Relationship information is presented for understanding only. It does not trigger workflows.

### 2.3 Interests

Displays expressed interests identified during prior dialogue with this person, for example:

- Tour du Mont Blanc
- Dolomites
- Winter Courses

Rules:

- Interests are informational only
- No campaign management behaviour is defined here
- No marketing behaviour is defined here
- Future ownership of interest data may be assigned to a dedicated engine

### 2.4 History

Displays navigational references to prior work associated with this person:

- Previous Dialogs
- Previous Journeys

Rules:

- History is presented as navigation and context, not as an operational record
- Contact Workspace does not own history records produced by Dialog or Journey engines
- Ownership of history records remains with the originating engine in accordance with PDR-009

### 2.5 Actions

The following actions are available from Contact Workspace:

- **Create Dialog** — initiate a new Dialog for this person
- **Edit Contact** — open the edit interaction to update permanent person information

Note: future engines may introduce additional actions that surface here. Those actions are not defined in this ESR.

---

## 3. Workspace Behaviour

Contact Workspace shall:

- open from Contact Register
- display contact information immediately upon opening, without requiring a manual refresh step
- present all sections populated from available data without requiring user interaction to load them
- behave as read-first by default — the professional reads and understands before acting
- minimise required interaction — no workflow steps are imposed before the professional can read the workspace

Contact Workspace is not a polling loop. It does not require the professional to trigger updates during a session.

---

## 4. Editing Behaviour

Permanent contact information may be edited from Contact Workspace.

Editing behaviour shall comply with SDS-002:

- editing is initiated via the Edit Contact action
- editing uses a platform Edit Modal
- the edit modal presents only Contact-owned fields: Name, Telephone, Email, Address
- auto-save SHOULD be used where appropriate
- confirmation is not required for saves; notification occurs only on failure
- edits persist to the Contact-owned record in accordance with PDR-010

Operational notes from Dialog are never edited from Contact Workspace. They are owned by Dialog and managed there.

---

## 5. Ownership Behaviour

Ownership follows the architecture defined in PDR-009 and PDR-010.

### Contact owns:

- Name
- Telephone
- Email
- Address

Ownership of these fields remains with Contact regardless of where the information was originally entered. Dialog may transfer permanent person information to Contact via controlled transfer as defined in PDR-009.

### Contact may display data owned by other engines:

| Displayed Information | Architectural Owner |
|---|---|
| Latest Journey | Journey engine |
| Dialog History | Dialog engine |
| Interest Overview | Future Interest Engine |

Displaying data does not transfer ownership. Ownership remains with the originating engine.

Contact does not duplicate, merge, or assume ownership of information produced by other engines.

---

## 6. Navigation Behaviour

Contact Workspace is the navigation hub for person-related movement across the platform.

It shall provide navigation to:

- Dialogs associated with this person
- Journeys associated with this person

Constraint: Contact Workspace must not evolve into an operational workflow engine. Navigation from Contact surfaces links and context. Operational execution takes place in the destination engine.

---

## 7. Interaction Principles

Contact Workspace shall comply with SDS-002 Platform Interaction Standard.

### Modal components

- Platform modal components MUST be used for all interactions
- Browser dialogs (`window.alert`, `window.confirm`, `window.prompt`) MUST NOT be used
- Edit Contact uses the platform Edit Modal with buttons `[ Avbryt ] [ Spara ]`
- Delete operations, if applicable, MUST use the platform Confirmation Modal with buttons `[ Nej ] [ Ja ]`

### Notifications

- Toast notifications MUST be used for successful operations only, and MUST auto-dismiss
- Failure notifications MUST clarify what failed and what the professional can do next
- Unnecessary confirmations MUST NOT be introduced

### Save behaviour

- Auto-save SHOULD be applied where appropriate for editable fields
- The professional MUST NOT be interrupted by save confirmations on routine edits

### Keyboard and accessibility

- Escape MUST close open modals
- Tab navigation MUST follow a natural order
- Focus MUST return to the origin control after a modal closes
- All buttons MUST behave consistently with keyboard interaction across the platform

---

## 8. Non-Goals

Contact Workspace must not:

- replace Dialog as the operational workspace
- manage Bookings
- manage Documents
- manage Marketing
- manage Campaigns
- store operational notes
- become a CRM dashboard
- own or duplicate records belonging to other engines
- execute workflows

---

## 9. Future Extension Points

The following represent potential integration boundaries for future engines. No implementation is defined here.

### Interest Engine

A future Interest Engine may own interest data currently displayed as informal context in Contact Workspace. Contact Workspace would present interest data via that engine's boundary without assuming ownership.

### Journey Engine

Journey Engine may provide richer journey history and contextual data to Contact Workspace as the Journey domain matures.

### Document Engine

A future Document Engine may surface document references relevant to this person from Contact Workspace as a navigation entry point.

### Marketing Engine

A future Marketing Engine may provide campaign and communication history context. Contact Workspace may surface this as read-only context in accordance with its non-operational purpose.

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

- Workspace purpose documented
- Workspace structure documented
- Workspace behaviour documented
- Editing behaviour documented
- Ownership behaviour documented
- Navigation behaviour documented
- Interaction principles documented
- Non-goals documented
- Future extension points documented
- No implementation details included
- Ready for RI-012

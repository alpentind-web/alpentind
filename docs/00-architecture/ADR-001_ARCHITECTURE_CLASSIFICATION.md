# ADR-001 – Architecture Classification

**Status:** Approved

---

## 1. Purpose

ADR-001 defines the mandatory architecture classification process for new capability proposals in AlpenTind Platform.

It answers one architectural question:

> **"What kind of architectural component is this?"**

ADR-001 is the mandatory entry point for future architectural decisions before Discovery, engineering, or implementation work begins.

It does not include implementation detail.  
It does not include engineering specification.  
It does not include UI specification.  
It does not redefine existing PDR ownership boundaries.

---

## 2. Architecture Philosophy

Architecture governs change before solution work begins.

The mandatory sequence is:

- Architecture precedes implementation
- Classification precedes Discovery
- Discovery precedes Engineering
- Engineering precedes implementation

No implementation starts without architecture classification.

This sequence exists to preserve ownership clarity, architectural coherence, and consistent platform evolution.

---

## 3. Classification Objective

Every new capability proposal must first be classified into its architectural role.

Classification determines whether the proposal is:

- a **Business Engine**
- a **Platform Service**
- a **Platform View**
- **Existing Behavior**

The classification outcome determines the correct Discovery track.

---

## 4. Classification Workflow

Classification proceeds in a fixed sequence.

### Step 1 – Business Engine?

A proposal is classified as a Business Engine when it:

- owns business concepts
- owns Business Objects
- owns operational workflows
- owns Business Workspaces

Examples:

- Inquiry
- Dialog
- Contact
- Journey
- Accommodation

### Step 2 – Platform Service?

A proposal is classified as a Platform Service when it:

- provides reusable capability
- attaches to Business Objects
- never owns Business Objects
- is reusable across multiple Business Engines

Examples:

- Follow-up
- Attachments
- Activity Log
- Search
- Permissions
- Calendar Notes

### Step 3 – Platform View?

A proposal is classified as a Platform View when it:

- projects information from multiple sources
- owns no business information
- supports user orientation

Examples:

- Overview
- Calendar
- My Workday
- Search Results

### Step 4 – Existing Behavior?

A proposal is classified as Existing Behavior when:

- the capability belongs to an existing component
- no new architecture is required

Path:

- proceed via Business Validation + Reference Implementation

---

## 5. Architecture Decision Flow

The canonical decision flow is:

**New Idea**  
→ **Architecture Classification**  
→ **Business Engine?**  
→ **Platform Service?**  
→ **Platform View?**  
→ **Existing Behavior?**  
→ **Proceed with corresponding Discovery process**

This flow is mandatory for all new capability proposals.

---

## 6. Architectural Principles

### Business Engine Principle

Business Engines own the business.

Business ownership, Business Objects, and operational workflows remain inside the responsible Business Engine.

### Platform Service Principle

Platform Services enhance Business Objects.

They provide reusable support capability without becoming business owners.

### Platform View Principle

Platform Views project information; they never own business information.

Their purpose is orientation, not business responsibility.

### Projection Principle

Views aggregate and present information. Ownership never moves.

Projection may combine multiple sources without changing the architectural owner of any information presented.

### Ownership Principle

Business ownership remains in the responsible Business Engine.

Classification must preserve explicit ownership boundaries defined by the platform architecture.

### Transfer Principle

Business Engines transfer responsibility; they do not execute neighboring business processes.

Architectural cooperation happens through controlled hand-off, not through collapsed ownership.

### Snapshot Principle

Operational work preserves historical context.

Architecture must allow work to retain its relevant business history without moving ownership to the wrong component.

### User-Centric Principle

Engines organize business, services enhance work, and views organize user experience.

The architecture must support practical daily work while keeping business ownership explicit.

---

## 7. Relationship to Business Architecture

ADR-001 aligns with the platform business architecture by ensuring that new capabilities are classified before further architectural or solution work proceeds.

This decision aligns with:

- **PDR-000 Platform Domain Model**
- **PDR-009 Business Transfer Architecture**
- **PDR-010 Contact Workspace Architecture**

ADR-001 does not replace those decisions.

It governs how future proposals are classified against the business architecture they already define.

---

## 8. Relationship to Platform Architecture

ADR-001 aligns with the platform architecture model that distinguishes:

- Business Engines
- Platform Services
- Platform Views

This decision aligns with:

- **PDR-011 Platform Architecture**

ADR-001 operationalizes that architecture as the first decision checkpoint for future proposals.

It ensures that reusable capability, ownership, and projection are distinguished before Discovery begins.

---

## 9. Relationship to Future ADR Documents

Future ADR documents must begin from the classification outcome defined by ADR-001.

ADR-001 is therefore the entry point for future architectural decisions concerning new capabilities, new platform components, or proposals that require explicit architectural rationale.

Later ADRs may refine a classified direction.  
They do not bypass classification.

---

## 10. Future Usage Guidelines

ADR-001 is used in practice as follows:

- it is the mandatory first checkpoint for any new capability proposal
- the classification outcome determines the Discovery track
- reclassification is allowed only with explicit architectural rationale

If a proposal cannot justify a new Business Engine, Platform Service, or Platform View, it must be treated as Existing Behavior.

No Discovery starts without classification.  
No engineering starts without Discovery.  
No implementation starts without engineering.

---

## 11. Constraints

This ADR is architecture governance only.

- documentation only
- no implementation
- no engineering specification
- no UI specification

---

## 12. Architectural Summary

> **Every new capability proposal must first be classified so AlpenTind Platform knows whether it belongs to a Business Engine, a Platform Service, a Platform View, or Existing Behavior.**

The model is explicit:

- architecture classification is the first mandatory checkpoint
- classification determines the Discovery path
- ownership remains with the responsible Business Engine
- reusable capability is separated from business ownership
- projection never changes ownership
- future ADRs begin from this classification decision

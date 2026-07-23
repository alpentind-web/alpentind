# PDR-011 – Platform Architecture

**Status:** Approved

---

## 1. Purpose

PDR-011 defines platform architecture outside Business Engines.

It answers one architectural question:

> **"How does the platform support work without becoming part of the business domain?"**

This decision introduces Platform Services and Platform Views as first-class architectural concepts.

It does not redesign Business Engine ownership.
It does not introduce implementation detail.
It does not include UI or engineering specification.

---

## 2. Platform Philosophy

The platform is structured around a clear separation of responsibility:

- Business Engines describe the business
- Platform components support work
- Platform components never own business concepts

Platform architecture must reinforce business boundaries, not blur them.

---

## 3. Architectural Layers (Three-Layer Model)

AlpenTind Platform architecture is expressed as three cooperating layers.

### Business Engines

Business Engines are the ownership layer.

Responsibilities:

- Own business concepts
- Own business objects
- Own workspaces

Examples:

- Inquiry
- Dialog
- Contact
- Journey
- Accommodation

### Platform Services

Platform Services are the reusable capability layer.

Responsibilities:

- Provide reusable capabilities
- Attach to Business Objects
- Never own Business Objects

Examples:

- Follow-up (future)
- Attachments
- Search
- Activity Log
- Calendar Notes
- Permissions

### Platform Views

Platform Views are the orientation layer.

Responsibilities:

- Present information from multiple Business Engines and Platform Services
- Own no business information
- Provide orientation for user work

Examples:

- Overview
- Calendar
- My Workday
- Search Results

---

## 4. Platform Service Principle

A Platform Service is a reusable capability attached to Business Objects.

A Platform Service may support multiple Business Engines, but it never changes business ownership boundaries.

Attaching a service to an object does not transfer ownership of that object.

---

## 5. Platform View Principle

Platform Views never own information.

A Platform View presents information produced and owned elsewhere.

Platform Views are projections for orientation and coordination, not ownership environments.

---

## 6. Projection Principle

Business ownership remains in Business Engines.

Platform Views may project information across multiple sources:

- Multiple Business Engines
- Multiple Platform Services
- Combined business and platform-originated information

Projection never duplicates ownership.

Presentation scope may be broad; ownership remains singular and explicit.

---

## 7. User-Centric Principle

The architecture separates business structure from user orientation:

- Business Engines organize business responsibility
- Platform Services enhance business operation
- Platform Views organize user work and orientation

This keeps business ownership precise while supporting practical daily work.

---

## 8. Business Object Integration

Platform Services integrate by attachment to Business Objects.

Integration rules:

- Services attach to Business Objects
- Business Objects remain independent
- Services do not modify business responsibilities

A service can enrich operational capability without becoming a business owner.

---

## 9. Calendar Architecture (Platform View)

Calendar is a Platform View.

Calendar owns no business information.

Calendar presents Calendar Events projected from multiple origins, including:

- Journeys
- Follow-ups
- Calendar Notes
- Future Business Engines
- Future Platform Services

Calendar is an orientation surface for time-based work, not an ownership boundary.

---

## 10. Calendar Notes Discovery Outcome

Users may create Calendar Notes directly.

Calendar Notes are independent Platform objects.

Calendar Notes produce Calendar Events that appear in the Calendar Platform View.

This preserves business ownership boundaries while enabling user-driven scheduling context.

---

## 11. Future Platform Services

Likely future Platform Services include:

- Follow-up
- Attachments
- Search
- Activity Log
- Permissions
- Calendar Notes
- Notifications

These services are reusable capabilities and do not redefine Business Engine ownership.

---

## 12. Future Platform Views

Likely future Platform Views include:

- Overview
- Calendar
- My Workday
- Search Results

These views provide cross-source orientation and own no business information.

---

## 13. Architectural Boundaries

Platform components must never:

- Own business concepts
- Replace Business Engines
- Duplicate business ownership
- Contain operational workflows belonging to Business Engines

Support capability must remain separate from business ownership.

---

## 14. Relationship to Existing PDRs

PDR-011 aligns with and complements:

- **PDR-000** — Platform Domain Model
- **PDR-009** — Business Transfer Architecture
- **PDR-010** — Contact Workspace Architecture
- Future Business Engine PDRs

PDR-011 does not replace those decisions.

It defines how platform-level services and views support work while preserving engine boundaries.

---

## 15. Architectural Summary

> **Business Engines own the business. Platform Services and Platform Views support work without owning business concepts.**

The model is explicit:

- Ownership remains in Business Engines
- Services add reusable capability by attachment
- Views provide cross-source projection and orientation
- Projection never duplicates ownership
- Platform architecture supports user work without absorbing business responsibility

This preserves ownership discipline, operational clarity, and architectural coherence across AlpenTind Platform.

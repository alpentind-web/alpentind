# ADR-002 – Professional Responsibility Principle

**Status:** Accepted

---

## 1. Purpose

ADR-002 establishes the permanent responsibility boundary between AlpenTind Platform and certified professionals.

It answers one architectural question:

> **"Who bears professional responsibility for activity design, safety assessment, and operational decisions?"**

This decision applies to all platform components, all Business Engines, all Platform Services, all Platform Views, and all future AI capabilities.

It does not include implementation detail.
It does not include engineering specification.
It does not include UI specification.
It does not weaken responsibility language.

---

## 2. Architectural Decision

The following statements are normative.

- The AlpenTind Platform shall support professional work.
- The AlpenTind Platform shall never replace professional responsibility.
- Professional responsibility always belongs to the certified guide.
- No software component may assume professional responsibility.

---

## 3. Professional Responsibility Principle

### Core Principle

Professional responsibility always belongs to the certified guide.

Software provides knowledge, visibility, and decision support.

Software never assumes responsibility.

---

## 4. Architectural Boundary

### Platform May Support

- professional knowledge
- professional exploration
- professional comparison
- professional planning support
- professional documentation
- professional communication
- professional visibility

### Platform Shall Never Replace

- professional assessment
- professional approval
- professional accountability
- professional responsibility

---

## 5. Platform Responsibilities

The platform shall:

- provide trusted information
- present reference knowledge
- support comparison
- highlight inconsistencies
- present operational status
- preserve business and historical information
- support workflows

The platform does not decide.

---

## 6. Certified Guide Responsibilities

The following responsibilities belong exclusively to the certified guide and are non-delegable:

- professional assessment
- safety assessment
- route selection
- accommodation selection
- activity approval
- operational responsibility
- final professional judgement

These responsibilities cannot be delegated to software.

---

## 7. Professional Decision Support Scope

The platform may:

- display maps, trail grading, accommodation, logistics, and cost status
- highlight missing information and inconsistencies
- compare alternatives
- recommend alternatives

Recommendations never replace professional judgement.

---

## 8. Professional Approval Boundary

- Professional approval is always human.
- The platform may validate completeness.
- The platform shall not determine professional acceptability.
- Only the qualified guide may approve an Activity Design.

---

## 9. AI Boundary (Future Capabilities)

### AI May

- analyse
- compare
- estimate
- recommend
- summarise
- explain
- visualise

### AI Shall Never

- approve Activity Design
- approve Journey
- approve operational safety
- replace professional responsibility

AI remains decision support only.

---

## 10. Architectural Implications

This principle applies unconditionally to:

- Business Engines
- Reference Domain
- Platform Services
- Platform Views
- future AI capabilities

All future architecture decisions must respect this boundary.

---

## 11. Acceptable and Not Acceptable Examples

### Acceptable

- Platform highlights that a trail exceeds the selected SAC grading; the guide decides.
- Platform estimates transport costs; the guide decides.
- Platform recommends accommodation alternatives; the guide decides.

### Not Acceptable

- "The platform has approved this activity."
- "The safest route has been selected."
- "This activity is professionally safe."
- "The platform has determined this activity should be operated."

---

## 12. Consequences

The following consequences are permanent:

- The platform remains a professional decision support platform.
- Knowledge support and workflow support can be digitized.
- Professional responsibility is never digitized.
- This boundary is permanent.

---

## 13. Alternatives Considered

### Automatic Approval via Deterministic Rules

**Decision:** Rejected.

**Reason:** Professional judgement cannot be delegated to or reduced to deterministic logic. Certified guide responsibility is non-delegable and cannot be substituted by algorithmic evaluation, regardless of the completeness or precision of the rules applied.

---

## 14. Relationship to Architecture Documents

ADR-002 aligns with the platform architecture and governs how professional responsibility boundaries are interpreted across all domains and capabilities.

This decision aligns with:

- **ADR-001 Architecture Classification**
- **PDR-011 Platform Architecture**
- **PDR-012 Reference Domain Architecture**
- **Activity Design Discovery**

ADR-002 does not replace those decisions. It establishes the permanent human responsibility boundary that all future architectural decisions must respect.

---

## 15. Constraints

This ADR is architecture governance only.

- documentation only
- no implementation
- no engineering specification
- no UI specification

---

## 16. Architectural Summary

> **AlpenTind is a professional decision support platform. It provides knowledge, visibility, and decision support. It never assumes professional responsibility. Professional responsibility always belongs to the certified guide.**

The boundary is explicit:

- the platform supports; it does not decide
- the guide assesses, approves, and is responsible
- no software component may assume professional responsibility
- AI capabilities remain decision support only
- this boundary is permanent and applies across the entire architecture

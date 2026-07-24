# PDR-012 – Reference Domain Architecture

**Status:** Approved

---

## 1. Executive Summary

Reference Domain is AlpenTind's trusted operational knowledge base.

Reference Domain holds the professional reference knowledge that Business Engines consume when designing and executing Activity.

Reference Domain provides trusted knowledge.  
Reference Domain does not perform operational work.

---

## 2. Purpose

Reference Domain exists to maintain trusted professional reference knowledge on behalf of AlpenTind.

Its responsibility is to ensure that Business Engines have access to accurate, reusable Reference Objects when performing operational work.

Reference Domain does not decide how Reference Objects are used.  
Business Engines make those decisions.

---

## 3. Responsibilities

### Reference Domain is responsible for

- Trusted reference knowledge
- Reusable Reference Objects
- Professional decision support
- Maintaining AlpenTind's operational knowledge base

### Reference Domain is NOT responsible for

- Journeys
- Activity Design execution
- Planning workflows
- Bookings
- Customers
- Business processes
- Operational work

Reference Domain provides trusted knowledge.  
Business Engines perform operational work.

---

## 4. Architectural Principles

### 4.1 Knowledge Principle

Reference Domain contains only information AlpenTind actively trusts and maintains.

Knowledge that is uncertain, unverified, or operationally irrelevant is not a Reference Object.

Reference Objects represent durable, trusted operational facts.

### 4.2 Reference Principle

Business Engines consume Reference Objects.

Reference Objects are not duplicated across engines.

A single authoritative Reference Object is used across all Business Engines that require it.

### 4.3 Curation Principle

Reference information has two origins:

**Curated Reference** — maintained by AlpenTind

> Examples: Area, Accommodation, Transport Nodes

Curated Reference Objects are actively maintained by AlpenTind.  
AlpenTind is responsible for their accuracy and completeness.

**External Reference** — consumed from trusted external sources

> Examples: Trails, official trail grading, geographic information

External Reference Objects originate from trusted external sources.  
AlpenTind consumes them without manual maintenance.

Rule:
- External is consumed
- Curated is maintained

### 4.4 Snapshot Principle

Business Objects reference Reference Objects during Activity Design.

Historical Journeys are protected via snapshots.

Reference changes must not mutate historical Journeys.

When a Reference Object changes, active and future Activity Design may be affected.  
Completed historical Journeys are not affected.

---

## 5. Architecture Flow

```text
Reference Domain
    ↓
Reference Objects
    ↓
Activity Design
    ↓
Journey
    ↓
Execution
```

Business Engines consume Reference Objects.  
Business Engines never own Reference Objects.

---

## 6. Reference Object Categories

Reference Objects belong to one of two categories:

| Category | Description |
|---|---|
| **Curated Reference** | Maintained by AlpenTind |
| **External Reference** | Consumed from trusted external sources |

Both categories provide trusted professional knowledge.  
Neither category performs operational work.

---

## 7. Core Reference Objects

### 7.1 Area

Area documents AlpenTind's operational geography.

- Business-defined, not administrative boundary-driven
- Defines where AlpenTind operates
- May expand or contract over time
- Contains multiple routes
- Primary search and exploration boundary for Activity Design

Area is the starting point for Activity Design.  
Guides explore the Area before selecting routes, accommodations, and infrastructure.

### 7.2 Accommodation

Accommodation documents mountain accommodations actively maintained by AlpenTind.

- Only register-listed accommodations are available for Activity Design
- Removal affects future Activity Design availability only
- Historical Journeys remain unaffected by removal
- Supports professional decision quality

AlpenTind curates the Accommodation register.  
Only accommodations AlpenTind trusts appear in Activity Design.

### 7.3 Trail

Trail originates from trusted external sources.

Trail is not manually maintained by AlpenTind.

Trail provides trusted professional context for Activity Design.

Examples of trail information:
- SAC grading
- Distance
- Elevation gain
- Terrain
- Exposure
- Estimated duration
- Telephone coverage

Activity Design consumes trail information.  
Activity Design does not own it.

### 7.4 Transport Node

Transport Node is AlpenTind's transportation infrastructure Reference Object.

Examples:
- Train stations
- Bus stops
- Parking
- Gondolas

Transport Nodes provide logistical decision support for Activity Design.

---

## 8. Relationship to Business Engines

Business Engines consume Reference Objects to perform operational work.

Reference Domain is the trusted source.  
Business Engines are the consumers.

### Ownership Rule

Business Engines never own Reference Objects.

If a Business Engine requires reference knowledge, it consumes it from Reference Domain.  
It does not create or maintain a local copy.

### Activity Design

Activity Design is the primary consumer of Reference Objects.

Activity Design consumes:
- Area — to establish operational geography
- Accommodation — to select appropriate overnight options
- Trail — to understand route characteristics
- Transport Node — to plan logistics

The professional uses Reference Objects to make operational decisions.  
Reference Domain supports that judgement.  
Reference Domain does not make decisions.

---

## 9. Discovery Findings

The following findings are preserved from the Activity Design Discovery:

- Activity Design starts with geography
- Guides explore before deciding
- Activity Design supports professional judgement
- Professional judgement belongs to the certified guide
- Decisions balance safety, logistics, economy, and experience
- Reference Domain is trusted operational knowledge
- Accommodation is curated by AlpenTind
- Trails are externally sourced
- Area is business-defined operational geography

These findings confirm the foundational role of Reference Domain in supporting professional decision-making.

---

## 10. Non-Goals

Reference Domain architecture does not define:

- Database schema
- API contracts
- Import mechanisms
- External provider integrations
- Map implementation
- Filtering behaviour
- UI design
- Journey engine design
- Planning engine design
- Activity Builder implementation
- Follow-up service

These concerns belong to implementation and to the Business Engines that consume Reference Objects.

---

## 11. Architectural Boundaries

| Concern | Owner |
|---|---|
| Trusted reference knowledge | Reference Domain |
| Reusable Reference Objects | Reference Domain |
| Professional decision support | Reference Domain |
| Operational knowledge base | Reference Domain |
| Activity Design execution | Business Engine |
| Journey management | Business Engine |
| Planning workflows | Business Engine |
| Bookings | Business Engine |
| Customer management | Business Engine |

Reference Domain provides.  
Business Engines consume.

---

## 12. Relationship to Existing Documents

| Reference | Title |
|---|---|
| **ADR-001** | Architecture Classification |
| **PDR-011** | Platform Architecture |
| **Activity Design Discovery** | Discovery findings preserved in this document |

PDR-012 defines the Reference Domain as the trusted knowledge foundation for Activity Design and future Business Engines.

PDR-013 (Activity Design Architecture) will build upon this Reference Domain definition.

---

## 13. Architecture Summary

> **Reference Domain provides trusted knowledge.  
> Business Engines consume it.**

| Concept | Responsibility |
|---|---|
| **Curated Reference** | Maintained by AlpenTind |
| **External Reference** | Consumed from trusted external sources |
| **Area** | Operational geography boundary |
| **Accommodation** | Curated overnight options |
| **Trail** | Externally sourced route information |
| **Transport Node** | Logistical infrastructure reference |

Reference Domain does not execute operational work.  
Reference Domain does not own journeys.  
Reference Domain does not manage customers.

Reference Domain maintains the trusted operational knowledge that makes professional Activity Design possible.

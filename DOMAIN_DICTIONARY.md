# Domain Dictionary – AlpenTind Platform

This is the official terminology for AlpenTind Platform.

All code must use these terms consistently.

Do not invent alternative names or abbreviations.

---

## Core Concepts

### Route
A geographical path or itinerary. Routes can be reused across multiple products.

Example: Tour du Mont Blanc route, Walker's Haute Route.

**Fields:**
- name: str
- description: str
- distance_km: float
- elevation_gain_m: int
- difficulty_level: str (e.g., "moderate", "challenging")
- estimated_days: int

---

### Stage
One day or segment within a Route.

A Route consists of multiple Stages.

**Fields:**
- route_id: int (FK)
- stage_number: int
- name: str
- description: str
- distance_km: float
- elevation_gain_m: int
- elevation_loss_m: int
- estimated_hours: float

---

### StagePoint
A waypoint or location within a Stage.

Examples: Starting point, refuge, water point, viewpoint, finishing point.

**Fields:**
- stage_id: int (FK)
- point_number: int
- name: str
- latitude: float
- longitude: float
- elevation_m: int
- type: str (e.g., "start", "refuge", "water", "viewpoint", "finish")
- description: str

---

### Refuge
A mountain shelter or lodging facility along a Route.

A Refuge is a specific type of Lodging.

**Fields:**
- name: str
- location: str
- latitude: float
- longitude: float
- elevation_m: int
- capacity: int
- contact_email: str
- contact_phone: str
- website: str

---

### Lodging
Accommodation or sleeping facility.

Includes refuges, hotels, guesthouses, mountain huts.

**Fields:**
- name: str
- type: str (e.g., "refuge", "hotel", "guesthouse", "hut")
- location: str
- latitude: float
- longitude: float
- elevation_m: int
- capacity: int
- contact_email: str
- contact_phone: str
- website: str

---

### Product
A commercial offering or expedition package.

Example: "Tour du Mont Blanc 10-day expedition", "Walker's Haute Route 12-day trek".

A Product is based on a Route but may include additional services.

**Fields:**
- name: str
- description: str
- route_id: int (FK)
- duration_days: int
- group_size_min: int
- group_size_max: int
- season: str (e.g., "summer", "fall")
- year: int
- status: str (e.g., "draft", "published", "cancelled")

---

### Departure
A scheduled instance of a Product.

Example: "Tour du Mont Blanc Summer 2026 - Departure July 15"

**Fields:**
- product_id: int (FK)
- departure_date: date
- return_date: date
- status: str (e.g., "open", "full", "cancelled")
- available_spots: int
- guide_lead_id: int (FK to Guide)

---

### Booking
A customer's reservation for a Departure.

**Fields:**
- departure_id: int (FK)
- customer_id: int (FK)
- booking_date: date
- status: str (e.g., "pending", "confirmed", "cancelled")
- price_total: decimal
- price_paid: decimal
- notes: str

---

### Customer
A person or organization booking a product.

**Fields:**
- name: str
- email: str
- phone: str
- address: str
- country: str
- experience_level: str (e.g., "beginner", "intermediate", "expert")
- emergency_contact: str
- emergency_phone: str

---

### Guide
A professional mountain guide or expedition leader.

**Fields:**
- name: str
- email: str
- phone: str
- certifications: str (e.g., "IFMGA", "UIAGM")
- languages: str (e.g., "en,fr,it,de")
- experience_years: int
- bio: str
- active: bool

---

### Price
Pricing information for a Product or service.

**Fields:**
- product_id: int (FK)
- currency: str (e.g., "CHF", "EUR", "USD")
- base_price: decimal
- group_size_min: int
- group_size_max: int
- markup_percentage: float (optional)
- notes: str

---

### Facility
An infrastructure or service resource.

Examples: Tents, climbing gear, cooking equipment, transportation.

**Fields:**
- name: str
- type: str (e.g., "tent", "gear", "equipment", "transport")
- quantity: int
- status: str (e.g., "available", "in_use", "maintenance")
- notes: str

---

### GuideNote
Notes or observations by a guide about a Route, Stage, or Lodging.

**Fields:**
- guide_id: int (FK)
- entity_type: str (e.g., "route", "stage", "lodging")
- entity_id: int
- note_date: date
- content: str (the note itself)
- tags: str (e.g., "weather", "safety", "difficulty", "conditions")

---

## Rules

1. **Never invent names.** Use only the terms defined here.
2. **Use singular names.** `Route`, not `Routes`. `Customer`, not `Customers`.
3. **Be consistent.** Every mention of a concept must use the same term.
4. **Extend when needed.** If new concepts emerge, propose an addition to this dictionary.
5. **Document sources.** Every record should include `source`, `verification_status`, and `verified_at`.

---

## Last Updated

2026-07-13 by ChatGPT (Chief Software Architect)

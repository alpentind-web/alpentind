# ESR-001 – Arbetsdag

## Status

Merged

---

## Objective

Arbetsdag (My Work Day) is the primary dashboard for guides and staff working in the AlpenTind platform. It provides an at-a-glance operational view of the current day: what requires attention, which experiences are running, ongoing customer dialogues, and follow-up items. The goal is to give the logged-in user a prioritised starting point for the day without needing to navigate between multiple sections.

---

## Business Context

AlpenTind operates adventure expeditions with guides responsible for multiple departures, customers, and logistics simultaneously. Without a centralised view, important tasks are missed and response times suffer. Arbetsdag was built to solve this by surfacing the highest-priority items automatically. It is the first page the user sees after login and serves as the operational heartbeat of the platform.

---

## User Story

As a guide or staff member, I want to open the platform and immediately see what needs my attention today — overdue payments, unconfirmed accommodation, unread customer messages — so that I can act on the most important items first without manually checking each section.

---

## Operational Flow

1. User authenticates via the login page (`index.html`).
2. On success, `localStorage` is set and the user is redirected to `arbetsdag.html`.
3. On page load, `renderDashboard()` is called, which renders:
   - Sidebar with navigation and user profile
   - Header with greeting, date, and daily statistics
   - Info Banner with quick day summary
   - Attention section (items requiring action)
   - Today's experiences (active departures)
   - Ongoing dialogues (customer messages)
   - Follow-up section (pending tasks)
   - Quick actions (shortcuts)
4. All data is sourced from `mock-data.js` via the `mockData` object.
5. Feather Icons are activated after each render via `feather.replace()`.

---

## UX Principles

- **Priority first** – the most urgent items appear at the top (Kräver uppmärksamhet).
- **Minimal navigation required** – the dashboard surfaces cross-section data so the user does not need to jump between pages to get an overview.
- **Clear status signalling** – colour-coded badges (danger, warning, success, info) communicate urgency immediately.
- **Concise information density** – each card shows the minimum needed to understand and act, with a single action button where relevant.
- **Accessibility** – ARIA labels, roles, and semantic HTML are used throughout.

---

## UI Specification

**Layout:** Two-column layout. Left sidebar (fixed), right content area (scrollable).

**Header:** Greeting (contextual by time of day), current date, and three stat counters (Uppgifter, Bokningar, Varningar). Search field and notification bell with badge.

**Info Banner:** Horizontal strip below the header. Shows: pending tasks count, new bookings count, days until next departure, weather warning count.

**Content sections (top to bottom):**

| Section | Heading (Swedish) | Layout | ID |
|---|---|---|---|
| Attention | Kräver uppmärksamhet | 3-column grid | `attention-grid` |
| Today's experiences | Dagens upplevelser | 3-column grid | `experiences-grid` |
| Ongoing dialogues | Pågående dialoger | List | `dialogues-list` |
| Follow-up | Att följa upp | 3-column grid | `followup-grid` |
| Quick actions | Snabbåtgärder | Button row | `quick-actions` |

---

## Components

### AttentionCard

Reusable card component used in both the Attention section and the Follow-up section.

**Props:**

| Prop | Type | Description |
|---|---|---|
| `id` | string | Unique identifier |
| `title` | string | Primary heading |
| `subtitle` | string | Secondary heading |
| `status` | string | Status key (maps to badge label and colour) |
| `description` | string | Body text |
| `action` | string | Button label (optional) |
| `badge` | string | Badge label shown in header (optional) |
| `priority` | string | `high`, `medium`, or `low` |

**Priority to card variant mapping:**

| Priority | CSS class |
|---|---|
| `high` | `card-danger` |
| `medium` | `card-warning` |
| `low` | _(none)_ |

**Status to badge mapping:**

| Status | Label | Badge colour |
|---|---|---|
| `waiting_recommendation` | Väntar på rekommendation | warning |
| `pending` | Väntande | warning |
| `overdue` | Förfallen | danger |
| `active` | Aktiv | success |
| `unread` | Oläst | primary |
| `read` | Läst | info |

### Dashboard sections

- **Sidebar** – `renderSidebar()` – navigation menu, logo, user profile, logout button.
- **Header** – `renderHeader()` – greeting, date, stat counters, search, notifications.
- **Info Banner** – `renderInfoBanner()` – compact strip with today's summary.
- **Attention section** – `renderAttentionSection()` – maps `mockData.attentionItems` to `createAttentionCard()`.
- **Today's experiences** – `renderTodaysExperiences()` – maps `mockData.todaysExperiences` to plain cards.
- **Ongoing dialogues** – `renderOngoingDialogues()` – maps `mockData.ongoingDialogues` to message items with avatar, timestamp, and reply button.
- **Follow-up section** – `renderFollowUpSection()` – maps `mockData.followUpItems` to `createAttentionCard()`.

### Quick Actions

Four shortcut buttons rendered by `renderQuickActions()`:

| Label | Icon |
|---|---|
| Ny dialog | `message-circle` |
| Ny upplevelse | `compass` |
| Ny person | `user-plus` |
| Ny guide | `user-check` |

---

## Mock Data

All data is defined in `preview/js/mock-data.js` and accessed through the `mockData` object.

**attentionItems** (Kräver uppmärksamhet):

| ID | Title | Subtitle | Status | Priority |
|---|---|---|---|---|
| ATT-001 | Anna Andersson | Tour du Mont Blanc | waiting_recommendation | high |
| ATT-002 | Refuge Bonatti | Tour du Mont Blanc – boende ej bekräftat | pending | high |
| ATT-003 | Martin Nilsson | Sarek Sommar – betalning förfallen | overdue | medium |

**todaysExperiences** (Dagens upplevelser):

| ID | Title | Guide | Description |
|---|---|---|---|
| EXP-001 | Tour du Mont Blanc | Linda Svensson | 8 deltagare · Dag 3 av 12 · Chamonix → Refuge Bonatti |
| EXP-002 | Klätterkurs Klippa | Johan Svensson | 6 deltagare · Avgår idag 09:00 · Samling vid klätterväggen |

**ongoingDialogues** (Pågående dialoger):

| ID | Customer | Product | Status | Timestamp |
|---|---|---|---|---|
| DLG-001 | Anna Andersson | Tour du Mont Blanc | unread | 2h sedan |
| DLG-002 | Peter Nilsson | Sarek Sommar | unread | 5h sedan |
| DLG-003 | ACME AB | Klätterkurs Klippa | read | 1 dag sedan |

**followUpItems** (Att följa upp):

| ID | Title | Subtitle | Status | Priority |
|---|---|---|---|---|
| FU-001 | Ring hotell | Refuge Bonatti – Tour du Mont Blanc | pending | high |
| FU-002 | Skicka deltagarbrev | Sarek Sommar – avgång 3 aug | pending | medium |
| FU-003 | Betalningspåminnelse | Martin Nilsson – 32 950 SEK | overdue | high |

**dashboardStats** (Header counters):

| Key | Value |
|---|---|
| tasks | 2 (pending tasks) |
| bookings | 2 |
| warnings | 2 |
| nextDeparture | 2027-07-15 |

---

## Technical Constraints

- Static HTML/CSS/JS preview only. No backend, no API.
- All data is hardcoded in `mock-data.js`.
- Feather Icons loaded via CDN (`unpkg.com/feather-icons`).
- Authentication state stored in `localStorage` (`alpentind-user-logged-in`).
- No build step. Files are served directly by opening `arbetsdag.html` in a browser.

---

## Out of Scope

- Real authentication
- API integration
- Persistent data
- Navigation to placeholder pages (Avgångar, Kunder, Guider, etc.)

---

## Definition of Done

- `preview/arbetsdag.html` renders without errors.
- All five content sections are displayed.
- AttentionCard component renders with correct priority styling and status badges.
- Quick actions render with correct icons.
- Info Banner reflects `dashboardStats` values.
- Feather Icons activate correctly on all rendered sections.
- Sidebar navigation highlights the active page.
- Login guard redirects unauthenticated users to `index.html`.

---

## Acceptance Criteria

- Dashboard loads and displays all sections on DOMContentLoaded.
- AttentionCard items with `priority: high` render with `card-danger` class.
- AttentionCard items with `priority: medium` render with `card-warning` class.
- Status badges display correct label and colour per the status mapping.
- Info Banner shows correct counts from `dashboardStats`.
- Quick action buttons render for all four actions.
- Unauthenticated access redirects to `index.html`.

---

## Commit Message

CORE-006

Establish Engineering Specification framework

---

## Architecture Notes

Arbetsdag is a static preview page. The rendering architecture is function-based vanilla JavaScript with no framework. Each section has a dedicated render function called from `renderDashboard()`. The `mockData` object is the single source of truth for all displayed data.

The `createAttentionCard()` function is the only reusable component abstraction. It is used by both `renderAttentionSection()` and `renderFollowUpSection()`.

CSS classes follow the design system defined in `preview/css/design-system.css` and `preview/css/components.css`.

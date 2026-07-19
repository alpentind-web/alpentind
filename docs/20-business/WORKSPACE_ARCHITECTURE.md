# Workspace Architecture

**Version:** 1.1  
**Status:** Approved

## Purpose

The current Workspace Architecture document no longer reflects the implemented product.

During implementation of:
- Översikt
- Arbetsdag
- Dialog
- Resa

the architecture evolved.

This document is the authoritative description of the current architecture.

---

## Workspace Definition

A Workspace is not a page.

A Workspace is an operational environment designed to support one specific mindset.

Each Workspace exists to answer one primary operational question.

---

## Implemented Workspaces

### 1. Översikt

**Primary Question:**  
"How does the business look right now?"

**Purpose:**
- Orientation
- Situational awareness
- Planning

### 2. Arbetsdag

**Primary Question:**  
"What should I do now?"

**Purpose:**
- Operational execution
- Prioritisation
- Daily work

### 3. Dialog

**Primary Question:**  
"What do I need to understand?"

**Purpose:**
- Understanding
- Communication
- Decision support

### 4. Resa

**Primary Question:**  
"Is this trip under control?"

**Purpose:**
- Trip coordination
- Operational readiness
- Execution

---

## Workspace Pattern

Every Workspace follows the same operational flow (conceptual layers):

```
Situation
    ↓
Work
    ↓
Context
    ↓
Actions
```

These are conceptual layers.

Individual Workspaces may implement them differently.

---

## Workspace Layers

### Layer 1: Situation

**Purpose:**  
Provides immediate operational understanding.

**Characteristics:**
- First information displayed
- Answers "What's the current state?"
- Sets context for all subsequent information

**Examples:**
- Lägesbild (operational overview)
- Readiness indicators
- Operational status
- Summary metrics

**Implementation:**
- Clean visual hierarchy
- Scannable in seconds
- Status indicators (green/yellow/red)
- No detailed information at this layer

### Layer 2: Work

**Purpose:**  
Shows only work requiring attention.

**Characteristics:**
- Actionable items only
- Never display completed work unless it supports the current task
- Prioritised by urgency
- Clear ownership or assignment

**Examples:**
- Work Queue
- Attention Participants
- Outstanding Dialogues
- Pending Tasks

**Implementation:**
- Card-based display
- Priority indicators
- Status tracking
- Quick action buttons

### Layer 3: Context

**Purpose:**  
Provides supporting information required to complete work identified in Layer 2.

**Characteristics:**
- Supports decision-making
- Only relevant to current Workspace
- Accessible but not intrusive
- Reduces need to open additional pages

**Examples:**
- Documents
- Milstolpar and operational planning information
- History or audit trail
- Participant details
- Related items

**Implementation:**
- Secondary prominence in layout
- Grouped by type or relevance
- Quick access, not full management
- No complex interactions

### Layer 4: Actions

**Purpose:**  
Provides contextual actions relevant to the current Workspace.

**Characteristics:**
- Always contextual (never generic toolbars)
- Limited to relevant actions only
- Clear purpose and outcome
- Supports execution of work

**Examples:**
- Create dialogue
- Add participant
- Register payment
- Upload document
- Complete task

**Implementation:**
- Button or action grid
- Icons + labels
- Brief description of action
- No dropdown complexity

---

## Workspace Principles

### Information Architecture

1. **Situation before Work**
   - Provide context before showing tasks
   - Help team members understand the state before asking for action

2. **Work before Context**
   - Show actionable items before supporting information
   - Context supports work, not the reverse

3. **Context supports decisions**
   - Only include context that enables action
   - Remove information that is "nice to have"

### Operational Design

4. **Actions are contextual**
   - Never display generic toolbars
   - Every action must be relevant to the current Workspace
   - Avoid feature bloat through action lists

5. **Show only actionable information**
   - Every block, card, or item must have purpose
   - No information is displayed "because it exists"
   - Remove metrics that don't support decisions

6. **Reduce cognitive load**
   - Fewer items = clearer priorities
   - Fewer interactions = faster decisions
   - Clean layout = calm operation

### Operational Perspective

7. **Every Workspace answers one primary question**
   - The primary question guides all design decisions
   - Secondary questions are answered by subsequent layers
   - Team members always know the purpose of the Workspace

8. **Every Workspace should be understandable within five seconds**
   - First impression must communicate the state
   - No learning curve for regulars
   - New team members understand the purpose immediately

9. **Reuse Workspace Blocks**
   - Consistent components across Workspaces
   - No duplication of implementation
   - Maintenance burden reduced

10. **Prefer calm over information density**
    - Information density ≠ utility
    - Visual noise reduces decision quality
    - Simplicity enables speed

---

## Workspace Consistency

### Operational Language

All Workspaces share the same operational language:

- **Situation** = How things are
- **Work** = What needs attention
- **Context** = Information to support action
- **Actions** = How to execute

### Layout Flexibility

The layout may differ between Workspaces.

The operational pattern remains consistent.

### Learning & Adoption

Team members should never need to relearn how a Workspace works.

Once they understand the pattern in one Workspace, they understand it in all.

### Navigation

Workspaces are entered from context:

- **Översikt** → Select area of business
- **Arbetsdag** → Start of shift
- **Dialog** → From a conversation or participant
- **Resa** → From trip list or participant context

---

## Design Patterns

### Status Indicators

All Workspaces use consistent status coding:

- 🟢 Green = Ready / Complete / On track
- 🟡 Yellow = At risk / Attention required / Pending
- 🔴 Red = Critical / Blocked / Overdue

### Information Hierarchy

Consistent visual hierarchy across all Workspaces:

1. Primary heading (Workspace title)
2. Situation layer (overview)
3. Work layer (actions needed)
4. Context layer (supporting info)
5. Action layer (next steps)

### Component Reuse

Reusable components across Workspaces:

- Block wrapper (situation, work, context)
- Card component (for items)
- Section header
- Status badges
- Button styles
- Icon system

---

## Architecture Benefits

### For Operational Roles

- **Consistency** – Same mental model across Workspaces
- **Speed** – No learning curve between Workspaces
- **Focus** – Each Workspace has one purpose
- **Clarity** – Always know what to do next

### For Developers

- **Reusability** – Shared components reduce code
- **Maintainability** – Changes propagate across Workspaces
- **Predictability** – Consistent patterns = fewer bugs
- **Scalability** – New Workspaces follow proven pattern

### For Product

- **Coherence** – Unified operational experience
- **Intentionality** – Each element serves a purpose
- **Extensibility** – New Workspaces can follow the same model
- **Quality** – Focused design improves daily

---

## Evolution & Future

This architecture has proven effective for the implemented Workspaces (Översikt, Arbetsdag, Dialog, Resa).

Future Workspaces should follow the same Workspace Pattern (Situation → Work → Context → Actions).

The model is extensible but not prescriptive.

Workspaces may implement layers differently, but the conceptual order remains constant.

---

## Glossary

**Workspace** – An operational environment designed to support one specific mindset and answer one primary question.

**Workspace Block** – A reusable container for related information or actions (e.g., card, section, panel).

**Workspace Layer** – A conceptual level in the information hierarchy (Situation, Work, Context, Actions).

**Situation** – The current operational state (overview, status, readiness).

**Work** – Tasks or items requiring attention (actionable only).

**Context** – Supporting information needed to complete work (documents, history, details).

**Actions** – Contextual commands available to the active role (never generic toolbars).

**Operational Mindset** – The psychological frame or focus a team member adopts in a Workspace (e.g., "daily execution" in Arbetsdag, "trip coordination" in Resa).

**Primary Question** – The single operational question each Workspace answers.

# Workspace Design Standard

**Standard:** WS-002  
**Status:** Approved

## Purpose

The purpose of this document is to establish design consistency across all Workspaces on the AlpenTind Platform.

During implementation of Översikt, Arbetsdag, Dialog, and Resa, a consistent operational design language emerged.

This document captures those principles and makes them authoritative for future implementations.

This document is normative.

Future Workspace implementations shall follow this standard unless explicitly approved otherwise.

---

## Scope

This document defines the operational design language used across all Workspaces.

It applies to all current and future Workspace implementations on the AlpenTind Platform.

---

## Design Philosophy

### The Platform Is Built Around Work, Not Pages

AlpenTind Platform is not designed around pages.

It is designed around work.

A Workspace exists to help a professional:
- Understand a situation
- Perform work
- Make decisions

### The Objective Is Operational Clarity

Not feature density.

Not information completeness.

Not UI novelty.

The objective is clarity and speed.

---

## Core Principle

### Every Workspace Shall Answer One Primary Operational Question

Examples:

**Översikt**  
"How does the business look right now?"

**Arbetsdag**  
"What should I do now?"

**Dialog**  
"What do I need to understand?"

**Resa**  
"Is this trip under control?"

### The Design Consequence

Everything shown inside the Workspace shall support answering that question.

Nothing else should appear.

---

## Operational Flow

### The Standard Mental Progression

Every Workspace follows the same mental progression:

```
Situation
    ↓
Work
    ↓
Context
    ↓
Actions
```

### This Order Should Be Preserved

Unless there is a compelling operational reason not to.

The order reflects how professionals think:

1. **Understand the situation**
2. **Identify work that needs to be done**
3. **Gather information to complete the work**
4. **Execute the work**

---

## Workspace Blocks

### What Is a Workspace Block?

A Workspace Block is a reusable container for related information or actions.

Examples:
- Card
- Section
- Panel
- Grid
- List

### Reuse Over Creation

The same Workspace Block component may appear in multiple Workspaces.

Examples:
- Work Queue (Arbetsdag, Resa)
- Dialogue List (Dialog, Resa)
- Timeline (multiple Workspaces)
- Documents (multiple Workspaces)
- Quick Actions (all Workspaces)

Reuse is preferred over creating Workspace-specific implementations.

### Benefits of Reuse

- **Consistency** – Users recognize the component
- **Maintenance** – Changes propagate across Workspaces
- **Development** – Faster implementation
- **Support** – Fewer components to train on

---

## The Four Layers

### Layer 1: Situation

**Purpose**

Immediate orientation and understanding.

The user should understand the current situation within five seconds.

**Typical Content**

- Operational overview (Lägesbild)
- Readiness indicators
- Health status
- Summary metrics
- Current state

**Design Principles**

- Clean visual hierarchy
- Scannable in seconds
- Status indicators (green/yellow/red)
- No detailed information at this layer
- Visual focus on what matters now

**Examples in Implemented Workspaces**

- **Resa:** Resans lägesbild (6 readiness indicators)
- **Arbetsdag:** Day overview with key metrics
- **Dialog:** Conversation summary

### Layer 2: Work

**Purpose**

Present work requiring attention.

Only actionable work shall be displayed.

Completed work should normally be hidden.

**Typical Content**

- Work Queue
- Attention Items
- Pending Tasks
- Waiting Conversations
- Outstanding Issues

**Design Principles**

- Card-based display
- Priority indicators
- Status tracking
- Quick action buttons
- Clear ownership or assignment
- Readable at a glance

**Important: Actionable Only**

Never display:
- Completed work (unless it supports the current task)
- Historical information
- Informational items
- FYI messages

The Work layer is for action, not information.

**Examples in Implemented Workspaces**

- **Resa:** Resans arbetskö (work items requiring attention)
- **Arbetsdag:** Day's work queue
- **Dialog:** Pending conversations

### Layer 3: Context

**Purpose**

Provide supporting information required to complete work identified in Layer 2.

Context supports decisions.

Context does not compete with work.

**Typical Content**

- Documents
- Participants
- Timeline
- History or audit trail
- Related information
- Supporting details

**Design Principles**

- Secondary prominence in layout
- Grouped by type or relevance
- Quick access, not full management
- No complex interactions
- Clearly supports work

**The Key Relationship**

Every item in Context should directly support completing work in Layer 2.

If it doesn't support work, it doesn't belong here.

**Examples in Implemented Workspaces**

- **Resa:** Dialoger (supporting conversations), Dokument (supporting documents)
- **Dialog:** Participant details, conversation history
- **Arbetsdag:** Supporting documents and resources

### Layer 4: Actions

**Purpose**

Provide contextual actions relevant to the current Workspace.

Actions should be directly related to the current situation and work.

**Typical Actions**

- Create Dialogue
- Upload Document
- Register Payment
- Add Participant
- Complete Task
- Confirm Status

**Design Principles**

- Always contextual (never generic toolbars)
- Limited to relevant actions only
- Clear purpose and outcome
- Supports execution of work
- Button or action grid
- Icons + labels
- Brief description of action

**The Critical Distinction**

Contextual ≠ All Possible Actions

Display only actions that are relevant to:
- The current Workspace
- The current situation
- The work requiring attention

Avoid generic toolbars that show all possible actions.

**Examples in Implemented Workspaces**

- **Resa:** Snabbåtgärder (contextual actions for trip management)
- **Arbetsdag:** Quick actions for daily work
- **Dialog:** Reply, forward, mark done

---

## Information Hierarchy

### The Hierarchy Is Fixed

Every Workspace should prioritize information in this order:

1. **Understanding** (Situation)
2. **Work** (actionable items)
3. **Context** (supporting information)
4. **Actions** (next steps)

### Why This Order?

- Users need to understand the situation before they can identify work
- Work is more important than context
- Context supports work, not the reverse
- Actions are the outcome of understanding and work

### The Rule

Never reverse this hierarchy.

If you find yourself wanting to prioritize context or actions before work, the Workspace design needs to be reconsidered.

---

## Visual Principles

### Prefer Calm Over Density

Information density does not equal utility.

More information is not better.

Clearer information is better.

### Reduce Cognitive Load

- Fewer items = clearer priorities
- Fewer interactions = faster decisions
- Clean layout = calm operation

### Whitespace Is Functional

- Whitespace separates concepts
- Whitespace enables scanning
- Whitespace improves reading

### Avoid Unnecessary Colour

- Use colour purposefully
- Status indicators: green/yellow/red
- Avoid rainbow aesthetics
- Avoid decorative colours

### Avoid Decorative Statistics

- No KPI walls
- No large metrics displayed for visual impact
- No "nice to have" numbers
- Every number must support a decision

### Show Only What Justifies Itself

Every visible element should answer:

"Why is this element here?"

If you can't answer that question, remove the element.

---

## Operational Principles

### Only Display Information That Supports Decisions

Every piece of information displayed must support the user in making a decision or taking an action.

Informational items are not actionable.

Actionable items are informational.

This may seem like a paradox, but it's not:

Information without action is noise.

Action without information is reckless.

### Every Card Should Answer "Why Am I Seeing This?"

For items in the Work layer:

- Why is this work item shown?
- Why should I prioritize it?
- Why might I ignore it?

The card should answer these questions implicitly through:
- Priority indicators
- Status badges
- Reason descriptions
- Related context

### Every Section Should Answer "What Question Does This Solve?"

For sections of the Workspace:

- What operational question does this section answer?
- What decision does this section support?
- What action does this section enable?

If you can't answer these questions, the section doesn't belong.

### Every Workspace Should Feel Predictable

- Users should recognize the operational structure immediately
- Regular users should know where to look for information
- New users should understand the logic
- The mental model should be consistent with other Workspaces

---

## Workspace Blocks (Reusable Components)

### The Philosophy

Workspace Blocks are the vocabulary of AlpenTind Platform.

The same block used consistently across Workspaces teaches users the platform.

Creating new blocks for each Workspace teaches fragmentation.

### Common Workspace Blocks

**Status Indicators**
- Green/Yellow/Red circles
- Used in: Resa (readiness), Arbetsdag (status)

**Work Queue Card**
- Title, description, priority, status, action button
- Used in: Resa (arbetskö), Arbetsdag (daily queue)

**Conversation Card**
- Participant, subject, last activity, waiting for, open button
- Used in: Resa (dialoger), Dialog (workspace)

**Document Card**
- Type, status, updated, download/view button
- Used in: Resa (dokument), multiple Workspaces

**Action Button Grid**
- Icon, label, description, action
- Used in: Resa (snabbåtgärder), all Workspaces

**Participant Card**
- Name, status, reason for attention, action button
- Used in: Resa (attention participants), Arbetsdag (team)

**Timeline Card**
- Event, timestamp, status
- Used in: Resa (milestones), Dialog (history)

### When to Create a New Block

A new Workspace Block should be created only when:

1. The purpose cannot be met by existing blocks
2. The block will be reused across at least two Workspaces
3. The block represents a distinct operational concept

If a block is unique to one Workspace, it's not a Workspace Block—it's a Workspace-specific component.

---

## Design Principles (Summary)

### 1. Answer One Question

Every Workspace answers one primary operational question.

### 2. Follow the Operational Flow

Situation → Work → Context → Actions

### 3. Prioritize Understanding Over Information

Users should understand the situation first.

### 4. Show Only Actionable Work

Completed work is hidden by default.

### 5. Context Supports Work

Context is secondary to work.

### 6. Actions Are Contextual

Never display generic toolbars.

### 7. Reduce Cognitive Load

Fewer items, cleaner layout, faster decisions.

### 8. Reuse Workspace Blocks

Consistency beats novelty.

### 9. Use Calm Design

Visual clarity over visual density.

### 10. Justify Every Element

Every visible item should answer "Why am I here?"

---

## Consistency Across Workspaces

### The User Experience

Users should never need to relearn the platform.

Once they understand the pattern in one Workspace, they understand it in all.

### Shared Vocabulary

All Workspaces use the same operational vocabulary:

- **Situation** = How things are
- **Work** = What needs attention
- **Context** = Information to support action
- **Actions** = How to execute

### Layout Flexibility Within Structure

The layout may differ between Workspaces.

Examples:
- Resa uses panels (vertical)
- Arbetsdag uses a grid
- Dialog uses a two-column layout

But the operational pattern remains consistent:

Situation before Work.

Work before Context.

Context before Actions.

### Navigation Consistency

Workspaces are entered from context:

- **Översikt** → Select area of business → Enter Workspace
- **Arbetsdag** → Start of shift → Enter Workspace
- **Dialog** → From a conversation or participant → Enter Workspace
- **Resa** → From trip list or participant context → Enter Workspace

Users should always know how they entered and how to return.

---

## Anti-Patterns to Avoid

### 1. Dashboard Thinking

Dashboards show everything.

Workspaces show what's relevant.

Avoid displaying all possible information.

### 2. Information Overload

Multiple competing visual priorities confuse users.

Simplify instead.

### 3. Large KPI Walls

KPIs are informational, not actionable.

Avoid large metric displays for visual impact.

### 4. Feature-First Layouts

Don't design around features.

Design around work.

### 5. Generic CRUD Pages

Avoid showing generic create/read/update/delete pages.

Workspaces are operationally focused, not data-focused.

### 6. Empty Tables

Never display empty data tables.

Either populate the table with relevant data or hide it.

### 7. Permanent Notifications

Notifications should be temporary or contextual.

Avoid permanent alerts that compete for attention.

### 8. Competing Visual Priorities

Don't make everything important.

Make one thing most important, one thing secondary, etc.

---

## Review Checklist

Before approving a Workspace, ask:

- ✅ **Does it answer one primary question?**  
  The operational question should be clear and singular.

- ✅ **Can it be understood within five seconds?**  
  A regular user should know the situation without reading documentation.

- ✅ **Is work prioritized over information?**  
  Actionable items come before supporting information.

- ✅ **Is context supporting work?**  
  Every context item relates to work.

- ✅ **Are actions contextual?**  
  Actions are specific to this Workspace, not generic.

- ✅ **Does it reuse existing Workspace Blocks?**  
  New components are only created when necessary.

- ✅ **Does it reduce cognitive load?**  
  Is the layout simpler than the alternatives?

- ✅ **Does it feel like AlpenTind Platform?**  
  Does it follow established patterns and principles?

If you cannot answer "yes" to all questions, the Workspace design should be reconsidered.

---

## Relationship to Other Documents

### Engineering Constitution

Defines how engineering decisions are made.

Provides the philosophical framework for all platform decisions.

### Workspace Architecture (WS-001)

Defines how the platform is structured.

Describes the Workspace Pattern and Workspace Layers.

Maps Workspaces to operational questions.

### Workspace Design Standard (This Document)

Defines how every Workspace is designed.

Prescribes design principles and practices.

Includes review checklist for new Workspaces.

### Engineering Specifications (ESR)

Define individual Workspace implementations.

Each ESR describes a specific Workspace build.

All ESRs must follow the Workspace Design Standard.

---

## Evolution

### This Is Not a Constraint on Innovation

This standard captures current best practices.

If a Workspace requires deviation from this standard, it should be explicitly approved and documented.

### Feedback and Refinement

As new Workspaces are implemented, this standard should evolve.

Patterns that work should be incorporated.

Patterns that don't work should be retired.

### Consistency Within Innovation

Innovation is welcome.

Consistency is required.

New Workspaces can innovate within the framework of this standard.

---

## Glossary

**Workspace**  
An operational environment designed to support one specific mindset and answer one primary question.

**Workspace Block**  
A reusable container for related information or actions (e.g., card, section, panel).

**Workspace Layer**  
A conceptual level in the information hierarchy (Situation, Work, Context, Actions).

**Situation**  
The current operational state (overview, status, readiness).

**Work**  
Tasks or items requiring attention (actionable only).

**Context**  
Supporting information needed to complete work (documents, history, details).

**Actions**  
Contextual commands available to the user (never generic toolbars).

**Operational Mindset**  
The psychological frame or focus the user adopts in a Workspace.

**Primary Question**  
The single operational question each Workspace answers.

**Cognitive Load**  
The mental effort required to understand and operate the Workspace.

**Actionable**  
An item or information that requires or enables a decision or action.

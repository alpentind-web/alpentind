# PDR-004 – Register and Workspace Separation

**Status:** Approved

---

## Purpose

Define the architectural separation between Registers and Workspaces throughout AlpenTind Platform.

This decision establishes a core architectural principle that shall be used across the entire platform.

---

## Problem

As the platform evolved, it became clear that two fundamentally different user activities exist:

1. Finding and organising business objects.
2. Performing operational work.

Attempting to combine both responsibilities in a single screen increases complexity and creates unnecessary cognitive load.

---

## Decision

AlpenTind Platform separates **Registers** from **Workspaces**.

- Registers exist to locate business objects.
- Workspaces exist to perform operational work.

These responsibilities shall remain separate.

---

## Register

A Register is used to:

- Browse
- Search
- Filter
- Categorise
- Locate
- Open

Registers are **discovery tools**.

Registers do **not** contain operational workflows.

---

## Workspace

A Workspace is used to:

- Understand
- Coordinate
- Execute
- Decide
- Follow up

Workspaces are **operational environments**.

Workspaces are **not** registers.

---

## Navigation Pattern

Every operational object follows the same navigation model:

```
Register
    ↓
Category
    ↓
List
    ↓
Workspace
```

This pattern is consistent across the entire platform.

---

## Current Platform Examples

### Contacts Domain (Kontakter)

```
Kontakter (Register)
    ↓
Gäster (Category)
    ↓
Anna Andersson (List item)
    ↓
Person Workspace (Execution)
```

```
Kontakter (Register)
    ↓
Guider (Category)
    ↓
Linda Svensson (List item)
    ↓
Guide Workspace (Execution)
```

```
Kontakter (Register)
    ↓
Samarbetspartners (Category)
    ↓
Refuge Bonatti (List item)
    ↓
Partner Workspace (Execution)
```

```
Kontakter (Register)
    ↓
Övriga kontakter (Category)
    ↓
Workspace (Execution)
```

### Trips Domain (Upplevelser)

```
Upplevelser (Register)
    ↓
Tour du Mont Blanc (List item)
    ↓
Resa Workspace (Execution)
```

---

## Operational Principle

| Registers | Workspaces |
|-----------|------------|
| Optimise **discovery** | Optimise **execution** |
| Different mental model | Different mental model |
| Should stay separate | Should stay separate |

Registers optimise discovery.

Workspaces optimise execution.

They serve different mental models and shall therefore remain separate.

---

## Design Implications

### Registers should:

- Be compact
- Scale to hundreds or thousands of records
- Prioritise search and filtering
- Minimise visual noise
- Optimise scanning

### Workspaces should:

- Optimise understanding
- Optimise execution
- Optimise decision making

---

## Workspace Design Standard – Does NOT Apply to Registers

**Workspace Design Standard (WS-002):**
- Applies ONLY to Workspaces
- Defines: Situation → Work → Context → Actions
- Operational focus

**Registers follow DIFFERENT principles:**
- Compact discovery
- Search & filter optimization
- Scanning patterns
- NOT operational workflows

---

## Correct vs. Incorrect Patterns

### ✅ Correct

- Kontakter (Register) → Gäster (Category) → Person Workspace
- Upplevelser (Register) → Tour du Mont Blanc (List) → Resa Workspace

Discovery is separate from execution.

### ❌ Incorrect

- Large operational dashboards inside a Register
- Editing workflows directly inside Register lists
- Attempting to combine discovery and execution in one screen

---

## Future Platform Domains

This principle applies to all future domains:

```
Guider (Register) → Guide Workspace (Execution)
Samarbetspartners (Register) → Partner Workspace (Execution)
Boenden (Register) → Accommodation Workspace (Execution)
```

Same pattern everywhere.

---

## Key Questions

**Register answers:** "What am I looking for?"

**Workspace answers:** "What do I need to do?"

These should never compete for the user's attention.

---

## Relationship to Other Architectural Documents

**Workspace Architecture (WS-001)** ([WORKSPACE_ARCHITECTURE.md](../10-platform/WORKSPACE_ARCHITECTURE.md)):
- Defines how operational work is organised
- Applies to all Workspaces

**PDR-004 (this document):**
- Defines how users navigate FROM discovery TO operational work
- Establishes Register/Workspace separation

**Workspace Design Standard (WS-002):**
- Applies ONLY to Workspaces
- DOES NOT apply to Registers
- Registers have their own information architecture

---

## Consequences

### Benefits

- ✅ Cleaner architecture
- ✅ Simpler navigation
- ✅ Reduced cognitive load
- ✅ Reusable Workspace model
- ✅ Better scalability
- ✅ Clear domain boundaries

---

## Alternatives Considered

**One combined page for searching and working**

**Rejected.**

Reason: The responsibilities are fundamentally different. Discovery and execution should not compete for the user's attention.

---

## Decision Summary

**Register answers:** "What am I looking for?"

**Workspace answers:** "What do I need to do?"

Keeping these responsibilities separate improves usability, consistency and long-term maintainability.

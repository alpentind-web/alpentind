# Platform Interaction Standard

**Standard:** SDS-002  
**Status:** Approved

## Purpose

The purpose of this document is to define a shared interaction language for AlpenTind Platform.

This standard is normative and reusable across all Business Engines.

Users MUST NOT be required to relearn interaction patterns between engines.

Consistency takes precedence over local optimization.

---

## Scope

This document defines platform-wide interaction behaviour for reusable interaction patterns.

It applies to all current and future Business Engines on the AlpenTind Platform.

This standard defines interaction standards, not feature behaviour.

It does not introduce architecture changes.

---

## Normative Language

The key words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** in this document are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119):

- **MUST** — absolute requirement; no deviation is permitted.
- **MUST NOT** — absolute prohibition; the behaviour is never allowed.
- **SHOULD** — recommended behaviour; deviation is permitted only with a documented reason.
- **SHOULD NOT** — behaviour that is not recommended; deviation is permitted only with a documented reason.
- **MAY** — optional behaviour; implementations may include or omit it at their discretion.

---

## Interaction Principles

### 1. Simplicity

Interaction flows MUST be simple, direct, and easy to understand.

- Unnecessary confirmations SHOULD NOT be introduced
- Unnecessary dialogs SHOULD NOT be introduced
- Unnecessary workflow steps SHOULD NOT be introduced
- Implementations SHOULD follow the shortest clear path to action

### 2. Consistency

The same interaction pattern MUST behave the same way across the platform.

- The same modal purpose MUST use the same layout
- The same action type MUST use the same button order
- The same wording MUST use the same terminology

### 3. Visibility

The user MUST always be able to understand the current state and the next available action.

- Current context SHOULD be clear
- Available actions SHOULD be visible
- Outcomes SHOULD be communicated clearly
- Critical actions MUST NOT be hidden

### 4. Minimal Cognitive Load

The platform SHOULD reduce mental effort.

- Implementations MUST use predictable interaction patterns
- Unnecessary decisions SHOULD be reduced
- Choices SHOULD be limited and clear
- Recognizable behaviour MUST be preserved across engines

---

## Platform Modal Types

Platform modals MUST replace all browser dialog components (`window.alert`, `window.confirm`, `window.prompt`).

### Confirmation Modal

**Purpose**  
Confirm destructive actions.

**Examples**
- Delete Inquiry
- Delete Dialog
- Delete Topic
- Delete Contact

**Layout**
- Title
- Question
- Optional explanation
- Buttons: `[ Nej ] [ Ja ]`

**Rules**
- `Nej` MUST appear first
- `Ja` MUST appear second
- Escape MUST close the modal
- Outside-click MAY close the modal; it MUST NOT close the modal when the user is required to resolve the dialog before returning to the underlying workflow
- All delete operations MUST use a Confirmation Modal

### Input Modal

**Purpose**  
Collect one text value.

**Examples**
- New Topic
- Rename Topic
- Future simple input

**Layout**
- Title
- Single input
- Buttons: `[ Avbryt ] [ Skapa ]`

**Rules**
- Initial focus MUST be placed in the input field
- Enter MUST confirm the action
- Escape MUST cancel the action

### Create Modal

**Purpose**  
Create a new object such as an Inquiry, Contact, or Journey.

**Buttons**
- `[ Avbryt ] [ Skapa ]`

### Edit Modal

**Purpose**  
Modify an existing object.

**Buttons**
- `[ Avbryt ] [ Spara ]`

---

## Toast Notification Standard

Toast messages MUST be used only for successful operations.

**Examples**
- `Dialog skapad.`
- `Förfrågan sparad.`
- `Kontakt uppdaterad.`

**Rules**
- Toasts MUST auto-dismiss
- Toasts MUST NOT include a confirmation button

---

## Error Message Standard

Errors MUST be shown:

- inline, or
- inside platform modals

Browser alerts MUST NOT be used for errors.

Error communication MUST always clarify:

- what failed
- what the user can do next

---

## Button Order Standard

The universal button order MUST be:

**Confirmation**
- `[ Nej ] [ Ja ]`

**Create**
- `[ Avbryt ] [ Skapa ]`

**Edit**
- `[ Avbryt ] [ Spara ]`

---

## Prohibited Browser Components

The following browser components MUST NOT be used:

- `window.alert()`
- `window.confirm()`
- `window.prompt()`

Platform interaction components MUST be used instead.

---

## Platform Language Standard

The following terms MUST be used:

- Skapa
- Spara
- Avbryt
- Radera
- Ja
- Nej
- Stäng
- Uppdatera
- Boka

Inconsistent alternatives MUST NOT be used.

---

## Accessibility Requirements

The following keyboard and accessibility behaviours MUST be implemented:

- Escape MUST close dialogs
- Tab navigation MUST follow a natural order
- Focus MUST return to the origin control after a dialog closes
- Buttons MUST behave consistently with the keyboard across the platform

Accessibility behaviour MUST be consistent across all Business Engines.

---

## Relationship to Existing Standards

SDS-002 complements the following standards:

- Workspace Design Standard
- Engineering Constitution

Future Business Engines MUST follow both those standards and this interaction standard.

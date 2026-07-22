# Platform Interaction Standard

**Standard:** SDS-002  
**Status:** Approved

## Purpose

The purpose of this document is to define a shared interaction language for AlpenTind Platform.

This standard is normative and reusable across all Business Engines.

Users shall not need to relearn interaction patterns between engines.

Consistency takes precedence over local optimization.

---

## Scope

This document defines platform-wide interaction behaviour for reusable interaction patterns.

It applies to all current and future Business Engines on the AlpenTind Platform.

This standard defines interaction standards, not feature behaviour.

It does not introduce architecture changes.

---

## Interaction Principles

### 1. Simplicity

Interaction flows shall be simple, direct, and easy to understand.

- Avoid unnecessary confirmations
- Avoid unnecessary dialogs
- Avoid unnecessary workflow steps
- Prefer the shortest clear path to action

### 2. Consistency

The same interaction pattern shall behave the same way across the platform.

- The same modal purpose should use the same layout
- The same action type should use the same button order
- The same wording should use the same terminology

### 3. Visibility

The user shall always understand the current state and the next available action.

- Current context should be clear
- Available actions should be visible
- Outcomes should be communicated clearly
- Critical actions must never be hidden

### 4. Minimal Cognitive Load

The platform should reduce mental effort.

- Use predictable interaction patterns
- Reduce unnecessary decisions
- Keep choices limited and clear
- Preserve recognisable behaviour across engines

---

## Platform Modal Types

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
- `Nej` always first
- `Ja` always second
- Escape closes the modal
- Outside click closes the modal unless explicitly disabled

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
- Initial focus is in the input
- Enter confirms
- Escape cancels

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

Toast messages shall be used only for successful operations.

**Examples**
- `Dialog skapad.`
- `Förfrågan sparad.`
- `Kontakt uppdaterad.`

**Rules**
- Toasts auto-dismiss
- Toasts do not include a confirmation button

---

## Error Message Standard

Errors shall be shown:

- inline, or
- inside platform modals

Browser alerts shall never be used for errors.

Error communication must always clarify:

- what failed
- what the user can do next

---

## Button Order Standard

Universal button order shall be:

**Confirmation**
- `[ Nej ] [ Ja ]`

**Create**
- `[ Avbryt ] [ Skapa ]`

**Edit**
- `[ Avbryt ] [ Spara ]`

**Delete**
- Delete actions must always require confirmation

---

## Prohibited Browser Components

The following browser components shall not be used:

- `window.alert()`
- `window.confirm()`
- `window.prompt()`

Platform interaction components shall be used instead.

---

## Platform Language Standard

Preferred terms:

- Skapa
- Spara
- Avbryt
- Radera
- Ja
- Nej
- Stäng
- Uppdatera
- Boka

Inconsistent alternatives should be avoided.

---

## Accessibility Requirements

Minimum accessibility and keyboard behaviour:

- Escape closes dialogs
- Tab navigation follows a natural order
- Focus returns to the origin control after close
- Buttons behave consistently with the keyboard across the platform

Accessibility behaviour shall be consistent across all Business Engines.

---

## Relationship to Existing Standards

SDS-002 complements the following standards:

- Workspace Design Standard
- Engineering Constitution

Future Business Engines must follow both those standards and this interaction standard.

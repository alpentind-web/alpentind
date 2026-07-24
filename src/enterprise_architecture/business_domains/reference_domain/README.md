# Reference Domain

## Purpose
Reserve the implementation boundary for trusted professional reference knowledge.

## Responsibilities
- make Reference Domain ownership visible
- isolate future reference implementation from adjacent domains
- keep the domain free from presentation and infrastructure ownership

## Ownership
Reference Domain owns trusted professional reference knowledge only.
RI-001 intentionally does not implement Business Objects, Business Events, or business behavior.

## Dependencies
- may depend only on its own package and Shared Technical
- must not depend on other Business Domains, Platform Views, Application, or Infrastructure

## Architectural Role
Business Domain.

## Referenced ADRs
- ADR-003 Enterprise Architecture Standard

## Referenced PDRs
- PDR-012 Reference Domain Architecture

## Referenced ESRs
- ESR-001 Engineering Implementation Standard
- ESR-002 Minimum Viable Platform (MVP-001)

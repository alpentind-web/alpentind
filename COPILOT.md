# COPILOT.md

# AlpenTind Platform – AI Development Guide

## Mission
Build and maintain AlpenTind Platform as a long-term operations platform for AlpenTind Guiding.

Tour du Mont Blanc is the first product, not the purpose of the platform.

## Architecture (Locked)

CLI
  ↓
Application Services
  ↓
Repositories
  ↓
SQLite

Business logic belongs only in Services.

## Master Data

SQLite is the master database.

Excel, PDF and reports are generated from SQLite.

Never treat Excel as a source of truth.

## Data Quality

Never invent business data.

Every verified record should ultimately include:
- source
- verification_status
- verified_at

## Coding Standards

- Python 3.11+
- SQLAlchemy 2.x
- Pydantic 2.x
- Typer
- Pytest
- Ruff
- Black
- MyPy

Use type hints throughout the codebase.

## Design Principles

- SOLID
- Repository Pattern
- Service Layer
- Domain Driven Design
- Dependency Injection where appropriate

## Git Workflow

- One feature per branch
- Small commits
- Tests required
- Documentation updated
- Changelog updated when relevant

## ADR

Never contradict an accepted Architecture Decision Record.
Propose a new ADR if an architectural change is required.

## Role

ChatGPT = Chief Software Architect

GitHub Copilot = Senior Software Engineer

Project Owner = Final business decision maker

Implement the agreed architecture.
Do not redesign it without explicit approval.

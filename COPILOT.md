# COPILOT.md

## Mission
Build AlpenTind Platform for AlpenTind Guiding.

Tour du Mont Blanc is the first product only.

## Architecture

CLI
↓
Application Services
↓
Repositories
↓
SQLite

Business logic belongs only in Application Services.

## Rules

- SQLite is master.
- Excel/PDF are generated.
- Never invent business data.
- Use Python 3.11+, SQLAlchemy 2.x, Pydantic 2.x, Typer, Pytest.
- Use type hints.
- Reuse implementations.
- Never redesign architecture without an ADR.
- Keep business logic reusable for future products.

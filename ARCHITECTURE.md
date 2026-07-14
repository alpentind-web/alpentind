# Architecture

## Overview

```
CLI (Typer) → Services → Repositories → SQLite
```

## Package Layout

```
src/
├── __init__.py          # package root, __version__
├── cli/                 # Typer application (entry point only)
├── core/                # config, database engine, logging, DI container
├── models/              # SQLAlchemy ORM classes (all entities)
│   ├── base.py          # DeclarativeBase
│   ├── mixins.py        # AuditMixin, VerificationMixin
│   └── *.py             # one file per entity
├── repositories/        # data-access layer (Repository[T] base)
├── services/            # business logic (BaseService)
└── <domain>/            # future domain modules (analytics, crm, …)
```

## Conventions

- All persistent entities inherit `AuditMixin` (ADR-0004).
- Entities with externally-verified data also inherit `VerificationMixin`.
- All repositories inherit `Repository[T]` from `src.repositories.base`.
- Business logic lives in Services; CLI is restricted to I/O.
- `configure_logging()` is called at application startup.
- `pyproject.toml` is the single source of truth for dependencies.

## ADRs

| ADR | Decision |
|-----|----------|
| ADR-0001 | SQLite as master database |
| ADR-0003 | All implementations must be reusable |
| ADR-0004 | AuditMixin + VerificationMixin on persistent entities |
| ADR-0007 | Single codebase in `src/` |

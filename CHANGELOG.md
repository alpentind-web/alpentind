# Changelog

## v3.0.0-alpha (STAB-001)

### Refactoring (breaking — internal only)

- Consolidated single codebase under `src/` (ADR-0007); `app/` removed.
- Renamed `BaseRepository` → `Repository(Generic[T])` — single repository abstraction.
- Applied `AuditMixin` to all 14 persistent entities.
- Applied `VerificationMixin` to Refuge, Lodging, Contact, Price.
- Converted CLI to a proper Typer application (`alpentind --version`, `doctor`, `db init`).
- Fixed `datetime.utcnow()` deprecation; switched to `datetime.now(UTC)`.
- Added `logger = logging.getLogger(__name__)` to all production modules.
- Replaced `print()` in CLI with structured logging.
- Moved all tests into `tests/unit/`; added `unit` pytest marker.
- Synchronised `requirements.txt` with `pyproject.toml`.
- Fixed deprecated Ruff top-level `select` configuration.
- Updated `ARCHITECTURE.md`, `ROADMAP.md`, `DOMAIN_DICTIONARY.md`.

## v3.0.0-dev

- Initial Foundation

"""Tests for the database session factory."""

from src.core.database import SessionLocal


def test_session_factory() -> None:
    """SessionLocal must produce a valid, closeable session."""
    session = SessionLocal()
    assert session is not None
    session.close()

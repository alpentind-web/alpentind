"""Tests for the database session factory."""

import pytest

from src.core.database import SessionLocal

pytestmark = pytest.mark.unit


def test_session_factory() -> None:
    """SessionLocal must produce a valid, closeable session."""
    session = SessionLocal()
    assert session is not None
    session.close()

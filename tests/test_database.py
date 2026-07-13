"""Tests for database initialization and session management."""

import pytest
from app.core.database import SessionLocal, init_db, drop_db
from app.core.container import Container


def test_session_factory():
    """Test that SessionLocal creates valid sessions."""
    session = SessionLocal()
    assert session is not None
    session.close()


def test_get_session():
    """Test the get_session dependency provider."""
    session_gen = Container.get_session()
    session = next(session_gen)
    assert session is not None
    try:
        next(session_gen)
    except StopIteration:
        pass  # Expected


def test_database_initialization():
    """Test database initialization."""
    try:
        init_db()
        assert True  # If no exception, DB was initialized
    except Exception as e:
        pytest.fail(f"Database initialization failed: {str(e)}")

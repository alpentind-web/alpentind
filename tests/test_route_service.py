"""Tests for Route Service."""

import pytest
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.services.route_service import RouteService
from app.models import Route


@pytest.fixture
def db_session():
    """Create a test database session."""
    session = SessionLocal()
    yield session
    session.close()


def test_create_route(db_session: Session):
    """Test creating a new route."""
    service = RouteService(db_session)
    route = service.create_route(
        name="Test Route",
        distance_km=100.0,
        elevation_gain_m=2000,
        difficulty_level="challenging",
        estimated_days=10
    )
    assert route.id is not None
    assert route.name == "Test Route"
    assert route.verification_status == "unverified"


def test_get_route(db_session: Session):
    """Test retrieving a route."""
    service = RouteService(db_session)
    route = service.create_route(
        name="Get Test Route",
        distance_km=50.0,
        elevation_gain_m=1000,
        difficulty_level="moderate",
        estimated_days=5
    )
    db_session.commit()
    
    retrieved = service.get_route(route.id)
    assert retrieved is not None
    assert retrieved.name == "Get Test Route"

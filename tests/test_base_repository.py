"""Tests for BaseRepository generic CRUD operations."""

import pytest
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, init_db, drop_db
from app.models import Route, Customer
from app.repositories.base_repository import BaseRepository


@pytest.fixture
def clean_db():
    """Create a clean database for testing."""
    try:
        drop_db()
    except:
        pass
    init_db()
    yield
    drop_db()


@pytest.fixture
def db_session():
    """Create a test database session."""
    session = SessionLocal()
    yield session
    session.close()


class TestBaseRepository:
    """Test BaseRepository generic operations."""
    
    def test_create(self, clean_db, db_session):
        """Test creating a new record."""
        repo = BaseRepository(db_session, Route)
        route = Route(
            name="Create Test",
            distance_km=100.0,
            elevation_gain_m=2000,
            difficulty_level="challenging",
            estimated_days=10
        )
        created = repo.create(route)
        assert created.id is not None
    
    def test_get_by_id(self, clean_db, db_session):
        """Test retrieving a record by ID."""
        repo = BaseRepository(db_session, Route)
        route = Route(
            name="Get Test",
            distance_km=50.0,
            elevation_gain_m=1000,
            difficulty_level="moderate",
            estimated_days=5
        )
        created = repo.create(route)
        db_session.flush()
        
        retrieved = repo.get_by_id(created.id)
        assert retrieved is not None
        assert retrieved.name == "Get Test"
    
    def test_get_all(self, clean_db, db_session):
        """Test retrieving all records."""
        repo = BaseRepository(db_session, Route)
        
        for i in range(3):
            route = Route(
                name=f"Route {i}",
                distance_km=100.0 + i,
                elevation_gain_m=2000,
                difficulty_level="moderate",
                estimated_days=10
            )
            repo.create(route)
        db_session.flush()
        
        all_routes = repo.get_all()
        assert len(all_routes) == 3
    
    def test_delete(self, clean_db, db_session):
        """Test deleting a record."""
        repo = BaseRepository(db_session, Route)
        route = Route(
            name="Delete Test",
            distance_km=100.0,
            elevation_gain_m=2000,
            difficulty_level="challenging",
            estimated_days=10
        )
        created = repo.create(route)
        db_session.flush()
        
        success = repo.delete(created.id)
        assert success is True
        db_session.flush()
        
        deleted = repo.get_by_id(created.id)
        assert deleted is None
    
    def test_customer_crud(self, clean_db, db_session):
        """Test CRUD operations with Customer model."""
        repo = BaseRepository(db_session, Customer)
        
        # Create
        customer = Customer(
            name="John Doe",
            email="john@example.com",
            experience_level="beginner"
        )
        created = repo.create(customer)
        db_session.flush()
        
        # Read
        retrieved = repo.get_by_id(created.id)
        assert retrieved.email == "john@example.com"
        
        # Update
        retrieved.experience_level = "intermediate"
        db_session.flush()
        
        # Verify update
        updated = repo.get_by_id(created.id)
        assert updated.experience_level == "intermediate"
        
        # Delete
        success = repo.delete(created.id)
        assert success is True

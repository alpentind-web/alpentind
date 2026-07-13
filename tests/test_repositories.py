"""Tests for all repository implementations."""

import pytest
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, init_db, drop_db
from app.models import Route, Product
from app.repositories.route_repository import RouteRepository
from app.repositories.product_repository import ProductRepository


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


class TestRouteRepository:
    """Test RouteRepository queries."""
    
    def test_create_and_retrieve(self, clean_db, db_session):
        """Test creating and retrieving a route."""
        repo = RouteRepository(db_session)
        route = Route(
            name="Test Route",
            distance_km=100.0,
            elevation_gain_m=2000,
            difficulty_level="challenging",
            estimated_days=10
        )
        created = repo.create(route)
        db_session.commit()
        
        retrieved = repo.get_by_id(created.id)
        assert retrieved is not None
        assert retrieved.name == "Test Route"
    
    def test_get_by_name(self, clean_db, db_session):
        """Test retrieving route by name."""
        repo = RouteRepository(db_session)
        route = Route(
            name="Unique Route Name",
            distance_km=50.0,
            elevation_gain_m=1000,
            difficulty_level="moderate",
            estimated_days=5
        )
        repo.create(route)
        db_session.commit()
        
        found = repo.get_by_name("Unique Route Name")
        assert found is not None
        assert found.name == "Unique Route Name"
    
    def test_get_by_difficulty(self, clean_db, db_session):
        """Test retrieving routes by difficulty."""
        repo = RouteRepository(db_session)
        
        for i in range(3):
            route = Route(
                name=f"Challenging Route {i}",
                distance_km=100.0 + i,
                elevation_gain_m=2000,
                difficulty_level="challenging",
                estimated_days=10
            )
            repo.create(route)
        
        db_session.commit()
        
        routes = repo.get_by_difficulty("challenging")
        assert len(routes) == 3


class TestProductRepository:
    """Test ProductRepository queries."""
    
    def test_get_by_status(self, clean_db, db_session):
        """Test retrieving products by status."""
        repo = ProductRepository(db_session)
        
        # Create route first
        route = Route(
            name="Product Test Route",
            distance_km=100.0,
            elevation_gain_m=2000,
            difficulty_level="challenging",
            estimated_days=10
        )
        db_session.add(route)
        db_session.flush()
        
        # Create products with different statuses
        for status in ["draft", "published", "cancelled"]:
            product = Product(
                name=f"Product {status}",
                route_id=route.id,
                duration_days=10,
                group_size_min=5,
                group_size_max=15,
                season="summer",
                year=2026,
                status=status
            )
            repo.create(product)
        
        db_session.commit()
        
        published = repo.get_by_status("published")
        assert len(published) == 1
        assert published[0].status == "published"
    
    def test_get_by_season_and_year(self, clean_db, db_session):
        """Test retrieving products by season and year."""
        repo = ProductRepository(db_session)
        
        # Create route
        route = Route(
            name="Season Test Route",
            distance_km=100.0,
            elevation_gain_m=2000,
            difficulty_level="moderate",
            estimated_days=10
        )
        db_session.add(route)
        db_session.flush()
        
        # Create products for summer 2026
        for i in range(2):
            product = Product(
                name=f"Summer Product {i}",
                route_id=route.id,
                duration_days=10,
                group_size_min=5,
                group_size_max=15,
                season="summer",
                year=2026
            )
            repo.create(product)
        
        db_session.commit()
        
        products = repo.get_by_season("summer", 2026)
        assert len(products) == 2
        assert all(p.season == "summer" and p.year == 2026 for p in products)

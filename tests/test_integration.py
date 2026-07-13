"""Tests for integration across layers."""

import pytest
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, init_db, drop_db
from app.services.route_service import RouteService
from app.services.product_service import ProductService
from app.services.customer_service import CustomerService


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


def test_route_creation_integration(clean_db):
    """Test creating a route through the full stack."""
    session = SessionLocal()
    try:
        service = RouteService(session)
        route = service.create_route(
            name="Integration Test Route",
            distance_km=80.0,
            elevation_gain_m=1500,
            difficulty_level="moderate",
            estimated_days=7
        )
        session.commit()
        
        assert route.id is not None
        assert route.name == "Integration Test Route"
        
        # Verify we can retrieve it
        retrieved = service.get_route(route.id)
        assert retrieved is not None
        assert retrieved.name == route.name
    finally:
        session.close()


def test_product_and_route_integration(clean_db):
    """Test creating a product with an existing route."""
    session = SessionLocal()
    try:
        # Create route
        route_service = RouteService(session)
        route = route_service.create_route(
            name="Integration Route",
            distance_km=100.0,
            elevation_gain_m=2000,
            difficulty_level="challenging",
            estimated_days=10
        )
        session.flush()
        
        # Create product using the route
        product_service = ProductService(session)
        product = product_service.create_product(
            name="Integration Product",
            route_id=route.id,
            duration_days=10,
            group_size_min=5,
            group_size_max=15,
            season="summer",
            year=2026
        )
        session.commit()
        
        assert product.id is not None
        assert product.route_id == route.id
        
        # Verify relationships
        retrieved_product = product_service.get_product(product.id)
        assert retrieved_product.route.name == "Integration Route"
    finally:
        session.close()


def test_customer_verification_flow(clean_db):
    """Test customer creation and verification flow."""
    session = SessionLocal()
    try:
        service = CustomerService(session)
        
        # Create customer
        customer = service.create_customer(
            name="Test Customer",
            email="test@example.com",
            experience_level="beginner"
        )
        session.flush()
        
        # Verify initial state
        assert customer.verification_status == "unverified"
        
        # Verify customer
        success = service.verify_customer(customer.id)
        assert success is True
        session.commit()
        
        # Check updated state
        verified = service.get_customer(customer.id)
        assert verified.verification_status == "verified"
    finally:
        session.close()


def test_product_lifecycle(clean_db):
    """Test product lifecycle: draft → published → cancelled."""
    session = SessionLocal()
    try:
        # Create route first
        route_service = RouteService(session)
        route = route_service.create_route(
            name="Lifecycle Test Route",
            distance_km=50.0,
            elevation_gain_m=1000,
            difficulty_level="moderate",
            estimated_days=5
        )
        session.flush()
        
        # Create product (initially draft)
        product_service = ProductService(session)
        product = product_service.create_product(
            name="Lifecycle Test Product",
            route_id=route.id,
            duration_days=5,
            group_size_min=2,
            group_size_max=10,
            season="fall",
            year=2026
        )
        session.flush()
        
        # Verify draft status
        assert product.status == "draft"
        
        # Publish product
        success = product_service.publish_product(product.id)
        assert success is True
        session.flush()
        
        # Verify published status
        published = product_service.get_product(product.id)
        assert published.status == "published"
        
        # Cancel product
        success = product_service.cancel_product(product.id)
        assert success is True
        session.commit()
        
        # Verify cancelled status
        cancelled = product_service.get_product(product.id)
        assert cancelled.status == "cancelled"
    finally:
        session.close()

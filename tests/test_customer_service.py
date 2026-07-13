"""Tests for Customer Service."""

import pytest
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.services.customer_service import CustomerService
from app.models import Customer


@pytest.fixture
def db_session():
    """Create a test database session."""
    session = SessionLocal()
    yield session
    session.close()


def test_create_customer(db_session: Session):
    """Test creating a new customer."""
    service = CustomerService(db_session)
    customer = service.create_customer(
        name="John Doe",
        email="john@example.com",
        experience_level="beginner"
    )
    assert customer.id is not None
    assert customer.name == "John Doe"
    assert customer.email == "john@example.com"


def test_verify_customer(db_session: Session):
    """Test customer verification."""
    service = CustomerService(db_session)
    customer = service.create_customer(
        name="Jane Doe",
        email="jane@example.com"
    )
    db_session.commit()
    
    verified = service.verify_customer(customer.id)
    assert verified is True
    
    updated = service.get_customer(customer.id)
    assert updated.verification_status == "verified"

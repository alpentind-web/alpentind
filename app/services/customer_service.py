"""Customer Service - business logic for customer operations."""

import logging
from typing import List, Optional
from sqlalchemy.orm import Session
from app.models import Customer, Booking
from app.repositories.base_repository import BaseRepository

logger = logging.getLogger(__name__)


class CustomerService:
    """Service for customer-related business logic."""

    def __init__(self, session: Session):
        self.session = session
        self.repository = BaseRepository(session, Customer)

    def create_customer(self, name: str, email: str, experience_level: str = "intermediate") -> Customer:
        """Create a new customer."""
        try:
            customer = Customer(
                name=name,
                email=email,
                experience_level=experience_level,
                source="platform",
                verification_status="unverified"
            )
            return self.repository.create(customer)
        except Exception as e:
            logger.error(f"Error creating customer: {str(e)}")
            raise

    def get_customer(self, customer_id: int) -> Optional[Customer]:
        """Get customer by ID."""
        return self.repository.get_by_id(customer_id)

    def get_all_customers(self) -> List[Customer]:
        """Get all customers."""
        return self.repository.get_all()

    def update_customer(self, customer_id: int, **kwargs) -> Optional[Customer]:
        """Update customer details."""
        customer = self.get_customer(customer_id)
        if customer:
            for key, value in kwargs.items():
                if hasattr(customer, key):
                    setattr(customer, key, value)
            self.session.flush()
            return customer
        return None

    def get_customer_bookings(self, customer_id: int) -> List[Booking]:
        """Get all bookings for a customer."""
        try:
            customer = self.get_customer(customer_id)
            if customer:
                return customer.bookings
            return []
        except Exception as e:
            logger.error(f"Error fetching customer bookings: {str(e)}")
            raise

    def verify_customer(self, customer_id: int) -> bool:
        """Mark customer as verified."""
        try:
            from datetime import datetime
            customer = self.get_customer(customer_id)
            if customer:
                customer.verification_status = "verified"
                customer.verified_at = datetime.utcnow()
                self.session.flush()
                logger.info(f"Customer {customer_id} verified")
                return True
            return False
        except Exception as e:
            logger.error(f"Error verifying customer: {str(e)}")
            raise

"""Product Repository - data access for Product domain model."""

from typing import List, Optional
from datetime import datetime
from sqlalchemy.orm import Session
from app.models import Product
from .base_repository import BaseRepository


class ProductRepository(BaseRepository[Product]):
    """Repository for Product domain model."""

    def __init__(self, session: Session):
        super().__init__(session, Product)

    def get_by_name(self, name: str) -> Optional[Product]:
        """Get product by name."""
        return self.session.query(Product).filter(Product.name == name).first()

    def get_by_status(self, status: str) -> List[Product]:
        """Get products by status (draft, published, cancelled)."""
        return self.session.query(Product).filter(Product.status == status).all()

    def get_published(self) -> List[Product]:
        """Get all published products."""
        return self.get_by_status("published")

    def get_by_year(self, year: int) -> List[Product]:
        """Get products by year."""
        return self.session.query(Product).filter(Product.year == year).all()

    def get_by_season(self, season: str, year: int) -> List[Product]:
        """Get products by season and year."""
        return self.session.query(Product).filter(
            Product.season == season,
            Product.year == year
        ).all()

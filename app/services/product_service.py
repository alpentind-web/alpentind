"""Product Service - business logic for product operations."""

import logging
from typing import List, Optional
from sqlalchemy.orm import Session
from app.models import Product, Departure, Price
from app.repositories.product_repository import ProductRepository

logger = logging.getLogger(__name__)


class ProductService:
    """Service for product-related business logic."""

    def __init__(self, session: Session):
        self.session = session
        self.repository = ProductRepository(session)

    def create_product(self, name: str, route_id: int, duration_days: int,
                      group_size_min: int, group_size_max: int,
                      season: str, year: int, description: str = "") -> Product:
        """Create a new product."""
        try:
            product = Product(
                name=name,
                route_id=route_id,
                duration_days=duration_days,
                group_size_min=group_size_min,
                group_size_max=group_size_max,
                season=season,
                year=year,
                description=description,
                status="draft",
                source="platform",
                verification_status="unverified"
            )
            return self.repository.create(product)
        except Exception as e:
            logger.error(f"Error creating product: {str(e)}")
            raise

    def get_product(self, product_id: int) -> Optional[Product]:
        """Get product by ID."""
        return self.repository.get_by_id(product_id)

    def get_product_by_name(self, name: str) -> Optional[Product]:
        """Get product by name."""
        return self.repository.get_by_name(name)

    def get_published_products(self) -> List[Product]:
        """Get all published products."""
        return self.repository.get_published()

    def get_products_by_season(self, season: str, year: int) -> List[Product]:
        """Get products by season and year."""
        return self.repository.get_by_season(season, year)

    def get_product_departures(self, product_id: int) -> List[Departure]:
        """Get all departures for a product."""
        try:
            product = self.get_product(product_id)
            if product:
                return product.departures
            return []
        except Exception as e:
            logger.error(f"Error fetching product departures: {str(e)}")
            raise

    def publish_product(self, product_id: int) -> bool:
        """Publish a product (change status from draft to published)."""
        try:
            product = self.get_product(product_id)
            if product and product.status == "draft":
                product.status = "published"
                self.session.flush()
                logger.info(f"Product {product_id} published")
                return True
            return False
        except Exception as e:
            logger.error(f"Error publishing product: {str(e)}")
            raise

    def cancel_product(self, product_id: int) -> bool:
        """Cancel a product."""
        try:
            product = self.get_product(product_id)
            if product:
                product.status = "cancelled"
                self.session.flush()
                logger.info(f"Product {product_id} cancelled")
                return True
            return False
        except Exception as e:
            logger.error(f"Error cancelling product: {str(e)}")
            raise

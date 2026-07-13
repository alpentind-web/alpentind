"""Route Repository - data access for Route domain model."""

from typing import List, Optional
from sqlalchemy.orm import Session
from app.models import Route
from .base_repository import BaseRepository


class RouteRepository(BaseRepository[Route]):
    """Repository for Route domain model."""

    def __init__(self, session: Session):
        super().__init__(session, Route)

    def get_by_name(self, name: str) -> Optional[Route]:
        """Get route by name."""
        return self.session.query(Route).filter(Route.name == name).first()

    def get_by_difficulty(self, difficulty_level: str) -> List[Route]:
        """Get all routes by difficulty level."""
        return self.session.query(Route).filter(Route.difficulty_level == difficulty_level).all()

    def get_verified(self) -> List[Route]:
        """Get all verified routes."""
        return self.session.query(Route).filter(Route.verification_status == "verified").all()

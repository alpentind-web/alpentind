"""Route Service - business logic for route operations."""

import logging
from typing import List, Optional
from sqlalchemy.orm import Session
from app.models import Route, Stage
from app.repositories.route_repository import RouteRepository

logger = logging.getLogger(__name__)


class RouteService:
    """Service for route-related business logic."""

    def __init__(self, session: Session):
        self.session = session
        self.repository = RouteRepository(session)

    def create_route(self, name: str, distance_km: float, elevation_gain_m: int,
                     difficulty_level: str, estimated_days: int, description: str = "") -> Route:
        """Create a new route."""
        try:
            route = Route(
                name=name,
                distance_km=distance_km,
                elevation_gain_m=elevation_gain_m,
                difficulty_level=difficulty_level,
                estimated_days=estimated_days,
                description=description,
                source="platform",
                verification_status="unverified"
            )
            return self.repository.create(route)
        except Exception as e:
            logger.error(f"Error creating route: {str(e)}")
            raise

    def get_route(self, route_id: int) -> Optional[Route]:
        """Get route by ID."""
        return self.repository.get_by_id(route_id)

    def get_route_by_name(self, name: str) -> Optional[Route]:
        """Get route by name."""
        return self.repository.get_by_name(name)

    def get_routes_by_difficulty(self, difficulty_level: str) -> List[Route]:
        """Get all routes by difficulty level."""
        return self.repository.get_by_difficulty(difficulty_level)

    def get_verified_routes(self) -> List[Route]:
        """Get all verified routes."""
        return self.repository.get_verified()

    def get_route_stages(self, route_id: int) -> List[Stage]:
        """Get all stages for a route."""
        try:
            route = self.get_route(route_id)
            if route:
                return route.stages
            return []
        except Exception as e:
            logger.error(f"Error fetching route stages: {str(e)}")
            raise

    def verify_route(self, route_id: int) -> bool:
        """Mark route as verified."""
        try:
            from datetime import datetime
            route = self.get_route(route_id)
            if route:
                route.verification_status = "verified"
                route.verified_at = datetime.utcnow()
                self.session.flush()
                logger.info(f"Route {route_id} verified")
                return True
            return False
        except Exception as e:
            logger.error(f"Error verifying route: {str(e)}")
            raise

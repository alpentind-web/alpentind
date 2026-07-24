"""Domain services for Reference Domain behavior."""

from dataclasses import dataclass

from src.enterprise_architecture.business_domains.reference_domain.contracts import (
    AccommodationRepository,
    AreaRepository,
    TrailRepository,
)
from src.enterprise_architecture.business_domains.reference_domain.errors import (
    ReferenceDomainValidationError,
)
from src.enterprise_architecture.business_domains.reference_domain.models import (
    Accommodation,
    Area,
    Trail,
)


@dataclass(slots=True)
class ReferenceDomainService:
    """Coordinate Reference Domain operations while preserving ownership rules."""

    area_repository: AreaRepository
    accommodation_repository: AccommodationRepository
    trail_repository: TrailRepository

    def register_area(self, area: Area) -> None:
        """Register a trusted Area."""
        self.area_repository.add(area)

    def register_accommodation(self, accommodation: Accommodation) -> None:
        """Register Accommodation in an existing active Area."""
        area = self._required_active_area(accommodation.area_id)
        if not area.is_active:
            raise ReferenceDomainValidationError("Accommodation can only be registered in active Areas.")
        self.accommodation_repository.add(accommodation)

    def register_trail(self, trail: Trail) -> None:
        """Register Trail context in an existing active Area."""
        self._required_active_area(trail.area_id)
        self.trail_repository.add(trail)

    def deactivate_area(self, area_id: str) -> Area:
        """Deactivate Area without mutating historical reference facts."""
        area = self._required_active_area(area_id)
        listed_accommodations = [
            accommodation
            for accommodation in self.accommodation_repository.list_by_area(area_id)
            if accommodation.is_listed
        ]
        if listed_accommodations:
            raise ReferenceDomainValidationError(
                "Area cannot be deactivated while listed accommodations exist."
            )
        updated = area.deactivate()
        self.area_repository.update(updated)
        return updated

    def delist_accommodation(self, accommodation: Accommodation) -> Accommodation:
        """Delist accommodation for future use while preserving history."""
        updated = accommodation.delist()
        self.accommodation_repository.update(updated)
        return updated

    def _required_active_area(self, area_id: str) -> Area:
        area = self.area_repository.get_by_id(area_id)
        if area is None:
            raise ReferenceDomainValidationError(f"Area '{area_id}' does not exist.")
        if not area.is_active:
            raise ReferenceDomainValidationError(f"Area '{area_id}' is not active.")
        return area

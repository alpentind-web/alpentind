"""Repository contracts owned by Reference Domain."""

from collections.abc import Sequence
from typing import Protocol

from src.enterprise_architecture.business_domains.reference_domain.models import (
    Accommodation,
    Area,
    Trail,
)


class AreaRepository(Protocol):
    """Contract for Area persistence behind the domain boundary."""

    def add(self, area: Area) -> None: ...

    def update(self, area: Area) -> None: ...

    def get_by_id(self, area_id: str) -> Area | None: ...


class AccommodationRepository(Protocol):
    """Contract for Accommodation persistence behind the domain boundary."""

    def add(self, accommodation: Accommodation) -> None: ...

    def update(self, accommodation: Accommodation) -> None: ...

    def list_by_area(self, area_id: str) -> Sequence[Accommodation]: ...


class TrailRepository(Protocol):
    """Contract for Trail persistence behind the domain boundary."""

    def add(self, trail: Trail) -> None: ...

    def list_by_area(self, area_id: str) -> Sequence[Trail]: ...

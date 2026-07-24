from dataclasses import dataclass, field

import pytest

from src.enterprise_architecture.business_domains.reference_domain.errors import (
    ReferenceDomainValidationError,
)
from src.enterprise_architecture.business_domains.reference_domain.models import (
    Accommodation,
    Area,
    Trail,
)
from src.enterprise_architecture.business_domains.reference_domain.ownership import (
    OWNED_BUSINESS_OBJECTS,
    REFERENCE_DOMAIN_OWNERSHIP,
    owns_business_object,
)
from src.enterprise_architecture.business_domains.reference_domain.services import (
    ReferenceDomainService,
)


@dataclass
class InMemoryAreaRepository:
    areas: dict[str, Area] = field(default_factory=dict)

    def add(self, area: Area) -> None:
        self.areas[area.area_id] = area

    def update(self, area: Area) -> None:
        self.areas[area.area_id] = area

    def get_by_id(self, area_id: str) -> Area | None:
        return self.areas.get(area_id)


@dataclass
class InMemoryAccommodationRepository:
    accommodations: dict[str, Accommodation] = field(default_factory=dict)

    def add(self, accommodation: Accommodation) -> None:
        self.accommodations[accommodation.accommodation_id] = accommodation

    def update(self, accommodation: Accommodation) -> None:
        self.accommodations[accommodation.accommodation_id] = accommodation

    def list_by_area(self, area_id: str) -> list[Accommodation]:
        return [a for a in self.accommodations.values() if a.area_id == area_id]


@dataclass
class InMemoryTrailRepository:
    trails: dict[str, Trail] = field(default_factory=dict)

    def add(self, trail: Trail) -> None:
        self.trails[trail.trail_id] = trail

    def list_by_area(self, area_id: str) -> list[Trail]:
        return [trail for trail in self.trails.values() if trail.area_id == area_id]


def _service() -> tuple[
    ReferenceDomainService,
    InMemoryAreaRepository,
    InMemoryAccommodationRepository,
    InMemoryTrailRepository,
]:
    area_repository = InMemoryAreaRepository()
    accommodation_repository = InMemoryAccommodationRepository()
    trail_repository = InMemoryTrailRepository()
    service = ReferenceDomainService(
        area_repository=area_repository,
        accommodation_repository=accommodation_repository,
        trail_repository=trail_repository,
    )
    return service, area_repository, accommodation_repository, trail_repository


def test_business_object_creation() -> None:
    area = Area(area_id="zermatt", name=" Zermatt ", country_code=" CH ", route_count=8)
    accommodation = Accommodation(
        accommodation_id="hut-1",
        name=" Monte Rosa Hut ",
        area_id="zermatt",
        altitude_meters=2883,
        bed_capacity=120,
    )
    trail = Trail(
        trail_id="trail-1",
        name=" Glacier Traverse ",
        area_id="zermatt",
        sac_scale="t4",
        distance_km=14.2,
        elevation_gain_meters=1100,
        estimated_duration_hours=7.5,
    )

    assert area.name == "Zermatt"
    assert area.country_code == "CH"
    assert accommodation.name == "Monte Rosa Hut"
    assert trail.sac_scale == "T4"


def test_business_object_validation_and_invariants() -> None:
    with pytest.raises(ReferenceDomainValidationError):
        Area(area_id="", name="A", country_code="CH", route_count=1)

    with pytest.raises(ReferenceDomainValidationError):
        Area(area_id="zermatt", name="   ", country_code="CH", route_count=1)

    with pytest.raises(ReferenceDomainValidationError):
        Accommodation(
            accommodation_id="hut-1",
            name="hut",
            area_id="zermatt",
            altitude_meters=1,
            bed_capacity=0,
        )

    with pytest.raises(ReferenceDomainValidationError):
        Trail(
            trail_id="trail-1",
            name="trail",
            area_id="zermatt",
            sac_scale="TX",
            distance_km=1.0,
            elevation_gain_meters=10,
            estimated_duration_hours=2.0,
        )


def test_domain_service_enforces_relationship_and_lifecycle_rules() -> None:
    service, area_repository, accommodation_repository, trail_repository = _service()

    with pytest.raises(ReferenceDomainValidationError):
        service.register_accommodation(
            Accommodation(
                accommodation_id="hut-1",
                name="Monte Rosa Hut",
                area_id="missing",
                altitude_meters=2883,
                bed_capacity=120,
            )
        )

    area = Area(area_id="zermatt", name="Zermatt", country_code="CH", route_count=8)
    service.register_area(area)
    accommodation = Accommodation(
        accommodation_id="hut-1",
        name="Monte Rosa Hut",
        area_id="zermatt",
        altitude_meters=2883,
        bed_capacity=120,
    )
    trail = Trail(
        trail_id="trail-1",
        name="Glacier Traverse",
        area_id="zermatt",
        sac_scale="T4",
        distance_km=14.2,
        elevation_gain_meters=1100,
        estimated_duration_hours=7.5,
    )
    service.register_accommodation(accommodation)
    service.register_trail(trail)

    with pytest.raises(ReferenceDomainValidationError):
        service.deactivate_area("zermatt")

    service.delist_accommodation(accommodation)
    updated_area = service.deactivate_area("zermatt")
    assert updated_area.is_active is False
    assert area_repository.get_by_id("zermatt") == updated_area
    assert accommodation_repository.accommodations["hut-1"].is_listed is False
    assert len(trail_repository.list_by_area("zermatt")) == 1


def test_ownership_boundaries_are_explicit_and_isolated() -> None:
    assert OWNED_BUSINESS_OBJECTS == ("Area", "Accommodation", "Trail")
    assert REFERENCE_DOMAIN_OWNERSHIP["trusted_knowledge"] is True
    assert owns_business_object("Area")
    assert owns_business_object("Journey") is False

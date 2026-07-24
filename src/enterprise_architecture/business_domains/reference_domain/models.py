"""Reference Domain business objects."""

from dataclasses import dataclass, replace

from src.enterprise_architecture.business_domains.reference_domain.errors import (
    ReferenceDomainValidationError,
)
from src.enterprise_architecture.business_domains.reference_domain.validation import (
    require_non_empty_text,
    require_non_negative_int,
    require_positive_float,
    require_positive_int,
)

ALLOWED_SAC_SCALES = ("T1", "T2", "T3", "T4", "T5", "T6")


@dataclass(frozen=True, slots=True)
class Area:
    """Trusted operational geography owned by Reference Domain."""

    area_id: str
    name: str
    country_code: str
    route_count: int
    is_active: bool = True

    def __post_init__(self) -> None:
        object.__setattr__(self, "area_id", require_non_empty_text("area_id", self.area_id))
        object.__setattr__(self, "name", require_non_empty_text("name", self.name))
        object.__setattr__(
            self, "country_code", require_non_empty_text("country_code", self.country_code)
        )
        object.__setattr__(
            self,
            "route_count",
            require_non_negative_int("route_count", self.route_count),
        )

    def deactivate(self) -> "Area":
        """Return a deactivated Area while preserving identity and facts."""
        return replace(self, is_active=False)


@dataclass(frozen=True, slots=True)
class Accommodation:
    """Curated accommodation trusted by AlpenTind."""

    accommodation_id: str
    name: str
    area_id: str
    altitude_meters: int
    bed_capacity: int
    is_listed: bool = True

    def __post_init__(self) -> None:
        object.__setattr__(
            self,
            "accommodation_id",
            require_non_empty_text("accommodation_id", self.accommodation_id),
        )
        object.__setattr__(self, "name", require_non_empty_text("name", self.name))
        object.__setattr__(self, "area_id", require_non_empty_text("area_id", self.area_id))
        object.__setattr__(
            self,
            "altitude_meters",
            require_non_negative_int("altitude_meters", self.altitude_meters),
        )
        object.__setattr__(
            self,
            "bed_capacity",
            require_positive_int("bed_capacity", self.bed_capacity),
        )

    def delist(self) -> "Accommodation":
        """Return the same accommodation as unavailable for future planning."""
        return replace(self, is_listed=False)


@dataclass(frozen=True, slots=True)
class Trail:
    """Trusted externally sourced trail knowledge."""

    trail_id: str
    name: str
    area_id: str
    sac_scale: str
    distance_km: float
    elevation_gain_meters: int
    estimated_duration_hours: float
    source_system: str = "trusted-external-source"

    def __post_init__(self) -> None:
        object.__setattr__(self, "trail_id", require_non_empty_text("trail_id", self.trail_id))
        object.__setattr__(self, "name", require_non_empty_text("name", self.name))
        object.__setattr__(self, "area_id", require_non_empty_text("area_id", self.area_id))
        object.__setattr__(
            self,
            "source_system",
            require_non_empty_text("source_system", self.source_system),
        )
        object.__setattr__(
            self,
            "elevation_gain_meters",
            require_non_negative_int("elevation_gain_meters", self.elevation_gain_meters),
        )
        object.__setattr__(
            self,
            "distance_km",
            require_positive_float("distance_km", self.distance_km),
        )
        object.__setattr__(
            self,
            "estimated_duration_hours",
            require_positive_float("estimated_duration_hours", self.estimated_duration_hours),
        )
        normalized_scale = require_non_empty_text("sac_scale", self.sac_scale).upper()
        if normalized_scale not in ALLOWED_SAC_SCALES:
            raise ReferenceDomainValidationError(
                f"sac_scale must be one of: {', '.join(ALLOWED_SAC_SCALES)}."
            )
        object.__setattr__(self, "sac_scale", normalized_scale)

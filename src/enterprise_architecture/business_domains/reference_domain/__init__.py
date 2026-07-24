"""Reference Domain business ownership implementation."""

from src.enterprise_architecture.business_domains.reference_domain.contracts import (
    AccommodationRepository,
    AreaRepository,
    TrailRepository,
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

__all__ = [
    "Accommodation",
    "AccommodationRepository",
    "Area",
    "AreaRepository",
    "OWNED_BUSINESS_OBJECTS",
    "REFERENCE_DOMAIN_OWNERSHIP",
    "ReferenceDomainService",
    "Trail",
    "TrailRepository",
    "owns_business_object",
]

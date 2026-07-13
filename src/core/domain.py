"""Core domain models."""

from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class BaseEntity:
    """Base entity with audit fields."""

    id: Optional[int] = None
    source: str = ""  # Where this data came from
    verification_status: str = "unverified"  # unverified, verified, disputed
    verified_at: Optional[datetime] = None  # When it was verified
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

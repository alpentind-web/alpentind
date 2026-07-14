"""Reusable SQLAlchemy column mixins for cross-cutting concerns."""

from datetime import UTC, datetime

from sqlalchemy import DateTime, String
from sqlalchemy.orm import Mapped, mapped_column


class AuditMixin:
    """Adds created_at / updated_at audit timestamps to any model (ADR-0004)."""

    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(UTC)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(UTC), onupdate=lambda: datetime.now(UTC)
    )


class VerificationMixin:
    """Adds verification metadata to models whose data comes from external sources."""

    verification_status: Mapped[str] = mapped_column(String(20), default="PENDING")
    verified_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    source_url: Mapped[str | None] = mapped_column(nullable=True)

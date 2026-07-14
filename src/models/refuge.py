"""Refuge model – a mountain hut on a route (externally verified data)."""

from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import AuditMixin, VerificationMixin


class Refuge(Base, AuditMixin, VerificationMixin):
    """A mountain refuge (hut) that appears as a stage point."""

    __tablename__ = "refuges"

    id: Mapped[int] = mapped_column(primary_key=True)
    official_name: Mapped[str]
    country: Mapped[str]
    elevation_m: Mapped[int]

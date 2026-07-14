"""Facility model – an amenity available at a lodging or refuge."""

from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import AuditMixin


class Facility(Base, AuditMixin):
    """An amenity or service available at a lodging or refuge."""

    __tablename__ = "facilities"

    id: Mapped[int] = mapped_column(primary_key=True)
    entity_type: Mapped[str]
    entity_id: Mapped[int]
    name: Mapped[str]
    value: Mapped[str]

"""Lodging model – accommodation at a stage point (externally verified data)."""

from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import AuditMixin, VerificationMixin


class Lodging(Base, AuditMixin, VerificationMixin):
    """Accommodation facility associated with a stage point."""

    __tablename__ = "lodgings"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    type: Mapped[str]
    country: Mapped[str]

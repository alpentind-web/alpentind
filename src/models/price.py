"""Price model – a seasonal price for any entity (externally verified data)."""

from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import AuditMixin, VerificationMixin


class Price(Base, AuditMixin, VerificationMixin):
    """A seasonal price record attached to any entity via a polymorphic reference."""

    __tablename__ = "prices"

    id: Mapped[int] = mapped_column(primary_key=True)
    entity_type: Mapped[str]
    entity_id: Mapped[int]
    season: Mapped[str]
    amount: Mapped[float]

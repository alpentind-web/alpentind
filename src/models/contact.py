"""Contact model – a contact detail for any entity (externally verified data)."""

from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import AuditMixin, VerificationMixin


class Contact(Base, AuditMixin, VerificationMixin):
    """A contact detail (email, phone, web) attached to any entity."""

    __tablename__ = "contacts"

    id: Mapped[int] = mapped_column(primary_key=True)
    entity_type: Mapped[str]
    entity_id: Mapped[int]
    kind: Mapped[str]
    value: Mapped[str]

"""GuideNote model – a structured note written by a guide about an entity."""

from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import AuditMixin


class GuideNote(Base, AuditMixin):
    """A categorised note authored by a guide, attached to any entity."""

    __tablename__ = "guide_notes"

    id: Mapped[int] = mapped_column(primary_key=True)
    entity_type: Mapped[str]
    entity_id: Mapped[int]
    category: Mapped[str]
    note: Mapped[str]

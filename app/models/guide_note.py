from sqlalchemy.orm import Mapped,mapped_column
from .base import Base

class GuideNote(Base):
    __tablename__ = "guide_notes"
    id: Mapped[int] = mapped_column(primary_key=True)
    entity_type: Mapped[str]
    entity_id: Mapped[int]
    category: Mapped[str]
    note: Mapped[str]

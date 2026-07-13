from sqlalchemy.orm import Mapped,mapped_column
from .base import Base

class Contact(Base):
    __tablename__ = "contacts"
    id: Mapped[int] = mapped_column(primary_key=True)
    entity_type: Mapped[str]
    entity_id: Mapped[int]
    kind: Mapped[str]
    value: Mapped[str]

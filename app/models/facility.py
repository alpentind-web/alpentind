from sqlalchemy.orm import Mapped,mapped_column
from .base import Base

class Facility(Base):
    __tablename__ = "facilitys"
    id: Mapped[int] = mapped_column(primary_key=True)
    entity_type: Mapped[str]
    entity_id: Mapped[int]
    name: Mapped[str]
    value: Mapped[str]

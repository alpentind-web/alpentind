from sqlalchemy.orm import Mapped,mapped_column
from .base import Base

class Refuge(Base):
    __tablename__ = "refuges"
    id: Mapped[int] = mapped_column(primary_key=True)
    official_name: Mapped[str]
    country: Mapped[str]
    elevation_m: Mapped[int]

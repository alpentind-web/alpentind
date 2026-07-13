from sqlalchemy.orm import Mapped,mapped_column
from .base import Base

class Departure(Base):
    __tablename__ = "departures"
    id: Mapped[int] = mapped_column(primary_key=True)
    product_id: Mapped[int]
    start_date: Mapped[str]
    max_participants: Mapped[int]

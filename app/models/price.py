from sqlalchemy.orm import Mapped,mapped_column
from .base import Base

class Price(Base):
    __tablename__ = "prices"
    id: Mapped[int] = mapped_column(primary_key=True)
    entity_type: Mapped[str]
    entity_id: Mapped[int]
    season: Mapped[str]
    amount: Mapped[float]

from sqlalchemy.orm import Mapped,mapped_column
from .base import Base

class Stage(Base):
    __tablename__ = "stages"
    id: Mapped[int] = mapped_column(primary_key=True)
    route_id: Mapped[int]
    day_number: Mapped[str]
    start_location: Mapped[str]
    end_location: Mapped[str]

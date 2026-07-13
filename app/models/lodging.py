from sqlalchemy.orm import Mapped,mapped_column
from .base import Base

class Lodging(Base):
    __tablename__ = "lodgings"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    type: Mapped[str]
    country: Mapped[str]

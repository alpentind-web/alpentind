from sqlalchemy.orm import Mapped,mapped_column
from .base import Base

class Route(Base):
    __tablename__='routes'
    id:Mapped[int]=mapped_column(primary_key=True)
    name:Mapped[str]
    direction:Mapped[str]
    days:Mapped[int]

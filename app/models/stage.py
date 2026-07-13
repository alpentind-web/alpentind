from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base
from .mixins import AuditMixin

class Stage(Base, AuditMixin):
    __tablename__ = "stages"

    id: Mapped[int] = mapped_column(primary_key=True)
    route_id: Mapped[int] = mapped_column(ForeignKey("routes.id"))
    day_number: Mapped[int]
    start_location: Mapped[str]
    end_location: Mapped[str]

    route = relationship("Route", back_populates="stages")

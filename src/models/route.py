"""Route model – a named multi-day mountain itinerary."""

from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base
from .mixins import AuditMixin


class Route(Base, AuditMixin):
    """A named directional mountain route composed of ordered stages."""

    __tablename__ = "routes"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    direction: Mapped[str]
    days: Mapped[int]

    stages = relationship("Stage", back_populates="route", cascade="all, delete-orphan")

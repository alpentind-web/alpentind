"""Departure model – a scheduled instance of a Product."""

from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import AuditMixin


class Departure(Base, AuditMixin):
    """A scheduled departure (run) of a Product with a fixed start date."""

    __tablename__ = "departures"

    id: Mapped[int] = mapped_column(primary_key=True)
    product_id: Mapped[int]
    start_date: Mapped[str]
    max_participants: Mapped[int]

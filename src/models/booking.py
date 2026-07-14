"""Booking model – a customer reservation on a Departure."""

from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import AuditMixin


class Booking(Base, AuditMixin):
    """A confirmed or pending reservation linking a Customer to a Departure."""

    __tablename__ = "bookings"

    id: Mapped[int] = mapped_column(primary_key=True)
    departure_id: Mapped[int]
    customer_id: Mapped[int]
    status: Mapped[str]

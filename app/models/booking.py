from sqlalchemy.orm import Mapped,mapped_column
from .base import Base

class Booking(Base):
    __tablename__ = "bookings"
    id: Mapped[int] = mapped_column(primary_key=True)
    departure_id: Mapped[int]
    customer_id: Mapped[int]
    status: Mapped[str]

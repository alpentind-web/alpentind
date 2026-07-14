"""Product model – a sellable expedition product based on a Route."""

from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import AuditMixin


class Product(Base, AuditMixin):
    """A sellable guided expedition product derived from a Route."""

    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    route_id: Mapped[int]
    price_eur: Mapped[float]

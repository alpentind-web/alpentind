"""Guide model – a certified mountain guide employed by AlpenTind."""

from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import AuditMixin


class Guide(Base, AuditMixin):
    """A certified mountain guide who leads departures."""

    __tablename__ = "guides"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str]
    last_name: Mapped[str]

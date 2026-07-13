from sqlalchemy.orm import Mapped,mapped_column
from .base import Base

class Guide(Base):
    __tablename__ = "guides"
    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str]
    last_name: Mapped[str]

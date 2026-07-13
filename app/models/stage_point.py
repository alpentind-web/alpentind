from sqlalchemy.orm import Mapped,mapped_column
from .base import Base

class StagePoint(Base):
    __tablename__ = "stage_points"
    id: Mapped[int] = mapped_column(primary_key=True)
    stage_id: Mapped[int]
    refuge_id: Mapped[int]
    lodging_id: Mapped[int]
    sequence_no: Mapped[int]

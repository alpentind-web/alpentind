from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import DateTime, String
from datetime import datetime

class AuditMixin:
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class VerificationMixin:
    verification_status: Mapped[str] = mapped_column(String(20), default="PENDING")
    verified_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    source_url: Mapped[str | None] = mapped_column(nullable=True)

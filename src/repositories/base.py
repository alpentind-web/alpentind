"""Unified generic repository base."""

import logging
from abc import abstractmethod
from typing import Generic, Optional, TypeVar

from sqlalchemy.orm import Session

logger = logging.getLogger(__name__)

T = TypeVar("T")


class Repository(Generic[T]):
    """Generic base for all repositories.

    Subclasses receive a SQLAlchemy session and must implement ``get``.
    """

    def __init__(self, session: Session) -> None:
        self.session = session

    @abstractmethod
    def get(self, id: int) -> Optional[T]:
        """Return the entity with the given primary key, or None."""
        ...

"""Unified repository base – ABC + session holder in one class."""

from abc import ABC, abstractmethod

from sqlalchemy.orm import Session


class BaseRepository(ABC):
    """Abstract base for all repositories.

    Subclasses receive a SQLAlchemy session and must implement ``get``.
    """

    def __init__(self, session: Session) -> None:
        self.session = session

    @abstractmethod
    def get(self, id: int):
        """Return the entity with the given primary key, or None."""
        ...

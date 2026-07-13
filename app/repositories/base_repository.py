"""Base Repository - abstract data access pattern."""

import logging
from typing import TypeVar, Generic, Type, List, Optional
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

logger = logging.getLogger(__name__)

T = TypeVar('T')


class BaseRepository(Generic[T]):
    """Generic repository for CRUD operations.
    
    All repositories should inherit from this class.
    """

    def __init__(self, session: Session, model: Type[T]):
        self.session = session
        self.model = model

    def create(self, obj: T) -> T:
        """Create a new record."""
        try:
            self.session.add(obj)
            self.session.flush()
            return obj
        except SQLAlchemyError as e:
            logger.error(f"Error creating {self.model.__name__}: {str(e)}")
            raise

    def get_by_id(self, id: int) -> Optional[T]:
        """Get a record by ID."""
        try:
            return self.session.query(self.model).filter(self.model.id == id).first()
        except SQLAlchemyError as e:
            logger.error(f"Error fetching {self.model.__name__} with id {id}: {str(e)}")
            raise

    def get_all(self) -> List[T]:
        """Get all records."""
        try:
            return self.session.query(self.model).all()
        except SQLAlchemyError as e:
            logger.error(f"Error fetching all {self.model.__name__}: {str(e)}")
            raise

    def update(self, id: int, obj: T) -> Optional[T]:
        """Update an existing record."""
        try:
            record = self.get_by_id(id)
            if record:
                for key, value in vars(obj).items():
                    if not key.startswith('_'):
                        setattr(record, key, value)
                self.session.flush()
                return record
            return None
        except SQLAlchemyError as e:
            logger.error(f"Error updating {self.model.__name__} with id {id}: {str(e)}")
            raise

    def delete(self, id: int) -> bool:
        """Delete a record by ID."""
        try:
            record = self.get_by_id(id)
            if record:
                self.session.delete(record)
                self.session.flush()
                return True
            return False
        except SQLAlchemyError as e:
            logger.error(f"Error deleting {self.model.__name__} with id {id}: {str(e)}")
            raise

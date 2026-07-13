from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import logging

from .config import DATABASE_URL

logger = logging.getLogger(__name__)

engine = create_engine(DATABASE_URL, future=True, echo=False)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)


def get_session():
    """Database session provider with error handling.
    
    Usage:
        for session in get_session():
            # use session
    """
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except Exception as e:
        session.rollback()
        logger.error(f"Database error: {str(e)}")
        raise
    finally:
        session.close()


def init_db():
    """Initialize database - create all tables."""
    try:
        from app.models import Base
        Base.metadata.create_all(bind=engine)
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize database: {str(e)}")
        raise


def drop_db():
    """Drop all database tables (use with caution)."""
    try:
        from app.models import Base
        Base.metadata.drop_all(bind=engine)
        logger.info("All database tables dropped")
    except Exception as e:
        logger.error(f"Failed to drop database: {str(e)}")
        raise

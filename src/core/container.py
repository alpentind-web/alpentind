"""Dependency container – central registry for shared infrastructure."""

from .database import get_session


class Container:
    """Provides access to shared infrastructure components."""

    get_session = staticmethod(get_session)

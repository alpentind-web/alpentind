from .database import get_session, init_db, drop_db


class Container:
    """Dependency Injection Container.
    
    Centralizes access to core services and dependencies.
    """
    get_session = staticmethod(get_session)
    init_db = staticmethod(init_db)
    drop_db = staticmethod(drop_db)

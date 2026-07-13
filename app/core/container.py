from .database import get_session

class Container:
    get_session = staticmethod(get_session)

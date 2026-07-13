from app.core.database import SessionLocal

def test_session_factory():
    session = SessionLocal()
    assert session is not None
    session.close()

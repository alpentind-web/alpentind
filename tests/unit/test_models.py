"""Tests for SQLAlchemy domain models."""

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.models.base import Base
from src.models.booking import Booking
from src.models.contact import Contact
from src.models.customer import Customer
from src.models.departure import Departure
from src.models.facility import Facility
from src.models.guide import Guide
from src.models.guide_note import GuideNote
from src.models.lodging import Lodging
from src.models.price import Price
from src.models.product import Product
from src.models.refuge import Refuge
from src.models.route import Route
from src.models.stage import Stage
from src.models.stage_point import StagePoint

pytestmark = pytest.mark.unit

_engine = create_engine("sqlite:///:memory:", future=True)
_Session = sessionmaker(bind=_engine, future=True)


def setup_module() -> None:
    Base.metadata.create_all(_engine)


def test_route_has_audit_fields() -> None:
    assert hasattr(Route, "created_at")
    assert hasattr(Route, "updated_at")


def test_stage_has_audit_fields() -> None:
    assert hasattr(Stage, "created_at")
    assert hasattr(Stage, "updated_at")


def test_refuge_has_verification_fields() -> None:
    assert hasattr(Refuge, "verification_status")
    assert hasattr(Refuge, "verified_at")
    assert hasattr(Refuge, "source_url")


def test_lodging_has_verification_fields() -> None:
    assert hasattr(Lodging, "verification_status")


def test_price_has_verification_fields() -> None:
    assert hasattr(Price, "verification_status")


def test_all_models_have_audit_fields() -> None:
    models = [
        Route, Stage, StagePoint, Refuge, Lodging, Product, Departure,
        Booking, Customer, Guide, GuideNote, Price, Facility, Contact,
    ]
    for model in models:
        assert hasattr(model, "created_at"), f"{model.__name__} missing created_at"
        assert hasattr(model, "updated_at"), f"{model.__name__} missing updated_at"


def test_route_persists() -> None:
    with _Session() as session:
        route = Route(name="Tour du Mont Blanc", direction="CW", days=11)
        session.add(route)
        session.commit()
        loaded = session.get(Route, route.id)
        assert loaded is not None
        assert loaded.name == "Tour du Mont Blanc"


def test_stage_persists_with_route() -> None:
    with _Session() as session:
        route = Route(name="TMB East", direction="CCW", days=7)
        session.add(route)
        session.flush()
        stage = Stage(
            route_id=route.id,
            day_number=1,
            start_location="Les Houches",
            end_location="Les Contamines",
        )
        session.add(stage)
        session.commit()
        assert stage.id is not None


def test_facility_tablename() -> None:
    assert Facility.__tablename__ == "facilities"

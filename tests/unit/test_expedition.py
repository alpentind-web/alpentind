"""Tests for the expedition domain (Route / Stage / StagePoint / Refuge / Lodging)."""

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.models.base import Base
from src.models.lodging import Lodging
from src.models.refuge import Refuge
from src.models.route import Route
from src.models.stage import Stage
from src.models.stage_point import StagePoint

pytestmark = pytest.mark.unit

_engine = create_engine("sqlite:///:memory:", future=True)
_Session = sessionmaker(bind=_engine, future=True)


def setup_module() -> None:
    Base.metadata.create_all(_engine)


def test_route_stage_relationship() -> None:
    with _Session() as session:
        route = Route(name="TMB Classic", direction="CW", days=11)
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
        loaded = session.get(Route, route.id)
        assert len(loaded.stages) == 1
        assert loaded.stages[0].start_location == "Les Houches"


def test_refuge_default_verification_status() -> None:
    with _Session() as session:
        refuge = Refuge(official_name="Refuge du Goûter", country="FR", elevation_m=3835)
        session.add(refuge)
        session.commit()
        loaded = session.get(Refuge, refuge.id)
        assert loaded.verification_status == "PENDING"


def test_lodging_default_verification_status() -> None:
    with _Session() as session:
        lodging = Lodging(name="Les Contamines Gite", type="gite", country="FR")
        session.add(lodging)
        session.commit()
        loaded = session.get(Lodging, lodging.id)
        assert loaded.verification_status == "PENDING"


def test_stage_point_stores_refuge_reference() -> None:
    with _Session() as session:
        route = Route(name="TMB Night", direction="CW", days=9)
        session.add(route)
        session.flush()
        stage = Stage(
            route_id=route.id, day_number=2,
            start_location="A", end_location="B",
        )
        session.add(stage)
        session.flush()
        refuge = Refuge(official_name="Test Hut", country="IT", elevation_m=2000)
        session.add(refuge)
        session.flush()
        sp = StagePoint(stage_id=stage.id, sequence_no=1, refuge_id=refuge.id)
        session.add(sp)
        session.commit()
        loaded = session.get(StagePoint, sp.id)
        assert loaded.refuge_id == refuge.id

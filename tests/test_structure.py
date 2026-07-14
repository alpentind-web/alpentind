"""Tests for codebase structural conventions."""

import importlib


def _importable(module: str) -> bool:
    try:
        importlib.import_module(module)
        return True
    except ImportError:
        return False


def test_src_package_importable() -> None:
    assert _importable("src")


def test_core_modules_importable() -> None:
    for mod in ("src.core.config", "src.core.database", "src.core.logging", "src.core.container"):
        assert _importable(mod), f"{mod} not importable"


def test_models_importable() -> None:
    models = [
        "src.models.base", "src.models.mixins",
        "src.models.route", "src.models.stage", "src.models.stage_point",
        "src.models.refuge", "src.models.lodging",
        "src.models.product", "src.models.departure",
        "src.models.booking", "src.models.customer",
        "src.models.guide", "src.models.guide_note",
        "src.models.price", "src.models.facility", "src.models.contact",
    ]
    for mod in models:
        assert _importable(mod), f"{mod} not importable"


def test_repositories_importable() -> None:
    assert _importable("src.repositories.base")


def test_services_importable() -> None:
    for mod in ("src.services.base_service", "src.services.pricing"):
        assert _importable(mod), f"{mod} not importable"


def test_cli_importable() -> None:
    assert _importable("src.cli.main")

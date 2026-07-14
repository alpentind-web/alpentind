"""Tests for the PricingService."""

import pytest

from src.services.pricing import PricingService

pytestmark = pytest.mark.unit


def test_break_even() -> None:
    """Break-even quantity: fixed=2730, price=1890, variable=770 → 2.44."""
    assert round(PricingService().break_even(2730, 1890, 770), 2) == 2.44

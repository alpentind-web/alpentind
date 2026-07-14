"""Tests for the PricingService."""

from src.services.pricing import PricingService


def test_break_even() -> None:
    """Break-even quantity: fixed=2730, price=1890, variable=770 → 2.44."""
    assert round(PricingService().break_even(2730, 1890, 770), 2) == 2.44

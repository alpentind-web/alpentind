"""Pricing service – financial calculations for expedition products."""

import logging

logger = logging.getLogger(__name__)


class PricingService:
    """Service for pricing and break-even calculations."""

    def break_even(self, fixed: float, price: float, variable: float) -> float:
        """Calculate the break-even quantity.

        Args:
            fixed: Total fixed costs.
            price: Selling price per unit.
            variable: Variable cost per unit.

        Returns:
            Minimum number of units to cover all costs.
        """
        return fixed / (price - variable)

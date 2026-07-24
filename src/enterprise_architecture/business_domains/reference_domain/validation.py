"""Validation helpers for Reference Domain business rules."""

from src.enterprise_architecture.business_domains.reference_domain.errors import (
    ReferenceDomainValidationError,
)


def require_non_empty_text(field_name: str, value: str) -> str:
    """Validate and normalize non-empty text."""
    normalized = value.strip()
    if not normalized:
        raise ReferenceDomainValidationError(f"{field_name} must be non-empty.")
    return normalized


def require_non_negative_int(field_name: str, value: int) -> int:
    """Validate integer fields that must be non-negative."""
    if value < 0:
        raise ReferenceDomainValidationError(f"{field_name} must be non-negative.")
    return value


def require_positive_int(field_name: str, value: int) -> int:
    """Validate integer fields that must be strictly positive."""
    if value <= 0:
        raise ReferenceDomainValidationError(f"{field_name} must be positive.")
    return value


def require_positive_float(field_name: str, value: float) -> float:
    """Validate float fields that must be strictly positive."""
    if value <= 0:
        raise ReferenceDomainValidationError(f"{field_name} must be positive.")
    return value

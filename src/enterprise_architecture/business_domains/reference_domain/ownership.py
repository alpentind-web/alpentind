"""Ownership declarations for Reference Domain."""

OWNED_BUSINESS_OBJECTS = ("Area", "Accommodation", "Trail")

REFERENCE_DOMAIN_OWNERSHIP = {
    "trusted_knowledge": True,
    "reference_objects": OWNED_BUSINESS_OBJECTS,
    "reference_validation": True,
    "reference_relationships": True,
    "reference_lifecycle_semantics": True,
}


def owns_business_object(object_name: str) -> bool:
    """Return whether a business object belongs to Reference Domain."""
    return object_name in OWNED_BUSINESS_OBJECTS

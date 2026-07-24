"""Architectural manifest for RI-001."""

from dataclasses import dataclass


@dataclass(frozen=True)
class ModuleDescriptor:
    """Static metadata for an RI-001 architectural module."""

    package: str
    role: str
    ownership: str
    responsibilities: tuple[str, ...]
    allowed_dependencies: tuple[str, ...]
    referenced_adrs: tuple[str, ...]
    referenced_pdrs: tuple[str, ...]
    referenced_esrs: tuple[str, ...]


ROOT_PACKAGE = "src.enterprise_architecture"

BUSINESS_DOMAIN_PACKAGES = (
    "src.enterprise_architecture.business_domains.reference_domain",
    "src.enterprise_architecture.business_domains.activity_design",
    "src.enterprise_architecture.business_domains.journey",
    "src.enterprise_architecture.business_domains.execution",
)

PLATFORM_VIEW_PACKAGES = (
    "src.enterprise_architecture.platform_views.overview",
    "src.enterprise_architecture.platform_views.calendar",
    "src.enterprise_architecture.platform_views.follow_up",
    "src.enterprise_architecture.platform_views.my_workday",
)

CROSS_CUTTING_LAYER_PACKAGES = (
    "src.enterprise_architecture.application",
    "src.enterprise_architecture.infrastructure",
    "src.enterprise_architecture.shared_technical",
    "src.enterprise_architecture.testing",
)

TEST_FOUNDATION_AREAS = (
    "business_domains",
    "application",
    "platform_views",
    "integration",
    "operational_validation",
)

MODULES = {
    "src.enterprise_architecture.business_domains.reference_domain": ModuleDescriptor(
        package="src.enterprise_architecture.business_domains.reference_domain",
        role="Business Domain",
        ownership=(
            "Trusted knowledge, reference objects, reference validation, reference "
            "relationships, and reference lifecycle semantics."
        ),
        responsibilities=(
            "own Area, Accommodation, and Trail as authoritative business objects",
            "enforce reference-domain invariants via domain model and services",
        ),
        allowed_dependencies=(
            "src.enterprise_architecture.business_domains.reference_domain",
            "src.enterprise_architecture.shared_technical",
        ),
        referenced_adrs=("ADR-003 Enterprise Architecture Standard",),
        referenced_pdrs=("PDR-012 Reference Domain Architecture",),
        referenced_esrs=(
            "ESR-001 Engineering Implementation Standard",
            "ESR-002 Minimum Viable Platform (MVP-001)",
        ),
    ),
    "src.enterprise_architecture.business_domains.activity_design": ModuleDescriptor(
        package="src.enterprise_architecture.business_domains.activity_design",
        role="Business Domain",
        ownership="Professional design decisions only.",
        responsibilities=(
            "reserve the Activity Design ownership boundary",
            "keep future design implementation isolated from other domains",
        ),
        allowed_dependencies=(
            "src.enterprise_architecture.business_domains.activity_design",
            "src.enterprise_architecture.shared_technical",
        ),
        referenced_adrs=("ADR-003 Enterprise Architecture Standard",),
        referenced_pdrs=("PDR-013 Activity Design Architecture",),
        referenced_esrs=(
            "ESR-001 Engineering Implementation Standard",
            "ESR-002 Minimum Viable Platform (MVP-001)",
        ),
    ),
    "src.enterprise_architecture.business_domains.journey": ModuleDescriptor(
        package="src.enterprise_architecture.business_domains.journey",
        role="Business Domain",
        ownership="Approved operational intent only.",
        responsibilities=(
            "reserve the Journey ownership boundary",
            "separate future operational intent implementation from execution and views",
        ),
        allowed_dependencies=(
            "src.enterprise_architecture.business_domains.journey",
            "src.enterprise_architecture.shared_technical",
        ),
        referenced_adrs=("ADR-003 Enterprise Architecture Standard",),
        referenced_pdrs=("PDR-011 Platform Architecture",),
        referenced_esrs=(
            "ESR-001 Engineering Implementation Standard",
            "ESR-002 Minimum Viable Platform (MVP-001)",
        ),
    ),
    "src.enterprise_architecture.business_domains.execution": ModuleDescriptor(
        package="src.enterprise_architecture.business_domains.execution",
        role="Business Domain",
        ownership="Operational commitments only.",
        responsibilities=(
            "reserve the Execution ownership boundary",
            "separate future execution implementation from views and adjacent domains",
        ),
        allowed_dependencies=(
            "src.enterprise_architecture.business_domains.execution",
            "src.enterprise_architecture.shared_technical",
        ),
        referenced_adrs=("ADR-003 Enterprise Architecture Standard",),
        referenced_pdrs=("PDR-014 Execution Architecture",),
        referenced_esrs=(
            "ESR-001 Engineering Implementation Standard",
            "ESR-002 Minimum Viable Platform (MVP-001)",
        ),
    ),
    "src.enterprise_architecture.platform_views.overview": ModuleDescriptor(
        package="src.enterprise_architecture.platform_views.overview",
        role="Platform View",
        ownership="Presentation-only operational orientation.",
        responsibilities=(
            "reserve the Overview projection boundary",
            "keep future orientation work separate from business ownership",
        ),
        allowed_dependencies=(
            "src.enterprise_architecture.platform_views.overview",
            "src.enterprise_architecture.application",
            "src.enterprise_architecture.business_domains",
            "src.enterprise_architecture.shared_technical",
        ),
        referenced_adrs=("ADR-003 Enterprise Architecture Standard",),
        referenced_pdrs=("PDR-011 Platform Architecture",),
        referenced_esrs=("ESR-001 Engineering Implementation Standard",),
    ),
    "src.enterprise_architecture.platform_views.calendar": ModuleDescriptor(
        package="src.enterprise_architecture.platform_views.calendar",
        role="Platform View",
        ownership="Presentation-only time orientation.",
        responsibilities=(
            "reserve the Calendar projection boundary",
            "keep future temporal projection work separate from business ownership",
        ),
        allowed_dependencies=(
            "src.enterprise_architecture.platform_views.calendar",
            "src.enterprise_architecture.application",
            "src.enterprise_architecture.business_domains",
            "src.enterprise_architecture.shared_technical",
        ),
        referenced_adrs=("ADR-003 Enterprise Architecture Standard",),
        referenced_pdrs=("PDR-011 Platform Architecture",),
        referenced_esrs=("ESR-001 Engineering Implementation Standard",),
    ),
    "src.enterprise_architecture.platform_views.follow_up": ModuleDescriptor(
        package="src.enterprise_architecture.platform_views.follow_up",
        role="Platform View",
        ownership="Presentation-only attention orientation.",
        responsibilities=(
            "reserve the Follow-up projection boundary",
            "keep future attention views separate from business ownership",
        ),
        allowed_dependencies=(
            "src.enterprise_architecture.platform_views.follow_up",
            "src.enterprise_architecture.application",
            "src.enterprise_architecture.business_domains",
            "src.enterprise_architecture.shared_technical",
        ),
        referenced_adrs=("ADR-003 Enterprise Architecture Standard",),
        referenced_pdrs=(
            "PDR-011 Platform Architecture",
            "PDR-014 Execution Architecture",
        ),
        referenced_esrs=(
            "ESR-001 Engineering Implementation Standard",
            "ESR-002 Minimum Viable Platform (MVP-001)",
        ),
    ),
    "src.enterprise_architecture.platform_views.my_workday": ModuleDescriptor(
        package="src.enterprise_architecture.platform_views.my_workday",
        role="Platform View",
        ownership="Presentation-only daily orientation.",
        responsibilities=(
            "reserve the My Workday projection boundary",
            "keep future daily orientation work separate from business ownership",
        ),
        allowed_dependencies=(
            "src.enterprise_architecture.platform_views.my_workday",
            "src.enterprise_architecture.application",
            "src.enterprise_architecture.business_domains",
            "src.enterprise_architecture.shared_technical",
        ),
        referenced_adrs=("ADR-003 Enterprise Architecture Standard",),
        referenced_pdrs=("PDR-011 Platform Architecture",),
        referenced_esrs=("ESR-001 Engineering Implementation Standard",),
    ),
    "src.enterprise_architecture.application": ModuleDescriptor(
        package="src.enterprise_architecture.application",
        role="Application Layer",
        ownership="Coordination only.",
        responsibilities=(
            "reserve orchestration space between domains and views",
            "prevent coordination logic from drifting into domains or views",
        ),
        allowed_dependencies=(
            "src.enterprise_architecture.application",
            "src.enterprise_architecture.business_domains",
            "src.enterprise_architecture.shared_technical",
        ),
        referenced_adrs=("ADR-003 Enterprise Architecture Standard",),
        referenced_pdrs=("PDR-011 Platform Architecture",),
        referenced_esrs=("ESR-001 Engineering Implementation Standard",),
    ),
    "src.enterprise_architecture.infrastructure": ModuleDescriptor(
        package="src.enterprise_architecture.infrastructure",
        role="Infrastructure Layer",
        ownership="Supporting technical implementation only.",
        responsibilities=(
            "reserve supporting adapter space behind architectural contracts",
            "prevent infrastructure concerns from leaking into ownership layers",
        ),
        allowed_dependencies=(
            "src.enterprise_architecture.infrastructure",
            "src.enterprise_architecture.application",
            "src.enterprise_architecture.business_domains",
            "src.enterprise_architecture.shared_technical",
        ),
        referenced_adrs=("ADR-003 Enterprise Architecture Standard",),
        referenced_pdrs=("PDR-011 Platform Architecture",),
        referenced_esrs=("ESR-001 Engineering Implementation Standard",),
    ),
    "src.enterprise_architecture.shared_technical": ModuleDescriptor(
        package="src.enterprise_architecture.shared_technical",
        role="Shared Technical Layer",
        ownership="Reusable technical capability only.",
        responsibilities=(
            "reserve shared technical capability space",
            "prohibit business ownership from entering shared components",
        ),
        allowed_dependencies=(
            "src.enterprise_architecture.shared_technical",
        ),
        referenced_adrs=("ADR-003 Enterprise Architecture Standard",),
        referenced_pdrs=("PDR-011 Platform Architecture",),
        referenced_esrs=("ESR-001 Engineering Implementation Standard",),
    ),
    "src.enterprise_architecture.testing": ModuleDescriptor(
        package="src.enterprise_architecture.testing",
        role="Testing Layer",
        ownership="Architecture validation guidance only.",
        responsibilities=(
            "reserve future architecture-aligned test placement",
            "keep structural validation visible before feature tests exist",
        ),
        allowed_dependencies=(
            "src.enterprise_architecture.testing",
            "src.enterprise_architecture.business_domains",
            "src.enterprise_architecture.application",
            "src.enterprise_architecture.platform_views",
            "src.enterprise_architecture.infrastructure",
            "src.enterprise_architecture.shared_technical",
        ),
        referenced_adrs=("ADR-003 Enterprise Architecture Standard",),
        referenced_pdrs=("PDR-011 Platform Architecture",),
        referenced_esrs=("ESR-001 Engineering Implementation Standard",),
    ),
}

ALLOWED_DEPENDENCY_PREFIXES = {
    package: descriptor.allowed_dependencies for package, descriptor in MODULES.items()
}

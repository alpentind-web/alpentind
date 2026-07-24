from pathlib import Path

from src.enterprise_architecture.manifest import BUSINESS_DOMAIN_PACKAGES, MODULES

REPO_ROOT = Path(__file__).resolve().parents[2]
REQUIRED_SECTIONS = (
    "## Purpose",
    "## Responsibilities",
    "## Ownership",
    "## Dependencies",
    "## Architectural Role",
    "## Referenced ADRs",
    "## Referenced PDRs",
    "## Referenced ESRs",
)


def test_business_domains_are_identifiable() -> None:
    assert BUSINESS_DOMAIN_PACKAGES == (
        "src.enterprise_architecture.business_domains.reference_domain",
        "src.enterprise_architecture.business_domains.activity_design",
        "src.enterprise_architecture.business_domains.journey",
        "src.enterprise_architecture.business_domains.execution",
    )


def test_business_domain_packages_have_local_documentation() -> None:
    for package in BUSINESS_DOMAIN_PACKAGES:
        package_path = REPO_ROOT / package.replace(".", "/")
        assert (package_path / "__init__.py").exists()
        readme = package_path / "README.md"
        assert readme.exists()
        content = readme.read_text(encoding="utf-8")
        for section in REQUIRED_SECTIONS:
            assert section in content


def test_business_domains_depend_only_on_shared_technical() -> None:
    for package in BUSINESS_DOMAIN_PACKAGES:
        allowed_dependencies = MODULES[package].allowed_dependencies
        assert allowed_dependencies == (
            package,
            "src.enterprise_architecture.shared_technical",
        )

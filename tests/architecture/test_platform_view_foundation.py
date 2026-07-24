from pathlib import Path

from src.enterprise_architecture.manifest import MODULES, PLATFORM_VIEW_PACKAGES

REPO_ROOT = Path(__file__).resolve().parents[2]


def test_platform_views_are_identifiable() -> None:
    assert PLATFORM_VIEW_PACKAGES == (
        "src.enterprise_architecture.platform_views.overview",
        "src.enterprise_architecture.platform_views.calendar",
        "src.enterprise_architecture.platform_views.follow_up",
        "src.enterprise_architecture.platform_views.my_workday",
    )


def test_platform_views_have_local_documentation() -> None:
    for package in PLATFORM_VIEW_PACKAGES:
        package_path = REPO_ROOT / package.replace(".", "/")
        assert (package_path / "__init__.py").exists()
        readme = package_path / "README.md"
        assert readme.exists()
        content = readme.read_text(encoding="utf-8")
        assert "Platform View." in content
        assert "## Dependencies" in content


def test_platform_views_do_not_allow_infrastructure_dependencies() -> None:
    for package in PLATFORM_VIEW_PACKAGES:
        allowed_dependencies = MODULES[package].allowed_dependencies
        assert "src.enterprise_architecture.infrastructure" not in allowed_dependencies

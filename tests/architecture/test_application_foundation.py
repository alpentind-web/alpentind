from pathlib import Path

from src.enterprise_architecture.manifest import MODULES

REPO_ROOT = Path(__file__).resolve().parents[2]
APPLICATION_PACKAGE = "src.enterprise_architecture.application"


def test_application_layer_is_present() -> None:
    package_path = REPO_ROOT / APPLICATION_PACKAGE.replace(".", "/")
    assert package_path.exists()
    assert (package_path / "__init__.py").exists()
    assert (package_path / "README.md").exists()


def test_application_layer_documents_coordination_role() -> None:
    readme = (
        REPO_ROOT / APPLICATION_PACKAGE.replace(".", "/") / "README.md"
    ).read_text(encoding="utf-8")
    assert "Application owns coordination only." in readme
    assert "## Dependencies" in readme


def test_application_layer_dependency_direction_is_explicit() -> None:
    assert MODULES[APPLICATION_PACKAGE].allowed_dependencies == (
        APPLICATION_PACKAGE,
        "src.enterprise_architecture.business_domains",
        "src.enterprise_architecture.shared_technical",
    )

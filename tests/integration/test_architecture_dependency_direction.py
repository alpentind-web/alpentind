import ast
from pathlib import Path

from src.enterprise_architecture.manifest import ALLOWED_DEPENDENCY_PREFIXES

REPO_ROOT = Path(__file__).resolve().parents[2]
ARCHITECTURE_ROOT = REPO_ROOT / "src/enterprise_architecture"


def _module_name(path: Path) -> str:
    relative = path.relative_to(REPO_ROOT).with_suffix("")
    parts = list(relative.parts)
    if parts[-1] == "__init__":
        parts = parts[:-1]
    return ".".join(parts)


def _internal_imports(path: Path) -> set[str]:
    tree = ast.parse(path.read_text(encoding="utf-8"))
    imports: set[str] = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                if alias.name.startswith("src.enterprise_architecture"):
                    imports.add(alias.name)
        elif isinstance(node, ast.ImportFrom) and node.module:
            if node.module.startswith("src.enterprise_architecture"):
                imports.add(node.module)
    return imports


def test_dependency_direction_matches_manifest() -> None:
    for path in ARCHITECTURE_ROOT.rglob("*.py"):
        module_name = _module_name(path)
        owner_package = next(
            (
                package
                for package in sorted(ALLOWED_DEPENDENCY_PREFIXES, key=len, reverse=True)
                if module_name == package or module_name.startswith(f"{package}.")
            ),
            None,
        )
        if owner_package is None:
            continue
        allowed_prefixes = ALLOWED_DEPENDENCY_PREFIXES[owner_package]
        for imported_module in _internal_imports(path):
            assert any(
                imported_module.startswith(prefix) for prefix in allowed_prefixes
            )


def test_non_reference_modules_remain_boundary_markers() -> None:
    for path in ARCHITECTURE_ROOT.rglob("*.py"):
        if path.name == "manifest.py":
            continue
        if "business_domains/reference_domain" in str(path):
            continue
        tree = ast.parse(path.read_text(encoding="utf-8"))
        body = tree.body
        assert len(body) == 1
        assert isinstance(body[0], ast.Expr)
        assert isinstance(body[0].value, ast.Constant)
        assert isinstance(body[0].value.value, str)

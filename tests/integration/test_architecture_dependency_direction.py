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
        if module_name not in ALLOWED_DEPENDENCY_PREFIXES:
            continue
        allowed_prefixes = ALLOWED_DEPENDENCY_PREFIXES[module_name]
        for imported_module in _internal_imports(path):
            assert imported_module.startswith(allowed_prefixes)


def test_architecture_package_contains_only_manifest_and_boundary_markers() -> None:
    for path in ARCHITECTURE_ROOT.rglob("*.py"):
        if path.name == "manifest.py":
            continue
        tree = ast.parse(path.read_text(encoding="utf-8"))
        body = tree.body
        assert len(body) == 1
        assert isinstance(body[0], ast.Expr)
        assert isinstance(body[0].value, ast.Constant)
        assert isinstance(body[0].value.value, str)

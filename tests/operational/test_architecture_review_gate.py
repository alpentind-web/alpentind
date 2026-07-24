from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]


def test_review_gate_answers_exist_in_local_architecture_docs() -> None:
    content = (
        REPO_ROOT / "src/enterprise_architecture/README.md"
    ).read_text(encoding="utf-8")
    assert "Where are Business Domains?" in content
    assert "Where are Platform Views?" in content
    assert "Where does future implementation belong?" in content
    assert "Where must implementation never be placed?" in content
    assert "How is ownership organized?" in content
    assert "How do dependencies flow?" in content


def test_ri001_reference_document_exists() -> None:
    ri_doc = (
        REPO_ROOT / "docs/40-reference/RI-001_ENTERPRISE_ARCHITECTURE_REFERENCE_IMPLEMENTATION.md"
    )
    assert ri_doc.exists()
    content = ri_doc.read_text(encoding="utf-8")
    assert "## Architectural Integrity Checks" in content
    assert "## Files and Directories Created or Updated" in content

"""Configuration for pytest."""

import pytest
import sys
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))


@pytest.fixture(scope="session")
def test_env():
    """Set up test environment."""
    import os
    os.environ["DATABASE_URL"] = "sqlite:///:memory:"
    yield

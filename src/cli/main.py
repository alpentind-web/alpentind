"""AlpenTind CLI entry point."""

import logging

from src.core.logging import configure_logging

logger = logging.getLogger(__name__)


def main() -> None:
    """Start the AlpenTind platform CLI."""
    configure_logging()
    logger.info("AlpenTind Platform starting")
    print("AlpenTind Platform v3.0.0-dev")


if __name__ == "__main__":
    main()

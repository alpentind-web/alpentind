"""Logging configuration for the AlpenTind platform."""

import logging


def configure_logging() -> None:
    """Configure the root logger with a standard format and INFO level."""
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )

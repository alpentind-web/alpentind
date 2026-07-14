"""Base service – thin wrapper that holds a repository reference."""

import logging
from typing import Any

from src.repositories.base import Repository

logger = logging.getLogger(__name__)


class BaseService:
    """Base class for all application services.

    Business logic belongs here, not in repositories or CLI.
    """

    def __init__(self, repository: Repository[Any]) -> None:
        self.repository = repository

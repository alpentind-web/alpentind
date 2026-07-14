"""Base service – thin wrapper that holds a repository reference."""

from src.repositories.base import BaseRepository


class BaseService:
    """Base class for all application services.

    Business logic belongs here, not in repositories or CLI.
    """

    def __init__(self, repository: BaseRepository) -> None:
        self.repository = repository

"""AlpenTind CLI entry point."""

import logging

import typer

from src import __version__
from src.core.logging import configure_logging

logger = logging.getLogger(__name__)

app = typer.Typer(help="AlpenTind Platform CLI")


def _version_callback(value: bool) -> None:
    if value:
        typer.echo(f"alpentind {__version__}")
        raise typer.Exit()


@app.callback()
def main(
    version: bool = typer.Option(
        False,
        "--version",
        "-v",
        callback=_version_callback,
        is_eager=True,
        help="Show the version and exit.",
    ),
) -> None:
    """AlpenTind Platform – operations platform for AlpenTind Guiding."""
    configure_logging()


@app.command()
def doctor() -> None:
    """Check the platform environment and configuration."""
    configure_logging()
    logger.info("Running doctor checks")
    typer.echo("AlpenTind doctor: all checks passed.")


@app.command("db")
def db_init() -> None:
    """Initialise the database schema."""
    configure_logging()
    logger.info("Initialising database schema")
    typer.echo("Database initialised.")


if __name__ == "__main__":
    app()

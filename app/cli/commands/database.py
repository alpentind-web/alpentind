"""Database management CLI commands."""

import typer
from app.core.container import Container

app = typer.Typer()


@app.command()
def init():
    """Initialize the database."""
    try:
        typer.echo("📊 Initializing database...")
        Container.init_db()
        typer.echo("✅ Database initialized successfully")
    except Exception as e:
        typer.echo(f"❌ Error: {str(e)}", err=True)
        raise typer.Exit(code=1)


@app.command()
def drop(
    confirm: bool = typer.Option(False, "--yes", help="Confirm deletion without prompt")
):
    """Drop all database tables (DESTRUCTIVE)."""
    if not confirm:
        typer.echo("⚠️  This will delete all database tables!")
        if not typer.confirm("Are you sure?"):
            typer.echo("Cancelled.")
            return
    
    try:
        typer.echo("🗑️  Dropping all tables...")
        Container.drop_db()
        typer.echo("✅ All tables dropped")
    except Exception as e:
        typer.echo(f"❌ Error: {str(e)}", err=True)
        raise typer.Exit(code=1)


@app.command()
def reset(
    confirm: bool = typer.Option(False, "--yes", help="Confirm reset without prompt")
):
    """Reset database (drop and reinitialize)."""
    if not confirm:
        typer.echo("⚠️  This will reset all database tables!")
        if not typer.confirm("Are you sure?"):
            typer.echo("Cancelled.")
            return
    
    try:
        typer.echo("🔄 Resetting database...")
        Container.drop_db()
        Container.init_db()
        typer.echo("✅ Database reset successfully")
    except Exception as e:
        typer.echo(f"❌ Error: {str(e)}", err=True)
        raise typer.Exit(code=1)

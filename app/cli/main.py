"""Main CLI application using Typer."""

import typer
from typing import Optional
from app.cli.commands import route, product, customer, database

app = typer.Typer(
    name="alpentind",
    help="AlpenTind Platform - Mountain Expedition Management"
)

# Register command groups
app.add_typer(route.app, name="route", help="Route management commands")
app.add_typer(product.app, name="product", help="Product management commands")
app.add_typer(customer.app, name="customer", help="Customer management commands")
app.add_typer(database.app, name="db", help="Database management commands")


@app.command()
def version():
    """Show application version."""
    typer.echo("AlpenTind Platform v1.0.0")


@app.command()
def info():
    """Show application information."""
    typer.echo("""  
╔════════════════════════════════════════════╗
║     AlpenTind Platform v1.0.0               ║
║     Mountain Expedition Management          ║
╚════════════════════════════════════════════╝

Usage:
  alpentind [COMMAND] [OPTIONS]

Commands:
  route      - Route management
  product    - Product management
  customer   - Customer management
  db         - Database management
  version    - Show version
  info       - Show this information

Examples:
  alpentind route create --name "Tour du Mont Blanc"
  alpentind product list
  alpentind customer create --name "John Doe" --email john@example.com
  alpentind db init
    """)


if __name__ == "__main__":
    app()

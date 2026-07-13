"""Product management CLI commands."""

import typer
from typing import Optional
from app.core.container import Container
from app.services.product_service import ProductService

app = typer.Typer()


@app.command()
def create(
    name: str = typer.Option(..., help="Product name"),
    route_id: int = typer.Option(..., help="Route ID"),
    duration_days: int = typer.Option(..., help="Duration in days"),
    group_size_min: int = typer.Option(..., help="Minimum group size"),
    group_size_max: int = typer.Option(..., help="Maximum group size"),
    season: str = typer.Option(..., help="Season: spring, summer, fall, winter"),
    year: int = typer.Option(..., help="Year"),
    description: str = typer.Option("", help="Product description")
):
    """Create a new product."""
    try:
        session = next(Container.get_session())
        service = ProductService(session)
        product = service.create_product(
            name=name,
            route_id=route_id,
            duration_days=duration_days,
            group_size_min=group_size_min,
            group_size_max=group_size_max,
            season=season,
            year=year,
            description=description
        )
        session.commit()
        typer.echo(f"✅ Product created: {product.name} (ID: {product.id})")
    except Exception as e:
        typer.echo(f"❌ Error: {str(e)}", err=True)
        raise typer.Exit(code=1)


@app.command()
def list(
    status: Optional[str] = typer.Option(None, help="Filter by status: draft, published, cancelled"),
    season: Optional[str] = typer.Option(None, help="Filter by season"),
    year: Optional[int] = typer.Option(None, help="Filter by year")
):
    """List all products."""
    try:
        session = next(Container.get_session())
        service = ProductService(session)
        
        if status:
            products = service.repository.get_by_status(status)
        elif season and year:
            products = service.get_products_by_season(season, year)
        else:
            products = service.repository.get_all()
        
        if not products:
            typer.echo("No products found.")
            return
        
        typer.echo(f"\n🎁 Found {len(products)} product(s):\n")
        for product in products:
            typer.echo(f"  ID: {product.id}")
            typer.echo(f"  Name: {product.name}")
            typer.echo(f"  Season/Year: {product.season} {product.year}")
            typer.echo(f"  Duration: {product.duration_days} days")
            typer.echo(f"  Group Size: {product.group_size_min}-{product.group_size_max}")
            typer.echo(f"  Status: {product.status}")
            typer.echo()
    except Exception as e:
        typer.echo(f"❌ Error: {str(e)}", err=True)
        raise typer.Exit(code=1)


@app.command()
def get(
    product_id: int = typer.Argument(..., help="Product ID")
):
    """Get product details."""
    try:
        session = next(Container.get_session())
        service = ProductService(session)
        product = service.get_product(product_id)
        
        if not product:
            typer.echo(f"❌ Product not found (ID: {product_id})", err=True)
            raise typer.Exit(code=1)
        
        typer.echo(f"\n🎁 Product: {product.name}\n")
        typer.echo(f"  ID: {product.id}")
        typer.echo(f"  Description: {product.description}")
        typer.echo(f"  Route ID: {product.route_id}")
        typer.echo(f"  Duration: {product.duration_days} days")
        typer.echo(f"  Group Size: {product.group_size_min}-{product.group_size_max}")
        typer.echo(f"  Season/Year: {product.season} {product.year}")
        typer.echo(f"  Status: {product.status}")
        typer.echo(f"  Created: {product.created_at}")
        typer.echo()
    except Exception as e:
        typer.echo(f"❌ Error: {str(e)}", err=True)
        raise typer.Exit(code=1)


@app.command()
def publish(
    product_id: int = typer.Argument(..., help="Product ID")
):
    """Publish a product (draft → published)."""
    try:
        session = next(Container.get_session())
        service = ProductService(session)
        success = service.publish_product(product_id)
        
        if success:
            session.commit()
            typer.echo(f"✅ Product {product_id} published")
        else:
            typer.echo(f"❌ Could not publish product (already published or not found)", err=True)
            raise typer.Exit(code=1)
    except Exception as e:
        typer.echo(f"❌ Error: {str(e)}", err=True)
        raise typer.Exit(code=1)


@app.command()
def cancel(
    product_id: int = typer.Argument(..., help="Product ID")
):
    """Cancel a product."""
    try:
        session = next(Container.get_session())
        service = ProductService(session)
        success = service.cancel_product(product_id)
        
        if success:
            session.commit()
            typer.echo(f"✅ Product {product_id} cancelled")
        else:
            typer.echo(f"❌ Product not found (ID: {product_id})", err=True)
            raise typer.Exit(code=1)
    except Exception as e:
        typer.echo(f"❌ Error: {str(e)}", err=True)
        raise typer.Exit(code=1)

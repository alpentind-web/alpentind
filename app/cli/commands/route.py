"""Route management CLI commands."""

import typer
from typing import Optional
from app.core.container import Container
from app.services.route_service import RouteService

app = typer.Typer()


@app.command()
def create(
    name: str = typer.Option(..., help="Route name"),
    distance_km: float = typer.Option(..., help="Distance in kilometers"),
    elevation_gain_m: int = typer.Option(..., help="Elevation gain in meters"),
    difficulty_level: str = typer.Option("moderate", help="Difficulty: beginner, moderate, challenging, expert"),
    estimated_days: int = typer.Option(..., help="Estimated number of days"),
    description: str = typer.Option("", help="Route description")
):
    """Create a new route."""
    try:
        session = next(Container.get_session())
        service = RouteService(session)
        route = service.create_route(
            name=name,
            distance_km=distance_km,
            elevation_gain_m=elevation_gain_m,
            difficulty_level=difficulty_level,
            estimated_days=estimated_days,
            description=description
        )
        session.commit()
        typer.echo(f"✅ Route created: {route.name} (ID: {route.id})")
    except Exception as e:
        typer.echo(f"❌ Error: {str(e)}", err=True)
        raise typer.Exit(code=1)


@app.command()
def list(
    difficulty: Optional[str] = typer.Option(None, help="Filter by difficulty level")
):
    """List all routes."""
    try:
        session = next(Container.get_session())
        service = RouteService(session)
        
        if difficulty:
            routes = service.get_routes_by_difficulty(difficulty)
        else:
            routes = service.repository.get_all()
        
        if not routes:
            typer.echo("No routes found.")
            return
        
        typer.echo(f"\n📍 Found {len(routes)} route(s):\n")
        for route in routes:
            typer.echo(f"  ID: {route.id}")
            typer.echo(f"  Name: {route.name}")
            typer.echo(f"  Distance: {route.distance_km} km")
            typer.echo(f"  Elevation: {route.elevation_gain_m} m")
            typer.echo(f"  Difficulty: {route.difficulty_level}")
            typer.echo(f"  Days: {route.estimated_days}")
            typer.echo(f"  Status: {route.verification_status}")
            typer.echo()
    except Exception as e:
        typer.echo(f"❌ Error: {str(e)}", err=True)
        raise typer.Exit(code=1)


@app.command()
def get(
    route_id: int = typer.Argument(..., help="Route ID")
):
    """Get route details."""
    try:
        session = next(Container.get_session())
        service = RouteService(session)
        route = service.get_route(route_id)
        
        if not route:
            typer.echo(f"❌ Route not found (ID: {route_id})", err=True)
            raise typer.Exit(code=1)
        
        typer.echo(f"\n📍 Route: {route.name}\n")
        typer.echo(f"  ID: {route.id}")
        typer.echo(f"  Description: {route.description}")
        typer.echo(f"  Distance: {route.distance_km} km")
        typer.echo(f"  Elevation Gain: {route.elevation_gain_m} m")
        typer.echo(f"  Difficulty: {route.difficulty_level}")
        typer.echo(f"  Estimated Days: {route.estimated_days}")
        typer.echo(f"  Status: {route.verification_status}")
        typer.echo(f"  Created: {route.created_at}")
        
        stages = service.get_route_stages(route_id)
        if stages:
            typer.echo(f"\n  Stages ({len(stages)}):")
            for stage in stages:
                typer.echo(f"    - Stage {stage.stage_number}: {stage.name}")
        typer.echo()
    except Exception as e:
        typer.echo(f"❌ Error: {str(e)}", err=True)
        raise typer.Exit(code=1)


@app.command()
def verify(
    route_id: int = typer.Argument(..., help="Route ID")
):
    """Mark a route as verified."""
    try:
        session = next(Container.get_session())
        service = RouteService(session)
        success = service.verify_route(route_id)
        
        if success:
            session.commit()
            typer.echo(f"✅ Route {route_id} verified")
        else:
            typer.echo(f"❌ Route not found (ID: {route_id})", err=True)
            raise typer.Exit(code=1)
    except Exception as e:
        typer.echo(f"❌ Error: {str(e)}", err=True)
        raise typer.Exit(code=1)

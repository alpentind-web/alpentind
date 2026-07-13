"""Customer management CLI commands."""

import typer
from typing import Optional
from app.core.container import Container
from app.services.customer_service import CustomerService

app = typer.Typer()


@app.command()
def create(
    name: str = typer.Option(..., help="Customer name"),
    email: str = typer.Option(..., help="Customer email"),
    experience_level: str = typer.Option("intermediate", help="Experience: beginner, intermediate, expert")
):
    """Create a new customer."""
    try:
        session = next(Container.get_session())
        service = CustomerService(session)
        customer = service.create_customer(
            name=name,
            email=email,
            experience_level=experience_level
        )
        session.commit()
        typer.echo(f"✅ Customer created: {customer.name} (ID: {customer.id})")
    except Exception as e:
        typer.echo(f"❌ Error: {str(e)}", err=True)
        raise typer.Exit(code=1)


@app.command()
def list():
    """List all customers."""
    try:
        session = next(Container.get_session())
        service = CustomerService(session)
        customers = service.get_all_customers()
        
        if not customers:
            typer.echo("No customers found.")
            return
        
        typer.echo(f"\n👥 Found {len(customers)} customer(s):\n")
        for customer in customers:
            typer.echo(f"  ID: {customer.id}")
            typer.echo(f"  Name: {customer.name}")
            typer.echo(f"  Email: {customer.email}")
            typer.echo(f"  Experience: {customer.experience_level}")
            typer.echo(f"  Status: {customer.verification_status}")
            typer.echo()
    except Exception as e:
        typer.echo(f"❌ Error: {str(e)}", err=True)
        raise typer.Exit(code=1)


@app.command()
def get(
    customer_id: int = typer.Argument(..., help="Customer ID")
):
    """Get customer details."""
    try:
        session = next(Container.get_session())
        service = CustomerService(session)
        customer = service.get_customer(customer_id)
        
        if not customer:
            typer.echo(f"❌ Customer not found (ID: {customer_id})", err=True)
            raise typer.Exit(code=1)
        
        typer.echo(f"\n👥 Customer: {customer.name}\n")
        typer.echo(f"  ID: {customer.id}")
        typer.echo(f"  Email: {customer.email}")
        typer.echo(f"  Phone: {customer.phone or 'Not set'}")
        typer.echo(f"  Country: {customer.country or 'Not set'}")
        typer.echo(f"  Experience: {customer.experience_level}")
        typer.echo(f"  Status: {customer.verification_status}")
        
        bookings = service.get_customer_bookings(customer_id)
        if bookings:
            typer.echo(f"\n  Bookings ({len(bookings)}):")
            for booking in bookings:
                typer.echo(f"    - Booking {booking.id}: {booking.status}")
        typer.echo()
    except Exception as e:
        typer.echo(f"❌ Error: {str(e)}", err=True)
        raise typer.Exit(code=1)


@app.command()
def verify(
    customer_id: int = typer.Argument(..., help="Customer ID")
):
    """Verify a customer."""
    try:
        session = next(Container.get_session())
        service = CustomerService(session)
        success = service.verify_customer(customer_id)
        
        if success:
            session.commit()
            typer.echo(f"✅ Customer {customer_id} verified")
        else:
            typer.echo(f"❌ Customer not found (ID: {customer_id})", err=True)
            raise typer.Exit(code=1)
    except Exception as e:
        typer.echo(f"❌ Error: {str(e)}", err=True)
        raise typer.Exit(code=1)

# AlpenTind CLI Commands

## Installation

```bash
pip install typer
```

## Usage

### Initialize Database

```bash
python -m app.cli.main db init
```

### Route Management

```bash
# Create a route
python -m app.cli.main route create \
  --name "Tour du Mont Blanc" \
  --distance-km 170 \
  --elevation-gain-m 10000 \
  --difficulty-level challenging \
  --estimated-days 10

# List all routes
python -m app.cli.main route list

# List routes by difficulty
python -m app.cli.main route list --difficulty challenging

# Get route details
python -m app.cli.main route get 1

# Verify a route
python -m app.cli.main route verify 1
```

### Product Management

```bash
# Create a product
python -m app.cli.main product create \
  --name "TMB Summer 2026" \
  --route-id 1 \
  --duration-days 10 \
  --group-size-min 5 \
  --group-size-max 15 \
  --season summer \
  --year 2026

# List all products
python -m app.cli.main product list

# List published products
python -m app.cli.main product list --status published

# Get product details
python -m app.cli.main product get 1

# Publish a product
python -m app.cli.main product publish 1

# Cancel a product
python -m app.cli.main product cancel 1
```

### Customer Management

```bash
# Create a customer
python -m app.cli.main customer create \
  --name "John Doe" \
  --email john@example.com \
  --experience-level beginner

# List all customers
python -m app.cli.main customer list

# Get customer details
python -m app.cli.main customer get 1

# Verify a customer
python -m app.cli.main customer verify 1
```

### Database Management

```bash
# Initialize database
python -m app.cli.main db init

# Reset database (drop and recreate)
python -m app.cli.main db reset

# Drop all tables
python -m app.cli.main db drop
```

## Architecture

The CLI layer is thin and delegates all business logic to Services:

```
CLI Commands
    ↓
Services (business logic)
    ↓
Repositories (data access)
    ↓
Models (domain objects)
    ↓
Database (SQLAlchemy)
```

No business logic is implemented in the CLI. All commands simply:
1. Parse arguments
2. Get a database session
3. Call the appropriate service
4. Display results

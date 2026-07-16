# Design Documentation

This directory contains design specifications and system documentation.

## Modules

- **Core** - Fundamental business concepts
- **Products** - Product definitions (Tour du Mont Blanc, Walker's Haute Route, etc.)
- **Operations** - Operational planning and execution
- **Sales** - Sales and booking management
- **Finance** - Financial management and reporting
- **CRM** - Customer relationship management
- **Safety** - Safety management and incident tracking
- **Documents** - Document generation and management
- **Analytics** - Business analytics and reporting

## Principles

- Modules are independent
- No circular dependencies
- Business logic lives only in Services
- Repositories handle database access only
- CLI is purely a user interface

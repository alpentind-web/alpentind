-- AlpenTind Platform – SQLite schema
-- Generated from src/models. Managed by Alembic (see database/migrations/).

CREATE TABLE routes (
    id          INTEGER PRIMARY KEY,
    name        TEXT    NOT NULL,
    direction   TEXT    NOT NULL,
    days        INTEGER NOT NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stages (
    id             INTEGER PRIMARY KEY,
    route_id       INTEGER NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    day_number     INTEGER NOT NULL,
    start_location TEXT    NOT NULL,
    end_location   TEXT    NOT NULL,
    created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE refuges (
    id                  INTEGER PRIMARY KEY,
    official_name       TEXT    NOT NULL,
    country             TEXT    NOT NULL,
    elevation_m         INTEGER NOT NULL,
    verification_status TEXT    NOT NULL DEFAULT 'PENDING',
    verified_at         DATETIME,
    source_url          TEXT,
    created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lodgings (
    id                  INTEGER PRIMARY KEY,
    name                TEXT NOT NULL,
    type                TEXT NOT NULL,
    country             TEXT NOT NULL,
    verification_status TEXT NOT NULL DEFAULT 'PENDING',
    verified_at         DATETIME,
    source_url          TEXT,
    created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stage_points (
    id          INTEGER PRIMARY KEY,
    stage_id    INTEGER NOT NULL,
    sequence_no INTEGER NOT NULL,
    refuge_id   INTEGER,
    lodging_id  INTEGER,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id         INTEGER PRIMARY KEY,
    name       TEXT    NOT NULL,
    route_id   INTEGER NOT NULL,
    price_eur  REAL    NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE departures (
    id               INTEGER PRIMARY KEY,
    product_id       INTEGER NOT NULL,
    start_date       TEXT    NOT NULL,
    max_participants INTEGER NOT NULL,
    created_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
    id         INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name  TEXT NOT NULL,
    email      TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    id           INTEGER PRIMARY KEY,
    departure_id INTEGER NOT NULL,
    customer_id  INTEGER NOT NULL,
    status       TEXT    NOT NULL,
    created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE guides (
    id         INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name  TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE guide_notes (
    id          INTEGER PRIMARY KEY,
    entity_type TEXT NOT NULL,
    entity_id   INTEGER NOT NULL,
    category    TEXT NOT NULL,
    note        TEXT NOT NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prices (
    id                  INTEGER PRIMARY KEY,
    entity_type         TEXT NOT NULL,
    entity_id           INTEGER NOT NULL,
    season              TEXT NOT NULL,
    amount              REAL NOT NULL,
    verification_status TEXT NOT NULL DEFAULT 'PENDING',
    verified_at         DATETIME,
    source_url          TEXT,
    created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE facilities (
    id          INTEGER PRIMARY KEY,
    entity_type TEXT NOT NULL,
    entity_id   INTEGER NOT NULL,
    name        TEXT NOT NULL,
    value       TEXT NOT NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
    id                  INTEGER PRIMARY KEY,
    entity_type         TEXT NOT NULL,
    entity_id           INTEGER NOT NULL,
    kind                TEXT NOT NULL,
    value               TEXT NOT NULL,
    verification_status TEXT NOT NULL DEFAULT 'PENDING',
    verified_at         DATETIME,
    source_url          TEXT,
    created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);


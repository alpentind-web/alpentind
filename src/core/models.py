"""SQLAlchemy models for core domain.

These models follow the domain dictionary and are designed for reuse
across all AlpenTind Platform products.

No product-specific models should be created in this layer.
"""

from datetime import datetime
from typing import Optional

from sqlalchemy import (
    Boolean,
    Column,
    Date,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Route(Base):
    """A geographical path or itinerary.

    Routes are reusable across multiple products.
    Example: Tour du Mont Blanc route, Walker's Haute Route.
    """

    __tablename__ = "routes"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, unique=True, index=True)
    description = Column(Text, nullable=True)
    distance_km = Column(Float, nullable=False)
    elevation_gain_m = Column(Integer, nullable=False)
    difficulty_level = Column(String(50), nullable=False)
    estimated_days = Column(Integer, nullable=False)

    source = Column(String(255), nullable=False, default="manual")
    verification_status = Column(String(50), nullable=False, default="unverified")
    verified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    stages = relationship("Stage", back_populates="route", cascade="all, delete-orphan")
    products = relationship("Product", back_populates="route")


class Stage(Base):
    """One day or segment within a Route."""

    __tablename__ = "stages"

    id = Column(Integer, primary_key=True)
    route_id = Column(Integer, ForeignKey("routes.id"), nullable=False, index=True)
    stage_number = Column(Integer, nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    distance_km = Column(Float, nullable=False)
    elevation_gain_m = Column(Integer, nullable=False)
    elevation_loss_m = Column(Integer, nullable=False)
    estimated_hours = Column(Float, nullable=False)

    source = Column(String(255), nullable=False, default="manual")
    verification_status = Column(String(50), nullable=False, default="unverified")
    verified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    route = relationship("Route", back_populates="stages")
    stage_points = relationship("StagePoint", back_populates="stage", cascade="all, delete-orphan")


class StagePoint(Base):
    """A waypoint or location within a Stage."""

    __tablename__ = "stage_points"

    id = Column(Integer, primary_key=True)
    stage_id = Column(Integer, ForeignKey("stages.id"), nullable=False, index=True)
    point_number = Column(Integer, nullable=False)
    name = Column(String(255), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    elevation_m = Column(Integer, nullable=False)
    type = Column(String(50), nullable=False)
    description = Column(Text, nullable=True)

    source = Column(String(255), nullable=False, default="manual")
    verification_status = Column(String(50), nullable=False, default="unverified")
    verified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    stage = relationship("Stage", back_populates="stage_points")


class Refuge(Base):
    """A mountain shelter or lodging facility."""

    __tablename__ = "refuges"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, unique=True, index=True)
    location = Column(String(255), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    elevation_m = Column(Integer, nullable=False)
    capacity = Column(Integer, nullable=False)
    contact_email = Column(String(255), nullable=True)
    contact_phone = Column(String(20), nullable=True)
    website = Column(String(255), nullable=True)

    source = Column(String(255), nullable=False, default="manual")
    verification_status = Column(String(50), nullable=False, default="unverified")
    verified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)


class Lodging(Base):
    """Accommodation or sleeping facility."""

    __tablename__ = "lodgings"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, unique=True, index=True)
    type = Column(String(50), nullable=False)
    location = Column(String(255), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    elevation_m = Column(Integer, nullable=False)
    capacity = Column(Integer, nullable=False)
    contact_email = Column(String(255), nullable=True)
    contact_phone = Column(String(20), nullable=True)
    website = Column(String(255), nullable=True)

    source = Column(String(255), nullable=False, default="manual")
    verification_status = Column(String(50), nullable=False, default="unverified")
    verified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)


class Product(Base):
    """A commercial offering or expedition package."""

    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    route_id = Column(Integer, ForeignKey("routes.id"), nullable=False, index=True)
    duration_days = Column(Integer, nullable=False)
    group_size_min = Column(Integer, nullable=False)
    group_size_max = Column(Integer, nullable=False)
    season = Column(String(50), nullable=False)
    year = Column(Integer, nullable=False)
    status = Column(String(50), nullable=False, default="draft")

    source = Column(String(255), nullable=False, default="manual")
    verification_status = Column(String(50), nullable=False, default="unverified")
    verified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    route = relationship("Route", back_populates="products")
    departures = relationship("Departure", back_populates="product", cascade="all, delete-orphan")
    prices = relationship("Price", back_populates="product", cascade="all, delete-orphan")


class Departure(Base):
    """A scheduled instance of a Product."""

    __tablename__ = "departures"

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False, index=True)
    departure_date = Column(Date, nullable=False, index=True)
    return_date = Column(Date, nullable=False)
    status = Column(String(50), nullable=False, default="open")
    available_spots = Column(Integer, nullable=False)
    guide_lead_id = Column(Integer, ForeignKey("guides.id"), nullable=True)

    source = Column(String(255), nullable=False, default="manual")
    verification_status = Column(String(50), nullable=False, default="unverified")
    verified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    product = relationship("Product", back_populates="departures")
    bookings = relationship("Booking", back_populates="departure", cascade="all, delete-orphan")
    guide_lead = relationship("Guide", foreign_keys=[guide_lead_id])


class Booking(Base):
    """A customer's reservation for a Departure."""

    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True)
    departure_id = Column(Integer, ForeignKey("departures.id"), nullable=False, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False, index=True)
    booking_date = Column(Date, nullable=False)
    status = Column(String(50), nullable=False, default="pending")
    price_total = Column(Numeric(10, 2), nullable=False)
    price_paid = Column(Numeric(10, 2), nullable=False, default=0)
    notes = Column(Text, nullable=True)

    source = Column(String(255), nullable=False, default="manual")
    verification_status = Column(String(50), nullable=False, default="unverified")
    verified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    departure = relationship("Departure", back_populates="bookings")
    customer = relationship("Customer", back_populates="bookings")


class Customer(Base):
    """A person or organization booking a product."""

    __tablename__ = "customers"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, index=True)
    email = Column(String(255), nullable=False, unique=True, index=True)
    phone = Column(String(20), nullable=True)
    address = Column(Text, nullable=True)
    country = Column(String(100), nullable=True)
    experience_level = Column(String(50), nullable=False, default="intermediate")
    emergency_contact = Column(String(255), nullable=True)
    emergency_phone = Column(String(20), nullable=True)

    source = Column(String(255), nullable=False, default="manual")
    verification_status = Column(String(50), nullable=False, default="unverified")
    verified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    bookings = relationship("Booking", back_populates="customer", cascade="all, delete-orphan")


class Guide(Base):
    """A professional mountain guide or expedition leader."""

    __tablename__ = "guides"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, index=True)
    email = Column(String(255), nullable=False, unique=True, index=True)
    phone = Column(String(20), nullable=True)
    certifications = Column(String(255), nullable=True)
    languages = Column(String(255), nullable=True)
    experience_years = Column(Integer, nullable=False)
    bio = Column(Text, nullable=True)
    active = Column(Boolean, nullable=False, default=True)

    source = Column(String(255), nullable=False, default="manual")
    verification_status = Column(String(50), nullable=False, default="unverified")
    verified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    guide_notes = relationship("GuideNote", back_populates="guide", cascade="all, delete-orphan")


class Price(Base):
    """Pricing information for a Product or service."""

    __tablename__ = "prices"

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False, index=True)
    currency = Column(String(10), nullable=False)
    base_price = Column(Numeric(10, 2), nullable=False)
    group_size_min = Column(Integer, nullable=False)
    group_size_max = Column(Integer, nullable=False)
    markup_percentage = Column(Float, nullable=True)
    notes = Column(Text, nullable=True)

    source = Column(String(255), nullable=False, default="manual")
    verification_status = Column(String(50), nullable=False, default="unverified")
    verified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    product = relationship("Product", back_populates="prices")


class Facility(Base):
    """An infrastructure or service resource."""

    __tablename__ = "facilities"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, index=True)
    type = Column(String(50), nullable=False)
    quantity = Column(Integer, nullable=False)
    status = Column(String(50), nullable=False, default="available")
    notes = Column(Text, nullable=True)

    source = Column(String(255), nullable=False, default="manual")
    verification_status = Column(String(50), nullable=False, default="unverified")
    verified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)


class GuideNote(Base):
    """Notes or observations by a guide."""

    __tablename__ = "guide_notes"

    id = Column(Integer, primary_key=True)
    guide_id = Column(Integer, ForeignKey("guides.id"), nullable=False, index=True)
    entity_type = Column(String(50), nullable=False)
    entity_id = Column(Integer, nullable=False)
    note_date = Column(Date, nullable=False, index=True)
    content = Column(Text, nullable=False)
    tags = Column(String(255), nullable=True)

    source = Column(String(255), nullable=False, default="manual")
    verification_status = Column(String(50), nullable=False, default="unverified")
    verified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    guide = relationship("Guide", back_populates="guide_notes")

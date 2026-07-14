.PHONY: help install dev test lint format typecheck clean

help:
	@echo "AlpenTind Platform - Development Commands"
	@echo ""
	@echo "install       Install production dependencies"
	@echo "dev           Install development dependencies"
	@echo "test          Run all tests with coverage"
	@echo "test-unit     Run unit tests only"
	@echo "test-int      Run integration tests only"
	@echo "lint          Run linters (ruff, flake8)"
	@echo "format        Format code (black, isort)"
	@echo "typecheck     Run type checking (mypy)"
	@echo "clean         Remove build artifacts and cache"

install:
	pip install -e .

dev:
	pip install -e ".[dev]"

test:
	pytest

test-unit:
	pytest tests/unit -m unit

test-int:
	pytest tests/integration -m integration

lint:
	ruff check src tests

format:
	black src tests

typecheck:
	mypy src

clean:
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	rm -rf .pytest_cache .mypy_cache .ruff_cache
	rm -rf htmlcov dist build *.egg-info

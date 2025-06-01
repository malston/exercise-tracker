.PHONY: help install dev build start lint type-check test clean format preview-import

# Default target - show help
help:
	@echo "Exercise Tracker - Available commands:"
	@echo "  make install       - Install dependencies"
	@echo "  make dev          - Start development server"
	@echo "  make build        - Build for production"
	@echo "  make start        - Start production server"
	@echo "  make lint         - Run ESLint"
	@echo "  make type-check   - Run TypeScript type checking"
	@echo "  make test         - Run linting and type checking"
	@echo "  make clean        - Clean build artifacts and node_modules"
	@echo "  make format       - Format code with Prettier (if installed)"
	@echo "  make preview-import - Preview the sample import file"

# Install dependencies
install:
	npm install

# Start development server
dev:
	npm run dev

# Build for production
build:
	npm run build

# Start production server (requires build first)
start:
	npm run start

# Run linting
lint:
	npm run lint

# Run TypeScript type checking
type-check:
	npx tsc --noEmit

# Run all tests (lint + type check)
test: lint type-check
	@echo "✅ All checks passed!"

# Clean build artifacts and dependencies
clean:
	rm -rf .next
	rm -rf node_modules
	rm -rf .turbo
	rm -rf out
	@echo "🧹 Cleaned build artifacts and dependencies"

# Format code with Prettier (optional - install prettier first)
format:
	@if command -v npx prettier > /dev/null; then \
		npx prettier --write "**/*.{js,jsx,ts,tsx,json,css,md}"; \
		echo "✨ Code formatted!"; \
	else \
		echo "⚠️  Prettier not installed. Run: npm install --save-dev prettier"; \
	fi

# Preview the sample import file
preview-import:
	@if [ -f workout-import.json ]; then \
		echo "📄 Sample import file (first 50 lines):"; \
		head -n 50 workout-import.json; \
	else \
		echo "⚠️  No workout-import.json file found"; \
	fi

# Development workflow shortcuts
.PHONY: check ci setup

# Run checks before committing
check: test
	@echo "✅ Ready to commit!"

# CI pipeline simulation
ci: install test build
	@echo "✅ CI pipeline passed!"

# Initial project setup
setup: install
	@echo "🚀 Project setup complete! Run 'make dev' to start developing."
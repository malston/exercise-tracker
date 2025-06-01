# Contributing to Exercise Tracker

First off, thank you for considering contributing to Exercise Tracker! It's people like you that make Exercise Tracker such a great tool. 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

- Fork the repository on GitHub
- Clone your fork locally
- Create a new branch for your feature or bug fix
- Make your changes
- Push to your fork and submit a pull request

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment (OS, browser, version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- A clear and descriptive title
- A detailed description of the proposed feature
- Why this enhancement would be useful
- Possible implementation approach

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good first issue` - Simple issues perfect for beginners
- `help wanted` - Issues where we need community help
- `documentation` - Documentation improvements

## Development Setup

1. **Prerequisites**
   ```bash
   # Node.js 18+ required
   node --version
   ```

2. **Install dependencies**
   ```bash
   make install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   make dev
   # or
   npm run dev
   ```

4. **Run tests**
   ```bash
   make test
   ```

## Style Guidelines

### TypeScript Style Guide

- Use TypeScript for all new code
- Define interfaces for all data structures
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### React/Component Guidelines

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper TypeScript types for props

### CSS/Styling

- Use Tailwind CSS utility classes
- Support dark mode for all new features
- Ensure responsive design (mobile-first)
- Test on multiple screen sizes

### Code Example

```typescript
// Good example
interface ExerciseProps {
  exercise: Exercise;
  onDelete: (id: string) => void;
}

export function ExerciseCard({ exercise, onDelete }: ExerciseProps) {
  // Component implementation
}
```

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test additions or modifications
- `chore:` Build process or auxiliary tool changes

Examples:
```
feat: add workout timer functionality
fix: correct exercise import validation
docs: update README with new features
```

## Pull Request Process

1. **Before submitting:**
   - Ensure all tests pass (`make test`)
   - Update documentation if needed
   - Add tests for new functionality
   - Follow the style guidelines

2. **PR Description:**
   - Reference any related issues
   - Describe your changes clearly
   - Include screenshots for UI changes
   - List any breaking changes

3. **Review Process:**
   - At least one maintainer review required
   - Address review feedback promptly
   - Keep PR focused on a single feature/fix
   - Resolve merge conflicts

4. **After Approval:**
   - Squash commits if requested
   - Ensure CI passes
   - Maintainer will merge

## Questions?

Feel free to:
- Open an issue for questions
- Join discussions in existing issues
- Reach out to maintainers

Thank you for contributing! 🙏
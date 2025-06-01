# Development Guide

This guide provides detailed information for developers working on the Exercise Tracker project.

## Architecture Overview

```
exercise-tracker/
├── app/                    # Next.js app directory (pages and layouts)
├── components/            # React components
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── public/                # Static assets
└── sample-imports/        # Example import files
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks + Local Storage
- **Build Tool**: Turbopack
- **Package Manager**: npm

## Key Concepts

### Data Models

The application uses TypeScript interfaces for type safety:

```typescript
// Exercise - Individual exercise entry
interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  sets?: Set[];
  duration?: number;
  distance?: number;
  notes?: string;
  date: string;
}

// Workout - Collection of exercises
interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  date: string;
  duration: number;
  notes?: string;
  isTemplate?: boolean;
}
```

### Component Structure

Components follow these principles:
- Functional components with TypeScript
- Props interfaces for type safety
- Separation of concerns (UI vs logic)
- Reusable and composable

Example:
```typescript
interface ComponentProps {
  data: DataType;
  onAction: (id: string) => void;
}

export function Component({ data, onAction }: ComponentProps) {
  // Component logic
}
```

### State Management

- Local component state with `useState`
- Persistent storage with custom `useLocalStorage` hook
- No external state management library needed

### Styling Guidelines

- Use Tailwind CSS utility classes
- Dark mode support with `dark:` prefix
- Responsive design with `sm:`, `md:`, `lg:` prefixes
- Component-specific styles in the component file

## Development Workflow

### 1. Setting Up Your Environment

```bash
# Clone the repository
git clone <repository-url>
cd exercise-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Making Changes

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the style guidelines

3. Test your changes:
   ```bash
   # Run linting
   npm run lint
   
   # Run type checking
   npx tsc --noEmit
   ```

4. Commit with conventional commits:
   ```bash
   git commit -m "feat: add new feature"
   ```

### 3. Testing

Currently, the project uses:
- ESLint for code quality
- TypeScript for type checking

Future testing improvements:
- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright

### 4. Building for Production

```bash
# Create production build
npm run build

# Test production build locally
npm run start
```

## Common Development Tasks

### Adding a New Exercise Type

1. Update the `ExerciseCategory` type in `types/exercise.ts`
2. Add category color in `ExerciseList.tsx`
3. Update form logic in `ExerciseForm.tsx`
4. Update parsers in `utils/parsers.ts`

### Adding a New Component

1. Create component file in `components/`
2. Define TypeScript interfaces for props
3. Implement component with proper types
4. Export from component file
5. Import and use in parent component

### Modifying Data Storage

1. Update interfaces in `types/`
2. Handle migration in `useLocalStorage` hook
3. Update import/export parsers
4. Test with existing data

## Debugging Tips

### Browser DevTools

- React Developer Tools for component inspection
- Local Storage viewer for data inspection
- Network tab for API calls (future feature)

### Common Issues

1. **TypeScript Errors**: Check type definitions match usage
2. **Styling Issues**: Verify Tailwind classes are valid
3. **State Issues**: Check localStorage data format
4. **Build Errors**: Clear `.next` folder and rebuild

## Performance Considerations

- Use React.memo for expensive components
- Lazy load large components
- Optimize images with Next.js Image component
- Minimize bundle size with dynamic imports

## Contributing New Features

1. Discuss in GitHub Issues first
2. Follow the component patterns
3. Add TypeScript types
4. Include dark mode support
5. Ensure responsive design
6. Update documentation

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Patterns](https://reactpatterns.com/)
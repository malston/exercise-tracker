# Claude Development Context

This file contains important context for Claude to continue development on the Exercise Tracker project.

## Project Overview

**Exercise Tracker** - A modern web application for tracking workouts and monitoring fitness progress.

- **Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Storage**: Browser localStorage (no backend required)
- **Architecture**: Component-based React with custom hooks

## Current Features

### ✅ Completed Features

1. **Exercise Management**
   - Individual exercise tracking with categories (strength, cardio, flexibility, balance, sports, other)
   - Dynamic forms that adapt based on exercise type
   - Sets/reps/weight for strength exercises
   - Duration/distance for cardio exercises
   - Notes and date tracking

2. **Workout Sessions**
   - Combine multiple exercises into workout sessions
   - Pre-built workout templates (Chest Day, Back Day, Leg Day, etc.)
   - Save custom workouts as reusable templates
   - Estimated workout duration calculations

3. **Data Import/Export**
   - Import exercises from CSV, JSON, XML files
   - Real-time parsing with preview and validation
   - Comprehensive sample files with documentation
   - Error handling and user-friendly feedback

4. **UI/UX**
   - Tab navigation between Exercises and Workouts
   - Dark mode support throughout
   - Responsive design (mobile-first)
   - Clean, modern interface

5. **Developer Experience**
   - Comprehensive documentation (CONTRIBUTING.md, CODE_OF_CONDUCT.md)
   - GitHub templates for issues and PRs
   - Makefile with common development tasks
   - TypeScript throughout with proper type definitions

## Project Structure

```
exercise-tracker/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page with tab navigation
├── components/            # React components
│   ├── ExerciseForm.tsx   # Form for adding individual exercises
│   ├── ExerciseList.tsx   # Display exercise history
│   ├── ImportExercises.tsx # File import functionality
│   ├── WorkoutForm.tsx    # Create workout sessions
│   └── WorkoutList.tsx    # Display workouts and templates
├── types/                 # TypeScript definitions
│   └── exercise.ts        # Core data models
├── utils/                 # Utility functions
│   ├── parsers.ts         # CSV/JSON/XML parsers
│   └── workout-templates.ts # Pre-defined workout templates
├── hooks/                 # Custom React hooks
│   └── useLocalStorage.ts # Persistent storage hook
├── sample-imports/        # Example import files
├── docs/                  # Development documentation
└── .github/               # GitHub templates
```

## Key Data Models

```typescript
interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  sets?: Set[];           // For strength exercises
  duration?: number;      // In minutes
  distance?: number;      // In kilometers
  notes?: string;
  date: string;          // ISO date string
}

interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  date: string;
  duration: number;      // Total estimated duration
  notes?: string;
  isTemplate?: boolean;  // Reusable template flag
}

interface Set {
  reps: number;
  weight?: number;       // In kilograms
  restTime?: number;     // In seconds
}
```

## Current Git State

- **Main Branch**: Contains stable code with contributor documentation
- **Feature Branch**: `feature/workout-sessions` (merged functionality)
- **Recent Major Commits**:
  - Workout sessions and import features
  - Contributor-friendly documentation
  - Sample import files organization

## Development Commands

```bash
# Setup
make install          # Install dependencies
make dev             # Start development server

# Quality
make lint            # Run ESLint
make type-check      # TypeScript checking
make test            # Run all checks

# Utilities
make preview-import  # Show sample import files
make clean          # Clean build artifacts
```

## Known Technical Decisions

1. **Local Storage**: Chose localStorage over external database for simplicity
2. **No External State Management**: React hooks sufficient for current scope
3. **TypeScript Throughout**: Strict typing for reliability
4. **Component Organization**: Functional components with clear separation of concerns
5. **File Formats**: Support CSV, JSON, XML for maximum compatibility

## Potential Future Enhancements

### High Priority
- **Export Functionality**: Export workouts/exercises to files
- **Exercise Library**: Searchable database with descriptions
- **Progress Tracking**: Charts and statistics over time

### Medium Priority
- **Workout Timer**: Rest timers and workout session timing
- **Exercise Templates**: Pre-defined exercise configurations
- **Data Backup/Sync**: Cloud storage integration

### Low Priority
- **Social Features**: Share workouts with others
- **Mobile App**: React Native version
- **Advanced Analytics**: ML-powered insights

## Important Implementation Notes

1. **ID Generation**: Uses `Date.now().toString() + Math.random().toString(36).substring(2, 11)`
2. **Weight Units**: All weights stored in kilograms
3. **Date Format**: ISO strings for consistency
4. **Error Handling**: User-friendly messages with technical details in console
5. **Responsive Design**: Tailwind breakpoints (sm:, md:, lg:)

## Code Quality Standards

- ESLint and TypeScript strict mode enabled
- Conventional commit messages
- Component props interfaces required
- Dark mode support mandatory for new features
- Mobile-responsive design required

## Sample Data Location

- `sample-imports/` directory contains example files
- `sample-imports/README.md` has format documentation
- Original workout data converted from Apple Notes format

## Recent Changes

1. Added comprehensive workout session functionality
2. Implemented multi-format import system
3. Created contributor documentation
4. Organized sample files with documentation
5. Fixed Makefile targets for new file locations

This context should help future Claude sessions understand the project state and continue development effectively.
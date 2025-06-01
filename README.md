# Exercise Tracker

A modern web application for tracking workouts and monitoring fitness progress. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Exercise Logging**: Track various types of exercises including strength training, cardio, flexibility, and more
- **Smart Forms**: Dynamic forms that adapt based on exercise type (sets/reps for strength, duration/distance for cardio)
- **Data Import**: Bulk import exercises from CSV, JSON, or XML files
- **Local Storage**: All data is saved locally in your browser
- **Dark Mode**: Automatic dark mode support
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd exercise-tracker
```

2. Install dependencies:
```bash
make install
# or
npm install
```

3. Start the development server:
```bash
make dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Adding Exercises Manually

1. Click the "+ Add Exercise" button
2. Fill in the exercise details:
   - **Name**: Exercise name (e.g., "Bench Press", "Morning Run")
   - **Category**: Select from strength, cardio, flexibility, balance, sports, or other
   - **Additional fields**: Based on category (sets/reps/weight for strength, duration/distance for cardio)
3. Click "Add Exercise" to save

### Importing Exercises

1. Click the "📁 Import Exercises" button
2. Select a file in CSV, JSON, or XML format
3. Review the preview of exercises to be imported
4. Click "Import" to add them to your exercise history

#### Import File Formats

**CSV Format:**
```csv
name,category,date,sets,duration,distance,notes
Bench Press,strength,2024-01-06,3x10@60kg,,,Felt strong today
Morning Run,cardio,2024-01-06,,30,5.5,Great weather
```

**JSON Format:**
```json
[
  {
    "name": "Bench Press",
    "category": "strength",
    "date": "2024-01-06",
    "sets": [
      { "reps": 10, "weight": 60 },
      { "reps": 10, "weight": 60 },
      { "reps": 10, "weight": 60 }
    ],
    "notes": "Felt strong today"
  }
]
```

**XML Format:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<exercises>
  <exercise>
    <name>Bench Press</name>
    <category>strength</category>
    <date>2024-01-06</date>
    <sets>
      <set>
        <reps>10</reps>
        <weight>60</weight>
      </set>
    </sets>
  </exercise>
</exercises>
```

## Sample Import Files

Example import files are available in the `sample-imports/` directory:
- `exercises-sample.csv` - CSV format example
- `exercises-sample.json` - JSON format example  
- `exercises-sample.xml` - XML format example
- `README.md` - Detailed format documentation

## Available Commands

This project includes a Makefile for common tasks:

```bash
make help          # Show all available commands
make dev           # Start development server
make build         # Build for production
make start         # Start production server
make lint          # Run ESLint
make type-check    # Run TypeScript type checking
make test          # Run all checks (lint + type-check)
make clean         # Clean build artifacts
make format        # Format code with Prettier (if installed)
```

## Project Structure

```sh
exercise-tracker/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ExerciseForm.tsx   # Form for adding exercises
│   ├── ExerciseList.tsx   # Display exercise history
│   └── ImportExercises.tsx # Import exercises from files
├── types/                 # TypeScript type definitions
│   └── exercise.ts        # Exercise data models
├── utils/                 # Utility functions
│   └── parsers.ts         # File parsing utilities
├── hooks/                 # Custom React hooks
│   └── useLocalStorage.ts # Local storage hook
└── public/                # Static assets
```

## Data Model

### Exercise Types

- **Strength**: Tracks sets, reps, and weight
- **Cardio**: Tracks duration and distance
- **Flexibility**: Tracks duration
- **Balance**: Tracks duration
- **Sports**: Tracks duration
- **Other**: Flexible tracking

### Storage

All exercise data is stored in the browser's local storage under the key `exercises`. Data persists between sessions but is specific to each browser/device.

## Development

### Running Tests

```bash
make test  # Run linting and type checking
```

### Building for Production

```bash
make build
make start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from native emoji# exercise-tracker

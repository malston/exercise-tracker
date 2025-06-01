# Sample Import Files

This directory contains example files demonstrating the correct format for importing exercises into the Exercise Tracker app.

## Available Formats

### CSV Format (`exercises-sample.csv`)
- **Headers**: name, category, date, sets, duration, distance, notes
- **Sets format**: Use notation like `3x10@60kg` (3 sets of 10 reps at 60kg)
- **Date format**: YYYY-MM-DD
- **Categories**: strength, cardio, flexibility, balance, sports, other

### JSON Format (`exercises-sample.json`)
- Array of exercise objects
- Sets are arrays with `reps`, `weight`, and optional `restTime` properties
- Weights are in kilograms
- Duration in minutes, distance in kilometers

### XML Format (`exercises-sample.xml`)
- Root `<exercises>` element containing multiple `<exercise>` elements
- Nested `<sets>` element for strength exercises
- All fields are optional except `name` and `category`

## Field Descriptions

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| name | string | Exercise name | "Bench Press" |
| category | string | Exercise type | "strength" |
| date | string | ISO date or YYYY-MM-DD | "2024-01-15" |
| sets | array/string | Set details for strength exercises | "3x10@60kg" or array |
| duration | number | Duration in minutes | 30 |
| distance | number | Distance in kilometers | 5.5 |
| notes | string | Additional notes | "Felt strong today" |

## Categories

- **strength**: Weight training exercises (includes sets/reps/weight)
- **cardio**: Cardiovascular exercises (includes duration/distance)
- **flexibility**: Stretching and mobility work (includes duration)
- **balance**: Balance and stability exercises (includes duration)
- **sports**: Sport-specific activities (includes duration)
- **other**: Any other exercise type

## Tips

1. Dates are optional - if omitted, the current date will be used
2. For bodyweight exercises, omit the weight field
3. Multiple exercises can have the same date
4. The import preview will show any validation errors before importing
5. All imported exercises will be added to your existing exercise history

## Usage

1. Download or create a file following one of the sample formats
2. Click "Import Exercises" in the app
3. Select your file
4. Review the preview
5. Click "Import" to add the exercises to your tracker
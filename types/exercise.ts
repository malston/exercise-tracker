export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  sets?: Set[];
  duration?: number; // in minutes
  distance?: number; // in km
  notes?: string;
  date: string; // ISO date string
}

export interface Set {
  reps: number;
  weight?: number; // in kg
  restTime?: number; // in seconds
}

export type ExerciseCategory = 
  | 'strength'
  | 'cardio'
  | 'flexibility'
  | 'balance'
  | 'sports'
  | 'other';

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  date: string;
  duration: number; // total duration in minutes
  notes?: string;
  isTemplate?: boolean; // true if this is a reusable template
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  exerciseNames: string[]; // Just the exercise names, not full exercises
  category: WorkoutCategory;
  description?: string;
}

export type WorkoutCategory = 
  | 'chest'
  | 'back'
  | 'legs'
  | 'shoulders'
  | 'arms'
  | 'core'
  | 'full-body'
  | 'cardio'
  | 'custom';
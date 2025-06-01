import { WorkoutTemplate } from '@/types/exercise';

export const defaultWorkoutTemplates: WorkoutTemplate[] = [
  {
    id: 'chest-day',
    name: 'Chest Day',
    category: 'chest',
    exerciseNames: [
      'Bench Press',
      'Decline Bench Press',
      'Incline Bench Press',
      'Dumbbell Fly',
      'Incline Pushups'
    ],
    description: 'Complete chest workout targeting upper, middle, and lower pecs'
  },
  {
    id: 'back-day',
    name: 'Back Day',
    category: 'back',
    exerciseNames: [
      'Pullups',
      'One Arm DB Row',
      'Bent DB Row',
      'TRX Pulldowns',
      'Deadlifts'
    ],
    description: 'Comprehensive back workout for lats, rhomboids, and traps'
  },
  {
    id: 'leg-day',
    name: 'Leg Day',
    category: 'legs',
    exerciseNames: [
      'DB Squats',
      'DB Deadlifts',
      'Romanian Leg Deadlifts',
      'DB Lunges',
      'Step Ups'
    ],
    description: 'Lower body workout targeting quads, hamstrings, and glutes'
  },
  {
    id: 'shoulder-arms',
    name: 'Shoulders & Arms',
    category: 'arms',
    exerciseNames: [
      'Arnold Press',
      'Shoulder Press',
      'Bicep Curls',
      'Hammer Curls',
      'Tricep Extensions'
    ],
    description: 'Upper body workout focusing on shoulders, biceps, and triceps'
  },
  {
    id: 'full-body',
    name: 'Full Body Circuit',
    category: 'full-body',
    exerciseNames: [
      'Squats',
      'Pushups',
      'Pullups',
      'Deadlifts',
      'Plank'
    ],
    description: 'Efficient full-body workout hitting all major muscle groups'
  },
  {
    id: 'cardio-hiit',
    name: 'HIIT Cardio',
    category: 'cardio',
    exerciseNames: [
      'Jump Rope',
      'Burpees',
      'Mountain Climbers',
      'High Knees',
      'Sprint Intervals'
    ],
    description: 'High-intensity interval training for cardiovascular fitness'
  }
];
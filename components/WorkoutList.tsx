'use client';

import { Workout } from '@/types/exercise';

interface WorkoutListProps {
  workouts: Workout[];
  onDelete: (id: string) => void;
  onStartWorkout?: (workout: Workout) => void;
}

export default function WorkoutList({ workouts, onDelete, onStartWorkout }: WorkoutListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      chest: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      back: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      legs: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      shoulders: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      arms: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      core: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'full-body': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
      cardio: 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400',
      custom: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    };
    return colors[category as keyof typeof colors] || colors.custom;
  };

  const getWorkoutCategory = (workout: Workout): string => {
    // Try to determine category from workout name or exercises
    const name = workout.name.toLowerCase();
    if (name.includes('chest')) return 'chest';
    if (name.includes('back')) return 'back';
    if (name.includes('leg')) return 'legs';
    if (name.includes('shoulder') || name.includes('arm')) return 'arms';
    if (name.includes('cardio') || name.includes('hiit')) return 'cardio';
    if (name.includes('full') || name.includes('body')) return 'full-body';
    return 'custom';
  };

  if (workouts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No workouts created yet. Start by creating your first workout!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <div
          key={workout.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold">{workout.name}</h3>
                {workout.isTemplate && (
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full">
                    Template
                  </span>
                )}
              </div>
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full ${getCategoryColor(
                  getWorkoutCategory(workout)
                )}`}
              >
                {getWorkoutCategory(workout)}
              </span>
            </div>
            <div className="flex gap-2">
              {onStartWorkout && workout.isTemplate && (
                <button
                  onClick={() => onStartWorkout(workout)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                >
                  Start Workout
                </button>
              )}
              <button
                onClick={() => onDelete(workout.id)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <div className="flex flex-wrap gap-2">
              <span className="font-medium">Exercises ({workout.exercises.length}):</span>
              {workout.exercises.map((exercise, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                >
                  {exercise.name}
                  {exercise.sets && ` (${exercise.sets.length} sets)`}
                  {exercise.duration && ` (${exercise.duration} min)`}
                </span>
              ))}
            </div>

            {workout.duration > 0 && (
              <div>
                <span className="font-medium">Est. Duration:</span> {workout.duration} minutes
              </div>
            )}

            {workout.notes && (
              <div>
                <span className="font-medium">Notes:</span> {workout.notes}
              </div>
            )}

            {!workout.isTemplate && (
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                {formatDate(workout.date)}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
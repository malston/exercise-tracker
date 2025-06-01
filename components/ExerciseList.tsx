'use client';

import { Exercise } from '@/types/exercise';

interface ExerciseListProps {
  exercises: Exercise[];
  onDelete: (id: string) => void;
}

export default function ExerciseList({ exercises, onDelete }: ExerciseListProps) {
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
      strength: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      cardio: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      flexibility: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      balance: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      sports: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      other: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  if (exercises.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No exercises logged yet. Start by adding your first exercise!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold">{exercise.name}</h3>
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full ${getCategoryColor(
                  exercise.category
                )}`}
              >
                {exercise.category}
              </span>
            </div>
            <button
              onClick={() => onDelete(exercise.id)}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              Delete
            </button>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            {exercise.sets && exercise.sets.length > 0 && (
              <div>
                <span className="font-medium">Sets:</span>
                {exercise.sets.map((set, index) => (
                  <span key={index} className="ml-2">
                    {set.reps} reps
                    {set.weight ? ` @ ${set.weight}kg` : ''}
                    {index < exercise.sets!.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            )}

            {exercise.duration && (
              <div>
                <span className="font-medium">Duration:</span> {exercise.duration} minutes
              </div>
            )}

            {exercise.distance && (
              <div>
                <span className="font-medium">Distance:</span> {exercise.distance} km
              </div>
            )}

            {exercise.notes && (
              <div>
                <span className="font-medium">Notes:</span> {exercise.notes}
              </div>
            )}

            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              {formatDate(exercise.date)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
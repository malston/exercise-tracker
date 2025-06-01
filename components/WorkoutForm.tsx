'use client';

import { useState } from 'react';
import { Exercise, Workout } from '@/types/exercise';
import { defaultWorkoutTemplates } from '@/utils/workout-templates';
import ExerciseForm from './ExerciseForm';

interface WorkoutFormProps {
  onSubmit: (workout: Omit<Workout, 'id'>) => void;
  onCancel: () => void;
}

export default function WorkoutForm({ onSubmit, onCancel }: WorkoutFormProps) {
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState<Omit<Exercise, 'id'>[]>([]);
  const [notes, setNotes] = useState('');
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [isTemplate, setIsTemplate] = useState(false);

  const handleTemplateSelect = (templateId: string) => {
    const template = defaultWorkoutTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setName(template.name);
      // Pre-populate with template exercise names
      const templateExercises = template.exerciseNames.map(name => ({
        name,
        category: 'strength' as const,
        date: new Date().toISOString(),
      }));
      setExercises(templateExercises);
    }
  };

  const handleAddExercise = (exercise: Omit<Exercise, 'id'>) => {
    setExercises([...exercises, exercise]);
    setShowExerciseForm(false);
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (exercises.length === 0) {
      alert('Please add at least one exercise to the workout');
      return;
    }

    const totalDuration = exercises.reduce((sum, ex) => {
      if (ex.duration) return sum + ex.duration;
      if (ex.sets) return sum + (ex.sets.length * 3); // Estimate 3 min per set
      return sum;
    }, 0);

    const workout: Omit<Workout, 'id'> = {
      name,
      exercises: exercises.map(ex => ({
        ...ex,
        id: Date.now().toString() + Math.random().toString(36).substring(2, 11),
      })),
      date: new Date().toISOString(),
      duration: totalDuration,
      notes: notes || undefined,
      isTemplate,
    };

    onSubmit(workout);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold">Create Workout</h2>

      {/* Template Selection */}
      <div>
        <label htmlFor="template" className="block text-sm font-medium mb-1">
          Use Template (Optional)
        </label>
        <select
          id="template"
          value={selectedTemplate}
          onChange={(e) => handleTemplateSelect(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
        >
          <option value="">Select a template...</option>
          {defaultWorkoutTemplates.map(template => (
            <option key={template.id} value={template.id}>
              {template.name} - {template.description}
            </option>
          ))}
        </select>
      </div>

      {/* Workout Name */}
      <div>
        <label htmlFor="workout-name" className="block text-sm font-medium mb-1">
          Workout Name
        </label>
        <input
          id="workout-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
          placeholder="e.g., Chest Day, Morning Workout"
        />
      </div>

      {/* Exercise List */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Exercises ({exercises.length})
        </label>
        
        {exercises.length > 0 && (
          <div className="space-y-2 mb-3">
            {exercises.map((exercise, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <div>
                  <span className="font-medium">{exercise.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    ({exercise.category})
                  </span>
                  {exercise.sets && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      {exercise.sets.length} sets
                    </span>
                  )}
                  {exercise.duration && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      {exercise.duration} min
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveExercise(index)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {!showExerciseForm ? (
          <button
            type="button"
            onClick={() => setShowExerciseForm(true)}
            className="w-full px-3 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500"
          >
            + Add Exercise
          </button>
        ) : (
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
            <ExerciseForm
              onSubmit={handleAddExercise}
              onCancel={() => setShowExerciseForm(false)}
            />
          </div>
        )}
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="workout-notes" className="block text-sm font-medium mb-1">
          Notes (optional)
        </label>
        <textarea
          id="workout-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
          placeholder="Any notes about this workout..."
        />
      </div>

      {/* Save as Template */}
      <div className="flex items-center">
        <input
          id="save-template"
          type="checkbox"
          checked={isTemplate}
          onChange={(e) => setIsTemplate(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="save-template" className="text-sm">
          Save as reusable template
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={exercises.length === 0}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Create Workout
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
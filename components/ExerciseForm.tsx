'use client';

import { useState } from 'react';
import { Exercise, ExerciseCategory, Set } from '@/types/exercise';

interface ExerciseFormProps {
  onSubmit: (exercise: Omit<Exercise, 'id'>) => void;
  onCancel: () => void;
}

export default function ExerciseForm({ onSubmit, onCancel }: ExerciseFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ExerciseCategory>('strength');
  const [sets, setSets] = useState<Set[]>([{ reps: 0, weight: 0 }]);
  const [duration, setDuration] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const exercise: Omit<Exercise, 'id'> = {
      name,
      category,
      date: new Date().toISOString(),
      notes: notes || undefined,
    };

    if (category === 'strength') {
      exercise.sets = sets.filter(set => set.reps > 0);
    } else if (category === 'cardio') {
      exercise.duration = duration || undefined;
      exercise.distance = distance || undefined;
    } else {
      exercise.duration = duration || undefined;
    }

    onSubmit(exercise);
  };

  const addSet = () => {
    setSets([...sets, { reps: 0, weight: 0 }]);
  };

  const updateSet = (index: number, field: keyof Set, value: number) => {
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], [field]: value };
    setSets(newSets);
  };

  const removeSet = (index: number) => {
    setSets(sets.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Exercise Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as ExerciseCategory)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
        >
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
          <option value="flexibility">Flexibility</option>
          <option value="balance">Balance</option>
          <option value="sports">Sports</option>
          <option value="other">Other</option>
        </select>
      </div>

      {category === 'strength' && (
        <div>
          <label className="block text-sm font-medium mb-2">Sets</label>
          {sets.map((set, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="number"
                placeholder="Reps"
                value={set.reps || ''}
                onChange={(e) => updateSet(index, 'reps', parseInt(e.target.value) || 0)}
                className="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                value={set.weight || ''}
                onChange={(e) => updateSet(index, 'weight', parseFloat(e.target.value) || 0)}
                className="w-32 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
              />
              <button
                type="button"
                onClick={() => removeSet(index)}
                className="px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSet}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            + Add Set
          </button>
        </div>
      )}

      {(category === 'cardio' || category === 'flexibility' || category === 'other') && (
        <div>
          <label htmlFor="duration" className="block text-sm font-medium mb-1">
            Duration (minutes)
          </label>
          <input
            id="duration"
            type="number"
            value={duration || ''}
            onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
          />
        </div>
      )}

      {category === 'cardio' && (
        <div>
          <label htmlFor="distance" className="block text-sm font-medium mb-1">
            Distance (km)
          </label>
          <input
            id="distance"
            type="number"
            step="0.1"
            value={distance || ''}
            onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
          />
        </div>
      )}

      <div>
        <label htmlFor="notes" className="block text-sm font-medium mb-1">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Exercise
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
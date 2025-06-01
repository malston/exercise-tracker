'use client';

import { useState } from 'react';
import { Exercise, Workout } from '@/types/exercise';
import ExerciseForm from '@/components/ExerciseForm';
import ExerciseList from '@/components/ExerciseList';
import ImportExercises from '@/components/ImportExercises';
import WorkoutForm from '@/components/WorkoutForm';
import WorkoutList from '@/components/WorkoutList';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Home() {
  const [exercises, setExercises] = useLocalStorage<Exercise[]>('exercises', []);
  const [workouts, setWorkouts] = useLocalStorage<Workout[]>('workouts', []);
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'exercises' | 'workouts'>('exercises');

  const handleAddExercise = (exerciseData: Omit<Exercise, 'id'>) => {
    const newExercise: Exercise = {
      ...exerciseData,
      id: Date.now().toString(),
    };
    setExercises([newExercise, ...exercises]);
    setShowForm(false);
  };

  const handleDeleteExercise = (id: string) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  const handleImportExercises = (importedExercises: Omit<Exercise, 'id'>[]) => {
    const newExercises: Exercise[] = importedExercises.map(exercise => ({
      ...exercise,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 11),
    }));
    setExercises([...newExercises, ...exercises]);
    setShowImport(false);
  };

  const handleAddWorkout = (workoutData: Omit<Workout, 'id'>) => {
    const newWorkout: Workout = {
      ...workoutData,
      id: Date.now().toString(),
    };
    setWorkouts([newWorkout, ...workouts]);
    setShowWorkoutForm(false);
  };

  const handleDeleteWorkout = (id: string) => {
    setWorkouts(workouts.filter(workout => workout.id !== id));
  };

  const handleStartWorkout = (template: Workout) => {
    // Create a new workout from template
    const newWorkout: Omit<Workout, 'id'> = {
      ...template,
      date: new Date().toISOString(),
      isTemplate: false,
    };
    handleAddWorkout(newWorkout);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Exercise Tracker
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track your workouts and monitor your fitness progress
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('exercises')}
            className={`pb-2 px-1 font-medium transition-colors ${
              activeTab === 'exercises'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Exercises
          </button>
          <button
            onClick={() => setActiveTab('workouts')}
            className={`pb-2 px-1 font-medium transition-colors ${
              activeTab === 'workouts'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Workouts
          </button>
        </div>

        <div className="mb-6">
          {activeTab === 'exercises' ? (
            !showForm && !showImport ? (
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  + Add Exercise
                </button>
                <button
                  onClick={() => setShowImport(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  📁 Import Exercises
                </button>
              </div>
            ) : showForm ? (
              <ExerciseForm
                onSubmit={handleAddExercise}
                onCancel={() => setShowForm(false)}
              />
            ) : (
              <ImportExercises
                onImport={handleImportExercises}
                onCancel={() => setShowImport(false)}
              />
            )
          ) : (
            !showWorkoutForm ? (
              <button
                onClick={() => setShowWorkoutForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                + Create Workout
              </button>
            ) : (
              <WorkoutForm
                onSubmit={handleAddWorkout}
                onCancel={() => setShowWorkoutForm(false)}
              />
            )
          )}
        </div>

        <div>
          {activeTab === 'exercises' ? (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Exercise History
              </h2>
              <ExerciseList exercises={exercises} onDelete={handleDeleteExercise} />
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Workouts & Templates
              </h2>
              <WorkoutList 
                workouts={workouts} 
                onDelete={handleDeleteWorkout}
                onStartWorkout={handleStartWorkout}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

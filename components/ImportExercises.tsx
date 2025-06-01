'use client';

import { useState } from 'react';
import { parseCSV, parseJSON, parseXML } from '@/utils/parsers';
import { Exercise } from '@/types/exercise';

interface ImportExercisesProps {
  onImport: (exercises: Omit<Exercise, 'id'>[]) => void;
  onCancel: () => void;
}

export default function ImportExercises({ onImport, onCancel }: ImportExercisesProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [preview, setPreview] = useState<Omit<Exercise, 'id'>[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setErrors([]);
    setPreview([]);
    setIsProcessing(true);

    try {
      const content = await selectedFile.text();
      let result;

      if (selectedFile.name.endsWith('.csv')) {
        result = parseCSV(content);
      } else if (selectedFile.name.endsWith('.json')) {
        result = parseJSON(content);
      } else if (selectedFile.name.endsWith('.xml')) {
        result = parseXML(content);
      } else {
        setErrors(['Unsupported file format. Please use CSV, JSON, or XML.']);
        setIsProcessing(false);
        return;
      }

      if (result.errors.length > 0) {
        setErrors(result.errors);
      }
      
      setPreview(result.exercises);
    } catch (error) {
      setErrors([`Error reading file: ${error}`]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImport = () => {
    if (preview.length > 0) {
      onImport(preview);
    }
  };

  const formatExample = () => {
    return {
      csv: `name,category,date,sets,duration,distance,notes
Bench Press,strength,2024-01-06,3x10@60kg,,,Felt strong today
Morning Run,cardio,2024-01-06,,30,5.5,Great weather
Yoga Session,flexibility,2024-01-06,,45,,Focused on hip mobility`,
      json: `[
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
  },
  {
    "name": "Morning Run",
    "category": "cardio",
    "date": "2024-01-06",
    "duration": 30,
    "distance": 5.5,
    "notes": "Great weather"
  }
]`,
      xml: `<?xml version="1.0" encoding="UTF-8"?>
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
      <set>
        <reps>10</reps>
        <weight>60</weight>
      </set>
    </sets>
    <notes>Felt strong today</notes>
  </exercise>
  <exercise>
    <name>Morning Run</name>
    <category>cardio</category>
    <date>2024-01-06</date>
    <duration>30</duration>
    <distance>5.5</distance>
    <notes>Great weather</notes>
  </exercise>
</exercises>`
    };
  };

  const examples = formatExample();

  return (
    <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold">Import Exercises</h2>
      
      <div>
        <label htmlFor="file-upload" className="block text-sm font-medium mb-2">
          Choose file (CSV, JSON, or XML)
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".csv,.json,.xml"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 dark:text-gray-400
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            dark:file:bg-blue-900 dark:file:text-blue-300
            dark:hover:file:bg-blue-800"
        />
      </div>

      {/* Format Examples */}
      <details className="text-sm">
        <summary className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline">
          View format examples
        </summary>
        <div className="mt-2 space-y-3">
          <div>
            <h4 className="font-medium">CSV Format:</h4>
            <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-x-auto text-xs">
              {examples.csv}
            </pre>
          </div>
          <div>
            <h4 className="font-medium">JSON Format:</h4>
            <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-x-auto text-xs">
              {examples.json}
            </pre>
          </div>
          <div>
            <h4 className="font-medium">XML Format:</h4>
            <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-x-auto text-xs">
              {examples.xml}
            </pre>
          </div>
        </div>
      </details>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-400 mb-1">
            Import Errors:
          </h3>
          <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Preview */}
      {preview.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">
            Preview ({preview.length} exercise{preview.length !== 1 ? 's' : ''} found)
          </h3>
          <div className="max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded p-2">
            <ul className="space-y-1 text-sm">
              {preview.map((exercise, index) => (
                <li key={index} className="flex justify-between">
                  <span>{exercise.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {exercise.category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <button
          onClick={handleImport}
          disabled={preview.length === 0 || isProcessing}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Import {preview.length > 0 && `(${preview.length})`}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
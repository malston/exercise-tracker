import { Exercise, ExerciseCategory, Set } from '@/types/exercise';

export interface ParseResult {
  success: boolean;
  exercises: Omit<Exercise, 'id'>[];
  errors: string[];
}

// CSV Parser
export function parseCSV(content: string): ParseResult {
  const errors: string[] = [];
  const exercises: Omit<Exercise, 'id'>[] = [];
  
  try {
    const lines = content.trim().split('\n');
    if (lines.length < 2) {
      return { success: false, exercises: [], errors: ['CSV file is empty or has no data rows'] };
    }
    
    const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
    const requiredHeaders = ['name', 'category'];
    
    for (const required of requiredHeaders) {
      if (!headers.includes(required)) {
        errors.push(`Missing required column: ${required}`);
      }
    }
    
    if (errors.length > 0) {
      return { success: false, exercises: [], errors };
    }
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length !== headers.length) {
        errors.push(`Row ${i + 1}: Column count mismatch`);
        continue;
      }
      
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });
      
      try {
        const exercise: Omit<Exercise, 'id'> = {
          name: row.name,
          category: validateCategory(row.category),
          date: row.date ? new Date(row.date).toISOString() : new Date().toISOString(),
          notes: row.notes || undefined,
        };
        
        // Parse sets for strength exercises
        if (exercise.category === 'strength' && row.sets) {
          exercise.sets = parseSets(row.sets);
        }
        
        // Parse duration
        if (row.duration) {
          exercise.duration = parseFloat(row.duration);
        }
        
        // Parse distance
        if (row.distance) {
          exercise.distance = parseFloat(row.distance);
        }
        
        exercises.push(exercise);
      } catch (error) {
        errors.push(`Row ${i + 1}: ${error}`);
      }
    }
    
    return { success: errors.length === 0, exercises, errors };
  } catch (error) {
    return { success: false, exercises: [], errors: [`CSV parsing error: ${error}`] };
  }
}

// JSON Parser
export function parseJSON(content: string): ParseResult {
  const errors: string[] = [];
  const exercises: Omit<Exercise, 'id'>[] = [];
  
  try {
    const data = JSON.parse(content);
    const exerciseArray = Array.isArray(data) ? data : data.exercises || [data];
    
    for (let i = 0; i < exerciseArray.length; i++) {
      const item = exerciseArray[i];
      
      if (!item.name || !item.category) {
        errors.push(`Exercise ${i + 1}: Missing required fields (name or category)`);
        continue;
      }
      
      try {
        const exercise: Omit<Exercise, 'id'> = {
          name: item.name,
          category: validateCategory(item.category),
          date: item.date ? new Date(item.date).toISOString() : new Date().toISOString(),
          notes: item.notes || undefined,
        };
        
        if (item.sets && Array.isArray(item.sets)) {
          exercise.sets = item.sets.map((set: any) => ({
            reps: parseInt(set.reps) || 0,
            weight: parseFloat(set.weight) || undefined,
            restTime: parseInt(set.restTime) || undefined,
          }));
        }
        
        if (item.duration) {
          exercise.duration = parseFloat(item.duration);
        }
        
        if (item.distance) {
          exercise.distance = parseFloat(item.distance);
        }
        
        exercises.push(exercise);
      } catch (error) {
        errors.push(`Exercise ${i + 1}: ${error}`);
      }
    }
    
    return { success: errors.length === 0, exercises, errors };
  } catch (error) {
    return { success: false, exercises: [], errors: [`JSON parsing error: ${error}`] };
  }
}

// XML Parser
export function parseXML(content: string): ParseResult {
  const errors: string[] = [];
  const exercises: Omit<Exercise, 'id'>[] = [];
  
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, 'text/xml');
    
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      return { success: false, exercises: [], errors: ['Invalid XML format'] };
    }
    
    const exerciseNodes = xmlDoc.querySelectorAll('exercise');
    if (exerciseNodes.length === 0) {
      return { success: false, exercises: [], errors: ['No exercise elements found in XML'] };
    }
    
    exerciseNodes.forEach((node, index) => {
      const name = node.querySelector('name')?.textContent;
      const category = node.querySelector('category')?.textContent;
      
      if (!name || !category) {
        errors.push(`Exercise ${index + 1}: Missing required elements (name or category)`);
        return;
      }
      
      try {
        const exercise: Omit<Exercise, 'id'> = {
          name,
          category: validateCategory(category),
          date: node.querySelector('date')?.textContent 
            ? new Date(node.querySelector('date')?.textContent || '').toISOString() 
            : new Date().toISOString(),
          notes: node.querySelector('notes')?.textContent || undefined,
        };
        
        // Parse sets
        const setsNode = node.querySelector('sets');
        if (setsNode) {
          const sets: Set[] = [];
          setsNode.querySelectorAll('set').forEach(setNode => {
            sets.push({
              reps: parseInt(setNode.querySelector('reps')?.textContent || '0'),
              weight: parseFloat(setNode.querySelector('weight')?.textContent || '0') || undefined,
              restTime: parseInt(setNode.querySelector('restTime')?.textContent || '0') || undefined,
            });
          });
          if (sets.length > 0) {
            exercise.sets = sets;
          }
        }
        
        const duration = node.querySelector('duration')?.textContent;
        if (duration) {
          exercise.duration = parseFloat(duration);
        }
        
        const distance = node.querySelector('distance')?.textContent;
        if (distance) {
          exercise.distance = parseFloat(distance);
        }
        
        exercises.push(exercise);
      } catch (error) {
        errors.push(`Exercise ${index + 1}: ${error}`);
      }
    });
    
    return { success: errors.length === 0, exercises, errors };
  } catch (error) {
    return { success: false, exercises: [], errors: [`XML parsing error: ${error}`] };
  }
}

// Helper functions
function validateCategory(category: string): ExerciseCategory {
  const validCategories: ExerciseCategory[] = ['strength', 'cardio', 'flexibility', 'balance', 'sports', 'other'];
  const normalized = category.toLowerCase() as ExerciseCategory;
  
  if (validCategories.includes(normalized)) {
    return normalized;
  }
  
  throw new Error(`Invalid category: ${category}. Must be one of: ${validCategories.join(', ')}`);
}

function parseSets(setsString: string): Set[] {
  // Format: "3x10@50kg" or "3x10" or multiple sets separated by semicolon
  const sets: Set[] = [];
  const setStrings = setsString.split(';');
  
  for (const setString of setStrings) {
    const match = setString.trim().match(/(\d+)x(\d+)(?:@([\d.]+)kg)?/);
    if (match) {
      const count = parseInt(match[1]);
      const reps = parseInt(match[2]);
      const weight = match[3] ? parseFloat(match[3]) : undefined;
      
      for (let i = 0; i < count; i++) {
        sets.push({ reps, weight });
      }
    }
  }
  
  return sets;
}
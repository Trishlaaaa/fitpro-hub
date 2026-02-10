import { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import Header from '@/components/Header';

export default function CustomWorkout() {
  const [workoutName, setWorkoutName] = useState('My Custom Workout');
  const [exercises, setExercises] = useState([
    { id: 1, name: 'Push-ups', sets: 3, reps: 10, rest: 60 },
    { id: 2, name: 'Squats', sets: 3, reps: 15, rest: 90 },
  ]);
  const [nextId, setNextId] = useState(3);

  const availableExercises = [
    { name: 'Push-ups', category: 'Chest' },
    { name: 'Pull-ups', category: 'Back' },
    { name: 'Dumbbell Rows', category: 'Back' },
    { name: 'Bench Press', category: 'Chest' },
    { name: 'Squats', category: 'Legs' },
    { name: 'Deadlifts', category: 'Legs' },
    { name: 'Lunges', category: 'Legs' },
    { name: 'Shoulder Press', category: 'Shoulders' },
    { name: 'Lateral Raises', category: 'Shoulders' },
    { name: 'Bicep Curls', category: 'Arms' },
    { name: 'Tricep Dips', category: 'Arms' },
    { name: 'Planks', category: 'Core' },
    { name: 'Crunches', category: 'Core' },
  ];

  const addExercise = (exerciseName: string) => {
    const newExercise = {
      id: nextId,
      name: exerciseName,
      sets: 3,
      reps: 10,
      rest: 60,
    };
    setExercises([...exercises, newExercise]);
    setNextId(nextId + 1);
  };

  const updateExercise = (id: number, field: string, value: any) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === id ? { ...ex, [field]: value } : ex
      )
    );
  };

  const removeExercise = (id: number) => {
    setExercises(exercises.filter((ex) => ex.id !== id));
  };

  const totalDuration = exercises.reduce(
    (acc, ex) => acc + (ex.sets * (ex.reps * 2 + ex.rest) / 60),
    0
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <div className="container-fitness py-8 md:py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-khand text-foreground mb-3">
            Custom Workout Builder
          </h1>
          <p className="text-lg text-muted-foreground">
            Create your personalized workout plan with our drag-and-drop builder
          </p>
        </div>

        {/* Workout Details */}
        <div className="card-elevated mb-8 p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Workout Name
              </label>
              <input
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Total Exercises
              </label>
              <div className="px-4 py-3 rounded-lg bg-muted text-foreground font-bold">
                {exercises.length}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Est. Duration
              </label>
              <div className="px-4 py-3 rounded-lg bg-primary/10 text-primary font-bold">
                ~{Math.round(totalDuration)} min
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors">
            <Save className="w-5 h-5" />
            Save Workout Plan
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Exercise Library */}
          <div className="md:col-span-1">
            <div className="card-elevated sticky top-32">
              <h2 className="text-xl font-bold font-khand text-foreground mb-6">
                Exercise Library
              </h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableExercises.map((exercise, index) => (
                  <button
                    key={index}
                    onClick={() => addExercise(exercise.name)}
                    className="w-full text-left p-3 rounded-lg bg-background/50 hover:bg-primary/10 transition-colors group"
                  >
                    <p className="font-semibold text-foreground group-hover:text-primary">
                      {exercise.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{exercise.category}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Workout Exercises */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              {exercises.map((exercise) => (
                <div key={exercise.id} className="card-elevated p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={exercise.name}
                        onChange={(e) => updateExercise(exercise.id, 'name', e.target.value)}
                        className="text-xl font-bold font-khand text-foreground bg-transparent border-b border-transparent hover:border-primary focus:border-primary outline-none transition-all w-full"
                      />
                    </div>
                    <button
                      onClick={() => removeExercise(exercise.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Sets
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={exercise.sets}
                        onChange={(e) => updateExercise(exercise.id, 'sets', parseInt(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-input text-foreground text-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Reps
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={exercise.reps}
                        onChange={(e) => updateExercise(exercise.id, 'reps', parseInt(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-input text-foreground text-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Rest (sec)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="300"
                        step="15"
                        value={exercise.rest}
                        onChange={(e) => updateExercise(exercise.id, 'rest', parseInt(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-input text-foreground text-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {exercises.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">
                  Select exercises from the library to build your workout
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

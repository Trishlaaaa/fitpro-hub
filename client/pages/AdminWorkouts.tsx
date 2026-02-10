import { useState } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import Header from '@/components/Header';

export default function AdminWorkouts() {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: 'Beginner Upper Body', goal: 'Muscle Gain', level: 'Beginner', duration: 45, exercises: 4 },
    { id: 2, name: 'Weight Loss Cardio', goal: 'Weight Loss', level: 'Intermediate', duration: 30, exercises: 4 },
    { id: 3, name: 'Advanced Leg Day', goal: 'Muscle Gain', level: 'Advanced', duration: 60, exercises: 4 },
    { id: 4, name: 'Strength Training', goal: 'Strength', level: 'Intermediate', duration: 50, exercises: 4 },
    { id: 5, name: 'Core Strength', goal: 'Strength', level: 'Beginner', duration: 30, exercises: 4 },
  ]);

  const deleteWorkout = (id: number) => {
    if (confirm('Are you sure you want to delete this workout?')) {
      setWorkouts(workouts.filter(workout => workout.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-background">
      <Header />

      <div className="container-fitness py-8 md:py-12">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-khand text-foreground mb-3">
              Workout Management
            </h1>
            <p className="text-lg text-muted-foreground">
              Total workouts: {workouts.length}
            </p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors h-fit">
            <Plus className="w-5 h-5" />
            Add Workout
          </button>
        </div>

        {/* Workouts Table */}
        <div className="card-elevated overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Workout Name
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Goal
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Level
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Exercises
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout) => (
                  <tr key={workout.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6 text-foreground font-semibold">{workout.name}</td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary">
                        {workout.goal}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${workout.level === 'Beginner'
                            ? 'bg-green-500/20 text-green-600'
                            : workout.level === 'Intermediate'
                              ? 'bg-yellow-500/20 text-yellow-600'
                              : 'bg-red-500/20 text-red-600'
                          }`}
                      >
                        {workout.level}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">{workout.duration} min</td>
                    <td className="py-4 px-6 text-muted-foreground">{workout.exercises}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteWorkout(workout.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

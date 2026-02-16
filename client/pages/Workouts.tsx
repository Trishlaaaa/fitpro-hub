import { useState, useEffect } from 'react';
import { Filter, Check, PlayCircle, PlusCircle, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import api from '@/lib/api';

interface Exercise {
  name: string;
  sets: number;
  reps: number | string;
  rest: number;
}

interface Workout {
  id: number;
  name: string;
  category: string;
  level: string;
  gender: string;
  duration: number;
  difficulty: string;
  exercises: Exercise[];
  completed?: boolean;
}

interface CustomWorkout {
  id: number;
  name: string;
  exercises: Exercise[];
  created_at: string;
  completed?: boolean;
}

export default function Workouts() {
  const [selectedGoal, setSelectedGoal] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [customWorkouts, setCustomWorkouts] = useState<CustomWorkout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const [res, customRes] = await Promise.all([
          api.get('/workouts/'),
          api.get('/custom-workouts/')
        ]);
        setWorkouts(res.data);
        setCustomWorkouts(customRes.data);
      } catch (err) {
        console.error("Failed to fetch workouts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  const calculateDuration = (exercises: Exercise[]) => {
    return Math.round(exercises.reduce((acc, ex) => {
      const reps = typeof ex.reps === 'string' ? parseInt(ex.reps) || 10 : ex.reps;
      return acc + (ex.sets * (reps * 2 + ex.rest) / 60);
    }, 0));
  };

  const handleStartWorkout = async (workout: Workout | CustomWorkout) => {
    try {
      console.log("Logging workout:", workout.name);
      const duration = 'duration' in workout ? workout.duration : calculateDuration(workout.exercises);

      await api.post('/logs/workout/', {
        workout_type: workout.name,
        duration_minutes: duration
      });

      // Update local state to show completion
      if ('created_at' in workout) {
        setCustomWorkouts(prev => prev.map(w =>
          w.id === workout.id ? { ...w, completed: true } : w
        ));
      } else {
        setWorkouts(prev => prev.map(w =>
          w.id === workout.id ? { ...w, completed: true } : w
        ));
      }

      alert(`Workout "${workout.name}" started and logged!`);
    } catch (err) {
      console.error("Failed to log workout", err);
      alert("Failed to log workout. Please try again.");
    }
  };

  const handleDeleteCustomWorkout = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent triggering the card click

    if (!window.confirm("Are you sure you want to delete this custom workout?")) {
      return;
    }

    try {
      await api.delete(`/custom-workouts/${id}/`);

      setCustomWorkouts(prev => prev.filter(w => w.id !== id));

      // Optional: Show success toast
    } catch (err) {
      console.error("Failed to delete custom workout", err);
      alert("Failed to delete workout. Please try again.");
    }
  };

  const filteredWorkouts = workouts.filter(workout => {
    const goalMatch = selectedGoal === 'all' || workout.category === selectedGoal;
    const levelMatch = selectedLevel === 'all' || workout.level === selectedLevel;
    const genderMatch = selectedGender === 'all' || workout.gender === selectedGender;
    return goalMatch && levelMatch && genderMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-background">
      <Header />

      {/* Gradient decoration - black to green */}
      <div className="absolute inset-0 h-96 bg-gradient-to-br from-primary/20 via-primary/8 to-transparent pointer-events-none" />

      <div className="container-fitness py-8 md:py-12 relative z-10">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-primary/30 to-primary/10 text-primary font-semibold text-xs uppercase tracking-wider backdrop-blur-md border border-primary/50 shadow-lg hover:shadow-primary/30 transition-all duration-300">
                💪 Comprehensive Workouts
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-khand text-foreground mb-3 leading-tight">
              Workout <span className="text-gradient">Programs</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose from expertly designed workout plans tailored to your goals
            </p>
          </div>

          <a
            href="/custom-workout"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <PlusCircle className="w-5 h-5" />
            Create Custom
          </a>
        </div>

        {/* Filters */}
        <div className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-background/70 via-background/60 to-background/50 border-2 border-primary/30 backdrop-blur-2xl shadow-2xl hover:shadow-primary/20 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold font-khand text-foreground">Filters</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Goal Filter */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Goal
              </label>
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="all">All Goals</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="strength">Strength</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Gender
              </label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Custom Workouts Section */}
        {customWorkouts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <PlayCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold font-khand text-foreground">My Custom Workouts</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {customWorkouts.map((workout, idx) => (
                <div key={`custom-${workout.id}`} className="group relative rounded-3xl overflow-hidden p-8 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent border-2 border-purple-500/20 shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:border-purple-500/50 backdrop-blur-2xl hover:-translate-y-2 cursor-pointer">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold font-khand text-foreground group-hover:text-purple-400 transition-colors duration-300">
                          {workout.name}
                        </h3>
                        {workout.completed && (
                          <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-600 flex items-center gap-1 font-semibold text-xs">
                            <Check className="w-4 h-4" />
                            Completed
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground/70">Custom Plan</p>
                    </div>

                    <button
                      onClick={(e) => handleDeleteCustomWorkout(e, workout.id)}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-all"
                      title="Delete Workout"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Meta Info */}
                  <div className="flex gap-4 mb-6 pb-6 border-b border-white/5 relative z-10">
                    <div>
                      <p className="text-xs text-muted-foreground/60 uppercase tracking-wider">Est. Duration</p>
                      <p className="font-bold text-foreground">{calculateDuration(workout.exercises)} min</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground/60 uppercase tracking-wider">Exercises</p>
                      <p className="font-bold text-foreground">{workout.exercises.length}</p>
                    </div>
                  </div>

                  {/* Exercises Preview */}
                  <div className="mb-6 relative z-10">
                    <h4 className="text-sm font-bold font-khand text-foreground/80 uppercase tracking-wider mb-3">
                      Exercises
                    </h4>
                    <ul className="space-y-2">
                      {workout.exercises.slice(0, 3).map((exercise, index) => (
                        <li key={index} className="flex items-center justify-between text-sm group/item">
                          <span className="text-foreground/70 group-hover/item:text-foreground transition-colors">{exercise.name}</span>
                          <span className="text-muted-foreground/50">
                            {exercise.sets}x{exercise.reps}
                          </span>
                        </li>
                      ))}
                      {workout.exercises.length > 3 && (
                        <li className="text-xs text-muted-foreground pt-1">
                          +{workout.exercises.length - 3} more exercises
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handleStartWorkout(workout)}
                    className="w-full relative z-10 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/50 font-bold font-khand uppercase text-sm tracking-wider hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300"
                  >
                    <PlayCircle className="w-5 h-5" />
                    {workout.completed ? "Restart Workout" : "Start Workout"}
                  </button>
                </div>
              ))}
            </div>

            <div className="my-12 border-t border-border/50" />
          </div>
        )}

        {/* Workouts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredWorkouts.map((workout, idx) => {
            const neonColors = [
              'from-primary/40 via-primary/20 to-primary/10',
              'from-green-500/40 via-emerald-500/20 to-emerald-400/10',
              'from-primary/40 via-primary/20 to-primary/10',
              'from-green-500/40 via-emerald-500/20 to-emerald-400/10',
              'from-primary/40 via-primary/20 to-primary/10',
              'from-green-500/40 via-emerald-500/20 to-emerald-400/10',
            ];
            return (
              <div key={workout.id} className={`group relative rounded-3xl overflow-hidden p-8 bg-gradient-to-br ${neonColors[idx]} border-2 border-primary/40 shadow-2xl hover:shadow-3xl hover:shadow-primary/50 transition-all duration-300 hover:border-primary/80 backdrop-blur-2xl hover:-translate-y-3 cursor-pointer`}>
                {/* Neon glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/0 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Header */}
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold font-khand text-primary group-hover:text-green-300 transition-colors duration-300">
                        {workout.name}
                      </h3>
                      {workout.completed && (
                        <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-600 flex items-center gap-1 font-semibold text-xs">
                          <Check className="w-4 h-4" />
                          Completed
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground/70 group-hover:text-primary/70 transition-colors duration-300">{workout.difficulty}</p>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex gap-4 mb-6 pb-6 border-b border-primary/20 relative z-10">
                  <div>
                    <p className="text-xs text-muted-foreground/60 uppercase tracking-wider">Duration</p>
                    <p className="font-bold text-primary">{workout.duration} min</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground/60 uppercase tracking-wider">Exercises</p>
                    <p className="font-bold text-primary">{workout.exercises.length}</p>
                  </div>
                </div>

                {/* Exercises */}
                <div className="mb-6 relative z-10">
                  <h4 className="text-sm font-bold font-khand text-primary/90 uppercase tracking-wider mb-3">
                    Exercises
                  </h4>
                  <ul className="space-y-2">
                    {workout.exercises.map((exercise, index) => (
                      <li key={index} className="flex items-center justify-between text-sm group/item">
                        <span className="text-foreground/90 font-medium group-hover/item:text-primary/80 transition-colors">{exercise.name}</span>
                        <span className="text-muted-foreground/70 group-hover/item:text-primary/60 transition-colors">
                          {exercise.sets}x{exercise.reps} {exercise.rest > 0 && `(${exercise.rest}s)`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleStartWorkout(workout)}
                  className="w-full relative z-10 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <PlayCircle className="w-5 h-5" />
                  {workout.completed ? "Restart Workout" : "Start Workout"}
                </button>
              </div>
            );
          })}
        </div>

        {filteredWorkouts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No workouts found with the selected filters. Try adjusting your choices.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

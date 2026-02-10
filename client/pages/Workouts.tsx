import { useState } from 'react';
import { Filter, Check, PlayCircle } from 'lucide-react';
import Header from '@/components/Header';

export default function Workouts() {
  const [selectedGoal, setSelectedGoal] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');

  const workouts = [
    {
      id: 1,
      name: 'Beginner Upper Body',
      goal: 'muscle-gain',
      level: 'beginner',
      gender: 'male',
      duration: 45,
      difficulty: '🟢 Easy',
      exercises: [
        { name: 'Push-ups', sets: 3, reps: 10, rest: 60 },
        { name: 'Dumbbell Rows', sets: 3, reps: 12, rest: 60 },
        { name: 'Chest Press', sets: 3, reps: 10, rest: 60 },
        { name: 'Shoulder Press', sets: 3, reps: 10, rest: 45 },
      ],
      completed: true,
    },
    {
      id: 2,
      name: 'Weight Loss Cardio',
      goal: 'weight-loss',
      level: 'intermediate',
      gender: 'female',
      duration: 30,
      difficulty: '🟡 Moderate',
      exercises: [
        { name: 'Running', sets: 1, reps: '20 mins', rest: 0 },
        { name: 'Jump Rope', sets: 3, reps: 30, rest: 30 },
        { name: 'Burpees', sets: 3, reps: 15, rest: 45 },
        { name: 'Mountain Climbers', sets: 3, reps: 20, rest: 45 },
      ],
      completed: false,
    },
    {
      id: 3,
      name: 'Advanced Leg Day',
      goal: 'muscle-gain',
      level: 'advanced',
      gender: 'male',
      duration: 60,
      difficulty: '🔴 Hard',
      exercises: [
        { name: 'Barbell Squats', sets: 4, reps: 8, rest: 120 },
        { name: 'Leg Press', sets: 4, reps: 10, rest: 90 },
        { name: 'Leg Curls', sets: 3, reps: 12, rest: 60 },
        { name: 'Calf Raises', sets: 4, reps: 15, rest: 45 },
      ],
      completed: false,
    },
    {
      id: 4,
      name: 'Strength Training',
      goal: 'strength',
      level: 'intermediate',
      gender: 'male',
      duration: 50,
      difficulty: '🟡 Moderate',
      exercises: [
        { name: 'Deadlifts', sets: 5, reps: 5, rest: 150 },
        { name: 'Bench Press', sets: 5, reps: 5, rest: 150 },
        { name: 'Rows', sets: 5, reps: 5, rest: 120 },
        { name: 'Overhead Press', sets: 3, reps: 8, rest: 90 },
      ],
      completed: false,
    },
    {
      id: 5,
      name: 'Maintenance Full Body',
      goal: 'maintenance',
      level: 'beginner',
      gender: 'female',
      duration: 40,
      difficulty: '🟢 Easy',
      exercises: [
        { name: 'Squats', sets: 3, reps: 15, rest: 60 },
        { name: 'Push-ups', sets: 3, reps: 12, rest: 60 },
        { name: 'Rows', sets: 3, reps: 12, rest: 60 },
        { name: 'Lunges', sets: 3, reps: 12, rest: 45 },
      ],
      completed: true,
    },
    {
      id: 6,
      name: 'Core Strength',
      goal: 'strength',
      level: 'beginner',
      gender: 'female',
      duration: 30,
      difficulty: '🟢 Easy',
      exercises: [
        { name: 'Planks', sets: 3, reps: '45 sec', rest: 45 },
        { name: 'Crunches', sets: 3, reps: 20, rest: 45 },
        { name: 'Leg Raises', sets: 3, reps: 15, rest: 45 },
        { name: 'Russian Twists', sets: 3, reps: 20, rest: 30 },
      ],
      completed: false,
    },
  ];

  const filteredWorkouts = workouts.filter(workout => {
    const goalMatch = selectedGoal === 'all' || workout.goal === selectedGoal;
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
        <div className="mb-12">
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
                <button className="w-full relative z-10 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95">
                  <PlayCircle className="w-5 h-5" />
                  Start Workout
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

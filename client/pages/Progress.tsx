import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area, AreaChart } from 'recharts';
import { TrendingUp, Calendar, Target } from 'lucide-react';
import Header from '@/components/Header';

export default function Progress() {
  const weightData = [
    { date: 'Jan 1', weight: 88, goal: 82 },
    { date: 'Jan 8', weight: 87.2, goal: 82 },
    { date: 'Jan 15', weight: 86.8, goal: 82 },
    { date: 'Jan 22', weight: 86.5, goal: 82 },
    { date: 'Jan 29', weight: 85.8, goal: 82 },
    { date: 'Feb 5', weight: 85, goal: 82 },
    { date: 'Feb 12', weight: 84.5, goal: 82 },
  ];

  const measurementData = [
    { date: 'Week 1', chest: 98, waist: 88, arms: 32, legs: 55 },
    { date: 'Week 2', chest: 98, waist: 87, arms: 32, legs: 55 },
    { date: 'Week 3', chest: 99, waist: 86, arms: 33, legs: 56 },
    { date: 'Week 4', chest: 100, waist: 85, arms: 33, legs: 56 },
    { date: 'Week 5', chest: 101, waist: 84, arms: 34, legs: 57 },
  ];

  const strengthData = [
    { exercise: 'Bench Press', weight: 75, reps: 8 },
    { exercise: 'Squat', weight: 120, reps: 6 },
    { exercise: 'Deadlift', weight: 150, reps: 5 },
    { exercise: 'Row', weight: 100, reps: 8 },
  ];

  const stats = [
    {
      label: 'Total Weight Lost',
      value: '3.5 kg',
      change: '↓ 4%',
      color: 'text-green-500',
    },
    {
      label: 'Workouts Completed',
      value: '24',
      change: '↑ 100%',
      color: 'text-primary',
    },
    {
      label: 'Average Adherence',
      value: '87%',
      change: '↑ 12%',
      color: 'text-blue-500',
    },
    {
      label: 'Chest Growth',
      value: '+3 cm',
      change: '↑ 3%',
      color: 'text-orange-500',
    },
  ];

  const summaryStats = [
    { label: 'Current Weight', value: '84.5 kg' },
    { label: 'Goal Weight', value: '82 kg' },
    { label: 'Chest', value: '101 cm' },
    { label: 'Waist', value: '84 cm' },
    { label: 'Arms', value: '34 cm' },
    { label: 'Legs', value: '57 cm' },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <div className="container-fitness py-8 md:py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-khand text-foreground mb-3">
            Your Progress
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your transformation over time
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="card-elevated">
              <h3 className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-2">
                {stat.label}
              </h3>
              <div className="flex items-baseline gap-3 mb-3">
                <p className="text-3xl font-bold font-khand text-foreground">
                  {stat.value}
                </p>
                <p className={`text-sm font-semibold ${stat.color}`}>
                  {stat.change}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Weight Chart */}
          <div className="card-elevated">
            <h2 className="text-2xl font-bold font-khand text-foreground mb-6">
              Weight Progress
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weightData}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[82, 89]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorWeight)"
                  name="Current Weight"
                />
                <Line
                  type="monotone"
                  dataKey="goal"
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="5 5"
                  name="Goal Weight"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Measurements Chart */}
          <div className="card-elevated">
            <h2 className="text-2xl font-bold font-khand text-foreground mb-6">
              Body Measurements
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={measurementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="chest" stroke="#ef4444" name="Chest (cm)" />
                <Line type="monotone" dataKey="waist" stroke="#f59e0b" name="Waist (cm)" />
                <Line type="monotone" dataKey="arms" stroke="#3b82f6" name="Arms (cm)" />
                <Line type="monotone" dataKey="legs" stroke="#10b981" name="Legs (cm)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Strength Progress */}
          <div className="card-elevated">
            <h2 className="text-2xl font-bold font-khand text-foreground mb-6">
              Strength Gains
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={strengthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="exercise" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Bar dataKey="weight" fill="hsl(var(--primary))" name="Weight (kg)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Current Measurements */}
          <div className="card-elevated">
            <h2 className="text-2xl font-bold font-khand text-foreground mb-6">
              Current Measurements
            </h2>
            <div className="space-y-3">
              {summaryStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <span className="text-muted-foreground font-semibold">{stat.label}</span>
                  <span className="text-lg font-bold text-primary">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Update Metrics Button */}
        <div className="text-center">
          <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors">
            Update Metrics
          </button>
        </div>
      </div>
    </div>
  );
}

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Droplet, Target, Zap } from 'lucide-react';
import Header from '@/components/Header';

export default function Dashboard() {
  // Mock user data
  const user = {
    name: 'John Doe',
    goal: 'Muscle Gain',
    level: 'Intermediate',
    weight: 85,
    height: 180,
    bmi: 26.2,
  };

  // Mock workout progress data
  const workoutProgress = [
    { week: 'Week 1', completed: 4 },
    { week: 'Week 2', completed: 5 },
    { week: 'Week 3', completed: 6 },
    { week: 'Week 4', completed: 5 },
    { week: 'Week 5', completed: 7 },
  ];

  // Mock weight tracking data
  const weightData = [
    { date: 'Jan 1', weight: 88 },
    { date: 'Jan 8', weight: 87.2 },
    { date: 'Jan 15', weight: 86.8 },
    { date: 'Jan 22', weight: 86.5 },
    { date: 'Jan 29', weight: 85.8 },
    { date: 'Feb 5', weight: 85 },
  ];

  // Mock diet adherence
  const dietAdherence = [
    { day: 'Mon', adherence: 85 },
    { day: 'Tue', adherence: 90 },
    { day: 'Wed', adherence: 78 },
    { day: 'Thu', adherence: 92 },
    { day: 'Fri', adherence: 88 },
    { day: 'Sat', adherence: 95 },
    { day: 'Sun', adherence: 80 },
  ];

  const stats = [
    {
      label: 'Today\'s Water Intake',
      value: '2.5L',
      goal: '3L',
      icon: Droplet,
      color: 'text-blue-500',
    },
    {
      label: 'Workouts This Week',
      value: '5',
      goal: '6',
      icon: Zap,
      color: 'text-primary',
    },
    {
      label: 'Current Weight',
      value: `${user.weight}kg`,
      goal: '80kg',
      icon: TrendingUp,
      color: 'text-green-500',
    },
    {
      label: 'BMI',
      value: user.bmi,
      goal: '24.9',
      icon: Target,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-background">
      <Header />

      {/* Gradient decoration - black to green */}
      <div className="absolute inset-0 h-96 bg-gradient-to-br from-primary/20 via-primary/8 to-transparent pointer-events-none" />

      <div className="container-fitness py-8 md:py-12 relative z-10">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold font-khand text-foreground mb-3 leading-tight">
            Welcome back, <span className="text-gradient">{user.name}!</span> 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Goal: <span className="font-semibold text-primary">{user.goal}</span> • Level: <span className="font-semibold text-foreground/90">{user.level}</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card-elevated">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-primary/10 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                  {stat.label}
                </h3>
                <p className="text-3xl font-bold font-khand text-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">Goal: {stat.goal}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Weight Tracking Chart */}
          <div className="card-elevated">
            <h2 className="text-2xl font-bold font-khand text-foreground mb-6">
              Weight Tracking
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[84, 89]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Progress: <span className="text-green-500 font-semibold">↓ 3kg</span> in 5 weeks
            </p>
          </div>

          {/* Workout Completion Chart */}
          <div className="card-elevated">
            <h2 className="text-2xl font-bold font-khand text-foreground mb-6">
              Weekly Workout Completion
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workoutProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Bar
                  dataKey="completed"
                  fill="hsl(var(--primary))"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Diet Adherence Chart */}
          <div className="card-elevated">
            <h2 className="text-2xl font-bold font-khand text-foreground mb-6">
              Diet Adherence
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dietAdherence}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Bar
                  dataKey="adherence"
                  fill="hsl(2 92% 49%)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Weekly Average: <span className="text-primary font-semibold">87%</span>
            </p>
          </div>

          {/* Quick Actions */}
          <div className="card-elevated flex flex-col">
            <h2 className="text-2xl font-bold font-khand text-foreground mb-6">
              Quick Actions
            </h2>
            <div className="space-y-3 flex-1">
              <button className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors">
                Start Workout
              </button>
              <button className="w-full px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold uppercase text-sm tracking-wider hover:bg-secondary/90 transition-colors">
                Log Meal
              </button>
              <button className="w-full px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold uppercase text-sm tracking-wider hover:bg-primary/5 transition-colors">
                View Progress
              </button>
              <button className="w-full px-6 py-3 rounded-lg border-2 border-muted text-foreground font-semibold uppercase text-sm tracking-wider hover:bg-muted/20 transition-colors">
                Update Metrics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

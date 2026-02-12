import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Droplet, Target, Zap, X } from 'lucide-react';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';

export default function Dashboard() {
  const { user, checkAuth } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    age: '',
    current_weight: '',
    target_weight: '',
    height: '',
    fitness_level: 'Intermediate',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Check if user needs to complete profile
  useEffect(() => {
    if (user) {
      if (!user.age || !user.current_weight || !user.height) {
        setShowProfileModal(true);
      }
      // Pre-fill form data
      setProfileData({
        age: user.age || '',
        current_weight: user.current_weight || '',
        target_weight: user.target_weight || '',
        height: user.height || '',
        fitness_level: user.fitness_level || 'Intermediate',
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.patch('/me/', {
        age: parseInt(profileData.age),
        current_weight: parseFloat(profileData.current_weight),
        target_weight: parseFloat(profileData.target_weight),
        height: parseFloat(profileData.height),
        fitness_level: profileData.fitness_level,
      });
      await checkAuth(); // Refresh user data
      setShowProfileModal(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Please check your inputs.");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateBMI = () => {
    if (user?.current_weight && user?.height) {
      const heightInMeters = user.height / 100;
      return (user.current_weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return '--';
  };

  if (!user) return <div>Loading...</div>;

  // Mock workout progress data (keep this mock for now as requested)
  const workoutProgress = [
    { week: 'Week 1', completed: 4 },
    { week: 'Week 2', completed: 5 },
    { week: 'Week 3', completed: 6 },
    { week: 'Week 4', completed: 5 },
    { week: 'Week 5', completed: 7 },
  ];

  // Mock weight tracking data - usually this would come from a separate model
  const weightData = [
    { date: 'Start', weight: user.current_weight || 80 },
    { date: 'Goal', weight: user.target_weight || 75 },
    // more points...
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
      label: 'Fitness Level',
      value: user.fitness_level || '-',
      goal: 'Advanced',
      icon: Zap,
      color: 'text-primary',
    },
    {
      label: 'Current Weight',
      value: user.current_weight ? `${user.current_weight}kg` : '-',
      goal: user.target_weight ? `${user.target_weight}kg` : '-',
      icon: TrendingUp,
      color: 'text-green-500',
    },
    {
      label: 'BMI',
      value: calculateBMI(),
      goal: '24.9',
      icon: Target,
      color: 'text-orange-500',
    },
    {
      label: 'Age',
      value: user.age || '-',
      goal: '-',
      icon: Droplet, // reusing icon
      color: 'text-blue-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-background">
      <Header />

      {/* Gradient decoration - black to green */}
      <div className="absolute inset-0 h-96 bg-gradient-to-br from-primary/20 via-primary/8 to-transparent pointer-events-none" />

      <div className="container-fitness py-8 md:py-12 relative z-10">
        {/* Welcome Section */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold font-khand text-foreground mb-3 leading-tight">
              Welcome back, <span className="text-gradient">{user.first_name || user.username}!</span> 👋
            </h1>
            <p className="text-lg text-muted-foreground">
              Goal: <span className="font-semibold text-primary">{user.fitness_goal}</span>
            </p>
          </div>
          <button
            onClick={() => setShowProfileModal(true)}
            className="hidden md:block px-6 py-2 rounded-full border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
          >
            Update Metrics
          </button>
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

        {/* Profile Completion Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-card w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-primary/20 relative">
              <button
                onClick={() => setShowProfileModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-bold font-khand mb-2">Complete Your Profile</h2>
              <p className="text-muted-foreground mb-6">Please update your metrics to get personalized recommendations.</p>

              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Age</label>
                    <input
                      type="number"
                      value={profileData.age}
                      onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                      className="w-full p-3 rounded-lg bg-input border border-border"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Fitness Level</label>
                    <select
                      value={profileData.fitness_level}
                      onChange={(e) => setProfileData({ ...profileData, fitness_level: e.target.value })}
                      className="w-full p-3 rounded-lg bg-input border border-border"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Current Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={profileData.current_weight}
                      onChange={(e) => setProfileData({ ...profileData, current_weight: e.target.value })}
                      className="w-full p-3 rounded-lg bg-input border border-border"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Target Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={profileData.target_weight}
                      onChange={(e) => setProfileData({ ...profileData, target_weight: e.target.value })}
                      className="w-full p-3 rounded-lg bg-input border border-border"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={profileData.height}
                    onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                    className="w-full p-3 rounded-lg bg-input border border-border"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 mt-4 rounded-full bg-primary text-black font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
                >
                  {isLoading ? 'Saving...' : 'Save Profile'}
                </button>
              </form>
            </div>
          </div>
        )}

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
                <YAxis stroke="hsl(var(--muted-foreground))" />
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
              <button
                onClick={() => setShowProfileModal(true)}
                className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors"
              >
                Update Metrics
              </button>
              <button className="w-full px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold uppercase text-sm tracking-wider hover:bg-secondary/90 transition-colors">
                Log Meal
              </button>
              <button className="w-full px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold uppercase text-sm tracking-wider hover:bg-primary/5 transition-colors">
                View Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

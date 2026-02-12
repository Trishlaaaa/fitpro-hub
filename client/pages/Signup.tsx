import { Link, useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    goal: 'muscle-gain',
    gender: 'male',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!agreedToTerms) {
      toast.error('Please agree to terms and conditions');
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/auth/register/', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        fitness_goal: formData.goal,
      });

      // Auto login after signup
      const loginRes = await api.post('/auth/login/', {
        username: formData.email,
        password: formData.password,
      });

      login(loginRes.data.token);
      toast.success("Account created successfully! Redirecting...");
      // Navigation will happen automatically via useEffect when user state updates
      // but we can also force it if needed. UseEffect is cleaner.

    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.data) {
        const messages = Object.values(error.response.data).flat().join(', ');
        toast.error(messages || "Registration failed");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-background">
      <Header />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold font-khand text-primary-foreground">FIT</span>
            </div>
            <h1 className="text-4xl font-bold font-khand text-foreground mb-2">
              Get Started Now
            </h1>
            <p className="text-muted-foreground">
              Join thousands transforming their bodies
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="card-elevated space-y-5 mb-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Gender Selection */}
            <div>
              <label htmlFor="gender" className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Goal Selection */}
            <div>
              <label htmlFor="goal" className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                Fitness Goal
              </label>
              <select
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="strength">Strength</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-5 h-5 rounded border border-border bg-input text-primary cursor-pointer mt-0.5"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                I agree to the{' '}
                <a href="#" className="text-primary hover:text-primary/80 transition-colors font-semibold">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:text-primary/80 transition-colors font-semibold">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-primary text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/5 transition-all duration-300 w-full"
            >
              Sign In
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import { toast } from 'sonner';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // API expects username, we use email as username
      const response = await api.post('/auth/login/', { username: email, password });
      login(response.data.token);
      toast.success("Welcome back!");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Invalid email or password");
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
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to continue your fitness journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="card-elevated space-y-6 mb-6">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-primary text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Signup Link */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Don't have an account?
              <br />
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/5 transition-all duration-300 w-full"
            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

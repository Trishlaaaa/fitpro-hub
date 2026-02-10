import { Link } from 'react-router-dom';
import { ArrowRight, Zap, TrendingUp, Target, Users, Heart, Dumbbell } from 'lucide-react';
import Header from '@/components/Header';

export default function Index() {
  const features = [
    {
      icon: Dumbbell,
      title: 'Smart Workouts',
      description: 'Gender-based and goal-specific workout plans tailored to your fitness level.',
    },
    {
      icon: Target,
      title: 'Personalized Plans',
      description: 'Custom workout builder with drag-and-drop functionality for your preferences.',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your weight, measurements, and workout completion with detailed analytics.',
    },
    {
      icon: Heart,
      title: 'Nutrition Guidance',
      description: 'Diet plans based on your goals with macro breakdowns and meal tracking.',
    },
    {
      icon: Zap,
      title: 'Instant Motivation',
      description: 'Real-time progress charts and community support to keep you engaged.',
    },
    {
      icon: Users,
      title: 'Expert Content',
      description: 'Access to nutrition education and workout demonstrations.',
    },
  ];

  const goals = [
    { title: 'Weight Loss', icon: '⚡' },
    { title: 'Muscle Gain', icon: '💪' },
    { title: 'Strength', icon: '🔥' },
    { title: 'Maintenance', icon: '⚖️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container-fitness py-20 md:py-32 relative">
          <div className="max-w-4xl">
            <div className="inline-block mb-8">
              <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 text-primary font-semibold text-xs uppercase tracking-wider border border-primary/40 shadow-lg hover:shadow-primary/30 transition-all duration-300">
                <Zap className="w-5 h-5" />
                Ready to Transform Your Body
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-khand text-foreground mb-6 leading-tight">
              Build Your <span className="text-gradient">Perfect Body</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              Get expert-designed workouts, personalized nutrition plans, and real-time progress tracking. Join thousands of fitness enthusiasts transforming their bodies with FitStrength.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary text-primary font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/5 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-16 flex flex-col sm:flex-row sm:items-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-3 border-background flex items-center justify-center font-bold text-xl hover:scale-110 transition-transform duration-300 cursor-pointer"
                  >
                    👤
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground font-semibold text-lg">
                  <span className="text-foreground font-bold text-2xl">10K+</span> Members
                </span>
                <p className="text-muted-foreground text-sm">Achieving their fitness goals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-zinc-950 via-black to-background">
        <div className="container-fitness">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold font-khand text-foreground mb-4">
              Everything You <span className="text-gradient">Need</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and resources to achieve your fitness goals faster
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-zinc-900/80 via-zinc-950 to-black border-2 border-primary/40 shadow-xl hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-2 hover:border-primary/70 cursor-pointer backdrop-blur-md`}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:from-primary/50 group-hover:to-primary/20 transition-all duration-300 shadow-lg">
                      <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold font-khand text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background via-zinc-950 to-zinc-900">
        <div className="container-fitness">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold font-khand text-foreground mb-4">
              Choose Your <span className="text-gradient">Goal</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get personalized plans tailored to your fitness objectives
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
            {goals.map((goal, index) => {
              return (
                <div
                  key={index}
                  className={`group relative text-center p-10 rounded-3xl bg-gradient-to-br from-zinc-900/80 via-zinc-950 to-black border-2 border-primary/40 hover:border-primary/80 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 hover:scale-110 hover:-translate-y-4 cursor-pointer backdrop-blur-md overflow-hidden`}
                >
                  {/* Background animated element */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-150" />

                  <div className="relative z-10">
                    <div className="text-6xl mb-6 transform group-hover:scale-125 transition-transform duration-300">
                      {goal.icon}
                    </div>
                    <h3 className="text-2xl font-bold font-khand text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Achieve your best self
                    </p>
                  </div>

                  {/* Animated border effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary/50 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
                    borderImage: 'linear-gradient(45deg, transparent, hsl(var(--primary)), transparent) 1',
                  }} />
                </div>
              );
            })}
          </div>

          {/* Motivational text */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground text-lg">
              Each goal comes with a <span className="font-bold text-primary">customized workout plan</span> and <span className="font-bold text-primary">nutrition guide</span>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-black via-zinc-900 to-black relative overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/50 rounded-full blur-3xl" />
        </div>

        <div className="container-fitness text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold font-khand text-white mb-6 leading-tight">
            Ready to Start Your <span className="text-gradient">Transformation?</span>
          </h2>
          <p className="text-lg text-foreground/90 mb-10 max-w-3xl mx-auto">
            Join thousands of fitness enthusiasts and start seeing results in just 4 weeks
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-black via-black to-zinc-950 text-foreground py-12 border-t border-primary/30">
        <div className="container-fitness">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">💚</span>
                </div>
                <h3 className="font-bold font-khand text-foreground text-lg">FitStrength</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Your complete fitness companion for achieving goals.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4 uppercase text-xs tracking-wider">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors duration-300">Home</Link></li>
                <li><Link to="/workouts" className="hover:text-primary transition-colors duration-300">Workouts</Link></li>
                <li><Link to="/diet" className="hover:text-primary transition-colors duration-300">Diet Plans</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4 uppercase text-xs tracking-wider">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary transition-colors duration-300">About</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors duration-300">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4 uppercase text-xs tracking-wider">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary/20 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 FitStrength. Transforming lives through fitness. 💪</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

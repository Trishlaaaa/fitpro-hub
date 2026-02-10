import { Users, Target, Heart, Award } from 'lucide-react';
import Header from '@/components/Header';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Mission',
      description: 'Empower individuals to achieve their fitness goals through science-backed training and nutrition guidance.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We are passionate about fitness and committed to helping you succeed in your transformation journey.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Build a supportive community where fitness enthusiasts can share experiences and motivate each other.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Deliver the highest quality fitness programs and services backed by expert knowledge.',
    },
  ];

  const team = [
    { name: 'Sarah Chen', role: 'Founder & CEO', image: '👩‍💼' },
    { name: 'Mike Johnson', role: 'Head Coach', image: '🧑‍🏫' },
    { name: 'Dr. Priya Sharma', role: 'Nutrition Expert', image: '👩‍⚕️' },
    { name: 'Alex Kumar', role: 'CTO', image: '👨‍💻' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container-fitness py-12 md:py-20">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold font-khand text-foreground mb-6 leading-tight">
            About FitStrength
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to revolutionize fitness through science-backed training programs and personalized nutrition guidance.
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="card-elevated text-center">
                <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold font-khand text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Story */}
        <div className="card-elevated p-8 md:p-12 mb-20">
          <h2 className="text-4xl font-bold font-khand text-foreground mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              FitStrength was founded in 2020 with a simple vision: to make fitness accessible, effective, and enjoyable for everyone. Our founder, Sarah Chen, started the journey after transforming her own body through dedicated training and proper nutrition.
            </p>
            <p>
              What began as a personal blog sharing workout tips and meal plans quickly evolved into a comprehensive fitness platform. Today, we serve thousands of users across the world, helping them achieve their fitness goals with personalized programs and expert guidance.
            </p>
            <p>
              Our platform combines cutting-edge technology with proven fitness principles. We work with certified coaches, nutritionists, and trainers to ensure our programs deliver real, measurable results.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold font-khand text-foreground mb-12 text-center">
            Our Team
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="card-elevated text-center">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold font-khand text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="card-elevated text-center">
            <p className="text-5xl font-bold font-khand text-primary mb-2">10K+</p>
            <p className="text-lg font-semibold text-foreground">Active Users</p>
            <p className="text-muted-foreground">Transforming their bodies</p>
          </div>
          <div className="card-elevated text-center">
            <p className="text-5xl font-bold font-khand text-primary mb-2">500+</p>
            <p className="text-lg font-semibold text-foreground">Workouts</p>
            <p className="text-muted-foreground">For all fitness levels</p>
          </div>
          <div className="card-elevated text-center">
            <p className="text-5xl font-bold font-khand text-primary mb-2">4.8★</p>
            <p className="text-lg font-semibold text-foreground">Average Rating</p>
            <p className="text-muted-foreground">From our community</p>
          </div>
        </div>
      </div>
    </div>
  );
}

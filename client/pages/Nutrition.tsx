import { Book, TrendingUp, Droplet, Lightbulb } from 'lucide-react';
import Header from '@/components/Header';

export default function Nutrition() {
  const articles = [
    {
      id: 1,
      title: 'Understanding Macronutrients',
      description: 'Learn about proteins, carbohydrates, and fats - and how they impact your fitness goals.',
      icon: '🥗',
      readTime: '8 min read',
      content: `Macronutrients are the three main nutrients your body needs: proteins, carbohydrates, and fats.

**Proteins** are essential for building and repairing muscle tissue. They contain amino acids that your body uses for growth and recovery. Aim for 1.6-2.2g per kg of body weight when training.

**Carbohydrates** provide energy for your workouts and daily activities. They're stored as glycogen in muscles and the liver. Choose complex carbs like oats, brown rice, and sweet potatoes.

**Fats** are crucial for hormone production, vitamin absorption, and brain function. Consume healthy fats from avocados, nuts, and fish.`,
    },
    {
      id: 2,
      title: 'Pre & Post Workout Nutrition',
      description: 'Optimize your performance and recovery with proper meal timing.',
      icon: '⚡',
      readTime: '6 min read',
      content: `Timing your meals around your workouts can significantly impact performance and recovery.

**Pre-Workout (1-2 hours before):**
- Carbs + Protein combination
- Example: Oatmeal + Chicken
- Provides energy and prevents muscle breakdown

**Post-Workout (30-60 minutes after):**
- Fast-digesting carbs + Protein
- Example: Rice + Whey Protein
- Replenishes glycogen and initiates muscle repair
- Consume 20-40g of protein and 40-80g of carbs`,
    },
    {
      id: 3,
      title: 'Hydration & Performance',
      description: 'Why water is your most important nutrient for fitness.',
      icon: '💧',
      readTime: '5 min read',
      content: `Water is the most important nutrient for fitness performance and recovery.

**Benefits of Proper Hydration:**
- Improves muscular strength and power
- Enhances endurance performance
- Reduces fatigue during exercise
- Aids nutrient transport and recovery
- Helps regulate body temperature

**Daily Hydration Guidelines:**
- Drink half your body weight (in pounds) in ounces of water
- Add more for exercise: 16-24 oz per hour of activity
- Monitor urine color - pale yellow indicates proper hydration`,
    },
    {
      id: 4,
      title: 'Supplement Guide',
      description: 'Essential supplements to consider for your fitness journey.',
      icon: '💊',
      readTime: '10 min read',
      content: `Not all supplements are necessary, but some can support your goals.

**Recommended Supplements:**

1. **Whey Protein** - Fast absorption, convenient, cost-effective
2. **Creatine Monohydrate** - Proven to increase strength and muscle mass
3. **Multivitamin** - Fills nutritional gaps
4. **Omega-3 Fatty Acids** - Anti-inflammatory, heart health
5. **Vitamin D** - Essential for muscle function and mood

**Important Notes:**
- Supplements support diet, don't replace it
- Focus on whole foods first
- Consult a healthcare provider before starting`,
    },
  ];

  const tips = [
    {
      icon: '🍽️',
      title: 'Meal Prep',
      description: 'Prepare meals in advance to stay consistent with your nutrition plan.',
    },
    {
      icon: '⚖️',
      title: 'Track Calories',
      description: 'Use apps to monitor intake and ensure you hit your goals daily.',
    },
    {
      icon: '🚴',
      title: 'Consistency',
      description: 'Stick to your plan - results come from long-term adherence.',
    },
    {
      icon: '😋',
      title: 'Enjoy Your Food',
      description: 'Include foods you enjoy to make nutrition sustainable.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-background">
      <Header />

      {/* Gradient decoration - black to green */}
      <div className="absolute inset-0 h-96 bg-gradient-to-br from-primary/20 via-primary/8 to-transparent pointer-events-none" />

      <div className="container-fitness py-8 md:py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-khand text-foreground mb-3">
            Nutrition Education
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn the science behind nutrition and how to fuel your fitness journey
          </p>
        </div>

        {/* Quick Tips */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {tips.map((tip, index) => (
            <div key={index} className="card-elevated text-center">
              <div className="text-4xl mb-4">{tip.icon}</div>
              <h3 className="text-lg font-bold font-khand text-foreground mb-2">
                {tip.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {tip.description}
              </p>
            </div>
          ))}
        </div>

        {/* Articles */}
        <div className="space-y-8">
          {articles.map((article, index) => (
            <div key={article.id} className="card-elevated">
              {/* Article Header */}
              <div className="flex items-start gap-6 mb-6 pb-6 border-b border-border">
                <div className="text-5xl flex-shrink-0">{article.icon}</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold font-khand text-foreground mb-2">
                    {article.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-3">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Book className="w-4 h-4" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-invert max-w-none text-foreground">
                {article.content.split('\n\n').map((paragraph, pIndex) => {
                  if (paragraph.startsWith('**')) {
                    // Bold heading
                    return (
                      <p key={pIndex} className="font-bold text-lg mb-3 text-foreground">
                        {paragraph.replace(/\*\*/g, '')}
                      </p>
                    );
                  }
                  if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.') || paragraph.startsWith('4.') || paragraph.startsWith('5.')) {
                    // List
                    return (
                      <ul key={pIndex} className="space-y-2 mb-4 ml-4">
                        {paragraph.split('\n').map((item, iIndex) => (
                          <li key={iIndex} className="text-muted-foreground list-disc">
                            {item.replace(/^\d\. \*\*/, '').replace(/\*\*/, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={pIndex} className="text-muted-foreground mb-4 leading-relaxed">
                      {paragraph.replace(/\*\*(.*?)\*\*/g, (match, content) => {
                        return content;
                      })}
                    </p>
                  );
                })}
              </div>

              {/* Read More Button */}
              <div className="mt-6 pt-6 border-t border-border">
                <button className="px-6 py-2 rounded-full border-2 border-primary text-primary font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/5 transition-colors">
                  Read Full Article
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold font-khand text-foreground mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'How much water should I drink daily?',
                a: 'A good rule is to drink half your body weight (in pounds) in ounces of water. Add 16-24 oz per hour of exercise.',
              },
              {
                q: 'Do I need supplements to build muscle?',
                a: 'No, supplements are optional. Focus on proper diet and training first. Protein powder can be convenient but whole foods are always preferred.',
              },
              {
                q: 'What\'s the best time to eat carbs?',
                a: 'Carbs are most beneficial around your workout - before for energy and after for recovery. Distribute them throughout the day based on activity level.',
              },
              {
                q: 'Should I count calories?',
                a: 'Tracking calories helps ensure you\'re in the right caloric balance for your goal. Start tracking for 2-4 weeks to understand portion sizes.',
              },
            ].map((faq, index) => (
              <div key={index} className="card-elevated p-6">
                <h3 className="text-lg font-bold font-khand text-foreground mb-3">
                  {faq.q}
                </h3>
                <p className="text-muted-foreground">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Flame, Beef, Leaf, Zap } from 'lucide-react';
import Header from '@/components/Header';

export default function Diet() {
  const [selectedGoal, setSelectedGoal] = useState('muscle-gain');
  const [selectedType, setSelectedType] = useState('non-veg');

  const dietPlans = [
    {
      id: 1,
      name: 'Muscle Gain - High Protein',
      goal: 'muscle-gain',
      type: 'non-veg',
      dailyCalories: 2800,
      macros: { protein: 200, carbs: 280, fats: 93 },
      meals: [
        {
          name: 'Breakfast',
          time: '7:00 AM',
          items: [
            { name: 'Oatmeal', quantity: '1 cup', calories: 150, protein: 5, carbs: 27, fats: 3 },
            { name: 'Chicken Breast', quantity: '200g', calories: 330, protein: 66, carbs: 0, fats: 7 },
            { name: 'Banana', quantity: '1 medium', calories: 105, protein: 1, carbs: 27, fats: 0 },
          ],
        },
        {
          name: 'Lunch',
          time: '1:00 PM',
          items: [
            { name: 'Brown Rice', quantity: '1.5 cups', calories: 300, protein: 10, carbs: 66, fats: 3 },
            { name: 'Beef', quantity: '200g', calories: 350, protein: 56, carbs: 0, fats: 14 },
            { name: 'Broccoli', quantity: '1 cup', calories: 55, protein: 4, carbs: 10, fats: 1 },
          ],
        },
        {
          name: 'Snack',
          time: '4:00 PM',
          items: [
            { name: 'Greek Yogurt', quantity: '200g', calories: 130, protein: 20, carbs: 9, fats: 3 },
            { name: 'Almonds', quantity: '30g', calories: 165, protein: 6, carbs: 6, fats: 14 },
          ],
        },
        {
          name: 'Dinner',
          time: '7:00 PM',
          items: [
            { name: 'Salmon', quantity: '200g', calories: 410, protein: 50, carbs: 0, fats: 22 },
            { name: 'Sweet Potato', quantity: '200g', calories: 140, protein: 3, carbs: 32, fats: 0 },
            { name: 'Spinach', quantity: '1 cup', calories: 7, protein: 1, carbs: 1, fats: 0 },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Weight Loss - Low Carb',
      goal: 'weight-loss',
      type: 'non-veg',
      dailyCalories: 1800,
      macros: { protein: 150, carbs: 120, fats: 60 },
      meals: [
        {
          name: 'Breakfast',
          time: '7:00 AM',
          items: [
            { name: 'Egg Whites', quantity: '4 eggs', calories: 60, protein: 13, carbs: 0, fats: 0 },
            { name: 'Whole Wheat Toast', quantity: '1 slice', calories: 80, protein: 4, carbs: 14, fats: 1 },
            { name: 'Orange', quantity: '1 medium', calories: 62, protein: 1, carbs: 15, fats: 0 },
          ],
        },
        {
          name: 'Lunch',
          time: '1:00 PM',
          items: [
            { name: 'Chicken Breast', quantity: '150g', calories: 248, protein: 50, carbs: 0, fats: 5 },
            { name: 'Mixed Salad', quantity: '2 cups', calories: 40, protein: 2, carbs: 8, fats: 0 },
            { name: 'Brown Rice', quantity: '0.75 cups', calories: 150, protein: 5, carbs: 33, fats: 1 },
          ],
        },
        {
          name: 'Snack',
          time: '4:00 PM',
          items: [
            { name: 'Apple', quantity: '1 medium', calories: 95, protein: 0, carbs: 25, fats: 0 },
            { name: 'Almonds', quantity: '15g', calories: 83, protein: 3, carbs: 3, fats: 7 },
          ],
        },
        {
          name: 'Dinner',
          time: '7:00 PM',
          items: [
            { name: 'Fish', quantity: '150g', calories: 165, protein: 30, carbs: 0, fats: 5 },
            { name: 'Steamed Broccoli', quantity: '1.5 cups', calories: 82, protein: 6, carbs: 15, fats: 1 },
            { name: 'Sweet Potato', quantity: '100g', calories: 70, protein: 1, carbs: 16, fats: 0 },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'Maintenance - Balanced',
      goal: 'maintenance',
      type: 'veg',
      dailyCalories: 2200,
      macros: { protein: 120, carbs: 220, fats: 73 },
      meals: [
        {
          name: 'Breakfast',
          time: '7:00 AM',
          items: [
            { name: 'Whole Grain Cereal', quantity: '1 cup', calories: 150, protein: 4, carbs: 30, fats: 2 },
            { name: 'Low-fat Milk', quantity: '1 cup', calories: 100, protein: 8, carbs: 12, fats: 2 },
            { name: 'Berries', quantity: '0.75 cup', calories: 60, protein: 1, carbs: 14, fats: 0 },
          ],
        },
        {
          name: 'Lunch',
          time: '1:00 PM',
          items: [
            { name: 'Chickpea Curry', quantity: '1.5 cups', calories: 350, protein: 15, carbs: 45, fats: 12 },
            { name: 'Basmati Rice', quantity: '1 cup', calories: 200, protein: 4, carbs: 45, fats: 0 },
            { name: 'Cucumber Salad', quantity: '1 cup', calories: 45, protein: 1, carbs: 9, fats: 0 },
          ],
        },
        {
          name: 'Snack',
          time: '4:00 PM',
          items: [
            { name: 'Hummus', quantity: '0.25 cup', calories: 100, protein: 3, carbs: 10, fats: 6 },
            { name: 'Carrot Sticks', quantity: '1 cup', calories: 50, protein: 1, carbs: 12, fats: 0 },
          ],
        },
        {
          name: 'Dinner',
          time: '7:00 PM',
          items: [
            { name: 'Tofu Stir-fry', quantity: '200g', calories: 220, protein: 25, carbs: 10, fats: 11 },
            { name: 'Brown Rice', quantity: '0.75 cups', calories: 150, protein: 5, carbs: 33, fats: 1 },
            { name: 'Mixed Vegetables', quantity: '1.5 cups', calories: 75, protein: 4, carbs: 15, fats: 1 },
          ],
        },
      ],
    },
  ];

  const selectedPlan = dietPlans.find(
    (plan) => plan.goal === selectedGoal && plan.type === selectedType
  ) || dietPlans[0];

  const totalMacros = selectedPlan.meals.reduce(
    (acc, meal) => {
      const mealTotals = meal.items.reduce(
        (mAcc, item) => ({
          protein: mAcc.protein + item.protein,
          carbs: mAcc.carbs + item.carbs,
          fats: mAcc.fats + item.fats,
        }),
        { protein: 0, carbs: 0, fats: 0 }
      );
      return {
        protein: acc.protein + mealTotals.protein,
        carbs: acc.carbs + mealTotals.carbs,
        fats: acc.fats + mealTotals.fats,
      };
    },
    { protein: 0, carbs: 0, fats: 0 }
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-background">
      <Header />

      {/* Gradient decoration - black to green */}
      <div className="absolute inset-0 h-96 bg-gradient-to-br from-primary/20 via-primary/8 to-transparent pointer-events-none" />

      <div className="container-fitness py-8 md:py-12 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-primary/30 to-primary/10 text-primary font-semibold text-xs uppercase tracking-wider backdrop-blur-md border border-primary/50 shadow-lg">
              🥗 Personalized Plans
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-khand text-foreground mb-3 leading-tight">
            Nutrition <span className="text-gradient">Plans</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Customized meal plans to support your fitness goals
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-background/70 via-background/60 to-background/50 border-2 border-primary/30 backdrop-blur-2xl shadow-2xl hover:shadow-primary/20 transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Goal Filter */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Fitness Goal
              </label>
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="muscle-gain">Muscle Gain</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Diet Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
              </select>
            </div>
          </div>
        </div>

        {/* Macro Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="group relative rounded-3xl p-6 bg-gradient-to-br from-orange-500/30 via-orange-400/10 to-orange-400/5 border-2 border-orange-500/40 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 hover:border-orange-500/60 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/0 via-orange-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <Flame className="w-5 h-5 text-orange-400" />
                <h3 className="text-sm text-muted-foreground/70 font-semibold uppercase tracking-wider">
                  Daily Calories
                </h3>
              </div>
              <p className="text-3xl font-bold font-khand text-orange-300">
                {selectedPlan.dailyCalories}
              </p>
              <p className="text-xs text-muted-foreground/60 mt-2">kcal/day</p>
            </div>
          </div>

          <div className="group relative rounded-3xl p-6 bg-gradient-to-br from-primary/30 via-primary/10 to-primary/5 border-2 border-primary/40 shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:border-primary/60 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/0 via-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <Beef className="w-5 h-5 text-primary" />
                <h3 className="text-sm text-muted-foreground/70 font-semibold uppercase tracking-wider">
                  Protein
                </h3>
              </div>
              <p className="text-3xl font-bold font-khand text-primary">
                {Math.round(totalMacros.protein)}g
              </p>
              <p className="text-xs text-muted-foreground/60 mt-2">
                {Math.round((totalMacros.protein * 4) / selectedPlan.dailyCalories * 100)}% of calories
              </p>
            </div>
          </div>

          <div className="group relative rounded-3xl p-6 bg-gradient-to-br from-yellow-500/30 via-yellow-400/10 to-yellow-400/5 border-2 border-yellow-500/40 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300 hover:border-yellow-500/60 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-500/0 via-yellow-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h3 className="text-sm text-muted-foreground/70 font-semibold uppercase tracking-wider">
                  Carbs
                </h3>
              </div>
              <p className="text-3xl font-bold font-khand text-yellow-300">
                {Math.round(totalMacros.carbs)}g
              </p>
              <p className="text-xs text-muted-foreground/60 mt-2">
                {Math.round((totalMacros.carbs * 4) / selectedPlan.dailyCalories * 100)}% of calories
              </p>
            </div>
          </div>

          <div className="group relative rounded-3xl p-6 bg-gradient-to-br from-emerald-500/30 via-emerald-400/10 to-emerald-400/5 border-2 border-emerald-500/40 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:border-emerald-500/60 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <Leaf className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm text-muted-foreground/70 font-semibold uppercase tracking-wider">
                  Fats
                </h3>
              </div>
              <p className="text-3xl font-bold font-khand text-emerald-300">
                {Math.round(totalMacros.fats)}g
              </p>
              <p className="text-xs text-muted-foreground/60 mt-2">
                {Math.round((totalMacros.fats * 9) / selectedPlan.dailyCalories * 100)}% of calories
              </p>
            </div>
          </div>
        </div>

        {/* Meals */}
        <div className="space-y-8">
          {selectedPlan.meals.map((meal, mealIndex) => (
            <div key={mealIndex} className="relative rounded-3xl p-8 bg-gradient-to-br from-background/70 via-background/60 to-background/50 border-2 border-primary/30 shadow-2xl hover:shadow-primary/20 transition-all duration-300 backdrop-blur-2xl">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-primary/20">
                <div>
                  <h2 className="text-2xl font-bold font-khand text-primary">
                    {meal.name}
                  </h2>
                  <p className="text-sm text-muted-foreground/70">{meal.time}</p>
                </div>
                <div className="text-right bg-gradient-to-br from-primary/20 to-primary/5 px-4 py-2 rounded-xl border border-primary/30">
                  <p className="text-2xl font-bold font-khand text-primary">
                    {Math.round(meal.items.reduce((acc, item) => acc + item.calories, 0))}
                  </p>
                  <p className="text-xs text-muted-foreground/60">kcal</p>
                </div>
              </div>

              <div className="space-y-4">
                {meal.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="group p-4 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-foreground/90 group-hover:text-primary transition-colors">{item.name}</p>
                        <p className="text-sm text-muted-foreground/70">{item.quantity}</p>
                      </div>
                      <p className="font-bold text-primary group-hover:text-green-300 transition-colors text-lg">{item.calories} cal</p>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground/60 group-hover:text-muted-foreground/80 transition-colors">
                      <span>🥚 Protein: {item.protein}g</span>
                      <span>🍚 Carbs: {item.carbs}g</span>
                      <span>🥑 Fats: {item.fats}g</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Download Button */}
        <div className="mt-12 text-center">
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95">
            📥 Download Meal Plan
          </button>
        </div>
      </div>
    </div>
  );
}

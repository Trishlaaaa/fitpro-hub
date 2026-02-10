/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

// Auth API
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  goal: 'weight-loss' | 'muscle-gain' | 'strength' | 'maintenance';
  gender: 'male' | 'female';
}

export interface SignupResponse {
  token: string;
  user: User;
}

// User API
export interface User {
  id: string;
  name: string;
  email: string;
  goal: 'weight-loss' | 'muscle-gain' | 'strength' | 'maintenance';
  gender: 'male' | 'female';
  weight?: number;
  height?: number;
  age?: number;
  bmi?: number;
  createdAt: string;
}

// Workout API
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  restTime: number; // in seconds
  videoUrl?: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  goal: 'weight-loss' | 'muscle-gain' | 'strength';
  level: 'beginner' | 'intermediate' | 'advanced';
  gender: 'male' | 'female';
  exercises: Exercise[];
  duration: number; // in minutes
  createdAt: string;
}

// Diet API
export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DietPlan {
  id: string;
  name: string;
  goal: 'weight-loss' | 'muscle-gain' | 'strength' | 'maintenance';
  type: 'veg' | 'non-veg';
  dailyCalories: number;
  meals: Meal[];
  createdAt: string;
}

// Progress API
export interface ProgressEntry {
  id: string;
  userId: string;
  date: string;
  weight?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    legs?: number;
  };
  workoutCompleted?: boolean;
  dietAdherence?: number;
  waterIntake?: number; // in liters
}

// Product API
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'protein' | 'equipment' | 'accessories';
  image?: string;
  inStock: boolean;
  createdAt: string;
}

// Order API
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

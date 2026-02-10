import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "pong";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Auth Routes
  // POST /api/auth/login
  // POST /api/auth/signup
  // POST /api/auth/logout
  // POST /api/auth/refresh

  // User Routes
  // GET /api/users/:id
  // PUT /api/users/:id
  // GET /api/users/:id/bmi

  // Workout Routes
  // GET /api/workouts
  // GET /api/workouts/:id
  // GET /api/workouts/goal/:goal
  // GET /api/workouts/gender/:gender
  // POST /api/workouts (admin only)
  // PUT /api/workouts/:id (admin only)
  // DELETE /api/workouts/:id (admin only)

  // Diet Routes
  // GET /api/diet-plans
  // GET /api/diet-plans/:id
  // GET /api/diet-plans/goal/:goal
  // POST /api/diet-plans (admin only)
  // PUT /api/diet-plans/:id (admin only)
  // DELETE /api/diet-plans/:id (admin only)

  // Progress Routes
  // POST /api/progress
  // GET /api/progress/:userId
  // GET /api/progress/:userId/stats
  // PUT /api/progress/:id

  // Product Routes
  // GET /api/products
  // GET /api/products/:id
  // POST /api/products (admin only)
  // PUT /api/products/:id (admin only)
  // DELETE /api/products/:id (admin only)

  // Order Routes
  // POST /api/orders
  // GET /api/orders/:userId
  // GET /api/orders/:id
  // PUT /api/orders/:id (admin only)

  return app;
}

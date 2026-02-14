import os
import sys
import django
import json

# Setup Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fitpro_backend.settings')
django.setup()

from core.models import DefaultWorkout

# Mapping
CATEGORY_MAP = {
    "muscle gain": "muscle-gain",
    "weight loss": "weight-loss",
    "strength": "strength",
    "maintainence": "maintenance",
    "maintenance": "maintenance"
}

data = {
  "workouts": [
    {
      "name": "Push Day",
      "target": "muscle gain",
      "exercises": [
        { "name": "Barbell Bench Press", "sets": 4, "reps": "8-10" },
        { "name": "Incline Dumbbell Press", "sets": 3, "reps": "10-12" },
        { "name": "Overhead Shoulder Press", "sets": 3, "reps": "8-10" },
        { "name": "Lateral Raises", "sets": 3, "reps": "12-15" },
        { "name": "Tricep Dips", "sets": 3, "reps": "10-12" },
        { "name": "Cable Pushdowns", "sets": 3, "reps": "12-15" }
      ]
    },
    {
      "name": "Pull Day",
      "target": "muscle gain",
      "exercises": [
        { "name": "Deadlift", "sets": 4, "reps": "5-8" },
        { "name": "Pull Ups", "sets": 3, "reps": "8-12" },
        { "name": "Barbell Rows", "sets": 3, "reps": "8-10" },
        { "name": "Lat Pulldown", "sets": 3, "reps": "10-12" },
        { "name": "Face Pulls", "sets": 3, "reps": "12-15" },
        { "name": "Barbell Curls", "sets": 3, "reps": "10-12" }
      ]
    },
    {
      "name": "Leg Day",
      "target": "muscle gain",
      "exercises": [
        { "name": "Barbell Squats", "sets": 4, "reps": "6-8" },
        { "name": "Leg Press", "sets": 3, "reps": "10-12" },
        { "name": "Romanian Deadlift", "sets": 3, "reps": "8-10" },
        { "name": "Walking Lunges", "sets": 3, "reps": "12 each leg" },
        { "name": "Leg Curl", "sets": 3, "reps": "12-15" },
        { "name": "Calf Raises", "sets": 4, "reps": "15-20" }
      ]
    },
    {
      "name": "Upper Body Split",
      "target": "muscle gain",
      "exercises": [
        { "name": "Bench Press", "sets": 4, "reps": "8-10" },
        { "name": "Pull Ups", "sets": 3, "reps": "8-12" },
        { "name": "Shoulder Press", "sets": 3, "reps": "8-10" },
        { "name": "Dumbbell Rows", "sets": 3, "reps": "10-12" },
        { "name": "Tricep Extensions", "sets": 3, "reps": "12-15" },
        { "name": "Hammer Curls", "sets": 3, "reps": "10-12" }
      ]
    },
    {
      "name": "Lower Body Split",
      "target": "muscle gain",
      "exercises": [
        { "name": "Squats", "sets": 4, "reps": "6-8" },
        { "name": "Hip Thrusts", "sets": 3, "reps": "8-12" },
        { "name": "Bulgarian Split Squats", "sets": 3, "reps": "10 each leg" },
        { "name": "Leg Extension", "sets": 3, "reps": "12-15" },
        { "name": "Seated Calf Raises", "sets": 4, "reps": "15-20" }
      ]
    },

    {
      "name": "Full Body Beginner",
      "target": "maintainence",
      "exercises": [
        { "name": "Bodyweight Squats", "sets": 3, "reps": "15" },
        { "name": "Push Ups", "sets": 3, "reps": "10-15" },
        { "name": "Glute Bridges", "sets": 3, "reps": "15" },
        { "name": "Plank", "sets": 3, "reps": "30-45 sec" },
        { "name": "Mountain Climbers", "sets": 3, "reps": "20" }
      ]
    },

    {
      "name": "HIIT Fat Burner",
      "target": "weight loss",
      "exercises": [
        { "name": "Burpees", "sets": 4, "reps": "15" },
        { "name": "Jump Squats", "sets": 4, "reps": "15" },
        { "name": "High Knees", "sets": 4, "reps": "40 sec" },
        { "name": "Mountain Climbers", "sets": 4, "reps": "30 sec" },
        { "name": "Plank", "sets": 3, "reps": "45 sec" }
      ]
    },

    {
      "name": "Core Blast",
      "target": "weight loss",
      "exercises": [
        { "name": "Leg Raises", "sets": 3, "reps": "15" },
        { "name": "Russian Twists", "sets": 3, "reps": "20" },
        { "name": "Plank", "sets": 3, "reps": "1 min" },
        { "name": "Bicycle Crunch", "sets": 3, "reps": "20" }
      ]
    },

    {
      "name": "Strength Upper Body",
      "target": "strength",
      "exercises": [
        { "name": "Bench Press", "sets": 5, "reps": "5" },
        { "name": "Overhead Press", "sets": 5, "reps": "5" },
        { "name": "Weighted Pull Ups", "sets": 4, "reps": "6" }
      ]
    },

    {
      "name": "Strength Lower Body",
      "target": "strength",
      "exercises": [
        { "name": "Barbell Squat", "sets": 5, "reps": "5" },
        { "name": "Deadlift", "sets": 5, "reps": "5" },
        { "name": "Walking Lunges", "sets": 3, "reps": "10 each leg" }
      ]
    },

    {
      "name": "Glutes Focus",
      "target": "muscle gain",
      "exercises": [
        { "name": "Hip Thrust", "sets": 4, "reps": "8-10" },
        { "name": "Cable Kickbacks", "sets": 3, "reps": "12-15" },
        { "name": "Romanian Deadlift", "sets": 3, "reps": "8-10" },
        { "name": "Step Ups", "sets": 3, "reps": "12 each leg" }
      ]
    },

    {
      "name": "Back & Biceps",
      "target": "muscle gain",
      "exercises": [
        { "name": "Lat Pulldown", "sets": 4, "reps": "8-10" },
        { "name": "Barbell Rows", "sets": 3, "reps": "8-10" },
        { "name": "Seated Cable Row", "sets": 3, "reps": "10-12" },
        { "name": "Barbell Curl", "sets": 3, "reps": "10-12" }
      ]
    },

    {
      "name": "Chest & Triceps",
      "target": "muscle gain",
      "exercises": [
        { "name": "Incline Bench Press", "sets": 4, "reps": "8-10" },
        { "name": "Chest Fly", "sets": 3, "reps": "12-15" },
        { "name": "Tricep Dips", "sets": 3, "reps": "10-12" },
        { "name": "Overhead Tricep Extension", "sets": 3, "reps": "12-15" }
      ]
    },

    {
      "name": "Shoulder Special",
      "target": "muscle gain",
      "exercises": [
        { "name": "Military Press", "sets": 4, "reps": "8-10" },
        { "name": "Lateral Raise", "sets": 3, "reps": "12-15" },
        { "name": "Front Raise", "sets": 3, "reps": "12-15" },
        { "name": "Face Pull", "sets": 3, "reps": "15" }
      ]
    },

    {
      "name": "Mobility & Recovery",
      "target": "maintainence",
      "exercises": [
        { "name": "Dynamic Stretching", "sets": 2, "reps": "10 min" },
        { "name": "Foam Rolling", "sets": 2, "reps": "5 min each muscle group" },
        { "name": "Light Cardio", "sets": 1, "reps": "15 min" }
      ]
    }
  ]
}

def run():
    print("Starting import of default workouts...")
    count = 0
    for w in data["workouts"]:
        name = w["name"]
        raw_target = w["target"]
        category = CATEGORY_MAP.get(raw_target, raw_target).lower() # fallback to raw if not in map
        
        # Infer properties
        level = "Intermediate"
        if "beginner" in name.lower():
            level = "Beginner"
        elif "advanced" in name.lower():
            level = "Advanced"
            
        # Default properties
        gender = "male" 
        if "Glutes" in name:
            gender = "female"
        else:
            gender = "male" 
            
        duration = 60 
        difficulty = "Moderate"
        if level == "Beginner":
            difficulty = "Easy"
            duration = 45
        elif level == "Advanced":
            difficulty = "Hard"
            duration = 90
            
        # Check if exists
        if not DefaultWorkout.objects.filter(name=name).exists():
            DefaultWorkout.objects.create(
                name=name,
                category=category,
                level=level,
                gender=gender,
                duration=duration,
                difficulty=difficulty,
                exercises=w["exercises"]
            )
            print(f"Created DefaultWorkout: {name}")
            count += 1
        else:
            print(f"Skipped existing DefaultWorkout: {name}")
            
    print(f"Import complete. Added {count} DefaultWorkouts.")

if __name__ == "__main__":
    run()

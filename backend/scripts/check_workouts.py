import os
import sys
import django

# Setup Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fitpro_backend.settings')
django.setup()

from core.models import Workout

def check():
    workouts = Workout.objects.all()
    count = workouts.count()
    print(f"Total Workouts in Database: {count}")
    print("-" * 30)
    if count == 0:
        print("No workouts found!")
    else:
        for w in workouts:
            print(f"ID: {w.id} | Name: {w.name} | Category: {w.category}")

if __name__ == "__main__":
    check()

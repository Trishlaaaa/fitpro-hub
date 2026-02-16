import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fitpro_backend.settings')
django.setup()

from core.models import Exercise

exercises = [
    { 'name': 'Push-ups', 'category': 'Chest' },
    { 'name': 'Pull-ups', 'category': 'Back' },
    { 'name': 'Dumbbell Rows', 'category': 'Back' },
    { 'name': 'Bench Press', 'category': 'Chest' },
    { 'name': 'Squats', 'category': 'Legs' },
    { 'name': 'Deadlifts', 'category': 'Legs' },
    { 'name': 'Lunges', 'category': 'Legs' },
    { 'name': 'Shoulder Press', 'category': 'Shoulders' },
    { 'name': 'Lateral Raises', 'category': 'Shoulders' },
    { 'name': 'Bicep Curls', 'category': 'Arms' },
    { 'name': 'Tricep Dips', 'category': 'Arms' },
    { 'name': 'Planks', 'category': 'Core' },
    { 'name': 'Crunches', 'category': 'Core' },
]

for ex in exercises:
    obj, created = Exercise.objects.get_or_create(
        name=ex['name'],
        defaults={'category': ex['category'], 'user': None}
    )
    if created:
        print(f"Created {ex['name']}")
    else:
        print(f"Skipped {ex['name']} (already exists)")

print("Done populating exercises.")

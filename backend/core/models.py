from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_verified = models.BooleanField(default=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    fitness_goal = models.CharField(max_length=50, blank=True, null=True)
    fitness_level = models.CharField(max_length=20, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    current_weight = models.FloatField(blank=True, null=True, help_text="Weight in kg")
    target_weight = models.FloatField(blank=True, null=True, help_text="Target weight in kg")
    height = models.FloatField(blank=True, null=True, help_text="Height in cm")

    def __str__(self):
        return self.username

class WeightLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='weight_logs')
    date = models.DateField(auto_now_add=True)
    weight = models.FloatField()

    def __str__(self):
        return f"{self.user.username} - {self.date}: {self.weight}kg"
    
    class Meta:
        ordering = ['-date']

class WorkoutLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='workout_logs')
    date = models.DateField(auto_now_add=True)
    duration_minutes = models.IntegerField(default=0)
    workout_type = models.CharField(max_length=100, blank=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.date}: {self.workout_type}"

class DietLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='diet_logs')
    date = models.DateField(auto_now_add=True)
    calories = models.IntegerField(default=0)
    protein = models.FloatField(default=0) # grams
    carbs = models.FloatField(default=0)   # grams
    fats = models.FloatField(default=0)    # grams
    
    def __str__(self):
        return f"{self.user.username} - {self.date}: {self.calories}kcal"

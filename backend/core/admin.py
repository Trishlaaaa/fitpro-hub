from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, WeightLog, WorkoutLog, DietLog, Workout, CustomWorkout, DefaultWorkout, Exercise, ContactMessage

# Register your models here.

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'name', 'is_verified', 'fitness_goal', 'fitness_level', 'age', 'current_weight', 'target_weight', 'height')
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('is_verified', 'gender', 'fitness_goal', 'fitness_level', 'age', 'current_weight', 'target_weight', 'height')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('is_verified', 'gender', 'fitness_goal', 'fitness_level', 'age', 'current_weight', 'target_weight', 'height')}),
    )

    def name(self, obj):
        return obj.first_name

@admin.register(WeightLog)
class WeightLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'weight', 'date')
    search_fields = ('user__username', 'user__email')
    list_filter = ('date',)

@admin.register(WorkoutLog)
class WorkoutLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'workout_type', 'duration_minutes', 'date')
    search_fields = ('user__username', 'workout_type')
    list_filter = ('date', 'workout_type')

@admin.register(DietLog)
class DietLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'calories', 'protein', 'carbs', 'fats', 'date')
    search_fields = ('user__username',)
    list_filter = ('date',)

@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'level', 'gender', 'duration', 'difficulty')
    search_fields = ('name', 'category')
    list_filter = ('category', 'level', 'gender', 'difficulty')

@admin.register(CustomWorkout)
class CustomWorkoutAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'created_at')
    search_fields = ('name', 'user__username')
    list_filter = ('created_at',)

@admin.register(DefaultWorkout)
class DefaultWorkoutAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'level', 'gender', 'duration', 'difficulty')
    search_fields = ('name', 'category')
    list_filter = ('category', 'level', 'gender', 'difficulty')

@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'user')
    search_fields = ('name', 'category', 'user__username')
    list_filter = ('category', 'user')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('subject', 'name', 'email', 'created_at')
    search_fields = ('name', 'email', 'subject')
    list_filter = ('created_at',)

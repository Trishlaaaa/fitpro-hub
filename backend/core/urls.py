from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import RegisterView, MeView, LogoutView, WeightLogListCreate, WorkoutLogListCreate, DietLogListCreate, WorkoutListView, CustomWorkoutListCreate, CustomWorkoutDetail, ExerciseListCreateView, ContactMessageCreateView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', obtain_auth_token, name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('me/', MeView.as_view(), name='me'),
    
    # Log endpoints
    path('logs/weight/', WeightLogListCreate.as_view(), name='weight-logs'),
    path('logs/workout/', WorkoutLogListCreate.as_view(), name='workout-logs'),
    path('logs/diet/', DietLogListCreate.as_view(), name='diet-logs'),
    
    # Workout Plans
    path('workouts/', WorkoutListView.as_view(), name='workouts-list'),
    
    # Custom Workouts
    path('custom-workouts/', CustomWorkoutListCreate.as_view(), name='custom-workout-list'),
    path('custom-workouts/<int:pk>/', CustomWorkoutDetail.as_view(), name='custom-workout-detail'),

    # Exercises
    path('exercises/', ExerciseListCreateView.as_view(), name='exercise-list-create'),

    # Contact
    path('contact/messages/', ContactMessageCreateView.as_view(), name='contact-message-create'),
]

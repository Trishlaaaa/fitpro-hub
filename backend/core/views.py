from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, WeightLogSerializer, WorkoutLogSerializer, DietLogSerializer, WorkoutSerializer, CustomWorkoutSerializer, ExerciseSerializer, ContactMessageSerializer
from .models import WeightLog, WorkoutLog, DietLog, Workout, CustomWorkout, DefaultWorkout, Exercise, ContactMessage

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        # Simply delete the token to force logout
        if hasattr(request.user, 'auth_token'):
            request.user.auth_token.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# New List/Create Views for Logs

class WeightLogListCreate(generics.ListCreateAPIView):
    serializer_class = WeightLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WeightLog.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class WorkoutLogListCreate(generics.ListCreateAPIView):
    serializer_class = WorkoutLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WorkoutLog.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        print(f"DEBUG: Creating workout log for user: {self.request.user}")
        serializer.save(user=self.request.user)
        print("DEBUG: Workout log saved successfully")

class DietLogListCreate(generics.ListCreateAPIView):
    serializer_class = DietLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DietLog.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class WorkoutListView(generics.ListAPIView):
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print(f"DEBUG: Fetching workouts for user: {self.request.user}")
        user = self.request.user
        queryset = DefaultWorkout.objects.all()
        print(f"DEBUG: Found {queryset.count()} workouts in database")
        
        # Sort based on user's fitness goal matching the workout category
        if user.fitness_goal:
            # Create a case statement to prioritize matching categories
            from django.db.models import Case, When, Value, IntegerField
            
            # Map user goals to workout categories if names differ slightly
            # Assuming exact match or simple mapping for now
            goal = user.fitness_goal
            
            queryset = queryset.annotate(
                priority=Case(
                    When(category__iexact=goal, then=Value(1)),
                    default=Value(2),
                    output_field=IntegerField(),
                )
            ).order_by('priority', 'name')
            
        return queryset


class CustomWorkoutListCreate(generics.ListCreateAPIView):
    serializer_class = CustomWorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CustomWorkout.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CustomWorkoutDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CustomWorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return CustomWorkout.objects.filter(user=self.request.user)

class ExerciseListCreateView(generics.ListCreateAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return default exercises (user=None) AND user's custom exercises
        from django.db.models import Q
        return Exercise.objects.filter(Q(user=self.request.user) | Q(user__isnull=True))

    def perform_create(self, serializer):
        # When user creates an exercise, assign it to them
        serializer.save(user=self.request.user)

class ContactMessageCreateView(generics.CreateAPIView):
    # Public endpoint, no auth required generally, or make authenticated if specific
    # The requirement is just "message form", usually public on contact pages.
    # Assuming public for now given typical use case.
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]


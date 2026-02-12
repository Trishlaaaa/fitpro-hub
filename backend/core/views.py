from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, WeightLogSerializer, WorkoutLogSerializer, DietLogSerializer
from .models import WeightLog, WorkoutLog, DietLog

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
        serializer.save(user=self.request.user)

class DietLogListCreate(generics.ListCreateAPIView):
    serializer_class = DietLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DietLog.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

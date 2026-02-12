from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import WeightLog, WorkoutLog, DietLog

User = get_user_model()

class WeightLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeightLog
        fields = ('id', 'user', 'date', 'weight')
        read_only_fields = ('user', 'date')

class WorkoutLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutLog
        fields = ('id', 'user', 'date', 'duration_minutes', 'workout_type')
        read_only_fields = ('user', 'date')

class DietLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = DietLog
        fields = ('id', 'user', 'date', 'calories', 'protein', 'carbs', 'fats')
        read_only_fields = ('user', 'date')

class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='first_name', required=False)
    
    # We can eventually nest logs here if needed, but separate endpoints are cleaner for lists
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'name', 'password', 'is_verified', 'gender', 'fitness_goal', 'fitness_level', 'age', 'current_weight', 'target_weight', 'height')
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'read_only': True}, # Generated from email
            'email': {'required': True}
        }
    
    def create(self, validated_data):
        email = validated_data.get('email')
        username = email # use email as username
        
        # Force is_verified to always be True
        is_verified = True 
        
        # Ensure unique username
        if User.objects.filter(username=username).exists():
             raise serializers.ValidationError({"email": "User with this email already exists."})

        # Remove email from validated_data to avoid duplicate argument error
        validated_data.pop('email', None)
        
        # validated_data already contains 'first_name' mapped from 'name' field
        user = User.objects.create_user(username=username, email=email, **validated_data)
        
        user.is_verified = is_verified
        user.save()
        return user

from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'name', 'password', 'is_verified', 'gender', 'fitness_goal')
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'read_only': True}, # Generated from email
            'email': {'required': True}
        }
    
    def create(self, validated_data):
        name = validated_data.pop('name', '')
        email = validated_data.get('email')
        username = email # Simple strategy: use email as username
        
        is_verified = validated_data.pop('is_verified', True)
        
        # Ensure unique username
        if User.objects.filter(username=username).exists():
             raise serializers.ValidationError({"email": "User with this email already exists."})

        user = User.objects.create_user(username=username, email=email, **validated_data)
        user.first_name = name
        user.is_verified = is_verified
        user.save()
        return user

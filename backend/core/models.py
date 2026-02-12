from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_verified = models.BooleanField(default=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    fitness_goal = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.username

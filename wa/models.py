from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    def __str__(self):
        return f'{self.username}'
    
    
class Mesocycle(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mesocycles")
    title = models.CharField(max_length=255)
    weeks = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Optionally:
    #updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.weeks} weeks) - {self.user.username}"

class Day(models.Model):
    mesocycle = models.ForeignKey(Mesocycle, on_delete=models.CASCADE, related_name="days")
    day_name = models.CharField(max_length=20)  # e.g., "Monday", "Tuesday"

    def __str__(self):
        return f"{self.day_name} - {self.mesocycle.title}"

class MuscleExercise(models.Model):
    day = models.ForeignKey(Day, on_delete=models.CASCADE, related_name="muscle_exercises")
    muscle = models.CharField(max_length=50)  # e.g., "Chest", "Legs"
    exercise = models.CharField(max_length=255)  # e.g., "Bench Press"

    def __str__(self):
        return f"{self.muscle}: {self.exercise} on {self.day.day_name}"
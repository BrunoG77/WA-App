from django.contrib import admin
from .models import User, Mesocycle, MuscleExercise, Day

# Register your models here.
admin.site.register(User)
admin.site.register(Mesocycle)
admin.site.register(Day)
admin.site.register(MuscleExercise)
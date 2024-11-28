from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils import timezone
from django.contrib.auth.decorators import login_required
import json
from django.views.decorators.csrf import csrf_exempt

from .models import User, Mesocycle, Day, MuscleExercise

# Login page
def login_view(request):
    if request.method == "POST":
        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "wa/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "wa/login.html")
    

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


# Register page
def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "wa/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "wa/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "wa/register.html")


# Index page
@login_required
def index(request):
    
    return render(request, "wa/index.html")


# New Mesocycle
@login_required
def new_meso(request):
    
    return render(request, 'wa/new_meso.html')


# Create Mesocycle
@csrf_exempt
@login_required
def create_meso(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            title = data['title']
            weeks = int(data['weeks'])
            days_data = data['days']
            
            # Get the user logged in
            user = request.user
            
            # Create the new mesocycle to store data in user
            print("\nTitle: ", title, "!Weeks: ", weeks, "!Data for Days: ", days_data)
            mesocycle_table = Mesocycle.objects.create(user=user, title=title, weeks=weeks)
            
            # For loop to get every exercise and day in order and to link them
            for days in days_data:
                # First start with the day
                day = days["day"]
                print("\nDAY: ", day)
                day_table = Day.objects.create(mesocycle=mesocycle_table, day_name=day)
                
                # Now go to muscle groups and exercises of that day
                for muscles in days["muscleGroups"]:
                    # Get muscle and exercise of each loop and add to table
                    muscle = muscles["muscleGroup"]
                    exercise = muscles["exercise"]
                    print("\nMuscle: ", muscle, "\nExercise: ", exercise, "\n")
                    MuscleExercise.objects.create(day=day_table, muscle=muscle, exercise=exercise)
                    
                
            # Check User mesocycle data
            user_mesocycles = Mesocycle.objects.filter(user=request.user)
            for mesocycle in user_mesocycles:
                print(f"\n\nTitle: {mesocycle.title}, Weeks: {mesocycle.weeks}")
                for day in mesocycle.days.all():
                    print(f"Day: {day.day_name}")
                    for muscle_exercise in day.muscle_exercises.all():
                        print(f"Muscle: {muscle_exercise.muscle}, Exercise: {muscle_exercise.exercise}")


            return JsonResponse({'status': 'success', 'message': 'MesoCycle created successfully'}, status=200)
        
        except (KeyError, TypeError, json.JSONDecodeError):
        #except ():
            print("EXCEPT with json loads: \n", json.loads(request.body))
            return JsonResponse({'status': 'error', 'message': 'Invalid data format'}, status=400)
        
    # If not Post method
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)
from django.urls import path

from . import views

urlpatterns = [
    path("Login", views.login_view, name="login"),
    path("Logout", views.logout_view, name="logout"),
    path("Register", views.register, name="register"),
    path("", views.index, name="index"),
    path("NewMesocycle", views.new_meso, name="new_meso"),
    path("CreateMesocycle", views.create_meso, name="create_meso"),
    path("Mesocycles", views.mesocycles, name="mesocycles"),
    path("MesoDelete/<int:id>", views.mesocycles_delete, name="meso_delete")
]

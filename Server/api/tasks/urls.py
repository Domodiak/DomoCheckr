from django.urls import path, include
from .views import *

urlpatterns = [
    path('create/', createTask, name='create-task'),
    path('get-all/', getTasks, name='get-tasks'),
]
from django.urls import path
from .views import *
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('auth/auth/', obtain_auth_token, name='api-token-auth'),
    path('auth/register/', register, name='register'),
    path('auth/check/', checkAuthentication.as_view(), name='api-auth-check'),
    path('auth/get-user/', getUser, name='get-user'),
    path('tasks/create-task/', createTask, name='create-task'),
    path('tasks/get-tasks/', getTasks, name='get-tasks')
]
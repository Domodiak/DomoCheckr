from django.urls import path, include
from .views import *
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('auth/', obtain_auth_token, name='api-token-auth'),
    path('register/', register, name='register'),
    path('check/', checkAuthentication.as_view(), name='api-auth-check'),
    path('get-user/', getUser, name='get-user'),
]
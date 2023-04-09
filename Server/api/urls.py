from django.urls import path
from .views import *
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('auth/get-token/', obtain_auth_token, name='api-token-auth'),
    path('auth/check/', checkAuthentication.as_view(), name='api-auth-check'),
]
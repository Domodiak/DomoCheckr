from django.urls import path
from .views import *
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('test/', testView, name='testView'),
    path('api-token-auth/', obtain_auth_token, name='api-token-auth'),
]
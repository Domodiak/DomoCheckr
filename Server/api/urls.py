from django.urls import path, include

urlpatterns = [
    path('auth/', include('api.userauth.urls')),
    path('tasks/', include('api.tasks.urls'))
]
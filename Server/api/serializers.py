from rest_framework import serializers
from django.contrib.auth.models import User
from .tasks import models as tasksModels

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class TaskSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    class Meta:
        model = tasksModels.Task
        fields = ['title', 'description', 'created_time', 'due_date', 'creator']
        depth = 1
    
    def get_creator(self, obj):
        user = obj.creator
        return UserSerializer(user).data
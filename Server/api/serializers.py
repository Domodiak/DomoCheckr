from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class TaskSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    class Meta:
        model = Task
        fields = ['title', 'description', 'created_time', 'due_date', 'creator']
        depth = 1
    
    def get_creator(self, obj):
        user = obj.creator
        return UserSerializer(user).data
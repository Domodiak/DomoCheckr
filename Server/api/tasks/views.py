from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from rest_framework import status
from .models import Task
from ..serializers import TaskSerializer

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def createTask(request):
    title = request.data.get("title")
    description = request.data.get("description")
    task = None
    try:
        task = Task.objects.create(
            title = title,
            description = description,
            creator = request.user
        )
    except ValidationError:
        return Response({ 'error': 'Task creation failed' }, status=status.HTTP_400_BAD_REQUEST)

    return Response({ 'task': TaskSerializer(task).data }, status=status.HTTP_201_CREATED)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def getTasks(request):
    tasks = TaskSerializer(Task.objects.filter(creator=request.user), many=True).data
    return Response(tasks)
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework import status

class checkAuthentication(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response({'ok': True})

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        # Validate input
        User.objects.create_user(username=username, email=email, password=password)
    except ValidationError as e:
        return Response({'error': 'User creation failed'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.get(username=username)
    token = Token.objects.create(user=user)

    # Return token in response
    return Response({'token': token.key}, status=status.HTTP_201_CREATED)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
@renderer_classes([JSONRenderer, TemplateHTMLRenderer])
def getUser(request):
    return Response({ "user": request.user.username }, status=status.HTTP_200_OK)
import json
from rest_framework.response import Response
from django.http import JsonResponse

def testView(request):
    return JsonResponse({'message': 'hello world'})
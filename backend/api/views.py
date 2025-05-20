from django.shortcuts import render
from .models import CustomUser
from rest_framework import generics
from .serializers import userRegisterationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
# from .models import Note

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = userRegisterationSerializer
    permission_classes = [AllowAny]
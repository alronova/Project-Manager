from django.shortcuts import render
from .models import CustomUser, Project
from rest_framework import generics
from .serializers import userRegisterationSerializer, ProjectSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = userRegisterationSerializer
    permission_classes = [AllowAny]

class ProjectListCreate(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(assigned_to=self.request.user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(assigned_by=self.request.user)
        else:
            print(serializer.errors)

class ProjectDelete(generics.DestroyAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(assigned_by=self.request.user, assigned_to=self.request.user)
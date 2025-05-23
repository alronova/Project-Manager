from rest_framework.response import Response
from rest_framework import status
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

class UserList(generics.ListAPIView):
    serializer_class = userRegisterationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CustomUser.objects.filter(id=self.request.user.id)

class ProjectAssignees(generics.ListAPIView):
    serializer_class = userRegisterationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        assignees = CustomUser.objects.filter(b_of__gt=self.request.user.b_of)
        assigner = CustomUser.objects.filter(id=self.request.user.id)
        return assignees | assigner

class MyProjectsList(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(assigned_to=self.request.user.username, assigned_by=self.request.user.username)

class AssignedProjectsList(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(assigned_to=self.request.user.username)
    
class ProjectListCreate(generics.CreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    # def get_queryset(self):
    #     return Project.objects.filter(assigned_to=self.request.user.username)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(assigned_by=self.request.user.username)
        else:
            print(serializer.errors)

class ProjectDelete(generics.DestroyAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(assigned_by=self.request.user, assigned_to=self.request.user)
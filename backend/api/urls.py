from django.urls import path
from . import views

urlpatterns = [
    path("user/", views.UserList.as_view(), name="user-details"),
    path("projects/", views.ProjectListCreate.as_view(), name="project-list-create"),
    path("projects/my-projects/", views.MyProjectsList.as_view(), name="my_projects"),
    path("projects/assigned-projects/", views.AssignedProjectsList.as_view(), name="assigned_projects"),
    path("projects/assignees/", views.ProjectAssignees.as_view(), name="assignees"),
    path("projects/delete/<int:pk>/", views.ProjectDelete.as_view(), name="project-delete"),
]
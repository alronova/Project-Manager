from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", jwt_views.TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", jwt_views.TokenRefreshView.as_view(), name="refresh_token"),
    path('api/token/verify/', jwt_views.TokenVerifyView.as_view(), name='verify_token'),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
]
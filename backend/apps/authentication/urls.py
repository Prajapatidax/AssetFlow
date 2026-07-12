from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from apps.authentication.views import (
    CustomTokenObtainPairView,
    RegisterView,
    UserProfileView,
)

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='auth_login'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('me/', UserProfileView.as_view(), name='auth_me'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

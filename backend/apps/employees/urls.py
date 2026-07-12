from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.employees.views import EmployeeViewSet

router = DefaultRouter()
router.register('employees', EmployeeViewSet, basename='employee')

urlpatterns = [
    path('', include(router.urls)),
]

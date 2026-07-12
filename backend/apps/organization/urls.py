from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.organization.views import OrganizationViewSet, DepartmentViewSet

router = DefaultRouter()
router.register('organizations', OrganizationViewSet, basename='organization')
router.register('departments', DepartmentViewSet, basename='department')

urlpatterns = [
    path('', include(router.urls)),
]

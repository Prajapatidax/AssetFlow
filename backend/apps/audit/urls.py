from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.audit.views import AuditCycleViewSet, AuditVerificationViewSet

router = DefaultRouter()
router.register('cycles', AuditCycleViewSet, basename='audit-cycle')
router.register('checks', AuditVerificationViewSet, basename='audit-verification')

urlpatterns = [
    path('', include(router.urls)),
]

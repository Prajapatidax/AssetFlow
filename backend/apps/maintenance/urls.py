from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.maintenance.views import MaintenanceTicketViewSet

router = DefaultRouter()
router.register('tickets', MaintenanceTicketViewSet, basename='ticket')

urlpatterns = [
    path('', include(router.urls)),
]

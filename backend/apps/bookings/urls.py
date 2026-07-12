from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.bookings.views import ResourceBookingViewSet

router = DefaultRouter()
router.register('reservations', ResourceBookingViewSet, basename='booking')

urlpatterns = [
    path('', include(router.urls)),
]

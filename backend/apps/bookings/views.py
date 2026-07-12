from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.authentication.permissions import IsAdmin, IsDepartmentHead
from apps.bookings.models import ResourceBooking
from apps.bookings.serializers import ResourceBookingSerializer


class ResourceBookingViewSet(viewsets.ModelViewSet):
    queryset = ResourceBooking.objects.select_related('asset', 'booked_by').all()
    serializer_class = ResourceBookingSerializer
    filterset_fields = ('asset', 'booked_by', 'status')
    search_fields = ('purpose', 'booked_by__username', 'asset__name')

    def perform_create(self, serializer):
        serializer.save(
            booked_by=self.request.user,
            created_by=self.request.user
        )

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated, IsAdmin | IsDepartmentHead])
    def approve(self, request, pk=None):
        """
        Action to approve a resource booking request.
        """
        booking = self.get_object()
        booking.status = ResourceBooking.Statuses.APPROVED
        booking.updated_by = request.user
        booking.save(update_fields=['status', 'updated_by'])
        return Response(ResourceBookingSerializer(booking).data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated, IsAdmin | IsDepartmentHead])
    def reject(self, request, pk=None):
        """
        Action to reject a resource booking request.
        """
        booking = self.get_object()
        booking.status = ResourceBooking.Statuses.REJECTED
        booking.updated_by = request.user
        booking.save(update_fields=['status', 'updated_by'])
        return Response(ResourceBookingSerializer(booking).data)

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """
        Action to cancel own booking request.
        """
        booking = self.get_object()
        
        # Guard: Only creator or admin can cancel
        if booking.booked_by != request.user and not request.user.is_admin:
            return Response(
                {"detail": "Permission denied. You can only cancel your own bookings."},
                status=status.HTTP_403_FORBIDDEN
            )

        booking.status = ResourceBooking.Statuses.CANCELLED
        booking.updated_by = request.user
        booking.save(update_fields=['status', 'updated_by'])
        return Response(ResourceBookingSerializer(booking).data)

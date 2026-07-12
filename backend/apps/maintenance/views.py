from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from apps.authentication.permissions import IsAdmin, IsAssetManager
from apps.maintenance.models import MaintenanceTicket
from apps.maintenance.serializers import MaintenanceTicketSerializer
from apps.assets.models import Asset


class MaintenanceTicketViewSet(viewsets.ModelViewSet):
    queryset = MaintenanceTicket.objects.select_related('asset', 'reported_by', 'assigned_to').all()
    serializer_class = MaintenanceTicketSerializer
    filterset_fields = ('asset', 'reported_by', 'assigned_to', 'priority', 'status')
    search_fields = ('title', 'description', 'asset__name', 'asset__code')

    def perform_create(self, serializer):
        # By default, trigger state changes on asset to MAINTENANCE if ticket is high priority
        ticket = serializer.save(
            reported_by=self.request.user,
            created_by=self.request.user
        )
        if ticket.priority == MaintenanceTicket.Priorities.CRITICAL:
            asset = ticket.asset
            asset.status = Asset.Statuses.MAINTENANCE
            asset.save(update_fields=['status'])

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated, IsAdmin | IsAssetManager])
    def assign(self, request, pk=None):
        """
        Assigns technician and transitions status to IN_PROGRESS.
        """
        ticket = self.get_object()
        tech_id = request.data.get('assigned_to')
        
        if not tech_id:
            return Response({"detail": "Must specify assigned_to user ID."}, status=status.HTTP_400_BAD_REQUEST)

        ticket.assigned_to_id = tech_id
        ticket.status = MaintenanceTicket.Statuses.IN_PROGRESS
        ticket.start_date = timezone.now().date()
        ticket.updated_by = request.user
        ticket.save(update_fields=['assigned_to', 'status', 'start_date', 'updated_by'])

        # Keep asset state synchronized
        asset = ticket.asset
        asset.status = Asset.Statuses.MAINTENANCE
        asset.save(update_fields=['status'])

        return Response(MaintenanceTicketSerializer(ticket).data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated, IsAdmin | IsAssetManager])
    def approve_cost(self, request, pk=None):
        """
        Approves ticket costing and transitions to IN_PROGRESS.
        """
        ticket = self.get_object()
        ticket.status = MaintenanceTicket.Statuses.IN_PROGRESS
        ticket.updated_by = request.user
        ticket.save(update_fields=['status', 'updated_by'])
        return Response(MaintenanceTicketSerializer(ticket).data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def complete(self, request, pk=None):
        """
        Marks maintenance ticket completed and updates actual cost.
        """
        ticket = self.get_object()

        # Guard: Only assigned technician, manager, or admin
        if ticket.assigned_to != request.user and not request.user.is_admin and request.user.role != 'ASSET_MANAGER':
            return Response(
                {"detail": "Permission denied. Only the assigned technician or managers can complete this ticket."},
                status=status.HTTP_403_FORBIDDEN
            )

        actual_cost = request.data.get('actual_cost', ticket.estimated_cost)
        tech_notes = request.data.get('technician_notes', '')

        ticket.actual_cost = actual_cost
        ticket.technician_notes = tech_notes
        ticket.status = MaintenanceTicket.Statuses.DONE
        ticket.completed_date = timezone.now().date()
        ticket.updated_by = request.user
        ticket.save(update_fields=['actual_cost', 'technician_notes', 'status', 'completed_date', 'updated_by'])

        # Restore asset state to Active/Ready
        asset = ticket.asset
        asset.status = Asset.Statuses.ACTIVE
        asset.save(update_fields=['status'])

        return Response(MaintenanceTicketSerializer(ticket).data)

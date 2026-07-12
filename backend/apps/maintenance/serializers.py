from rest_framework import serializers
from apps.maintenance.models import MaintenanceTicket
from apps.assets.serializers import AssetSerializer
from apps.authentication.serializers import UserSerializer


class MaintenanceTicketSerializer(serializers.ModelSerializer):
    asset_detail = AssetSerializer(source='asset', read_only=True)
    reported_by_detail = UserSerializer(source='reported_by', read_only=True)
    assigned_technician_detail = UserSerializer(source='assigned_to', read_only=True)

    class Meta:
        model = MaintenanceTicket
        fields = (
            'id', 'asset', 'asset_detail', 'reported_by', 'reported_by_detail',
            'assigned_to', 'assigned_technician_detail', 'title', 'description',
            'priority', 'status', 'estimated_cost', 'actual_cost',
            'start_date', 'completed_date', 'technician_notes',
            'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by'
        )
        read_only_fields = ('created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by')

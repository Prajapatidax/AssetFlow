from rest_framework import serializers
from apps.bookings.models import ResourceBooking
from apps.assets.serializers import AssetSerializer
from apps.authentication.serializers import UserSerializer


class ResourceBookingSerializer(serializers.ModelSerializer):
    asset_detail = AssetSerializer(source='asset', read_only=True)
    booked_by_detail = UserSerializer(source='booked_by', read_only=True)

    class Meta:
        model = ResourceBooking
        fields = (
            'id', 'asset', 'asset_detail', 'booked_by', 'booked_by_detail',
            'start_time', 'end_time', 'purpose', 'status',
            'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by'
        )
        read_only_fields = ('created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by')

    def validate(self, attrs):
        # We can trigger clean check to invoke model-level validations
        instance = ResourceBooking(**attrs)
        if self.instance:
            instance.id = self.instance.id
            
        try:
            instance.clean()
        except Exception as e:
            raise serializers.ValidationError(detail=str(e))
            
        return attrs

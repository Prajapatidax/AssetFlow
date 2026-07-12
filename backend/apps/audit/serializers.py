from rest_framework import serializers
from apps.audit.models import AuditCycle, AuditVerification
from apps.assets.serializers import AssetSerializer
from apps.authentication.serializers import UserSerializer


class AuditCycleSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditCycle
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by')


class AuditVerificationSerializer(serializers.ModelSerializer):
    asset_detail = AssetSerializer(source='asset', read_only=True)
    verified_by_detail = UserSerializer(source='verified_by', read_only=True)

    class Meta:
        model = AuditVerification
        fields = (
            'id', 'audit_cycle', 'asset', 'asset_detail', 'verified_by', 'verified_by_detail',
            'verified_at', 'status', 'notes',
            'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by'
        )
        read_only_fields = ('verified_at', 'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by')

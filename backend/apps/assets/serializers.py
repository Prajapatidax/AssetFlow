from rest_framework import serializers
from apps.assets.models import Asset, AssetCategory
from apps.organization.serializers import DepartmentSerializer
from apps.authentication.serializers import UserSerializer


class AssetCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetCategory
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by')


class AssetSerializer(serializers.ModelSerializer):
    category_detail = AssetCategorySerializer(source='category', read_only=True)
    department_detail = DepartmentSerializer(source='department', read_only=True)
    assigned_user_detail = UserSerializer(source='assigned_to', read_only=True)

    class Meta:
        model = Asset
        fields = (
            'id', 'category', 'category_detail', 'name', 'code', 'serial_number',
            'model_number', 'manufacturer', 'purchase_date', 'purchase_cost',
            'warranty_expiry', 'status', 'health_score', 'location',
            'assigned_to', 'assigned_user_detail', 'department', 'department_detail',
            'qr_code_image', 'notes', 'created_at', 'updated_at', 'deleted_at',
            'created_by', 'updated_by'
        )
        read_only_fields = ('qr_code_image', 'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by')

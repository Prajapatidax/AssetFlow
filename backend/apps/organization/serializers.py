from rest_framework import serializers
from apps.organization.models import Organization, Department
from apps.authentication.serializers import UserSerializer


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by')


class DepartmentSerializer(serializers.ModelSerializer):
    manager_detail = UserSerializer(source='manager', read_only=True)
    parent_name = serializers.CharField(source='parent_department.name', read_only=True)

    class Meta:
        model = Department
        fields = (
            'id', 'organization', 'name', 'code', 'manager', 
            'manager_detail', 'parent_department', 'parent_name',
            'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by'
        )
        read_only_fields = ('created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by')

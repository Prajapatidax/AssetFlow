from rest_framework import serializers
from apps.employees.models import Employee
from apps.authentication.serializers import UserSerializer
from apps.authentication.models import User


class EmployeeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    role = serializers.ChoiceField(source='user.role', choices=User.Roles.choices)
    phone_number = serializers.CharField(source='user.phone_number', required=False, allow_blank=True)
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = Employee
        fields = (
            'id', 'user', 'username', 'employee_id', 'department', 'department_name', 
            'designation', 'date_of_joining', 'status', 'bio',
            'first_name', 'last_name', 'email', 'role', 'phone_number',
            'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by'
        )
        read_only_fields = ('created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by')

    def update(self, instance, validated_data):
        # Update User data if passed
        user_data = validated_data.pop('user', None)
        if user_data:
            user = instance.user
            for attr, value in user_data.items():
                setattr(user, attr, value)
            user.save()

        # Update remaining employee fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

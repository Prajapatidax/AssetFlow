from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from apps.authentication.permissions import IsAdmin
from apps.employees.models import Employee
from apps.employees.serializers import EmployeeSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.select_related('user', 'department').all()
    serializer_class = EmployeeSerializer
    filterset_fields = ('department', 'status', 'user__role')
    search_fields = ('employee_id', 'user__first_name', 'user__last_name', 'user__email', 'designation')

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            self.permission_classes = [IsAuthenticated, IsAdmin]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

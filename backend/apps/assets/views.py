from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.authentication.permissions import IsAdmin, IsAssetManager
from apps.assets.models import Asset, AssetCategory
from apps.assets.serializers import AssetSerializer, AssetCategorySerializer


class AssetCategoryViewSet(viewsets.ModelViewSet):
    queryset = AssetCategory.objects.all()
    serializer_class = AssetCategorySerializer
    search_fields = ('name', 'code')

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            self.permission_classes = [permissions.IsAuthenticated, IsAssetManager | IsAdmin]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)


class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.select_related('category', 'department', 'assigned_to').all()
    serializer_class = AssetSerializer
    filterset_fields = ('category', 'department', 'status', 'assigned_to')
    search_fields = ('name', 'code', 'serial_number', 'model_number', 'manufacturer')

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update']:
            self.permission_classes = [permissions.IsAuthenticated, IsAssetManager | IsAdmin]
        elif self.action == 'destroy':
            self.permission_classes = [permissions.IsAuthenticated, IsAdmin]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated, IsAssetManager | IsAdmin])
    def allocate(self, request, pk=None):
        """
        Custom action to allocate an asset to an employee or department.
        """
        asset = self.get_object()
        assigned_to_id = request.data.get('assigned_to')
        department_id = request.data.get('department')

        if not assigned_to_id and not department_id:
            return Response(
                {"detail": "Must provide either an assigned_to user or department ID."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if assigned_to_id:
            asset.assigned_to_id = assigned_to_id
        if department_id:
            asset.department_id = department_id

        asset.status = Asset.Statuses.ALLOCATED
        asset.updated_by = request.user
        asset.save(update_fields=['assigned_to', 'department', 'status', 'updated_by'])

        return Response(AssetSerializer(asset).data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated, IsAssetManager | IsAdmin])
    def deallocate(self, request, pk=None):
        """
        Custom action to release allocation on an asset.
        """
        asset = self.get_object()
        asset.assigned_to = None
        asset.department = None
        asset.status = Asset.Statuses.ACTIVE
        asset.updated_by = request.user
        asset.save(update_fields=['assigned_to', 'department', 'status', 'updated_by'])

        return Response(AssetSerializer(asset).data)

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from apps.authentication.permissions import IsAdmin, IsAssetManager
from apps.audit.models import AuditCycle, AuditVerification
from apps.audit.serializers import AuditCycleSerializer, AuditVerificationSerializer
from apps.assets.models import Asset


class AuditCycleViewSet(viewsets.ModelViewSet):
    queryset = AuditCycle.objects.all()
    serializer_class = AuditCycleSerializer
    search_fields = ('name',)

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy', 'start']:
            self.permission_classes = [permissions.IsAuthenticated, IsAssetManager | IsAdmin]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

    @action(detail=True, methods=['post'])
    def start(self, request, pk=None):
        """
        Transitions status to IN_PROGRESS and auto-creates AuditVerification
        placeholders for all Active/Allocated assets.
        """
        cycle = self.get_object()
        if cycle.status == AuditCycle.Statuses.IN_PROGRESS:
            return Response({"detail": "Audit cycle is already in progress."}, status=status.HTTP_400_BAD_REQUEST)

        cycle.status = AuditCycle.Statuses.IN_PROGRESS
        cycle.updated_by = request.user
        cycle.save(update_fields=['status', 'updated_by'])

        # Auto-generate verifications
        assets_to_audit = Asset.objects.filter(status__in=[Asset.Statuses.ACTIVE, Asset.Statuses.ALLOCATED])
        verifications_created = 0

        for asset in assets_to_audit:
            _, created = AuditVerification.objects.get_or_create(
                audit_cycle=cycle,
                asset=asset,
                defaults={'status': AuditVerification.Statuses.PENDING}
            )
            if created:
                verifications_created += 1

        return Response({
            "detail": f"Audit cycle started. Generated {verifications_created} verification cards.",
            "cycle": AuditCycleSerializer(cycle).data
        })


class AuditVerificationViewSet(viewsets.ModelViewSet):
    queryset = AuditVerification.objects.select_related('audit_cycle', 'asset', 'verified_by').all()
    serializer_class = AuditVerificationSerializer
    filterset_fields = ('audit_cycle', 'asset', 'status', 'verified_by')
    search_fields = ('asset__name', 'asset__code', 'notes')

    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        """
        Submits physical verification results for a single asset check card.
        """
        verification = self.get_object()
        
        # Check that cycle is active
        if verification.audit_cycle.status != AuditCycle.Statuses.IN_PROGRESS:
            return Response(
                {"detail": "Verification checks cannot be submitted for a closed or draft audit cycle."},
                status=status.HTTP_400_BAD_REQUEST
            )

        v_status = request.data.get('status')
        notes = request.data.get('notes', '')

        if v_status not in [AuditVerification.Statuses.VERIFIED, AuditVerification.Statuses.MISPLACED, AuditVerification.Statuses.DAMAGED]:
            return Response(
                {"detail": f"Invalid verification status. Must be one of VERIFIED, MISPLACED, or DAMAGED."},
                status=status.HTTP_400_BAD_REQUEST
            )

        verification.status = v_status
        verification.notes = notes
        verification.verified_by = request.user
        verification.verified_at = timezone.now()
        verification.save(update_fields=['status', 'notes', 'verified_by', 'verified_at'])

        # Synchronize asset health if damaged or misplaced
        asset = verification.asset
        if v_status == AuditVerification.Statuses.DAMAGED:
            asset.health_score = max(0, asset.health_score - 30)
            asset.save(update_fields=['health_score'])
        elif v_status == AuditVerification.Statuses.MISPLACED:
            asset.status = Asset.Statuses.DRAFT  # Temporarily draft until found
            asset.save(update_fields=['status'])

        return Response(AuditVerificationSerializer(verification).data)

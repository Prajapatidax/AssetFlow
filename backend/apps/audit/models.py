from django.db import models
from django.conf import settings
from apps.common.models import BaseModel
from apps.assets.models import Asset


class AuditCycle(BaseModel):
    class Statuses(models.TextChoices):
        DRAFT = 'DRAFT', 'Draft'
        IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
        COMPLETED = 'COMPLETED', 'Completed'

    name = models.CharField(max_length=255, help_text="Audit plan name (e.g., Q3 Hardware Audit).")
    start_date = models.DateField()
    end_date = models.DateField()
    description = models.TextField(blank=True, null=True)
    
    status = models.CharField(
        max_length=30,
        choices=Statuses.choices,
        default=Statuses.DRAFT
    )

    class Meta:
        db_table = 'audit_cycle'
        ordering = ['-start_date']
        verbose_name = 'Audit Cycle'
        verbose_name_plural = 'Audit Cycles'

    def __str__(self):
        return f"{self.name} ({self.start_date.year})"


class AuditVerification(BaseModel):
    class Statuses(models.TextChoices):
        PENDING = 'PENDING', 'Pending Check'
        VERIFIED = 'VERIFIED', 'Verified Present'
        MISPLACED = 'MISPLACED', 'Misplaced / Missing'
        DAMAGED = 'DAMAGED', 'Damaged'

    audit_cycle = models.ForeignKey(
        AuditCycle,
        on_delete=models.CASCADE,
        related_name='verifications'
    )
    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        related_name='audit_checks'
    )
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='verified_checks'
    )
    verified_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(
        max_length=30,
        choices=Statuses.choices,
        default=Statuses.PENDING
    )
    notes = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'audit_verification'
        unique_together = ('audit_cycle', 'asset')
        ordering = ['status', 'asset__code']
        verbose_name = 'Audit Verification'
        verbose_name_plural = 'Audit Verifications'

    def __str__(self):
        return f"{self.audit_cycle.name} - {self.asset.code} ({self.status})"

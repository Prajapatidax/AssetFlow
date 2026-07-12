from django.db import models
from django.conf import settings
from apps.common.models import BaseModel
from apps.assets.models import Asset


class MaintenanceTicket(BaseModel):
    class Priorities(models.TextChoices):
        LOW = 'LOW', 'Low'
        MEDIUM = 'MEDIUM', 'Medium'
        HIGH = 'HIGH', 'High'
        CRITICAL = 'CRITICAL', 'Critical'

    class Statuses(models.TextChoices):
        NEW = 'NEW', 'New Request'
        IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
        AWAITING_APPROVAL = 'AWAITING_APPROVAL', 'Awaiting Cost Approval'
        DONE = 'DONE', 'Completed'

    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        related_name='maintenance_tickets'
    )
    reported_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='reported_tickets'
    )
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_tickets',
        help_text="Maintenance technician or vendor handling the service."
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    priority = models.CharField(
        max_length=20,
        choices=Priorities.choices,
        default=Priorities.MEDIUM
    )
    status = models.CharField(
        max_length=30,
        choices=Statuses.choices,
        default=Statuses.NEW
    )
    estimated_cost = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    actual_cost = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    
    start_date = models.DateField(null=True, blank=True)
    completed_date = models.DateField(null=True, blank=True)
    
    technician_notes = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'maintenance_ticket'
        ordering = ['-created_at']
        verbose_name = 'Maintenance Ticket'
        verbose_name_plural = 'Maintenance Tickets'

    def __str__(self):
        return f"{self.title} ({self.asset.code})"

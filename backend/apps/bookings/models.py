from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from apps.common.models import BaseModel
from apps.assets.models import Asset


class ResourceBooking(BaseModel):
    class Statuses(models.TextChoices):
        PENDING = 'PENDING', 'Pending Approval'
        APPROVED = 'APPROVED', 'Approved'
        REJECTED = 'REJECTED', 'Rejected'
        CANCELLED = 'CANCELLED', 'Cancelled'

    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        related_name='bookings',
        help_text="The physical room, vehicle, or equipment being booked."
    )
    booked_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='my_bookings'
    )
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    purpose = models.CharField(max_length=255, help_text="Reason or description of the booking reservation.")
    
    status = models.CharField(
        max_length=20,
        choices=Statuses.choices,
        default=Statuses.PENDING
    )

    class Meta:
        db_table = 'booking_resource_booking'
        ordering = ['-start_time']
        verbose_name = 'Resource Booking'
        verbose_name_plural = 'Resource Bookings'

    def __str__(self):
        return f"{self.asset.name} - {self.booked_by.username} ({self.start_time.strftime('%Y-%m-%d %H:%M')})"

    def clean(self):
        super().clean()
        if self.start_time and self.end_time:
            if self.start_time >= self.end_time:
                raise ValidationError("Start time must be strictly before end time.")

            # Overlap checking (excluding currently saved instance if editing, and excluding cancelled/rejected bookings)
            overlaps = ResourceBooking.objects.filter(
                asset=self.asset,
                start_time__lt=self.end_time,
                end_time__gt=self.start_time
            ).exclude(status__in=[self.Statuses.CANCELLED, self.Statuses.REJECTED])

            if self.id:
                overlaps = overlaps.exclude(id=self.id)

            if overlaps.exists():
                raise ValidationError("Collision alert: This asset is already reserved for the selected timeframe.")

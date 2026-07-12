from django.db import models
from django.conf import settings
from apps.common.models import BaseModel
from apps.organization.models import Department


class Employee(BaseModel):
    class Statuses(models.TextChoices):
        ACTIVE = 'ACTIVE', 'Active'
        INACTIVE = 'INACTIVE', 'Inactive'
        SUSPENDED = 'SUSPENDED', 'Suspended'

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='employee_profile',
        help_text="Underlying authentication user account."
    )
    employee_id = models.CharField(
        max_length=50,
        unique=True,
        help_text="Unique Organization Employee Code/ID."
    )
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='employees'
    )
    designation = models.CharField(max_length=150, help_text="Job title/designation.")
    date_of_joining = models.DateField(null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=Statuses.choices,
        default=Statuses.ACTIVE
    )
    bio = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'emp_employee'
        ordering = ['employee_id']
        verbose_name = 'Employee'
        verbose_name_plural = 'Employees'

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.employee_id})"

from django.db import models
from django.conf import settings
from apps.common.models import BaseModel


class Organization(BaseModel):
    name = models.CharField(max_length=255, help_text="Official name of the organization.")
    code = models.CharField(max_length=50, unique=True, help_text="Unique identifier code for the organization.")
    logo = models.ImageField(upload_to='organization/logos/', blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    class Meta:
        db_table = 'org_organization'
        ordering = ['name']
        verbose_name = 'Organization'
        verbose_name_plural = 'Organizations'

    def __str__(self):
        return f"{self.name} ({self.code})"


class Department(BaseModel):
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name='departments'
    )
    name = models.CharField(max_length=255, help_text="Name of the department.")
    code = models.CharField(max_length=50, unique=True, help_text="Unique code for the department.")
    
    manager = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='managed_departments',
        help_text="The Department Head or Manager responsible."
    )
    parent_department = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='sub_departments',
        help_text="Parent department for nested structural hierarchies."
    )

    class Meta:
        db_table = 'org_department'
        ordering = ['name']
        verbose_name = 'Department'
        verbose_name_plural = 'Departments'

    def __str__(self):
        return f"{self.name} ({self.code})"

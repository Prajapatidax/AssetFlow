import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from django.utils import timezone


class CustomUserManager(UserManager):
    def get_queryset(self):
        return super().get_queryset().filter(deleted_at__isnull=True)

    def all_with_deleted(self):
        return super().get_queryset()

    def deleted(self):
        return super().get_queryset().filter(deleted_at__isnull=False)


class User(AbstractUser):
    class Roles(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        ASSET_MANAGER = 'ASSET_MANAGER', 'Asset Manager'
        DEPARTMENT_HEAD = 'DEPARTMENT_HEAD', 'Department Head'
        EMPLOYEE = 'EMPLOYEE', 'Employee'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(
        max_length=20,
        choices=Roles.choices,
        default=Roles.EMPLOYEE,
        help_text="Define the role and permissions hierarchy of the user."
    )
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = CustomUserManager()

    class Meta:
        db_table = 'auth_user'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def delete(self, force=False, *args, **kwargs):
        if force:
            super().delete(*args, **kwargs)
        else:
            self.deleted_at = timezone.now()
            self.is_active = False
            self.save(update_fields=['deleted_at', 'is_active'])

    def restore(self):
        self.deleted_at = None
        self.is_active = True
        self.save(update_fields=['deleted_at', 'is_active'])

    @property
    def is_admin(self):
        return self.role == self.Roles.ADMIN or self.is_superuser

    @property
    def is_asset_manager(self):
        return self.role == self.Roles.ASSET_MANAGER or self.is_admin

    @property
    def is_department_head(self):
        return self.role == self.Roles.DEPARTMENT_HEAD or self.is_admin

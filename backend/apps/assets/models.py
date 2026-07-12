from django.db import models
from django.conf import settings
from apps.common.models import BaseModel
from apps.organization.models import Department


class AssetCategory(BaseModel):
    name = models.CharField(max_length=150, unique=True, help_text="Category name (e.g., Laptops, Ergonomic Chairs).")
    code = models.CharField(max_length=50, unique=True, help_text="Short unique identifier code (e.g., LAP, CHR).")
    depreciation_rate = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        default=0.00,
        help_text="Annual straight-line depreciation rate percentage (e.g., 20.00)."
    )
    description = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'asset_category'
        ordering = ['name']
        verbose_name = 'Asset Category'
        verbose_name_plural = 'Asset Categories'

    def __str__(self):
        return f"{self.name} ({self.code})"


class Asset(BaseModel):
    class Statuses(models.TextChoices):
        DRAFT = 'DRAFT', 'Draft'
        ACTIVE = 'ACTIVE', 'Active / Ready'
        ALLOCATED = 'ALLOCATED', 'Allocated'
        MAINTENANCE = 'MAINTENANCE', 'In Maintenance'
        DISPOSED = 'DISPOSED', 'Disposed'

    category = models.ForeignKey(
        AssetCategory,
        on_delete=models.PROTECT,
        related_name='assets'
    )
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=100, unique=True, help_text="Unique asset barcode / tracking label code.")
    serial_number = models.CharField(max_length=255, blank=True, null=True, unique=True)
    model_number = models.CharField(max_length=255, blank=True, null=True)
    manufacturer = models.CharField(max_length=255, blank=True, null=True)
    
    purchase_date = models.DateField(null=True, blank=True)
    purchase_cost = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    warranty_expiry = models.DateField(null=True, blank=True)
    
    status = models.CharField(
        max_length=30,
        choices=Statuses.choices,
        default=Statuses.DRAFT
    )
    health_score = models.IntegerField(default=100, help_text="Estimated health level from 0 to 100.")
    location = models.CharField(max_length=255, blank=True, null=True, help_text="Physical placement site.")
    
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_assets'
    )
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='department_assets'
    )

    qr_code_image = models.ImageField(upload_to='assets/qrcodes/', blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'asset_asset'
        ordering = ['code']
        verbose_name = 'Asset'
        verbose_name_plural = 'Assets'

    def __str__(self):
        return f"{self.name} ({self.code})"

    @property
    def is_available(self):
        return self.status == self.Statuses.ACTIVE

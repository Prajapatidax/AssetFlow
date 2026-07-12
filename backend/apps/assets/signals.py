from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.assets.models import Asset
from apps.assets.services import generate_asset_qr_code


@receiver(post_save, sender=Asset)
def handle_asset_qr_code(sender, instance, created, **kwargs):
    """
    Triggers QR code generation upon creation of a new Asset if no QR code image exists.
    """
    if not instance.qr_code_image:
        success = generate_asset_qr_code(instance)
        if success:
            # Save using update_fields to avoid recursion loops
            instance.save(update_fields=['qr_code_image'])

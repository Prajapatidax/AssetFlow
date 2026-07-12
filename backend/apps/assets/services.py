import qrcode
from io import BytesIO
from django.core.files.base import ContentFile


def generate_asset_qr_code(asset) -> bool:
    """
    Generates a QR code image locally using the qrcode library pointing to the digital passport URL,
    and updates the asset's qr_code_image field.
    """
    passport_data = f"http://localhost:3000/assets/passport/{str(asset.id)}"
    
    try:
        # Generate QR code locally
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(passport_data)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")
        
        blob = BytesIO()
        img.save(blob, format='PNG')
        
        filename = f"qr_{asset.code}.png"
        asset.qr_code_image.save(filename, ContentFile(blob.getvalue()), save=False)
        return True
    except Exception as e:
        # Log error in console or logging system
        print(f"Failed to generate QR code locally for {asset.code}: {str(e)}")
        
    return False

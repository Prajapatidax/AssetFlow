import requests
from django.core.files.base import ContentFile


def generate_asset_qr_code(asset) -> bool:
    """
    Generates a QR code image using QRServer API pointing to the digital passport URL of the asset,
    and updates the asset's qr_code_image field.
    """
    passport_data = f"http://localhost:3000/assets/passport/{str(asset.id)}"
    api_url = f"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data={passport_data}"
    
    try:
        response = requests.get(api_url, timeout=10)
        if response.status_code == 200:
            filename = f"qr_{asset.code}.png"
            asset.qr_code_image.save(filename, ContentFile(response.content), save=False)
            return True
    except Exception as e:
        # Log error in console or logging system
        print(f"Failed to generate QR code for {asset.code}: {str(e)}")
        
    return False

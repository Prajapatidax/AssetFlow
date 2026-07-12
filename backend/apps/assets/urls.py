from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.assets.views import AssetViewSet, AssetCategoryViewSet

router = DefaultRouter()
router.register('categories', AssetCategoryViewSet, basename='category')
router.register('items', AssetViewSet, basename='asset')

urlpatterns = [
    path('', include(router.urls)),
]

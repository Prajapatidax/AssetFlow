from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

api_patterns = [
    # OpenAPI Schema & Docs
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='api-v1:schema'), name='swagger-ui'),
    path('schema/redoc/', SpectacularRedocView.as_view(url_name='api-v1:schema'), name='redoc'),
    
    # App-specific API routes
    path('auth/', include('apps.authentication.urls')),
    path('organization/', include('apps.organization.urls')),
    path('employees/', include('apps.employees.urls')),
    path('assets/', include('apps.assets.urls')),
    path('maintenance/', include('apps.maintenance.urls')),
    path('bookings/', include('apps.bookings.urls')),
    path('audit/', include('apps.audit.urls')),
    path('reports/', include('apps.reports.urls')),
    path('notifications/', include('apps.notifications.urls')),
    path('analytics/', include('apps.analytics.urls')),
    path('settings/', include('apps.settings.urls')),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include((api_patterns, 'api-v1'))),
]

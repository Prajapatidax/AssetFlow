from django.urls import path
from apps.reports.views import ExportReportView

urlpatterns = [
    path('export/', ExportReportView.as_view(), name='export_report'),
]

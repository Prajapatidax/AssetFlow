from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Avg, Count
from apps.assets.models import Asset
from apps.bookings.models import ResourceBooking
from apps.maintenance.models import MaintenanceTicket


class DashboardAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Calculate dynamic KPIs
        total_assets = Asset.objects.count()
        allocated_assets = Asset.objects.filter(status=Asset.Statuses.ALLOCATED).count()
        avg_health = Asset.objects.aggregate(avg_h=Avg('health_score'))['avg_h'] or 0
        
        active_bookings = ResourceBooking.objects.filter(status=ResourceBooking.Statuses.APPROVED).count()
        pending_maintenance = MaintenanceTicket.objects.exclude(status=MaintenanceTicket.Statuses.DONE).count()
        total_maint_cost = MaintenanceTicket.objects.aggregate(total_c=Sum('actual_cost'))['total_c'] or 0

        # Category utilization breakdown
        category_data = []
        assets_by_cat = Asset.objects.values('category__name').annotate(count=Count('id'))
        for item in assets_by_cat:
            category_data.append({
                'name': item['category__name'] or 'Uncategorized',
                'value': item['count']
            })

        return Response({
            'kpis': {
                'total_assets': total_assets,
                'allocated_assets': allocated_assets,
                'avg_health': round(float(avg_health), 1),
                'active_bookings': active_bookings,
                'pending_maintenance': pending_maintenance,
                'total_maintenance_cost': float(total_maint_cost),
            },
            'category_distribution': category_data
        })

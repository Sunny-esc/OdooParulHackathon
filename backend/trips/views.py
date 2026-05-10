from rest_framework import viewsets, permissions, status, filters
from rest_framework.response import Response
from .models import Trip, Stop, Activity, PackingItem, City, TripNote
from .serializers import (
    TripSerializer, StopSerializer, ActivitySerializer, 
    PackingItemSerializer, CitySerializer, TripNoteSerializer,GlobalActivity,GlobalActivitySerializer
)

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from django.db.models import Sum,Count

from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .models import Trip, Stop
class TripViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TripSerializer

    def get_queryset(self):
        # Dashboard: Returns only trips belonging to the logged-in user
        return Trip.objects.filter(user=self.request.user).order_by('-start_date')

    def perform_create(self, serializer):
        # Create Trip: Logic to save the user automatically
        serializer.save(user=self.request.user)
    @action(detail=True, methods=['get'])
    def budget_report(self, request, pk=None):
        trip = self.get_object()
        
        # Aggregate costs by category
        breakdown = Activity.objects.filter(stop__trip=trip) \
            .values('category') \
            .annotate(total=Sum('cost'))
            
        total_trip_cost = Activity.objects.filter(stop__trip=trip) \
            .aggregate(Sum('cost'))['cost__sum'] or 0

        return Response({
            "trip_name": trip.name,
            "total_estimated_cost": total_trip_cost,
            "category_breakdown": breakdown
        })
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def copy(self, request, pk=None):
        original_trip = self.get_object() # This fetches the trip by ID
        
        # Create a copy of the Trip object for the current user
        new_trip = Trip.objects.create(
            user=request.user,
            name=f"Copy of {original_trip.name}",
            description=original_trip.description,
            start_date=original_trip.start_date,
            end_date=original_trip.end_date,
            is_public=False # New copy starts as private
        )

        # Deep copy the Stops and Activities
        for stop in original_trip.stops.all():
            new_stop = Stop.objects.create(
                trip=new_trip,
                city_name=stop.city_name,
                arrival_date=stop.arrival_date,
                departure_date=stop.departure_date,
                order=stop.order
            )
            for activity in stop.activities.all():
                Activity.objects.create(
                    stop=new_stop,
                    title=activity.title,
                    category=activity.category,
                    cost=activity.cost,
                    duration_minutes=activity.duration_minutes
                )

        return Response({"message": "Trip copied successfully!", "new_trip_id": new_trip.id})

class StopViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = StopSerializer

    def get_queryset(self):
        # Ensure users can only modify stops belonging to their own trips
        return Stop.objects.filter(trip__user=self.request.user)

class PackingItemViewSet(viewsets.ModelViewSet):
    serializer_class = PackingItemSerializer # You'll need to create this in serializers.py
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PackingItem.objects.filter(trip__user=self.request.user)

#Problem Statement #8 (Activity Search),
class ActivityViewSet(viewsets.ModelViewSet):
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    # Adding Search and Filter capabilities
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'stop__city_name'] # Filter by type or city
    search_fields = ['title', 'description']           # Search by text
    ordering_fields = ['cost', 'duration_minutes']    # Sort by price/time

    def get_queryset(self):
        # Only show activities for the user's own trips
        return Activity.objects.filter(stop__trip__user=self.request.user)


from rest_framework import generics, permissions

#We will create a specific ViewSet that allows anyone (even without a login) to view a trip, but only if the trip is marked as public.
class PublicTripDetailView(generics.RetrieveAPIView):
    """
    Feature #11: Allows unauthenticated access to a trip 
    if is_public is set to True.
    """
    queryset = Trip.objects.filter(is_public=True)
    serializer_class = TripSerializer
    permission_classes = [permissions.AllowAny] # No token required
    
    


User = get_user_model()

class AdminDashboardAnalyticsView(APIView):
    """
    Feature #14: Admin-only interface to track user trends 
    and platform usage.
    """
    permission_classes = [permissions.IsAdminUser] # Only staff/superuser can access

    def get(self, request):
        # 1. Platform Totals
        total_users = User.objects.count()
        total_trips = Trip.objects.count()
        
        # 2. Trending Cities (Top 5 cities added to trips)
        top_cities = Stop.objects.values('city_name') \
            .annotate(count=Count('city_name')) \
            .order_by('-count')[:5]

        # 3. User Engagement (Latest 5 users who created trips)
        recent_activity = Trip.objects.select_related('user') \
            .order_by('-created_at')[:5] \
            .values('user__email', 'name', 'created_at')

        return Response({
            "stats": {
                "total_users": total_users,
                "total_trips": total_trips,
            },
            "trending_cities": top_cities,
            "recent_activity": recent_activity
        })
        
class CityViewSet(viewsets.ReadOnlyModelViewSet): # Read-only for users
    queryset = City.objects.all()
    serializer_class = CitySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'country']
class ActivityMetaDataView(APIView):
    def get(self, request):
        # Dynamically pull categories defined in your Model
        categories = [
            {'id': 'SIGHTSEEING', 'name': 'Sightseeing'},
            {'id': 'FOOD', 'name': 'Food & Dining'},
            {'id': 'TRANSPORT', 'name': 'Transport'},
            {'id': 'STAY', 'name': 'Accommodation'},
        ]
        return Response({"categories": categories})
    
class GlobalActivityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GlobalActivity.objects.all()
    serializer_class = GlobalActivitySerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'city__name']
    filterset_fields = ['city']
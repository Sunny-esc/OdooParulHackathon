# config/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

# Fixed imports: Importing ViewSets, not Models/Serializers
from trips.views import (
    TripViewSet, 
    StopViewSet, 
    ActivityViewSet, 
    PackingItemViewSet, 
    CityViewSet,
    PublicTripDetailView,
    AdminDashboardAnalyticsView,
    ActivityMetaDataView,
    GlobalActivityViewSet,  # <--- MUST BE THE VIEWSET
)

router = DefaultRouter()
router.register(r'trips', TripViewSet, basename='trip')
router.register(r'stops', StopViewSet, basename='stop')
router.register(r'activities', ActivityViewSet, basename='activity')
router.register(r'packing-items', PackingItemViewSet, basename='packingitem')
router.register(r'cities', CityViewSet, basename='city')
router.register(r'global-activities', GlobalActivityViewSet, basename='globalactivity')
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("users.urls")),
    
    path("api/token/", TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("api/token/refresh/", TokenRefreshView.as_view(), name='token_refresh'),

    path("api/", include(router.urls)),
    
    # Non-router based views
    path('api/public/trips/<int:pk>/', PublicTripDetailView.as_view(), name='public-trip-detail'),
    path('api/admin/analytics/', AdminDashboardAnalyticsView.as_view(), name='admin-analytics'),
    path('api/activity-metadata/', ActivityMetaDataView.as_view(), name='activity-metadata'),
    path("api/", include(router.urls)),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
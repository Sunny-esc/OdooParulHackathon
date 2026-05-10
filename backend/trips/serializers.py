from rest_framework import serializers
from django.contrib.auth.models import User  # <--- FIX: Add this import
from .models import Trip, Stop, Activity, PackingItem, TripNote, City,GlobalActivity
# ... your other imports (Trip, Stop, Activity)
class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'

class StopSerializer(serializers.ModelSerializer):
    # This allows showing activities inside the stop object
    activities = ActivitySerializer(many=True, read_only=True)

    class Meta:
        model = Stop
        fields = ['id', 'trip', 'city_name', 'arrival_date', 'departure_date', 'order', 'activities']

class TripSerializer(serializers.ModelSerializer):
    total_budget = serializers.ReadOnlyField(source='total_cost')
    # This allows showing stops inside the trip object
    stops = StopSerializer(many=True, read_only=True)
    stats_summary = serializers.SerializerMethodField()
    class Meta:
        model = Trip
        fields = ['id', 'name', 'description', 'start_date', 'end_date', 'is_public', 'stops', 'stats_summary','total_budget']
    def get_stats_summary(self, obj):
        stop_count = obj.stops.count()
        activity_count = Activity.objects.filter(stop__trip=obj).count()
        duration = (obj.end_date - obj.start_date).days
        return f"{stop_count} Cities, {activity_count} Activities, {duration} Days"
        
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User # or your custom User model
        fields = ['id', 'email', 'first_name', 'last_name', 'profile_photo', 'language_preference']
        read_only_fields = ['email']
        
        
class PackingItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackingItem
        fields = '__all__'

class CitySerializer(serializers.ModelSerializer):
    # This includes the $ / $$ / $$$ logic we wrote in the model
    cost_level = serializers.ReadOnlyField() 

    class Meta:
        model = City
        fields = [
            'id', 'name', 'country', 'lat', 'lng', 'population', 
            'tourism_rating', 'attractions_count', 'popularity_score',
            'avg_food_cost', 'avg_hotel_cost', 'avg_transport_cost', 'cost_level'
        ]

class TripNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripNote
        fields = '__all__'

class GlobalActivitySerializer(serializers.ModelSerializer):
    city_name = serializers.ReadOnlyField(source='city.name')

    class Meta:
        model = GlobalActivity
        fields = ['id', 'name', 'city', 'city_name', 'base_cost', 'description', 'image']
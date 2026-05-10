from django.db import models
from django.conf import settings

class Trip(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="trips")
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    cover_image = models.ImageField(upload_to='trip_covers/', null=True, blank=True)
    is_public = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    # Inside class Trip(models.Model):
    @property
    def total_cost(self):
        # Logic: Sum all costs of activities linked to stops in this trip
        return sum(
        Activity.objects.filter(stop__trip=self).values_list('cost', flat=True)
    )
    def __str__(self):
        return self.name

class Stop(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="stops")
    city_name = models.CharField(max_length=100)
    arrival_date = models.DateField()
    departure_date = models.DateField()
    order = models.PositiveIntegerField(default=0) # For reordering cities

    class Meta:
        ordering = ['order', 'arrival_date']

class Activity(models.Model):
    # Link to a specific stop (e.g., Paris Stop)
    stop = models.ForeignKey(Stop, on_delete=models.CASCADE, related_name="activities")
    
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    
    # Feature #8: Categorization & Cost
    category = models.CharField(max_length=100, default="Sightseeing") 
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    duration_minutes = models.PositiveIntegerField(default=60)
    
    # For Itinerary View (#6)
    start_time = models.TimeField(null=True, blank=True)
    
    def __str__(self):
        return self.title

class PackingItem(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="packing_items")
    item_name = models.CharField(max_length=255)
    category = models.CharField(max_length=100, default="General") # e.g., Electronics, Clothes
    is_packed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.item_name} - {self.trip.name}"


class TripNote(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="notes")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        
        
class City(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)
    population = models.IntegerField(default=0)
    
    # New data fields from your friend's images
    tourism_rating = models.FloatField(default=0.0)
    attractions_count = models.IntegerField(default=0)
    popularity_score = models.FloatField(default=0.0)
    
    # Average Costs for smarter budgeting
    avg_food_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    avg_hotel_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    avg_transport_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    @property
    def cost_level(self):
        # Logic to return $, $$, or $$$ based on total average costs
        total = self.avg_food_cost + self.avg_hotel_cost + self.avg_transport_cost
        if total < 50: return "$"
        if total < 150: return "$$"
        return "$$$"

    def __str__(self):
        return f"{self.name}, {self.country}"
class GlobalActivity(models.Model):
    name = models.CharField(max_length=200)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    base_cost = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='activities/', null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.city.name})"
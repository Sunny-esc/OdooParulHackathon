import csv
import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from trips.models import City

def import_data(file_path):
    # Fixed the 'r' to be a string
    with open(file_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Helper function to safely handle the numbers
            def clean_int(val):
                try:
                    return int(float(val)) if val else 0
                except (ValueError, TypeError):
                    return 0

            def clean_float(val):
                try:
                    return float(val) if val else 0.0
                except (ValueError, TypeError):
                    return 0.0

            City.objects.update_or_create(
                name=row['city'],
                country=row['country'],
                defaults={
                    'lat': clean_float(row.get('lat')),
                    'lng': clean_float(row.get('lng')),
                    'population': clean_int(row.get('population')),
                    'tourism_rating': clean_float(row.get('tourism_rating')),
                    'attractions_count': clean_int(row.get('attractions_count')),
                    'popularity_score': clean_float(row.get('popularity_score')),
                    'avg_food_cost': clean_float(row.get('avg_food_cost')),
                    'avg_hotel_cost': clean_float(row.get('avg_hotel_cost')),
                    'avg_transport_cost': clean_float(row.get('avg_transport_cost')),
                }
            )
    print("Cities imported successfully!")
if __name__ == "__main__":
    import_data('final_data12.csv')
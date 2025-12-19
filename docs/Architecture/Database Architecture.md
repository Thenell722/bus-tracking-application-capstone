+---------------------+
|  Routes Collection  |
|---------------------|
| route_id            |
| route_name          |
| stops[]             |
| polyline            |
+----------+----------+
           |
           | 1..*
           v
+---------------------+
|  Buses Collection   |
|---------------------|
| bus_id              |
| route_id (FK)       |
| status              |
| current_location    |
| speed               |
| last_updated        |
+---------------------+

+---------------------+
| Pricing Collection  |
|---------------------|
| price_id            |
| route_id (FK)       |
| base_fare           |
| per_distance_rate   |
+---------------------+

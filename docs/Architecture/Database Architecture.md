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
+---------------------+

+---------------------+
| Pricing Collection  |
|---------------------|
| price_id            |
| route_id (FK)       |
| base_fare           |  
+---------------------+

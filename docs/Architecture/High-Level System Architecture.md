+-----------------------+
|      Mobile App       |
|   React Native (Expo) |
+----------+------------+
           |
           | HTTPS REST API Requests
           v
+-----------------------+
|   Backend Server      |
| Node.js + Express     |
| - Routes API          |
| - Pricing API         |
| - ETA Calculation     |
| - GPS Simulation      |
+----------+------------+
           |
           | Database Queries
           v
+-----------------------+
|    MongoDB Atlas      |
| - Bus Routes          |
| - Stops               |
| - Pricing             |
| - Simulated position  |
+----------+------------+
           |
           | External API Calls
           v
+------------------------+
| Google Maps Platform   |
| - Maps SDK             |
| - Polyline Routes      |
| - Geolocation Services |
+------------------------+

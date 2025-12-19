User Opens App
        |
        v
Mobile App Requests Route Data
        |
        v
Backend Fetches Route + Bus State
        |
        v
MongoDB Returns Data
        |
        v
Backend Calculates ETA + enriches response
        |
        v
Response sent back to Mobile App
        |
        v
Map Displays:
- Route
- Bus location
- ETA

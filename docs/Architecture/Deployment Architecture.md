                Internet
        -------------------------
               HTTPS
        -------------------------

+------------------------------+
|        User Device           |
|  Android / iOS / Emulator    |
+---------------+--------------+
                |
                v
+--------------------------------------+
|            Cloud Hosting             |
|        (Backend + Database)          |
+------------------+-------------------+
                   |
          +--------+---------+
          | Backend Server   |
          | Node + Express   |
          | Hosted: Render / |
          | Heroku / Azure   |
          +--------+---------+
                   |
        +----------+----------+
        |  MongoDB Atlas      |
        |  Cloud Database     |
        +----------+----------+
                   |
        +----------+----------+
        | Google Maps Platform|
        +---------------------+

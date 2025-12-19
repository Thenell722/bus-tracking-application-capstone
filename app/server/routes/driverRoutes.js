const express = require('express');
const Driver = require('../models/Driver');

const router = express.Router();

/**
 * GET /drivers
 * Fetches all driver records from the database
 * @returns Array of driver documents
 * @throws 500 on server error
 */
router.get('/', async (_req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);  // Fixed typo from original (nrivers → drivers)
  } catch (err) {
    res.status(500).json({ 
      message: err.message,
      error: 'Failed to retrieve drivers' 
    });
  }
});

/**
 * POST /drivers
 * Creates a new driver record
 * @param {string} name - Driver's full name
 * @param {string} phone - Contact number
 * @param {string} route - Assigned route ID
 * @returns The newly created driver document
 * @throws 400 for invalid data
 */
router.post('/', async (req, res) => {
  const { name, phone, route } = req.body;

  // Validate required fields
  if (!name || !phone) {
    return res.status(400).json({ 
      message: 'Name and phone are required fields' 
    });
  }

  const driver = new Driver({ 
    name, 
    contact_number: phone,  
    current_route: route    
  });

  try {
    const newDriver = await driver.save();
    res.status(201).json(newDriver);
  } catch (err) {
    res.status(400).json({ 
      message: err.message,
      error: 'Driver creation failed'
    });
  }
});



/**
 * POST /drivers/update-location
 * Updates a driver's GPS coordinates
 * @param {string} driver_id - Unique ID of the driver
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns Success message
 * @throws 400 for missing fields, 500 on DB error
 */


/**
 * POST /drivers/update-location
 * Updates a driver's GPS coordinates
 * Body: { driver_id: string, lat: number, lng: number }
 */
router.post('/update-location', async (req, res) => {
  const { driver_id, lat, lng } = req.body;

  if (!driver_id || lat == null || lng == null) {
    return res.status(400).json({
      message: 'driver_id, lat, and lng are required'
    });
  }

  // ensure numbers
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return res.status(400).json({ message: 'lat and lng must be valid numbers' });
  }

  try {
    const result = await Driver.findOneAndUpdate(
      { driver_id },
      {
        $set: {
          current_location: {
            type: "Point",
            coordinates: [longitude, latitude], // GeoJSON: [lon, lat]
          },
          location_timestamp: new Date()
        }
      },
      { new: true, upsert: false } // don't create if missing; return updated doc
    );

    if (!result) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({ message: 'Driver location updated', driver: result });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update location',
      error: err.message
    });
  }
});



module.exports = router;

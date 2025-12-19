const mongoose = require('mongoose');

/**
 * Route Schema - Defines transportation route details including:
 * - Location points
 * - Fare structure
 * - Active buses tracking
 * - Operational status
 */
const routeSchema = new mongoose.Schema({
  route_id: {
    type: String,
    required: true,    // Mandatory identifier
    unique: true,     // Prevent duplicate route IDs
  },
  
  name: String,

  // Array of locations/stops along the route
  locations: [
    {
      code: String,    
      name: String,    
      coordinates: {   
        lat: Number,   
        lng: Number,   
      },
    },
  ],

  // Farebetween different points
  fares: [
    {
      from: String,    // Starting location code
      to: String,      // Destination location code
      price: Number,   // Fare amount
    },
  ],

  // Currently operating buses on this route
  active_buses: [
    {
      driver_id: String,            
      bus_number_plate: String,     
      current_location: {          
        lat: Number,
        lng: Number,
      },
      last_updated: Date,          
    },
  ],

  // Route operational status
  status: {
    type: String,
    default: 'active',             
    enum: ['active', 'inactive', 'maintenance'],
  },
}, {
  timestamps: true  // Adds createdAt and updatedAt automatically
});

/**
 * Route Model
 * Exports the Mongoose model for use throughout the application
 */
module.exports = mongoose.model('Route', routeSchema);
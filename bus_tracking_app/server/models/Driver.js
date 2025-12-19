const mongoose = require('mongoose');

/**
 * Driver Schema - Defines the structure and requirements for driver documents
 * Includes validation, defaults, and relationships to other collections
 */
const driverSchema = new mongoose.Schema({
  driver_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  contact_number: String,
  work_status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive'],
  },
  number_plate: String,
  current_route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    default: null,
  },
  current_location: {
    type: {
      type: String,
      enum: ['Point'],
      required: false,
    },
    coordinates: {
      type: [Number], 
      required: false,
    }
  },
  location_timestamp: {
    type: Date,
    default: null,
  }
}, {
  timestamps: true
});

driverSchema.index({ current_location: '2dsphere' });

module.exports = mongoose.model('Driver', driverSchema);

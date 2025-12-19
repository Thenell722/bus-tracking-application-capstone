/**
 * Server Configuration File
 * Sets up Express server with MongoDB connection and route handlers
 */

// Load environment variables from .env file 
require('dotenv').config();

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import route handlers
const routeRoutes = require('./routes/routeRoutes');
const driverRoutes = require('./routes/driverRoutes');

// Initialize Express application
const app = express();


app.use(cors());                      // Enable Cross-Origin Resource Sharing
app.use(express.json());              // Parse JSON request bodies


app.use('/api/drivers', driverRoutes);  // All driver-related routes
app.use('/api/routes', routeRoutes);    // All route-related routes

// check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'active',
    message: 'Bus Management API is operational',
    timestamp: new Date().toISOString()
  });
});


// Database Connection

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
})
.then(() => console.log('✓ Connected to MongoDB'))
.catch((err) => {
  console.error('✗ MongoDB connection error:', err);
  process.exit(1);  
});


// Server Initialization

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('✗ Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('✗ Uncaught Exception:', err);
  server.close(() => process.exit(1));
});
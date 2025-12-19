const express = require('express');
const Route = require('../models/Route');

const router = express.Router();

/**
 * GET /routes
 * Retrieves all available routes
 * @returns Array of route documents
 * @throws 500 on server error
 */
router.get('/', async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    res.status(500).json({ 
      message: errorMessage,
      error: 'Failed to fetch routes'
    });
  }
});

/**
 * GET /routes/:route_id
 * Retrieves a specific route by its ID
 * @param {string} route_id - The route's unique identifier
 * @returns Single route document
 * @throws 404 if route not found
 * @throws 500 on server error
 */
router.get('/:route_id', async (req, res) => {
  try {
    const route = await Route.findOne({ route_id: req.params.route_id });
    if (!route) {
      return res.status(404).json({ 
        message: 'Route not found',
        error: 'NOT_FOUND'
      });
    }
    res.json(route);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    res.status(500).json({ 
      message: errorMessage,
      error: 'Failed to fetch route'
    });
  }
});

/**
 * POST /routes
 * Creates a new route
 * @param {Object} body - Route data including route_id, name, locations, etc.
 * @returns The newly created route document
 * @throws 400 for invalid data
 * @throws 500 on server error
 */
router.post('/', async (req, res) => {
  try {

    if (!req.body.route_id) {
      return res.status(400).json({
        message: 'route_id is required',
        error: 'VALIDATION_ERROR'
      });
    }

    const route = new Route(req.body);
    const newRoute = await route.save();
    res.status(201).json(newRoute);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    const statusCode = err.name === 'ValidationError' ? 400 : 500;
    res.status(statusCode).json({ 
      message: errorMessage,
      error: 'Failed to create route'
    });
  }
});

module.exports = router;
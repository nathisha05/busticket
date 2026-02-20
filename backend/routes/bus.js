const express = require('express');
const router = express.Router();
const { Bus } = require('../schema');

// Get all buses with optional search filters

router.get('/', async (req, res) => {
  try {
    const { from, to, date } = req.query;
    let query = {};
    
    if (from) query.from = new RegExp(from, 'i');
    if (to) query.to = new RegExp(to, 'i');
    
    const buses = await Bus.find(query).sort({ departureTime: 1 });
    console.log(`📋 Retrieved ${buses.length} buses`);
    res.json(buses);
  } catch (error) {
    console.error('❌ Get buses error:', error);
    res.status(500).json({ error: error.message });
  }
});


// Get a single bus by ID
// GET /api/buses/:id
router.get('/:id', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    console.log(`Retrieved bus: ${bus.busNumber}`);
    res.json(bus);
  } catch (error) {
    console.error('Get bus error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a new bus
// POST /api/buses
router.post('/', async (req, res) => {
  try {
    console.log('Creating bus with data:', req.body);
    
    const { busNumber, operator, busType, from, to, departureTime, arrivalTime, price, availableSeats } = req.body;
    
    // Input validation
    if (!busNumber) {
      return res.status(400).json({ error: 'Bus number is required' });
    }
    if (!operator) {
      return res.status(400).json({ error: 'Operator is required' });
    }
    if (!busType) {
      return res.status(400).json({ error: 'Bus type is required' });
    }
    if (!from) {
      return res.status(400).json({ error: 'From location is required' });
    }
    if (!to) {
      return res.status(400).json({ error: 'To location is required' });
    }
    if (!departureTime) {
      return res.status(400).json({ error: 'Departure time is required' });
    }
    if (!arrivalTime) {
      return res.status(400).json({ error: 'Arrival time is required' });
    }
    if (!price || price <= 0) {
      return res.status(400).json({ error: 'Valid price is required' });
    }
    if (!availableSeats || availableSeats <= 0) {
      return res.status(400).json({ error: 'Valid available seats is required' });
    }
    
    const bus = new Bus(req.body);
    await bus.save();
    
    console.log(`Bus created successfully: ${bus.busNumber}`);
    res.status(201).json(bus);
  } catch (error) {
    console.error('Create bus error:', error);
    
    // Handle duplicate bus number
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Bus number already exists' });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    
    res.status(500).json({ error: error.message });
  }
});

// Update an existing bus
// PUT /api/buses/:id
router.put('/:id', async (req, res) => {
  try {
    console.log(`Updating bus ${req.params.id} with:`, req.body);
    
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }  // Return updated doc and validate
    );
    
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    
    console.log(`Bus updated successfully: ${bus.busNumber}`);
    res.json(bus);
  } catch (error) {
    console.error('Update bus error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a bus
// DELETE /api/buses/:id
router.delete('/:id', async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    
    console.log(`Bus deleted successfully: ${bus.busNumber}`);
    res.json({ message: 'Bus deleted successfully' });
  } catch (error) {
    console.error('Delete bus error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

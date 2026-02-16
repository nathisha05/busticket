const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Booking } = require('../schema');

// POST /api/bookings - Create a new booking
router.post('/', async (req, res) => {
  try {
    const { busId, passengerDetails, userId, ...otherFields } = req.body;
    
    // Convert string IDs to MongoDB ObjectIds
    const busObjectId = mongoose.Types.ObjectId.isValid(busId) ? new mongoose.Types.ObjectId(busId) : busId;
    const userObjectId = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId;
    
    const booking = new Booking({
      bus: busObjectId,
      user: userObjectId,
      passengers: passengerDetails,
      ...otherFields,
      bookingReference: 'BK' + Date.now()
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/bookings/user/:userId - Get all bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate('bus');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/bookings - Get all bookings (for debugging)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('bus').populate('user');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/bookings/:id - Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('bus').populate('user');
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/bookings/:id/cancel - Cancel a booking
router.put('/:id/cancel', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'Cancelled' },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/bookings/:id - Delete a booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

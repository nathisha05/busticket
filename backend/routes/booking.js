const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Booking } = require('../schema');

// Create a new booking
// POST /api/bookings
router.post('/', async (req, res) => {
  try {
    const { busId, passengers, userId, journeyDate, totalAmount } = req.body;
    
    // Input validation
    if (!busId) {
      return res.status(400).json({ error: 'Bus ID is required' });
    }
    if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
      return res.status(400).json({ error: 'At least one passenger is required' });
    }
    if (!journeyDate) {
      return res.status(400).json({ error: 'Journey date is required' });
    }
    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ error: 'Valid total amount is required' });
    }
    
    // Validate each passenger
    for (const passenger of passengers) {
      if (!passenger.name || passenger.name.trim().length < 3) {
        return res.status(400).json({ error: 'Passenger name must be at least 3 characters' });
      }
      if (!passenger.age || passenger.age < 1 || passenger.age > 120) {
        return res.status(400).json({ error: 'Valid passenger age is required' });
      }
      if (!passenger.gender) {
        return res.status(400).json({ error: 'Passenger gender is required' });
      }
      if (!passenger.phone || passenger.phone.length < 10) {
        return res.status(400).json({ error: 'Valid passenger phone is required' });
      }
      if (!passenger.seatNumber) {
        return res.status(400).json({ error: 'Seat number is required' });
      }
    }
    
    // Create booking with unique reference number
    const booking = new Booking({
      bus: busId,
      user: userId,
      passengers: passengers,
      journeyDate: journeyDate,
      totalAmount: totalAmount,
      bookingReference: 'BK' + Date.now(),
      status: 'Confirmed'
    });
    
    await booking.save();
    
    // Return booking with bus details
    const populatedBooking = await Booking.findById(booking._id).populate('bus');
    res.status(201).json(populatedBooking);
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings for a specific user
// GET /api/bookings/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    // Find all bookings for this user and include bus details
    const bookings = await Booking.find({ user: req.params.userId })
      .populate('bus')
      .sort({ createdAt: -1 });  // Sort by newest first
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings (for admin/debugging)
// GET /api/bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('bus')
      .populate('user')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single booking by ID
// GET /api/bookings/:id
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('bus')
      .populate('user');
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel a booking (changes status to Cancelled)
// PUT /api/bookings/:id/cancel
router.put('/:id/cancel', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'Cancelled' },
      { new: true }  // Return updated document
    );
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a booking permanently
// DELETE /api/bookings/:id
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

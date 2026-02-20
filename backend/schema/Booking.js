const mongoose = require('mongoose');

// Schema for storing bus ticket bookings
const bookingSchema = new mongoose.Schema({
  // Reference to the user who made the booking
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Reference to the bus being booked
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true
  },
  // Array of passengers (supports multiple passengers per booking)
  passengers: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other']
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    seatNumber: {
      type: String,
      required: true,
      trim: true
    }
  }],
  // Total amount paid for the booking
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  
  journeyDate: {
    type: Date,
    required: true
  },
 
  status: {
    type: String,
    required: true,
    enum: ['Confirmed', 'Cancelled', 'Pending'],
    default: 'Confirmed'
  },
  // Unique booking reference number (BK1234567890)
  bookingReference: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields
});


bookingSchema.index({ user: 1, journeyDate: -1 });
bookingSchema.index({ bookingReference: 1 });  // Quick lookup by booking reference
bookingSchema.index({ bus: 1, journeyDate: 1 });  // Find bookings for a specific bus and date

module.exports = mongoose.model('Booking', bookingSchema);

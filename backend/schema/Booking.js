const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true
  },
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
    seatNumber: {
      type: String,
      required: true,
      trim: true
    }
  }],
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
  bookingReference: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});


bookingSchema.index({ user: 1, journeyDate: -1 });
bookingSchema.index({ bookingReference: 1 });
bookingSchema.index({ bus: 1, journeyDate: 1 });

module.exports = mongoose.model('Booking', bookingSchema);

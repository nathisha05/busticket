const mongoose = require('mongoose');

// Schema for storing bus information
const busSchema = new mongoose.Schema({
  // Unique bus number (e.g., DEL-MUM-001)
  busNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
 
  operator: {
    type: String,
    required: true,
    trim: true
  },
  // Starting city
  from: {
    type: String,
    required: true,
    trim: true
  },
  // Destination city
  to: {
    type: String,
    required: true,
    trim: true
  },
  // Departure date and time
  departureTime: {
    type: Date,
    required: true
  },
  // Arrival date and time
  arrivalTime: {
    type: Date,
    required: true
  },
  // Ticket price per seat
  price: {
    type: Number,
    required: true,
    min: 0
  },
  // Total number of seats in the bus
  totalSeats: {
    type: Number,
    required: true,
    min: 1
  },
  // Number of seats currently available
  availableSeats: {
    type: Number,
    required: true,
    min: 0,
    default: function() {
      return this.totalSeats;
    }
  },
  // Type of bus (AC, Non-AC, Sleeper, Semi-Sleeper)
  busType: {
    type: String,
    required: true,
    enum: ['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper']
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// Database indexes for faster search queries
busSchema.index({ from: 1, to: 1 });  // Search buses by route
busSchema.index({ busNumber: 1 });  // Quick lookup by bus number

module.exports = mongoose.model('Bus', busSchema);

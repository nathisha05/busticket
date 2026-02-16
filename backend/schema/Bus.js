const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
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
  from: {
    type: String,
    required: true,
    trim: true
  },
  to: {
    type: String,
    required: true,
    trim: true
  },
  departureTime: {
    type: Date,
    required: true
  },
  arrivalTime: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  totalSeats: {
    type: Number,
    required: true,
    min: 1
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0,
    default: function() {
      return this.totalSeats;
    }
  },
  busType: {
    type: String,
    required: true,
    enum: ['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper']
  }
}, {
  timestamps: true
});

// Index for faster queries
busSchema.index({ from: 1, to: 1 });
busSchema.index({ busNumber: 1 });

module.exports = mongoose.model('Bus', busSchema);

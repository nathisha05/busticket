const mongoose = require('mongoose');

// Schema for storing user account information
const userSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  // Hashed password (never store plain text passwords)
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  
  phone: {
    type: String,
    required: true,
    trim: true,
    match: /^\d{10}$/
  },
  // User role (user or admin)
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);

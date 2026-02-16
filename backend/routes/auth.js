const express = require('express');
const router = express.Router();
const { User } = require('../schema');

// POST /api/auth/register - Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
   
    const user = new User({ name, email, password, phone });
    await user.save();
    
    res.status(201).json({ 
      message: 'User registered', 
      user: { id: user._id, name, email } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ 
      message: 'Login successful', 
      user: { id: user._id, name: user.name, email: user.email } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

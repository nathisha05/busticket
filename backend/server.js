const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(logger);

mongoose.connect('mongodb://127.0.0.1:27017/bus-ticket-db')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));


const authRoutes = require('./routes/auth');
const busRoutes = require('./routes/bus');
const bookingRoutes = require('./routes/booking');


app.use('/api/auth', authRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/bookings', bookingRoutes);


app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});


app.use(errorHandler);


app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` API: http://localhost:${PORT}/api`);
});

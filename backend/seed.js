const mongoose = require('mongoose');
require('dotenv').config();
const { Bus } = require('./schema');

const sampleBuses = [
  {
    busNumber: "DEL-MUM-001",
    operator: "Express Plus",
    from: "Delhi",
    to: "Mumbai",
    departureTime: new Date("2024-01-15T06:00:00"),
    arrivalTime: new Date("2024-01-15T18:00:00"),
    price: 450,
    totalSeats: 42,
    busType: "Non-AC"
  },
  {
    busNumber: "DEL-MUM-002",
    operator: "Super Comfort",
    from: "Delhi",
    to: "Mumbai",
    departureTime: new Date("2024-01-15T08:30:00"),
    arrivalTime: new Date("2024-01-15T20:30:00"),
    price: 650,
    totalSeats: 38,
    busType: "AC"
  },
  {
    busNumber: "DEL-MUM-003",
    operator: "AC Sleeper",
    from: "Delhi",
    to: "Mumbai",
    departureTime: new Date("2024-01-15T10:00:00"),
    arrivalTime: new Date("2024-01-15T21:30:00"),
    price: 800,
    totalSeats: 20,
    busType: "Sleeper"
  },
  {
    busNumber: "MUM-PUN-001",
    operator: "City Express",
    from: "Mumbai",
    to: "Pune",
    departureTime: new Date("2024-01-15T07:00:00"),
    arrivalTime: new Date("2024-01-15T09:30:00"),
    price: 300,
    totalSeats: 45,
    busType: "Non-AC"
  },
  {
    busNumber: "DEL-BLR-001",
    operator: "Premium Travel",
    from: "Delhi",
    to: "Bangalore",
    departureTime: new Date("2024-01-15T15:30:00"),
    arrivalTime: new Date("2024-01-16T02:30:00"),
    price: 900,
    totalSeats: 20,
    busType: "Sleeper"
  },
  {
    busNumber: "HYD-CHN-001",
    operator: "Deluxe Club",
    from: "Hyderabad",
    to: "Chennai",
    departureTime: new Date("2024-01-15T22:00:00"),
    arrivalTime: new Date("2024-01-16T06:00:00"),
    price: 550,
    totalSeats: 40,
    busType: "AC"
  },
  {
    busNumber: "PUNE-MUM-001",
    operator: "Night Runner",
    from: "Pune",
    to: "Mumbai",
    departureTime: new Date("2024-01-15T21:00:00"),
    arrivalTime: new Date("2024-01-15T23:30:00"),
    price: 400,
    totalSeats: 48,
    busType: "Semi-Sleeper"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bus-ticket-db');
    console.log('Connected to MongoDB');
    await Bus.deleteMany({});
    console.log('Cleared existing buses');
    const buses = await Bus.insertMany(sampleBuses);
    console.log(`Successfully seeded ${buses.length} buses`);
    console.log('\n Seeded Buses:');
    buses.forEach((bus, index) => {
      console.log(`${index + 1}. ${bus.busNumber} - ${bus.from} to ${bus.to} (${bus.busType}) - ₹${bus.price}`);
    });

    console.log('\nDatabase seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

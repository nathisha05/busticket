# Bus Ticket Booking Backend

A Node.js/Express backend API for a bus ticket booking system with MongoDB.

## Features

- User authentication and authorization
- Bus management
- Booking system
- Secure API with JWT
- Input validation
- Rate limiting
- CORS support
- Error handling

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

5. Update the `.env` file with your configuration

6. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5001`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Buses
- `GET /api/buses` - Get all buses (with filters)
- `GET /api/buses/:id` - Get bus by ID
- `POST /api/buses` - Create new bus (Admin)
- `PUT /api/buses/:id` - Update bus (Admin)
- `DELETE /api/buses/:id` - Delete bus (Admin)

### Bookings
- `GET /api/bookings/my-bookings` - Get user's bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `GET /api/bookings/admin/all` - Get all bookings (Admin)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/bookings` - Get user booking history

## Project Structure

```
backend/
├── config/
│   └── database.js           # Database configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── busController.js      # Bus management logic
│   ├── bookingController.js  # Booking logic
│   ├── userController.js     # User management logic
│   └── index.js              # Controllers export
├── middleware/
│   └── auth.js               # Authentication middleware
├── schemas/
│   ├── User.js               # User schema
│   ├── Bus.js                # Bus schema
│   ├── Booking.js            # Booking schema
│   └── index.js              # Schemas export
├── routes/
│   ├── auth.js               # Authentication routes
│   ├── bus.js                # Bus management routes
│   ├── booking.js            # Booking routes
│   └── user.js               # User routes
├── utils/
│   ├── responseHelper.js     # Response utility functions
│   ├── logger.js             # Logging utility
│   └── index.js              # Utils export
├── .env.example              # Environment variables template
├── package.json              # Dependencies and scripts
├── README.md                 # This file
└── server.js                 # Main application file
```

### Architecture Pattern

The backend follows a **Model-View-Controller (MVC)** pattern with additional layers:

- **Schemas** (Models): Define data structure and validation
- **Controllers**: Handle business logic and request processing
- **Routes**: Define API endpoints and route requests to controllers
- **Utils**: Reusable utility functions
- **Config**: Configuration files (database, etc.)
- **Middleware**: Request processing middleware

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | development |
| `PORT` | Server port | 5001 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/bus-ticket-db |
| `JWT_SECRET` | JWT secret key | your-secret-key |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS protection
- Helmet security headers
- Request compression

## Error Handling

The API includes comprehensive error handling with appropriate HTTP status codes and error messages.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import sequelize from './config/db.js';

// Models
import Booking from './models/Booking.js';
import Vehicle from './models/Vehicle.js';
import Route from './models/Route.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import mapRoutes from './routes/mapRoutes.js';

// Associations
Vehicle.hasMany(Booking, { foreignKey: 'vehicleId' });
Booking.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')
);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/maps', mapRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🚕 Taxi Booking Server is running!' });
});

// Seed Routes
const seedRoutes = async () => {
  const count = await Route.count();
  if (count === 0) {
    const routes = [
      { pickup: 'Chennai', drop: 'Madurai', distance: 462 },
      { pickup: 'Chennai', drop: 'Coimbatore', distance: 506 },
      { pickup: 'Madurai', drop: 'Rameswaram', distance: 170 },
      { pickup: 'Coimbatore', drop: 'Ooty', distance: 86 },
      { pickup: 'Chennai', drop: 'Bangalore', distance: 350 },
      { pickup: 'Trichy', drop: 'Madurai', distance: 130 },
      { pickup: 'Madurai', drop: 'Kanyakumari', distance: 245 },
      { pickup: 'Chennai', drop: 'Vellore', distance: 140 },
      { pickup: 'Salem', drop: 'Coimbatore', distance: 160 },
      { pickup: 'Chennai', drop: 'Salem', distance: 345 }
    ];
    await Route.bulkCreate(routes);
    console.log('✅ Routes seeded successfully');
  }
};

// Seed Vehicles
const seedVehicles = async () => {
  const count = await Vehicle.count();
  if (count === 0) {
    const vehiclesData = [
      {
        name: 'Sedan (Swift Dzire)',
        serviceType: 'ONE_WAY',
        ratePerKm: 13,
        baseFare: 300,
        status: 'ACTIVE',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000'
      },
      {
        name: 'SUV (Ertiga)',
        serviceType: 'ONE_WAY',
        ratePerKm: 18,
        baseFare: 500,
        status: 'ACTIVE',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000'
      },
      {
        name: 'Prime Sedan',
        serviceType: 'ROUND_TRIP',
        ratePerKm: 12,
        baseFare: 400,
        status: 'ACTIVE',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000'
      },
      {
        name: 'Prime SUV',
        serviceType: 'ROUND_TRIP',
        ratePerKm: 16,
        baseFare: 600,
        status: 'ACTIVE',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000'
      }
    ];
    await Vehicle.bulkCreate(vehiclesData);
    console.log('✅ Vehicles seeded successfully');
  }
};

// DB Sync + Server start
sequelize
  .sync({ alter: true }) // creates table automatically
  .then(async () => {
    console.log('✅ Database synced successfully');
    await seedRoutes();
    await seedVehicles();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database sync failed:', err.message);
  });

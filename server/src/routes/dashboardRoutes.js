import express from 'express';
import { getDashboardStats, getRecentBookings } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, getDashboardStats);
router.get('/recent-bookings', protect, getRecentBookings);


export default router;

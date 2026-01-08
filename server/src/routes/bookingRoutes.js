import express from 'express';
import {
    createBooking,
    getAllBookings,
    updateBookingStatus,
    estimateFare
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';
import {
    validate,
    createBookingSchema,
    updateStatusSchema
} from '../validations/bookingValidation.js';

const router = express.Router();

// Create a new booking
// Public routes
router.post('/estimate', estimateFare);
router.post('/', validate(createBookingSchema), createBooking);

// Protected admin routes
router.use(protect);
router.get('/', getAllBookings);
router.patch('/:id/status', validate(updateStatusSchema), updateBookingStatus);

export default router;

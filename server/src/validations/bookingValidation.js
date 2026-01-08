import { z } from 'zod';

export const createBookingSchema = z.object({
    customerName: z.string().min(1, 'Name is required'),
    customerMobile: z.string().min(10, 'Valid mobile number is required'),
    customerEmail: z.string().email().optional().or(z.literal('')),
    vehicleId: z.string().uuid('Invalid vehicle ID'),
    pickupLocation: z.string().min(1, 'Pickup location is required'),
    dropLocation: z.string().min(1, 'Drop location is required'),
    pickupDate: z.string().refine(val => !isNaN(Date.parse(val)), 'Invalid date'),
    pickupTime: z.string().min(1, 'Pickup time is required'),
    serviceType: z.enum(['ONE_WAY', 'ROUND_TRIP']),
    fare: z.number().positive()
});

export const updateStatusSchema = z.object({
    status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'])
});

export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: error.errors.map(err => ({ field: err.path[0], message: err.message }))
        });
    }
};

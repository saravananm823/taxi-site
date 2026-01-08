import Booking from '../models/Booking.js';
import Vehicle from '../models/Vehicle.js';

// Helper to generate reference ID
const generateRefId = () => {
    return 'TX-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

export const createBooking = async (req, res) => {
    try {
        const {
            customerName,
            customerMobile,
            customerEmail,
            vehicleId,
            pickupLocation,
            dropLocation,
            pickupDate,
            pickupTime,
            serviceType,
            fare
        } = req.body;

        const booking = await Booking.create({
            customerName,
            customerMobile,
            customerEmail,
            vehicleId,
            pickupLocation,
            dropLocation,
            pickupDate,
            pickupTime,
            serviceType,
            fare,
            bookingReferenceId: generateRefId(),
            status: 'PENDING'
        });

        return res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: booking
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create booking',
            error: error.message
        });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [{ model: Vehicle, as: 'Vehicle', attributes: ['name'] }],
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        booking.status = status;
        await booking.save();

        return res.status(200).json({
            success: true,
            message: 'Booking status updated',
            data: booking
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Unified distance and fare estimation
export const estimateFare = async (req, res) => {
    try {
        const { pickup, drop, serviceType } = req.body;

        if (!pickup || !drop || !serviceType) {
            return res.status(400).json({ success: false, message: 'Pickup, Drop and Service Type are required' });
        }

        const pickupLower = pickup.trim().toLowerCase();
        const dropLower = drop.trim().toLowerCase();

        // 1. Find the route (supports reverse routes)
        const { Op } = (await import('sequelize')).default;
        const Route = (await import('../models/Route.js')).default;

        const route = await Route.findOne({
            where: {
                [Op.or]: [
                    {
                        pickup: { [Op.iLike]: pickupLower },
                        drop: { [Op.iLike]: dropLower }
                    },
                    {
                        pickup: { [Op.iLike]: dropLower },
                        drop: { [Op.iLike]: pickupLower }
                    }
                ]
            }
        });

        if (!route) {
            return res.status(404).json({
                success: false,
                message: `Sorry, we currently do not serve the route from ${pickup} to ${drop}.`
            });
        }

        const distance = route.distance;

        // 2. Fetch all ACTIVE vehicles for the service type
        const vehicles = await Vehicle.findAll({
            where: {
                status: 'ACTIVE',
                serviceType: serviceType
            }
        });

        // 3. Calculate total amount for each vehicle
        const estimates = vehicles.map(v => {
            const totalAmount = (distance * v.ratePerKm) + v.baseFare;
            return {
                vehicleId: v.id,
                vehicleName: v.name,
                image: v.image,
                ratePerKm: v.ratePerKm,
                baseFare: v.baseFare,
                totalAmount: Math.round(totalAmount)
            };
        });

        return res.status(200).json({
            success: true,
            data: {
                pickup: route.pickup,
                drop: route.drop,
                distanceKm: distance,
                vehicles: estimates
            }
        });
    } catch (error) {
        console.error('Fare Estimation Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

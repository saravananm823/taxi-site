import Booking from '../models/Booking.js';
import Vehicle from '../models/Vehicle.js';
import sequelize from '../config/db.js';
import { Op } from 'sequelize';

export const getDashboardStats = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const totalEnquiries = await Booking.count();
        const todayEnquiries = await Booking.count({
            where: {
                createdAt: {
                    [Op.gte]: today
                }
            }
        });

        const activeVehiclesCount = await Vehicle.count({ where: { status: 'ACTIVE' } });

        const revenueData = await Booking.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('fare')), 'totalRevenue']
            ],
            where: {
                status: {
                    [Op.in]: ['CONFIRMED', 'COMPLETED']
                }
            },
            raw: true
        });

        const totalRevenue = revenueData?.totalRevenue || 0;

        return res.status(200).json({
            success: true,
            data: {
                totalEnquiries,
                todayEnquiries,
                activeVehiclesCount,
                totalRevenue: Math.round(totalRevenue)
            }
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch dashboard stats',
            error: error.message
        });
    }
};

export const getRecentBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'customerName', 'pickupLocation', 'dropLocation', 'status', 'fare', 'createdAt']
        });

        return res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (error) {
        console.error('Recent bookings error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch recent bookings',
            error: error.message
        });
    }
};


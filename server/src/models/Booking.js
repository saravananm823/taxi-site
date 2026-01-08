import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    customerName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    customerMobile: {
        type: DataTypes.STRING,
        allowNull: false
    },

    customerEmail: {
        type: DataTypes.STRING,
        allowNull: true
    },

    vehicleId: {
        type: DataTypes.UUID,
        allowNull: false
    },

    pickupLocation: {
        type: DataTypes.STRING,
        allowNull: false
    },

    dropLocation: {
        type: DataTypes.STRING,
        allowNull: false
    },

    pickupDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    pickupTime: {
        type: DataTypes.STRING,
        allowNull: false
    },

    serviceType: {
        type: DataTypes.ENUM('ONE_WAY', 'ROUND_TRIP'),
        allowNull: false
    },

    fare: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    bookingReferenceId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    status: {
        type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'PENDING'
    }

}, {
    tableName: 'bookings',
    timestamps: true
});

export default Booking;

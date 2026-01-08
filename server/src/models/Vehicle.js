import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serviceType: {
        type: DataTypes.ENUM('ONE_WAY', 'ROUND_TRIP'),
        allowNull: false
    },
    ratePerKm: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    baseFare: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: 'Driver Bata / Base Fare'
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
        allowNull: false,
        defaultValue: 'ACTIVE'
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    info: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'vehicles',
    timestamps: true
});

export default Vehicle;

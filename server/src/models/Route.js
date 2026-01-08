import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Route = sequelize.define('Route', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    pickup: {
        type: DataTypes.STRING,
        allowNull: false
    },
    drop: {
        type: DataTypes.STRING,
        allowNull: false
    },
    distance: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'routes',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['pickup', 'drop']
        }
    ]
});

export default Route;

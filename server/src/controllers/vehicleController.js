import Vehicle from '../models/Vehicle.js';

export const createVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.create(req.body);
        return res.status(201).json({
            success: true,
            message: 'Vehicle added successfully',
            data: vehicle
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to add vehicle',
            error: error.message
        });
    }
};

export const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll();
        return res.status(200).json({
            success: true,
            data: vehicles
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch vehicles',
            error: error.message
        });
    }
};

export const getActiveVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll({ where: { status: 'ACTIVE' } });
        return res.status(200).json({
            success: true,
            data: vehicles
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch vehicles',
            error: error.message
        });
    }
};

export const updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Vehicle.update(req.body, { where: { id } });
        if (updated) {
            const updatedVehicle = await Vehicle.findByPk(id);
            return res.status(200).json({
                success: true,
                message: 'Vehicle updated successfully',
                data: updatedVehicle
            });
        }
        return res.status(404).json({ success: false, message: 'Vehicle not found' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Update failed', error: error.message });
    }
};

export const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Vehicle.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({
                success: true,
                message: 'Vehicle deleted successfully'
            });
        }
        return res.status(404).json({ success: false, message: 'Vehicle not found' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Delete failed', error: error.message });
    }
};

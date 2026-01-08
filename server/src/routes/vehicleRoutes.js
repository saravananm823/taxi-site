import express from 'express';
import {
    createVehicle,
    getAllVehicles,
    getActiveVehicles,
    updateVehicle,
    deleteVehicle
} from '../controllers/vehicleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/active', getActiveVehicles);

// Protected admin routes
router.use(protect);
router.post('/', createVehicle);
router.get('/', getAllVehicles);
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);

export default router;

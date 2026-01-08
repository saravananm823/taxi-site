import express from 'express';
import { login, createInitialAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/setup-admin', createInitialAdmin); // Remove or protect in production

export default router;

import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ where: { username } });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Helper for initial admin setup (one-time use or for dev)
export const createInitialAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const exists = await Admin.findOne({ where: { username } });
        if (exists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        const admin = await Admin.create({ username, password });

        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1d' }
        );

        return res.status(201).json({
            success: true,
            message: 'Admin created',
            token
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

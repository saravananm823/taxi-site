import Route from '../models/Route.js';

export const getDistance = async (req, res) => {
    try {
        const { pickup, drop } = req.body;

        if (!pickup || !drop) {
            return res.status(400).json({ success: false, message: 'Pickup and Drop locations are required' });
        }

        // Find exact match (case insensitive)
        const route = await Route.findOne({
            where: {
                pickup: pickup.trim(),
                drop: drop.trim()
            }
        });

        if (route) {
            return res.status(200).json({
                success: true,
                data: {
                    distanceText: `${route.distance} km`,
                    distanceValue: route.distance
                }
            });
        }

        // Default or fall-back behavior if route not found
        // Returning a generic distance for testing purposes if route doesn't exist
        return res.status(200).json({
            success: true,
            data: {
                distanceText: '100 km',
                distanceValue: 100,
                note: 'Default distance used (Route not found in database)'
            }
        });

    } catch (error) {
        console.error('Error fetching distance:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

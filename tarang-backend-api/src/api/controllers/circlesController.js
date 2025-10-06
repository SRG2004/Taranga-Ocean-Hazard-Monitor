
// const db = require('../../config/db');

// Mock data
const mockCircles = [
    { id: 1, name: 'Family', description: 'Family circle' },
    { id: 2, name: 'Friends', description: 'Friends circle' },
];

// Create a new circle
exports.createCircle = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCircle = { id: Date.now(), name, description, createdBy: req.user.id, members: [req.user.id] };
        mockCircles.push(newCircle);
        res.status(201).json(newCircle);
    } catch (error) {
        res.status(500).json({ message: 'Error creating circle', error: error.message });
    }
};

// Get all circles for a user
exports.getCircles = async (req, res) => {
    try {
        res.status(200).json(mockCircles);
    } catch (error) {
        res.status(500).json({ message: 'Error getting circles', error: error.message });
    }
};

// Get a circle by ID
exports.getCircleById = async (req, res) => {
    try {
        const circle = mockCircles.find(c => c.id === parseInt(req.params.id));
        if (!circle) {
            return res.status(404).json({ message: 'Circle not found' });
        }
        res.status(200).json(circle);
    } catch (error) {
        res.status(500).json({ message: 'Error getting circle', error: error.message });
    }
};

// Update a circle
exports.updateCircle = async (req, res) => {
    try {
        const { name, description } = req.body;
        const circleIndex = mockCircles.findIndex(c => c.id === parseInt(req.params.id));
        if (circleIndex === -1) {
            return res.status(404).json({ message: 'Circle not found' });
        }
        mockCircles[circleIndex] = { ...mockCircles[circleIndex], name, description };
        res.status(200).json({ message: 'Circle updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating circle', error: error.message });
    }
};

// Delete a circle
exports.deleteCircle = async (req, res) => {
    try {
        const circleIndex = mockCircles.findIndex(c => c.id === parseInt(req.params.id));
        if (circleIndex === -1) {
            return res.status(404).json({ message: 'Circle not found' });
        }
        mockCircles.splice(circleIndex, 1);
        res.status(200).json({ message: 'Circle deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting circle', error: error.message });
    }
};

// Add a member to a circle
exports.addMember = async (req, res) => {
    try {
        const { userId } = req.body;
        const circleIndex = mockCircles.findIndex(c => c.id === parseInt(req.params.id));
        if (circleIndex === -1) {
            return res.status(404).json({ message: 'Circle not found' });
        }
        // @ts-ignore
        if (!mockCircles[circleIndex].members.includes(userId)) {
            // @ts-ignore
            mockCircles[circleIndex].members.push(userId);
        }
        res.status(200).json({ message: 'Member added to circle successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding member to circle', error: error.message });
    }
};

// Remove a member from a circle
exports.removeMember = async (req, res) => {
    try {
        const circleIndex = mockCircles.findIndex(c => c.id === parseInt(req.params.id));
        if (circleIndex === -1) {
            return res.status(404).json({ message: 'Circle not found' });
        }
        const userId = parseInt(req.params.userId);
        // @ts-ignore
        const memberIndex = mockCircles[circleIndex].members.indexOf(userId);
        if (memberIndex > -1) {
            // @ts-ignore
            mockCircles[circleIndex].members.splice(memberIndex, 1);
        }
        res.status(200).json({ message: 'Member removed from circle successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing member from circle', error: error.message });
    }
};


// const db = require('../../config/db');

const mockTrends = [
    { id: 1, topic: 'AI', traffic_index: 95 },
    { id: 2, topic: 'Blockchain', traffic_index: 80 },
];

exports.getTrends = async (req, res) => {
    try {
        res.status(200).json(mockTrends);
    } catch (error) {
        res.status(500).json({ message: 'Error getting trends', error: error.message });
    }
};

exports.createTrend = async (req, res) => {
    try {
        const { topic, traffic_index } = req.body;
        const newTrend = { id: Date.now(), topic, traffic_index };
        mockTrends.push(newTrend);
        res.status(201).json(newTrend);
    } catch (error) {
        res.status(500).json({ message: 'Error creating trend', error: error.message });
    }
};

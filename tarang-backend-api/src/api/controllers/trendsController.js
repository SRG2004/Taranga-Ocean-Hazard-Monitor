
const db = require('../../config/db');

exports.getTrends = async (req, res) => {
    try {
        db.all('SELECT * FROM trends ORDER BY timestamp DESC', (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Error getting trends', error: err.message });
            }
            res.status(200).json(rows);
        });
    } catch (error) {
        res.status(500).json({ message: 'Error getting trends', error: error.message });
    }
};

exports.createTrend = async (req, res) => {
    try {
        const { topic, traffic_index } = req.body;

        db.run(
            'INSERT INTO trends (topic, traffic_index) VALUES (?, ?)',
            [topic, traffic_index],
            function(err) {
                if (err) {
                    return res.status(500).json({ message: 'Error creating trend', error: err.message });
                }
                res.status(201).json({ id: this.lastID, topic, traffic_index });
            }
        );
    } catch (error) {
        res.status(500).json({ message: 'Error creating trend', error: error.message });
    }
};

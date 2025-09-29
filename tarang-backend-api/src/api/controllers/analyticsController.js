
const axios = require('axios');

exports.triggerHotspotAnalysis = async (req, res) => {
    const { bbox, timeWindow, epsMeters } = req.body;

    try {
        // In a real implementation, we would fetch recent geotagged reports from our DB
        // and send them to the ML service. For now, we'll just call the mock ML endpoint.
        const mlApiUrl = process.env.ML_API_URL || 'http://localhost:8000';
        const response = await axios.post(`${mlApiUrl}/ml/hotspot`, {
            bbox,
            timeWindow,
            epsMeters
        });

        res.status(200).send(response.data);
    } catch (error) {
        console.error('Error triggering hotspot analysis:', error);
        res.status(500).send({ error: 'Failed to trigger hotspot analysis.' });
    }
};

exports.getDashboardData = async (req, res) => {
    // Mock implementation
    const mockDashboardData = {
        reportCounts: {
            total: 125,
            verified: 78,
            rejected: 22,
            queued: 25
        },
        timeSeries: [
            { date: '2025-09-27', count: 15 },
            { date: '2025-09-28', count: 28 },
            { date: '2025-09-29', count: 42 },
        ],
        topKeywords: [
            { keyword: 'waves', count: 56 },
            { keyword: 'erosion', count: 34 },
            { keyword: 'wind', count: 21 },
        ]
    };

    res.status(200).send(mockDashboardData);
};

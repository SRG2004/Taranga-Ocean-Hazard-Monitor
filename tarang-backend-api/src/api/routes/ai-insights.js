const express = require('express');
const router = express.Router();

// Mock data for AI insights
const aiInsightsData = {
  perplexity: {
    summary: 'Perplexity analysis shows a high degree of uncertainty in the incoming data streams, suggesting a potential for significant weather pattern changes.',
  },
  gemini: {
    recommendations: 'Based on the current data, it is recommended to issue a moderate weather advisory and increase the monitoring of the affected coastal areas.',
  },
};

router.get('/', (req, res) => {
  res.json(aiInsightsData);
});

module.exports = router;

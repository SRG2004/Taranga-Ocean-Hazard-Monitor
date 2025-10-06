import React, { useState, useEffect } from 'react';

const AIInsights = () => {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch('/api/ai-insights');
        const data = await response.json();
        setInsights(data);
      } catch (error) {
        console.error("Error fetching AI insights:", error);
      }
    };

    fetchInsights();
  }, []);

  return (
    <div>
      <h3>AI-Powered Insights</h3>
      {insights ? (
        <div>
          <h4>Perplexity Summary:</h4>
          <p>{insights.perplexity.summary}</p>
          <h4>Gemini Recommendations:</h4>
          <p>{insights.gemini.recommendations}</p>
        </div>
      ) : (
        <p>Loading AI insights...</p>
      )}
    </div>
  );
};

export default AIInsights;

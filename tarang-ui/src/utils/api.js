import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE_URL,
});

export const fetchUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchChartData = async () => {
  try {
    // In a real application, this would fetch data from a backend endpoint
    // For now, we'll return some mock data
    return {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching chart data:', error);
    throw error;
  }
};

export const fetchHazards = async () => {
  try {
    const response = await apiClient.get('/hazards');
    return response.data;
  } catch (error) {
    console.error('Error fetching hazards:', error);
    throw error;
  }
};

export const reportHazard = async (hazardData) => {
  try {
    const response = await apiClient.post('/hazards/report', hazardData);
    return response.data;
  } catch (error) {
    console.error('Error reporting hazard:', error);
    throw error;
  }
};

export const fetchWeather = async (lat = 12.9716, lon = 77.5946) => {
  try {
    const apiKey = import.meta.env.REACT_APP_OPENWEATHER_API_KEY;
    if (!apiKey) {
      throw new Error('OpenWeather API key not configured');
    }
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

export const fetchHistoricalHazards = async () => {
  try {
    const response = await apiClient.get('/hazards/historical');
    return response.data;
  } catch (error) {
    console.error('Error fetching historical hazards:', error);
    throw error;
  }
};

export const fetchStats = async () => {
  try {
    const response = await apiClient.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Return mock data if API fails
    return [
      { title: 'Missions Conducted', value: '1,250' },
      { title: 'Lives Saved', value: '4,800' },
      { title: 'Volunteers Engaged', value: '10,000+' },
      { title: 'Coastal Communities Served', value: '350' },
    ];
  }
};

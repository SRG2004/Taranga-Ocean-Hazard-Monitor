
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./api/routes/auth');
const circlesRoutes = require('./api/routes/circles');
const mediaRoutes = require('./api/routes/media');
const usersRoutes = require('./api/routes/users');
const socialRoutes = require('./api/routes/social');
const trendsRoutes = require('./api/routes/trends');
const aiInsightsRoutes = require('./api/routes/ai-insights');
const analyticsRoutes = require('./api/routes/analytics');
const hazardsRoutes = require('./api/routes/hazards');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/circles', circlesRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/trends', trendsRoutes);
app.use('/api/ai-insights', aiInsightsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/hazards', hazardsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

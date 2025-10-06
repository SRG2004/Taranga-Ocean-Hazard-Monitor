
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

// API Routers
const authRouter = require('./api/routes/auth');
const mediaRouter = require('./api/routes/media');
const usersRouter = require('./api/routes/users');
const analyticsRouter = require('./api/routes/analytics');
const socialRouter = require('./api/routes/social');
const circlesRouter = require('./api/routes/circles');
const aiInsightsRouter = require('./api/routes/ai-insights');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/media', mediaRouter);
app.use('/api/users', usersRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/social', socialRouter);
app.use('/api/circles', circlesRouter);
app.use('/api/ai-insights', aiInsightsRouter);

// Basic Route
app.get('/', (req, res) => {
  res.send('Tarang Backend API is running.');
});

module.exports = app;


require('dotenv').config();
const express = require('express');
const cors = require('cors');

// API Routers
const authRouter = require('./api/routes/auth');
const mediaRouter = require('./api/routes/media');
const reportsRouter = require('./api/routes/reports');
const usersRouter = require('./api/routes/users');
const analyticsRouter = require('./api/routes/analytics');
const socialRouter = require('./api/routes/social');
const notificationsRouter = require('./api/routes/notifications');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/auth', authRouter);
app.use('/media', mediaRouter);
app.use('/reports', reportsRouter);

// Basic Route
app.get('/', (req, res) => {
  res.send('Tarang Backend API is running.');
});

module.exports = app;

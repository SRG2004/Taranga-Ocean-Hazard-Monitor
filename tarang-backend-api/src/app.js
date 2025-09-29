
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

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/auth', authRouter);
app.use('/media', mediaRouter);
app.use('/users', usersRouter);
app.use('/analytics', analyticsRouter);
app.use('/social', socialRouter);
app.use('/circles', circlesRouter);

// Basic Route
app.get('/', (req, res) => {
  res.send('Tarang Backend API is running.');
});

module.exports = app;

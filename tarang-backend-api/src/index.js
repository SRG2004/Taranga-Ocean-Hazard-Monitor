
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./api/routes/auth');
const circlesRoutes = require('./api/routes/circles');
const mediaRoutes = require('./api/routes/media');
const usersRoutes = require('./api/routes/users');
const socialRoutes = require('./api/routes/social');
const trendsRoutes = require('./api/routes/trends');

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/circles', circlesRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/trends', trendsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

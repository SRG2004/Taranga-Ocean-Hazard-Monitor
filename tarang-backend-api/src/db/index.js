
const knex = require('knex');
const config = require('../../knexfile');

// In a real app, you would select the environment based on NODE_ENV
const db = knex(config.development);

module.exports = db;

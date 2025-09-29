const knex = require('knex');
const knexfile = require('../../knexfile');
require('dotenv').config({ path: '../../.env' });

const db = knex(knexfile[process.env.NODE_ENV || 'development']);

module.exports = db;

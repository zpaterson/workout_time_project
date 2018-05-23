const pg = require('pg');

const client = new pg.Client('postgres://localhost/workout_time');

module.exports = client;

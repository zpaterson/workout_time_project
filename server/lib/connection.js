const pg = require('pg');

const client = new pg.Client('postgres://localhost/workoutTime');

module.exports = client;

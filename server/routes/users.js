var express = require('express');
const client = require('../lib/connection');
var router = express.Router();


/* checking database connection */
await client.connect();

const res = await client.query('SELECT * FROM users');
console.log(res);
await client.end()



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id: 1, username:"somebody"},
    {id: 2, username:"somebody_else"},
  ]);
});

module.exports = router;

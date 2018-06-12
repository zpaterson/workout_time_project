var express = require('express');
const client = require('../lib/connection');
var router = express.Router();


/* checking database connection */
client.connect((err) => {
  if(!err) {
   client.query('INSERT INTO users (first_name) VALUES (\'zaire\')', (err, res) => {
     if(err) {
       console.log(err);
     }
     else {
       console.log(res);
     }
   });
  }
});

// client.connect((err) => {
//   if(!err) {
//    client.query('INSERT INTO preferences (user_id, time_of_day) VALUES (2, \'5:00\')', (err, res) => {
//      if(err) {
//        console.log(err);
//      }
//      else {
//        console.log(res);
//      }
//    });
//   }
// });





/* GET users listing. */
router.get('/user', function(req, res, next) {
  console.log(req)
  // res.json([
  //   {id: 1, username:"somebody"},
  //   {id: 2, username:"somebody_else"},
  // ]);
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log("before view is rendered");
  res.render('index', { title: 'Express' });
  console.log("GET/");
});

module.exports = router;
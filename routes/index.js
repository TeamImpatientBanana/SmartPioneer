var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mraa = require('mraa'); //require mraa

/* GET home page. */
router.get('/', function(req, res) {
  console.log("before view is rendered");
  res.render('index', { title: 'Smart Pioneer' });
  console.log("GET/");
});

router.post('/', function(req, res) {
	var srcOff = req.body.srcOff;
	var volUp = req.body.volUp;
	var volDown = req.body.volDown;
	var muteAtt = req.body.muteAtt;

	if(req.body.srcOff) {
		console.log(req.body.srcOff);

		var pwm9 = new mraa.Pwm(9);
		pwm9.enable(true);

		//set the period in microseconds.
		//pwm9.period(1.0);
        //pwm9.enable(false);
		//var value = 1.0;
/*
		setInterval(function () {
		    if (value >= 1.0) {
		        pwm9.enable(false);
		        return false;
		    }
		    
		    value = value + 1;
		    console.log(value);
		    pwm9.write(value); //Write duty cycle value.

		    console.log(pwm9.read());//read current value that is set before.
		}, 200);
*/
        res.send(200);
	}
	else if(req.body.volUp) {
		console.log(req.body.volUp);
	}
	else if(req.body.volDown) {
		console.log(req.body.volDown);
	}
	else if(req.body.muteAtt) {
		console.log(req.body.muteAtt);
	}
});


module.exports = router;
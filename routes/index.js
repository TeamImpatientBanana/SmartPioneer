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

/*
router.post('/', function(req, res) {

	if(req.body.srcOff) {

		//Source is on pin 3. Turn pin 3 on when the Source button is pressed
		console.log(req.body.srcOff);

		var pwm3 = new mraa.Pwm(3);
		pwm3.enable(true);
        setTimeout(function(){
            pwm3.enable(false);
            console.log("power off");
            res.status(200).send("");
        }, 500);
	}

	else if(req.body.muteAtt) {

		//Mute is on pin 6. Turn pin 6 on when the Mute button is pressed
		console.log(req.body.muteAtt);

		var pwm6 = new mraa.Pwm(6);
		pwm6.enable(true);
        setTimeout(function(){
            pwm6.enable(false);
            console.log("power off");
            res.status(200).send("");
        }, 500);
	}

	else if(req.body.volDown) {

		//VolDown is on pin 9. Turn pin  on when the Source button is pressed
		console.log(req.body.volDown);

		var pwm9 = new mraa.Pwm(9);
		pwm9.enable(true);
        setTimeout(function(){
            pwm9.enable(false);
            console.log("power off");
            res.status(200).send("");
        }, 500);
	}

	else if(req.body.volUp) {

		//VolUp is on pin 11. Turn pin 11 on when the VolUp button is pressed
		console.log(req.body.volUp);
        
        var pwm11 = new mraa.Pwm(11);
		pwm11.enable(true);
        setTimeout(function(){
            pwm11.enable(false);
            console.log("power off");
            res.status(200).send("");
        }, 500);
	}
});
*/

module.exports = router;
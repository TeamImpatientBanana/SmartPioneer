var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mraa = require('mraa'); //require mraa

router.post('/', function(req, res) {

	if(req.body.muteAtt) {

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
});


module.exports = router;
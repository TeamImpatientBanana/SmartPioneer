var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mraa = require('mraa'); //require mraa

router.post('/', function(req, res) {

	if(req.body.srcOff) {

		//Source is on pin 3. Turn pin 3 on when the Source button is pressed
		console.log(req.body.srcOff);

		var pwm3 = new mraa.Pwm(3);
		pwm3.enable(true);
        setTimeout(function(){
            pwm3.enable(false);
            console.log("power off");
            res.send(100);
        }, 500);
	}
});


module.exports = router;
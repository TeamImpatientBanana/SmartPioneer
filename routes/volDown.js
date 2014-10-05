var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mraa = require('mraa'); //require mraa

router.post('/', function(req, res) {

	if(req.body.volDown) {

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
});


module.exports = router;
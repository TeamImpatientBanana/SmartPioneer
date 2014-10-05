var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mraa = require('mraa'); //require mraa

router.post('/', function(req, res) {

	if(req.body.volUp) {

		//VolUp is on pin 11. Turn pin 11 on when the VolUp button is pressed
		console.log(req.body.volUp);
        
        var pwm11 = new mraa.Pwm(11);
		pwm11.enable(true);
        setTimeout(function(){
            pwm11.enable(false);
            console.log("power off");
            res.send(100);
        }, 500);
	}
});


module.exports = router;
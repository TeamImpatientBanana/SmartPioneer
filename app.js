var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Galileo = require("galileo-io");
var mraa = require('mraa'); //require mraa

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var board = new Galileo();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


board.on("ready", function() {
  var byte = 0;
  this.pinMode(9, this.MODES.OUTPUT);

  setInterval(function() {
    board.digitalWrite(9, (byte ^= 1));
  }, 500);
});



console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console
console.log(process.env.PORT);

var myOnboardLed = new mraa.Gpio(13); //LED hooked up to digital pin 13 (or built in pin on Galileo Gen1 & Gen2)
myOnboardLed.dir(mraa.DIR_OUT); //set the gpio direction to output
var ledState = true; //Boolean to hold the state of Led

periodicActivity(); //call the periodicActivity function

function periodicActivity()
{
  myOnboardLed.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
  ledState = !ledState; //invert the ledState
  setTimeout(periodicActivity,1000); //call the indicated function after 1 second (1000 milliseconds)
}


//Initialize PWM on Digital Pin #3 (D3) and enable the pwm pin
var pwm9 = new mraa.Pwm(9, -1, false);
pwm9.enable(true);

//set the period in microseconds.
pwm9.period_us(200);
var value = 0.0;

setInterval(function () {
    if (value >= 1.0) {
        value = 0.0;
    }
    
    value = value + 0.03;
    pwm9.write(value); //Write duty cycle value. 

    console.log(pwm9.read());//read current value that is set before.
}, 3000);


module.exports = app;

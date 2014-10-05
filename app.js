var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mraa = require('mraa'); //require mraa

//var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');
//var srcOff = require('./routes/srcOff');
//var muteAtt = require('./routes/muteAtt');
//var volDown = require('./routes/volDown');
//var volUp = require('./routes/volUp');

var app = express()

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
/*
app.use('/srcOff', srcOff);
app.use('/muteAtt', muteAtt);
app.use('/volDown', volDown);
app.use('/volUp', volUp);
*/
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

// From ./bin/www

var debug = require('debug')('BlinkSP');

app.set('port', process.env.PORT || 3000);


var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

var io = require('socket.io').listen(server);

io.on('connection', function (socket) {


    socket.on('srcOff', function (data) {

      //Source is on pin 3. Turn pin 3 on when the Source button is pressed
      console.log("srcOff pressed");

      var pwm3 = new mraa.Pwm(3);
      pwm3.enable(true);
        setTimeout(function(){
          pwm3.enable(false);
          console.log("power off");
        }, 200);

    });


    socket.on('muteAtt', function (data) {

      //Mute is on pin 6. Turn pin 6 on when the Mute button is pressed

      var pwm6 = new mraa.Pwm(6);
      pwm6.enable(true);
      pwm6.write(1.0);
      console.log(pwm6.read());
        setTimeout(function(){
          pwm6.enable(false);
          console.log("power off");
      }, 200);

    });


    socket.on('volDown', function (data) {

      //VolDown is on pin 9. Turn pin  on when the Source button is pressed

      var pwm9 = new mraa.Pwm(9);
      console.log(pwm9);
      pwm9.enable(true);
        setTimeout(function(){
          pwm9.enable(false);
          console.log("power off");
        }, 200);

    });


    socket.on('volUp', function (data) {

      //VolUp is on pin 5. Turn pin 5 on when the VolUp button is pressed
        
      var pwm5 = new mraa.Pwm(5);
      console.log(pwm5);
      pwm5.enable(true);
        setTimeout(function(){
          pwm5.enable(false);
          console.log("power off");
        }, 200);

    });
});



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


module.exports = app;
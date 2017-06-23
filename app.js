var http = require('http');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var config = require('./config');

var app = express();

app.set('port', config.get('port'));
app.set('ip', config.get('ip'));
 
var server = http.createServer(app).listen(app.get('port'),config.get('ip'), function(){
  console.log('Express server listening on port=' + config.get('port')+",  ip="+config.get('ip'));
});



var io = require('socket.io')(server);

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.io = io;
  next();
});


app.use('/', index);
app.use('/users', users);
app.get('/slider',function(req, res, next){
res.sendfile("slider.html")
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var value=[
  
['http://192.168.1.102/images/monitorle.png','/rle'],
['http://192.168.1.102/images/monitorri.png','http://torr.ru/'],
//	
['http://192.168.1.102/images/monitor2.png','/toir1'],
 ];



io.sockets.on('connection', function (client) {


client.emit('new', {});
client.emit('sliderimg', value);
    
  
});//'connection', function 
 

//module.exports = app;

module.exports = {app: app, server: server};


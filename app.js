var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose')
var errorHandler = require('errorhandler')
var app = express();
// models
var models = require('./models');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);

mongoose.connect('mongodb://localhost/simpleChat');
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
// error handlers
// Take out before deployment
app.use(errorHandler());

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/chat', function(req, res) {
  req.render('chat.ejs');
});

app.post('/login', function(req, res) {


});

app.post('/register', function(req, res) {
  var user = new models.User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });
  user.save();
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port') + " - visit http://localhost:3000/");
});
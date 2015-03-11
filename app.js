var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // Gonna try and use sessions
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var errorHandler = require('errorhandler');
var app = express();
var cookieSession = require('cookie-session');

// models
var models = require('./models');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);
mongoose.connect('mongodb://localhost/simpleChat');


// Session Config
app.use(cookieSession({
  key: 'Chat Session',
  secret: 'Hella secret',
}));
app.use(cookieParser());


// Take out before deployment
app.use(errorHandler());

// Auth Middleware
var authUser = function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    next();
  };
};

// Routes
app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/chat', authUser, function(req, res) {
  res.locals.user = req.session.user
  res.render('chat.ejs');
});

app.post('/login', function(req, res) {
  models.User.findOne({ email: req.body.email }, " username password email", function(err, user) {
    if (user.password === req.body.password) {
      req.session.user = user;
      res.redirect('/chat');
    } else {
      res.redirect('/');
    }
  });
});

app.get('/logout', function(req, res) {

  req.session = null;
  res.redirect('/');
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

// Set up socket listen to server
// var io = require('socket.io').listen(server);
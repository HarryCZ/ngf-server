var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    session = require('express-session'),
    path = require('path');

var rootPath = path.normalize(__dirname + '/../../');
//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'example.com');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

module.exports = function(app) {
  // app.use(logger('tiny'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({
    secret: 'multi vision unicorns',
    resave:false,
    saveUninitialized: true
  }));
  app.use(allowCrossDomain);
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static(rootPath));
  app.use(express.static(rootPath + '/dist'));
  app.use('/events', express.static(rootPath));
}

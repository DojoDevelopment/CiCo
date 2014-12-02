
//dependencies
var express = require('express');
var connect = require('connect')
var http = require('http');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');

// set the app variable 
var app = express();

// app.use(express.cookieParser());
// app.use(express.session({secret: '1234567890QWERTY'}));


app.use(session({
  secret: 'qwerty',
  resave: false,
  saveUninitialized: true
}))


// var config = require('./config/config');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

// HTTP request logger 
var morgan = require('morgan')
app.use(morgan('dev'));

// body parser for getting data through the request
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded());
app.use(bodyParser.json())

// allows you to use http verbs that aren't supported by the browser if the header is 'X-HTTP-Method-Override'
var methodOverride = require('method-override')
app.use(methodOverride('X-HTTP-Method-Override'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// development only
var errorhandler = require('errorhandler')
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

// load up and invoke the routes function returned as an export in routes.js 
// found in the config folder
var routes = require('./config/routes')(app);

// set server to listen on the appropriate port
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
}); 

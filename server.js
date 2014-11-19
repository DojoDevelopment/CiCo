
//dependencies
var express = require('express');
var connect = require('connect')
var http = require('http');
var path = require('path');

// set the app variable 
var app = express();


//var config = require('./config/config');
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

// load up and invoke the routes function returned as an export in routes.js found in the config folder
var routes = require('./config/routes')(app);

var connection = require('./config/db.js')


// connection.query('SELECT * FROM clock_in_out.locations', function (err, rows, fields) {
//     if (err) throw err;
//     console.log('The name of the course is: ', rows[0].name, " and a nice description is: ", rows[0].description);
//     console.log('and the rest of the courses with descriptions are ', rows)
// });
//connection.end();

// set server to listen on the appropriate port
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
}); 

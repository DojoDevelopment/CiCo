//dependencies
var express = require('express')
 ,  connect = require('connect')
 ,  inspect = require('util').inspect
 ,  http = require('http')
 ,  path = require('path')
 ,  session = require('express-session')
 ,  cookieParser = require('cookie-parser')
 ,  fs = require('fs-extra') //file system - for file manipulation
 ,  multer = require('multer'); //middleware for form/file upload

// set the app variable 
var app = express();

app.use(session({
  secret: 'qwerty',
  resave: false,
  saveUninitialized: true
}))

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

// HTTP request logger 
var morgan = require('morgan')
app.use(morgan('dev'));

// body parser for getting data through the request
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false}));
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


//use multer, important: multer will not process any form which is not multipart/form-data
var done = false;
app.use(multer({ 
	//dest: './public/img/profile_pic/'
	dest: './uploads/'
	// , rename: function (fieldname, filename) {
	// 		return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
	// 	}
	// , limits: {
	// 		files : 1
	// 	}
	// , onFileUploadStart: function (file) {
 //  		console.log(file.fieldname + ' is starting ...')
	// 	}
	// , onFileUploadComplete: function (file) {
 //  		console.log(file.fieldname + ' uploaded to  ' + file.path);
 //  		done = true;
	// 	}
	// , onFilesLimit: function () {
	// 	  console.log('Crossed file limit!')
	// 	}
}));

var routes = require('./config/routes')(app);
// set server to listen on the appropriate port
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
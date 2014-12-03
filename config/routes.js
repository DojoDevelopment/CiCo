
// var express = require('express');
// var app = express();

// app.use(express.cookieParser());
// app.use(express.session({secret: '1234567890QWERTY'}));

var main     = require('../server/controllers/main.js');
var listsSQL = require('../server/models/listsSQL.js');
var tableSQL = require('../server/models/tableSQL.js');
var businessSQL = require('../server/models/businessSQL.js');
var employeeSQL = require('../server/models/employeeSQL.js');

module.exports = function Routes(app) { 

  //MAIN INDEX CALL
  app.get('/', function(req, res){ 
              
            var MyIP = req.ip;

              main.index(req,res); 
              
              

              //res.json(MyIP);

              console.log("ip from req.ip -> ", req.ip);
              console.log("ip from req.connection.remoteAddress -> ",req.connection.remoteAddress);
              console.log("ip from req.socket.remoteAddress-> ",req.socket.remoteAddress);
              //console.log("ip making the request from req.connection.socket.remoteAddress -> ",req.connection.socket.remoteAddress);
              console.log("ip  from req.headers['x-forwarded-for'] -> ", req.headers['x-forwarded-for']);
              req.session.logged_in = true;
              req.session.ip_address = req.connection.remoteAddress;
              console.log("session information follows: ", req.session);
              console.log("user logged in?: ",res.req.session.logged_in);
          });

  //Lists
  app.get('/api/list_all_locations',  function(req, res){ listsSQL.get_list_locations(req, res);         });
  app.get('/api/list_used_locations', function(req, res){ listsSQL.get_list_locations_used(req, res);    });
  app.get('/api/list_members',        function(req, res){ listsSQL.get_list_members(req, res);           });
  app.get('/api/list_supervisors',    function(req, res){ listsSQL.get_list_supervisors(req, res);       });

  //Dashboard
  app.get('/api/table_admin_dash',    function(req, res){ tableSQL.get_table_dash_admin(req, res);       });
  app.get('/api/table_dashboard',     function(req, res){ tableSQL.get_table_dash_user(req, res);        });

  //History
  app.get('/api/table_hist',          function(req, res){ tableSQL.get_table_history(req, res);          });
  app.get('/api/table_user/:id',      function(req, res){ employeeSQL.history(req, res); });

  //Business CRUD
  app.get('/api/business/:id',        function(req, res){ businessSQL.info(req, res)    });
  app.put('/api/business/:id',        function(req, res){ businessSQL.update(req, res); });

  //Employee CRUD
  app.post('/api/employee',           function(req, res){ employeeSQL.create(req, res); });
  app.get( '/api/employee/:id',       function(req, res){ employeeSQL.show(req, res);   });
  app.put( '/api/employee/:id',       function(req, res){ employeeSQL.update(req, res); });

  //Clock in / out
  app.post('/api/clock_in/:id',       function(req, res){ employeeSQL.clock_in(req, res);  });
  app.post('/api/clock_out/:session', function(req, res){ employeeSQL.clock_out(req, res); });
}
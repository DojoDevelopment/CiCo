var main     = require('../server/controllers/main.js');
var listsSQL = require('../server/models/listsSQL.js');
var tableSQL = require('../server/models/tableSQL.js');
var businessSQL = require('../server/models/businessSQL.js');
var employeeSQL = require('../server/models/employeeSQL.js');
var testPG   = require('../server/models/testPG.js');

module.exports = function Routes(app) { 

  app.get('/api/test/', function(req, res){ testPG.test(req, res); });

  //MAIN INDEX CALL
  app.get('/', function(req, res){ main.index(req,res); });

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
  app.get('/api/table_user/:id',      function(req, res){ tableSQL.get_table_employee_history(req, res); });

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
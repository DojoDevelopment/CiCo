var fs = require('fs-extra');

var main        = require('../server/controllers/main.js');
var listsSQL    = require('../server/models/listsSQL.js');
var tableSQL    = require('../server/models/tableSQL.js');
var businessSQL = require('../server/models/businessSQL.js');
var employeeSQL = require('../server/models/employeeSQL.js');
var loggingSQL  = require('../server/models/loggingSQL.js');
var testSQL  = require('../server/models/testSQL.js');
//var picUpload = require('../server/controllers/picUpload.js');

module.exports = function Routes(app) { 
  app.get('/', function(req, res){ main.index(req,res); });

  //Lists
  app.get('/api/list_all_locations',  function(req, res){ listsSQL.get_list_locations(req, res);      });
  app.get('/api/list_used_locations', function(req, res){ listsSQL.get_list_locations_used(req, res); });
  app.get('/api/list_members',        function(req, res){ listsSQL.get_list_members(req, res);        });
  app.get('/api/list_supervisors',    function(req, res){ listsSQL.get_list_supervisors(req, res);    });

  //Dashboard
  app.get('/api/table_admin_dash',    function(req, res){ tableSQL.get_table_dash_admin(req, res); });

  //History
  app.post('/api/table_user/:id',     function(req, res){ employeeSQL.history(req, res);           });
  app.post('/api/date_range',         function(req, res){ tableSQL.get_table_date_range(req, res); });

  //business/ip login
  app.get('/api/main',                function(req, res){ tableSQL.get_table_main_users(req, res);  })

  //Business CRUD
  app.get('/api/business/:id',        function(req, res){ businessSQL.info(req, res)    });
  app.put('/api/business',            function(req, res){ businessSQL.update(req, res); });

  //Employee CRUD
  app.post('/api/employee',           function(req, res){ employeeSQL.create(req, res); });
  app.get( '/api/employee/:id',       function(req, res){ employeeSQL.show(req, res);   });
  app.put( '/api/employee/:id',       function(req, res){ employeeSQL.update(req, res); });


  //Employee pic file upload
  app.post('/api/upload',             function( req,res){ testSQL.upload(req, res);     });
  
  //Clock in / out
  app.post('/api/clock_in/:id',       function(req, res){ employeeSQL.clock_in( req, res);   });
  app.post('/api/clock_out/:session', function(req, res){ employeeSQL.clock_out(req, res);   });
  app.get( '/api/last_clocking/:id',  function(req, res){ employeeSQL.last_clocking(req, res)});

  //log in
  app.post('/api/login',      function(req, res){ loggingSQL.login(req, res);       });
  app.post('/api/check_ip',   function(req, res){ loggingSQL.check_ip(req, res);    });
  app.get('/api/get_session', function(req, res){ loggingSQL.get_session(req, res); });
  app.get('/api/logout',      function(req, res){ loggingSQL.logout(req, res);      });


  app.post('/upload_file', function (req, res){

    var file = req.files.file;  //file location within req
    //first the temp file must be read
    fs.readFile(file.path, function(err, data){
      //where the upload will be saved along with what it will be named
      var path = __dirname + "/../public/img/profile_pic/profile_" + file.originalname;
      //writes the temp file to upload location/name
      fs.writeFile(path, data, function(err){
        //deletes temp file
        fs.unlinkSync(file.path);
        if(err) {
          console.log(err);
        } else {
          console.log("The file was saved!");
        }
      });
    });
  });
}
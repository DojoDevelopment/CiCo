var main    = require('../server/controllers/main.js');
var queries = require('../server/models/queries.js');

module.exports = function Routes(app) {
//<<<<<<< HEAD
	app.get('/', 								   function(req, res){ main.index(req,res) });
	app.post('/api/addEmployee',                   function(req, res){ queries.add_employee(req, res)   });
	app.get('/api/clock_in/:id',   					function(req, res){ queries.clock_in(req, res)       });
	app.get('/api/clock_out/:id/:session', 	        function(req, res){ queries.clock_out(req, res)      });
	app.get('/api/get_admin_dash', 					function(req, res){ queries.admin_dash(req, res);    });
	app.get('/api/get_all_locations',  			   function(req, res){ queries.all_locations(req, res); });
	app.get('/api/get_business_info/:id',          function(req, res){ queries.business_info(req, res)  });
	app.get('/api/get_hist_table', 					function(req, res){ queries.history_table(req, res); });
    app.post('/api/set_settings',                   function(req, res){ queries.update_settings(req, res);  });
	app.get('/api/get_locations',  					function(req, res){ queries.locations(req, res);     });
	app.get('/api/get_members',    					function(req, res){ queries.members(req, res);       });
	app.get('/api/get_supervisors',         function(req, res){ queries.supervisors(req, res)    });
	app.get('/api/get_user_dash',  					function(req, res){ queries.user_dash(req, res);     });
	app.post('/api/clock_out/:id/:session',  		function(req, res){ queries.clock_out(req, res)  });

//=======

	app.get('/', 									          function(req, res){ main.index(req,res);               });
	app.get('/api/clock_in/:id',   					function(req, res){ queries.clock_in(req, res);        });
	app.get('/api/get_admin_dash', 					function(req, res){ queries.admin_dash(req, res);      });
	app.get('/api/get_all_locations',  			function(req, res){ queries.all_locations(req, res);   });
	app.get('/api/get_business_info',       function(req, res){ queries.business_info(req, res);   });
	app.get('/api/get_employee/:id', 				function(req, res){ queries.get_employee(req, res);    });
	app.get('/api/get_hist_table', 					function(req, res){ queries.history_table(req, res);   });
	app.get('/api/get_locations',  					function(req, res){ queries.locations(req, res);       });
	app.get('/api/get_members',    					function(req, res){ queries.members(req, res);         });
	app.get('/api/get_supervisors',         function(req, res){ queries.supervisors(req, res);     });
	app.get('/api/get_user_dash',  					function(req, res){ queries.user_dash(req, res);       });
	app.get('/api/get_user_history/:id',    function(req, res){ queries.user_history(req, res);		 });

	app.post('/api/add_employee',           function(req, res){ queries.add_employee(req, res);    });
	app.post('/api/clock_out/:id/:session', function(req, res){ queries.clock_out(req, res);       });
	app.post('/api/update_employee/:id',    function(req, res){ queries.update_employee(req, res); });
//>>>>>>> 79f235a3aa7a56e9b1020ac08320b41bf05e41c1
}
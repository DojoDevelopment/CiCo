var main    = require('../server/controllers/main.js');
var queries = require('../server/models/queries.js');

module.exports = function Routes(app) {
<<<<<<< HEAD
	app.get('/', 									function(req, res){ main.index(req,res) });
	app.get('/clockout', 							function(req, res){ clockout(req,res) });
=======
	app.get('/', 									          function(req, res){ main.index(req,res) });
	app.get('/api/addEmployee',             function(req, res){ queries.add_employee(req, res)});
	app.get('/api/clock_in/:id',   					function(req, res){ queries.clock_in(req, res) });
	app.get('/api/clock_out/:id/:session', 	function(req, res){ queries.clock_out(req, res) });
	app.get('/api/get_admin_dash', 					function(req, res){ queries.admin_dash(req, res); });
	app.get('/api/get_business_name',       function(req, res){ queries.business_name(req, res)});
	app.get('/api/get_hist_table', 					function(req, res){ queries.history_table(req, res); });
>>>>>>> 6dd1d3e8da19d2f85288125e46dc741c20976543
	app.get('/api/get_locations',  					function(req, res){ queries.locations(req, res); });
	app.get('/api/get_members',    					function(req, res){ queries.members(req, res); });
	app.get('/api/get_supervisors',         function(req, res){ queries.supervisors(req, res)});
	app.get('/api/get_user_dash',  					function(req, res){ queries.user_dash(req, res); });
}
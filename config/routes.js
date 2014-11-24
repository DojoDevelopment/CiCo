var main   = require('../server/controllers/main.js');
var queries = require('../server/models/queries.js');

module.exports = function Routes(app) {
	app.get('/', function(req,res) {main.index(req,res) });
	app.get('/api/get_members',    function(req, res){ queries.members(req, res); });
	app.get('/api/get_locations',  function(req, res){ queries.locations(req, res); });
	app.get('/api/get_user_dash',  function(req, res){ queries.user_dash(req, res); });
	app.get('/api/get_admin_dash', function(req, res){ queries.admin_dash(req, res); });
	app.get('/api/get_hist_table', function(req, res){ queries.history_table(req, res); });
}
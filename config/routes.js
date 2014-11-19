// Routes fill will handle all incoming requests and point to tghe correct view 
//(only for the index landing page if you're using angular or controller)
var members = require('../server/controllers/members.js')
var admins = require('../server/controllers/admins.js')


module.exports = function Routes(app) {
	app.get('/', function(req,res) {members.index(req,res) });
	app.get('/index', function(req,res) {members.index(req,res) });
	app.get('/dashboard', function(req,res) {members.dashboard(req,res) });
	app.get('/history', function(req,res) {members.history(req,res) });	
	app.get('/admin/dashboard', function(req,res){ admins.dashboard(req,res) });
	app.get('/admin/history', function(req,res){ admins.history(req,res) });
	app.post('/users/create'), function(req,res){ members.create(req,res)};
	app.delete('/users/:id/delete'), function(req,res) {members.destroy(req,res)};
}
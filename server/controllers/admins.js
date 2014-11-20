//our routes config file will call methods from this file
//this module exports an inmediate function that 
//which returns an object with the name of the method 
//as the "key" and the method to execute
var connection = require('../../config/db.js')
module.exports = (function() {
	return{
		dashboard: function(req,res) {
			var list  = "SELECT * FROM locations;";
			var table = "SELECT members.picture, members.name, members.status, members.title, members.team, "
			+                  "members2.name AS supervisor, "
			+                  "locations2.name AS locations, "
			+                  "members.note "
			+                  "FROM members "
			+                  "LEFT JOIN locations AS locations2 ON locations2.id = members.location_id "
			+                  "LEFT JOIN members AS members2 ON members2.id = members.supervisor_id "
			+                  "WHERE members.business_id = 1;"

			connection.query(list+' '+table, function(err, rows) {
				if (err) throw err;
				console.log(rows[0]);
				console.log(rows[1]);
				res.render('admins/dashboard', {list: rows[0], table: rows[1]})
				return;
			});
		},
		history: function(req,res) {res.render ('admins/history')},
		setting: function(req,res) {res.render ('admins/setting')},
		new_user: function(req,res) {res.render ('admins/new_user')},
		userinput: function(req,res) {
			console.log(req.body)
			res.render('display', {name: req.body.name})
		}
	} 
}());
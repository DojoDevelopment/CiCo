//our routes config file will call methods from this file
//this module exports an inmediate function that 
//which returns an object with the name of the method 
//as the "key" and the method to execute
var connection = require('../../config/db.js')

module.exports = (function() {
	return{
		index: function(req,res) {res.render('index')},
		dashboard: function(req,res) {
			var data;
			// connection.query('SELECT * FROM clock_in_out.members', function (err, rows, fields) {
   //  			if (err) throw err;
   //  			console.log('data retrieved follows: ', rows)
			// 	data = rows;
			// 	res.render('dashboard',{data:data});
			// });
			res.render('dashboard');
			//res.render('dashboard',{data:data});
			// I need to close the connection, when???
			//because once it is closed I get the error
			//Error: Cannot enqueue Query after invoking qui
			//connection.end();

		},
		history: function(req,res) {res.render ('history')},
		userinput: function(req,res) {
			console.log(req.body)
			res.render('display', {name: req.body.name})
		}
	} 
}());
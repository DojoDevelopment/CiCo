//our routes config file will call methods from this file
//this module exports an inmediate function that 
//which returns an object with the name of the method 
//as the "key" and the method to execute
var connection = require('../../config/db.js')

module.exports = (function() {
	return{
		index: function(req,res) {res.render('index')},
		dashboard: function(req,res) {
      var sql_data = require('../models/user_dash.js');
      sql_data.page(function(err, data){ 
        res.render('dashboard', {list: data[0], table: data[1]});
      });
		},
		history: function(req,res) {
      var sql_data = require('../models/user_hist.js');
      sql_data.page(function(err, data){ 
        res.render('history', {list: data[0], members: data[1], table: data[2] });
      });
		},
		userinput: function(req,res) {
			console.log(req.body)
			res.render('display', {name: req.body.name})
		}
	} 
}());
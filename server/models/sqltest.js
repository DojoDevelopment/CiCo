var connection = require('../../config/db.js')

module.exports = (function() {
	return {

		tester : function(){

			//connection.query('SELECT * FROM locations', function (err, rows, fields) {
			return connection.query('SELECT * FROM locations', function(err, rows) {

					//console.log(rows);
		    return 
			});
		}
	}
}());

//THIS IS ONLY FOR MONGO DB
// this does stuff with data and defines the schema
// which is then used to put stuff into the db and the queries
// are done in the controller

// var mongoose = require ('mongoose');

// var FriendSchema = new mongoose.Schema({
// 	name: String
// })

// mongoose.model('Friend',FriendSchema);
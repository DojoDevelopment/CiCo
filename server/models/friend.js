// this does stuff with data and defines the schema
// which is then used to put stuff into the db and the queries
// are done in the controller

var mongoose = require ('mongoose');

var FriendSchema = new mongoose.Schema({
	name: String
})

mongoose.model('Friend',FriendSchema);
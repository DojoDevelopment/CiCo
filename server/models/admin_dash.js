var connection = require('../../config/db.js')
module.exports = (function() {
	return {

		page : function(callback){
						var locations = "SELECT locations.id, locations.name FROM locations;";
			    
			      var table     = "SELECT members.picture, members.name, members.status, members.title, members.team, "
					                +     "members2.name AS supervisor, "
					                +     "locations2.name AS locations, "
					                +     "members.note "
					                +   "FROM members "
					                +   "LEFT JOIN locations AS locations2 ON locations2.id = members.location_id "
					                +   "LEFT JOIN members AS members2 ON members2.id = members.supervisor_id "
					                +   "WHERE members.business_id = 1;";

						connection.query(locations+table, function(err, data) {
							if (err) throw err;
							callback(null,data);
						});
					}
	}
}());
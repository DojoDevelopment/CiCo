var connection = require('../../config/db.js')
module.exports = (function() {
	return {

		page : function(callback){
						var locations = "SELECT locations.id, locations.name FROM locations;";
					
						var members  	= "SELECT members.id, members.name FROM members;";
					
						var table			= "SELECT DATE_FORMAT(sessions.created_at, '%c/%d (%a)') as 'date', "
												+	  "members.picture, members.name, members.title, members.team, members2.name as supervisor, "
												+   "locations2.name as location, "
												+	  "DATE_FORMAT(sessions.clock_in, '%l:%i%p') as 'clock_in', "
												+	  "DATE_FORMAT(sessions.clock_out, '%l:%i%p') as 'clock_out', "
												+	  "sessions.personal_time as 'personal', "
												+	  "TIME_FORMAT(TIMEDIFF(sessions.clock_out, sessions.clock_in), '%k:%i') AS 'billed', "
												+	  "sessions.report "
												+	"FROM members "
												+	"LEFT JOIN sessions ON members.id = sessions.member_id "
												+	"LEFT JOIN members AS members2 ON members2.id = members.supervisor_id "
												+	"LEFT JOIN locations AS locations2 ON locations2.id = members.location_id "
												+	"WHERE members.business_id = 1;";
												
					connection.query(locations+members+table, function(err, data) {
						if (err) throw err;
						callback(null,data);
					});
				}
	}
}());
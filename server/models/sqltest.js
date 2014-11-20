var connection = require('../../config/db.js')

module.exports = (function() {
	return {

			admin_dash  : function(callback){
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
									},
		admin_history : function(callback){
										var locations = "SELECT locations.id, locations.name FROM locations;";
										var members  	= "SELECT members.id, members.name FROM members;";
										var table			= "SELECT DATE_FORMAT(sessions.created_at, '%c/%d (%a)') as 'Date', "
																	+	  "members.picture, members.name, members.title, members.team, members2.name as Supervisor, locations2.name as Location, "
																	+	  "DATE_FORMAT(sessions.clock_in, '%l:%i%p') as 'Clock In', "
																	+	  "DATE_FORMAT(sessions.clock_out, '%l:%i%p') as 'Clock Out', "
																	+	  "CONCAT(sessions.personal_time, ' hrs') as 'Personal Time', "
																	+	  "TIME_FORMAT(TIMEDIFF(sessions.clock_out, sessions.clock_in), '%k:%i') AS 'Billed Hours', "
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
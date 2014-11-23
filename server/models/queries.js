var connection = require('../../config/db.js')
module.exports = {

	locations  : function(req, res) {
										var qry = "SELECT DISTINCT locations.name "
														+ "FROM members " 
														+ "LEFT JOIN locations ON members.location_id = locations.id "
														+ "WHERE members.business_id = 1";
								
										connection.query(qry, function(err, data) {
										
										if (err) throw err;
											res.json(data);
										});
	},
	members 	 : function(req, res) {
										var qry = "SELECT members.name, locations.name as location "
														+ "FROM members "
														+ "LEFT JOIN locations ON members.location_id = locations.id "
														+ "WHERE members.business_id = 1";
								
										connection.query(qry, function(err, data) {
									
										if (err) throw err;
											res.json(data);
										});
	},
	user_table : function(req, res) {
										var qry = "SELECT members.picture, members.name, members.title, members.team, "
														+     "members2.name AS supervisor, "
														+     "locations2.name AS locations, "
														+     "members.note "
														+   "FROM members "
														+   "LEFT JOIN locations AS locations2 ON locations2.id = members.location_id "
														+   "LEFT JOIN members AS members2 ON members2.id = members.supervisor_id "
														+   "WHERE members.business_id = 1";

										connection.query(qry, function(err, data) {

										if (err) throw err;
											res.json(data);
										});
	}, 
	admin_table : function(req, res) {
										var qry = "SELECT members.picture, members.name, members.status, members.title, members.team, "
														+     "members2.name AS supervisor, "
														+     "locations2.name AS locations, "
														+     "members.note "
														+   "FROM members "
														+   "LEFT JOIN locations AS locations2 ON locations2.id = members.location_id "
														+   "LEFT JOIN members AS members2 ON members2.id = members.supervisor_id "
														+   "WHERE members.business_id = 1";

										connection.query(qry, function(err, data) {

										if (err) throw err;
											res.json(data);
										});
	},
	history_table : function(req, res) {
										var qry = "SELECT sessions.created_at as 'date', "
														+	  "members.picture, members.name, members.title, members.team, members2.name as supervisor, "
														+   "members.location_id as location_id, "
														+   "locations2.name as location, "
														+	  "sessions.clock_in as 'clock_in', "
														+	  "sessions.clock_out as 'clock_out', "
														+	  "sessions.personal_time as 'personal', "
														+	  "TIME_FORMAT(TIMEDIFF(sessions.clock_out, sessions.clock_in), '%k:%i') AS 'billed', "
														+	  "sessions.report "
														+	"FROM members "
														+	"LEFT JOIN sessions ON members.id = sessions.member_id "
														+	"LEFT JOIN members AS members2 ON members2.id = members.supervisor_id "
														+	"LEFT JOIN locations AS locations2 ON locations2.id = members.location_id "
														+	"WHERE members.business_id = 1";

										connection.query(qry, function(err, data) {

										if (err) throw err;
											res.json(data);
										});
	}
};
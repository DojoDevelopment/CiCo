var connection = require('../../config/db.js')
module.exports = {

	locations  : function(req, res) {
								var qry = "SELECT locations.id, locations.name FROM locations";
								connection.query(qry, function(err, data) {
									if (err) throw err;
									res.json(data);
								});
	},
	members 	 : function(req, res) {
								var qry = "SELECT members.id, members.name FROM members";
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
										callback(data);
									});
	},
	history_table : function(req, res) {
										var qry = "SELECT DATE_FORMAT(sessions.created_at, '%c/%d (%a)') as 'date', "
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
														+	"WHERE members.business_id = 1";
										console.log("in queries.js")
										connection.query(qry, function(err, data) {
											if (err) throw err;
											res.json(data);
										});
	}
};
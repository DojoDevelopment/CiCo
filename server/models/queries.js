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

	}, members 	 : function(req, res) {
		var qry = "SELECT members.name, locations.name as location "
		+ "FROM members "
		+ "LEFT JOIN locations ON members.location_id = locations.id "
		+ "WHERE members.business_id = 1";
		
		connection.query(qry, function(err, data) {
			
			if (err) throw err;
			res.json(data);
		});

	}, user_dash : function(req, res) {
		var qry = "SELECT members.id, "
		+			"members.picture, "
		+			"members.name, "
		+			"members.title, "
		+			"members.team, "
		+     "members2.name AS supervisor, "
		+     "locations2.name AS locations, "
		+			"sessions2.clock_in, "
		+			"sessions2.clock_out, "
		+			"sessions2.id AS session_id "
		+   "FROM members "
		+   "LEFT JOIN locations AS locations2 ON locations2.id = members.location_id "
		+   "LEFT JOIN members AS members2 ON members2.id = members.supervisor_id "
		+		"LEFT JOIN ("
		+			"SELECT id, member_id, clock_in, clock_out "
		+			"FROM sessions "
		+			"WHERE DATE(sessions.clock_in) = CURDATE() "
		+		"WHERE members.business_id = 1 "
		+		") AS sessions2 on sessions2.member_id = members.id ";

		connection.query(qry, function(err, data) {

			if (err) throw err;
			res.json(data);
		});

	}, admin_dash : function(req, res) {
		var qry = "SELECT members.id, members.picture, members.name, members.status, members.title, members.team, "
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

	}, history_table : function(req, res) {
		// var qry = "SELECT sessions.created_at as 'date', "
		// +	  "members.picture, members.name, members.title, members.team, members2.name as supervisor, "
		// +   "members.location_id as location_id, "
		// +   "locations2.name as location, "
		// +	  "sessions.clock_in as 'clock_in', "
		// +	  "sessions.clock_out as 'clock_out', "
		// +	  "sessions.personal_time as 'personal', "
		// +	  "TIME_FORMAT(TIMEDIFF(sessions.clock_out, sessions.clock_in), '%k:%i') AS 'billed', "
		// +	  "sessions.report "
		// +	"FROM members "
		// +	"LEFT JOIN sessions ON members.id = sessions.member_id "
		// +	"LEFT JOIN members AS members2 ON members2.id = members.supervisor_id "
		// +	"LEFT JOIN locations AS locations2 ON locations2.id = members.location_id "
		// +	"WHERE members.business_id = 1 ";

		var qry = "SELECT sessions.created_at, members.name, title, team, locations.name AS loc, clock_in, clock_out, personal_time, report FROM sessions "
				+ " LEFT JOIN members ON sessions.member_id = members.id "
				+ " LEFT JOIN locations ON locations.id = members.location_id";

		connection.query(qry, function(err, data) {

			if (err) throw err;
			res.json(data);
		});
	}, clock_in : function(req, res){

		var id = req.params.id;
		var qry = "INSERT INTO sessions (member_id, clock_in, created_at) VALUES (?, NOW(), NOW())";

		connection.query(qry, id, function(err, data) {
			if (err) throw err;
			res.json(data);
		});
		
	}, clock_out : function(req, res){

		var id = req.params.id;
		var session = req.params.session;

		var qry = "UPDATE sessions "
		+ "SET clock_out=NOW(), "
		+		"personal_time=1.5, "
		+ 	"report='Coffee break', "
		+		"updated_at=Now(), "
		+		"updated_by=? "
		+ "WHERE id=?";

		connection.query(qry, [id, session], function(err, data) {
			if (err) throw err;
			res.json(data);
		});
	}
};
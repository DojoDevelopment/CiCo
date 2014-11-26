var connection = require('../../config/db.js')
module.exports = {
	
	get_employee : function(req, res){

		var id = req.params.id;

		var qry = "SELECT members.location_id, members.name, members.title, members.email, members.password, members.start_date, members.status, "
			+ "members.note, members.team, members.supervisor_id, members.type "
			+ "FROM members "
			+ "WHERE members.id = ?";

		connection.query(qry, id, function(err, data) {

			if (err) throw err;
			res.json(data);

		});

	}, user_history : function(req, res){
		var id  = req.params.id;

		var qry = "SELECT sessions.created_at, locations.name AS locations, clock_in, clock_out, personal_time, report, TIMEDIFF(clock_out,clock_in) AS billed FROM sessions "
				+ " LEFT JOIN members ON sessions.member_id = members.id "
				+ " LEFT JOIN locations ON locations.id = members.location_id "
				+ " WHERE members.id = ?";

		connection.query(qry, id, function(err, data) {

			if (err) throw err;
			res.json(data);
		
		});


	}, business_info : function(req, res){
	
		var id = req.params.id;
		console.log('before retrieving info for business: ',id)
		var qry = "SELECT name, ip_addresses "

						+ "FROM businesses "
						+ "WHERE businesses.id ="+id;
		console.log(qry);
		

		connection.query(qry, function(err, data) {	
			if (err) throw err;
			res.json(data);

		});

	}, supervisors : function(req, res) {
	
		var qry = "SELECT members.id, members.name "
						+ "FROM members "
						+ "WHERE members.type = 'contractor' "
						+ "AND members.business_id = 1";

		connection.query(qry, [], function(err, data) {
			
			if (err) throw err;
			res.json(data);

		});

	}, update_employee : function(req, res) {

		var id = req.params.id

		var location   = req.body.location;
		var name       = req.body.name;
		var title      = req.body.title;
		var email      = req.body.email;
		var password 	 = req.body.password;
		var start_date = req.body.start_date;
		var status     = req.body.status;
		var note			 = req.body.note;
		var team       = req.body.team;
		var supervisor = req.body.supervisor;
		var type 	  	 = req.body.admin;

		var qry = "UPDATE members SET location_id=?, "
			+ "name=?, title=?, email=?, password=?, start_date=?, status=?, "
			+ "note=?, team=?, supervisor_id=?, type=?, updated_at=NOW() "
			+ "WHERE id=?"

		var form = [location, name, title, email, password, start_date, 
								status, note, team, supervisor, type, id]

		connection.query(qry, form, function(err) {
			if (err) throw err;
			res.status(200).end();
		});


	}, add_employee : function(req, res) {

		var location   = req.body.location;
		var name       = req.body.name;
		var title      = req.body.title;
		var email      = req.body.email;
		var password 	 = req.body.password;
		var start_date = req.body.start_date;
		var status     = req.body.status;
		var note			 = req.body.note;
		var team       = req.body.team;
		var supervisor = req.body.supervisor;
		var type 	  	 = req.body.admin;
		console.log(req.body);
		var qry = "INSERT INTO members (business_id, location_id, "
			+ "name, title, email, password, start_date, status, "
			+ "note, team, supervisor_id, type, created_at) "
			+ "VALUES (1,?,?,?,?,?,?,?,?,?,?,?, NOW())";

		var form = [location, name, title, email, password, start_date, 
								status, note, team, supervisor, type]

		connection.query(qry, form, function(err) {
			if (err) throw err;
			res.status(200).end();
		});

	}, all_locations  : function(req, res) {

		var qry = "SELECT locations.id, locations.name "
		+ "FROM locations "
		+ "LEFT JOIN businesses ON locations.business_id = businesses.id " 
		+ "WHERE businesses.id = 1";
		
		connection.query(qry, function(err, data) {
			
			if (err) throw err;
			res.json(data);
		});

	}, locations  : function(req, res) {

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
		+		") AS sessions2 on sessions2.member_id = members.id "
		+		"WHERE members.business_id = 1";

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

		var qry = "SELECT sessions.created_at, members.name, title, team, locations.name AS locations, clock_in, clock_out, personal_time, report, TIMEDIFF(clock_out,clock_in) AS billed FROM sessions "
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
			res.json(Date.now());

		});
		
	}, clock_out : function(req, res){

		var id = req.params.id;
		var session = req.params.session;

		console.log(req.body.data)

		var qry = "UPDATE sessions "
		+ "SET clock_out=NOW(), "
		+		"personal_time=1.5, "
		+ 	"report='Coffee break', "
		+		"updated_at=Now(), "
		+		"updated_by=? "
		+ "WHERE id=?";

		connection.query(qry, [id, session], function(err, data) {

			if (err) throw err;
			res.json(Date.now());

		});

	}, update_settings: function(req,res){
		var ip = req.body.ip;
		var company = req.body.company;

		var qry = "UPDATE businesses "
		+ "SET name=? "
		+ ",ip_addresses=?"
		+ " WHERE id= 2 " 

		connection.query(qry, [company,ip], function(err,data){
			if (err) throw err;
		})


	}

};
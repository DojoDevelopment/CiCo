var connection = require('../../config/db.js')
module.exports = {

  get_table_dash_admin : function(req, res) {

    var qry = 
        "SELECT members.id"
      +   ", members.picture"
      +   ", members.name"
      +   ", members.status"
      +   ", members.title"
      +   ", members.team"
      +   ", members2.name AS supervisor"
      +   ", locations2.name AS locations"
      +   ", members.note"
      + " FROM members"
      + " LEFT JOIN locations AS locations2 ON locations2.id = members.location_id"
      + " LEFT JOIN members AS members2 ON members2.id = members.supervisor_id"
      + " WHERE members.business_id = 1";

    connection.query(qry, function(err, data) {

      if (err) throw err;
      res.json(data);

    });

  }, get_table_dash_user : function(req, res) {

    var qry = 
        "SELECT members.id"
        + ", members.picture"
        + ", members.name"
        + ", members.title"
        + ", members.team"
        + ", members2.name AS supervisor"
        + ", locations2.name AS locations"
        + ", sessions2.clock_in"
        + ", sessions2.clock_out"
        + ", sessions2.id AS session_id"
      + " FROM members"
      + " LEFT JOIN locations AS locations2 ON locations2.id = members.location_id"
      + " LEFT JOIN members AS members2 ON members2.id = members.supervisor_id"
      + " LEFT JOIN ("
        + " SELECT id"
          + ", sessions.member_id"
          + ", sessions.clock_in"
          + ", sessions.clock_out"
        + " FROM sessions"
        + " WHERE DATE(sessions.clock_in) = CURDATE()"
      + " ) AS sessions2 on sessions2.member_id = members.id"
      + " WHERE members.business_id = 1";

    connection.query(qry, function(err, data) {

      if (err) throw err;
      res.json(data);

    });

  }, get_table_employee_history : function(req, res){

    var id  = req.params.id;
    var qry = 
      "SELECT sessions.created_at"
        + ", locations.name AS locations"
        + ", sessions.clock_in"
        + ", sessions.clock_out"
        + ", sessions.personal_time"
        + ", sessions.report"
        + ", TIMEDIFF(sessions.clock_out, sessions.clock_in) AS billed "
      + " FROM sessions"
      + " LEFT JOIN members ON sessions.member_id = members.id"
      + " LEFT JOIN locations ON locations.id = members.location_id"
      + " WHERE members.id = ?";

    connection.query(qry, id, function(err, data) {
  
      if (err) throw err;
      res.json(data);
  
    });

  }, get_table_history : function(req, res) {

    var qry = 
        "SELECT sessions.created_at"
        + ", members.name"
        + ", members.title"
        + ", members.team"
        + ", locations.name AS locations"
        + ", sessions.clock_in"
        + ", sessions.clock_out"
        + ", sessions.personal_time"
        + ", sessions.report"
        + ", TIMEDIFF(sessions.clock_out, sessions.clock_in) AS billed"
      + " FROM sessions"
      + " LEFT JOIN members ON sessions.member_id = members.id"
      + " LEFT JOIN locations ON locations.id = members.location_id";

    connection.query(qry, function(err, data) {

      if (err) throw err;
      res.json(data);
    
    });
  }
}
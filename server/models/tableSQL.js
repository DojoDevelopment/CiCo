var pg = require('pg');
var conString = require('../../config/db.js');
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
    
    var client = new pg.Client(conString);

    client.connect(function(err) {
      if(err) { return console.error('could not connect dude, check stuff!', err); }
      client.query(qry, function(err, data) {
        if(err) { return console.error('error running admin_dash', err); }
        res.json(data.rows);
        client.end();
      });
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
        + " WHERE sessions.clock_out is null"
      + " ) AS sessions2 on sessions2.member_id = members.id"
      + " WHERE members.business_id = 1;";

    var client = new pg.Client(conString);

    client.connect(function(err) {
      if(err) { return console.error('could not connect dude, check stuff!', err); }
      client.query(qry, function(err, data) {
        if(err) { return console.error('error running table query', err); }
        res.json(data.rows);
        client.end();
      });
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
        + ", age(sessions.clock_out, sessions.clock_in) AS billed"
      + " FROM sessions"
      + " LEFT JOIN members ON sessions.member_id = members.id"
      + " LEFT JOIN locations ON locations.id = members.location_id";

    var client = new pg.Client(conString);
    
    client.connect(function(err) {
      if(err) { return console.error('could not connect dude, check stuff!', err); }
      client.query(qry, function(err, data) {
        if(err) { return console.error('error running history_table', err); }
        //replace billed with the previous info
        for (var i=0; i<data.rows.length; i++){
          if (data.rows[i].clock_out > data.rows[i].clock_in) {
            var hours = (data.rows[i].clock_out - data.rows[i].clock_in)/(3600*1000);
            hours = hours.toFixed(2);
            data.rows[i].billed = hours;
          }
          else{
            data.rows[i].billed = '0.00';
          }
        }

        res.json(data.rows);
        client.end();
      });
    });
  
  }
}
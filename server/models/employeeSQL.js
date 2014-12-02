//var connection = require('../../config/db.js')
var pg = require('pg');
var conString = require('../../config/db.js');

module.exports = {
  
  create : function(req, res) {

    var location_id = req.body.location;
    var name        = req.body.name;
    var title       = req.body.title;
    var email       = req.body.email;
    var password    = req.body.password;
    var start_date  = req.body.start_date;
    var status      = req.body.status;
    var note        = req.body.note;
    var team        = req.body.team;
    var supervisor  = req.body.supervisor;
    var type        = req.body.admin;

    var qry = 
        "INSERT INTO members ("
      +   " business_id"
      +   ", location_id"
      +   ", name"
      +   ", title"
      +   ", email"
      +   ", password"
      +   ", start_date"
      +   ", status"
      +   ", note"
      +   ", team"
      +   ", supervisor_id"
      +   ", type"
      +   ", created_at"
      + " ) VALUES (1,?,?,?,?,?,?,?,?,?,?,?,NOW())";

    var form = [location_id, name, title, email, password, start_date, 
                status, note, team, supervisor, type]


    var client = new pg.Client(conString);

    client.connect(function(err) {
      if(err) { return console.error('could not connect to postgres', err); }
      client.query(qry, form, function(err, data) {
        if(err) { return console.error('error running query', err); }
        res.status(200).end();
        client.end();
      });
    });

    // connection.query(qry, form, function(err) {
    //   if (err) throw err;
    //   res.status(200).end();
    // });

  }, show : function(req, res){

    var id = req.params.id;
    var qry = 
        "SELECT members.location_id"
        + ", members.name"
        + ", members.title"
        + ", members.email"
        + ", members.password"
        + ", members.start_date"
        + ", members.status"
        + ", members.note"
        + ", members.team"
        + ", members.supervisor_id"
        + ", members.type"
      + " FROM members "
      + "WHERE members.id = ?";

    var client = new pg.Client(conString);

    client.connect(function(err) {
      if(err) { return console.error('could not connect to postgres', err); }
      client.query(qry, id, function(err, data) {
        if(err) { return console.error('error running query', err); }
        console.log(data);
        res.json(data);
        client.end();
      });
    });

    // connection.query(qry, id, function(err, data) {
  
    //   if (err) throw err;
    //   res.json(data);
  
    // });

  }, update : function(req, res) {

    var id = req.params.id

    var location   = req.body.location;
    var name       = req.body.name;
    var title      = req.body.title;
    var email      = req.body.email;
    var password   = req.body.password;
    var start_date = req.body.start_date;
    var status     = req.body.status;
    var note       = req.body.note;
    var team       = req.body.team;
    var supervisor = req.body.supervisor;
    var type       = req.body.admin;

    var qry = 
         "UPDATE members"
      + " SET location_id=?"
      +   ", name=?"
      +   ", title=?"
      +   ", email=?"
      +   ", password=?"
      +   ", start_date=?"
      +   ", status=?"
      +   ", note=?"
      +   ", team=?"
      +   ", supervisor_id=?"
      +   ", type=?"
      +   ", updated_at=NOW()"
      + " WHERE id=?"

    var form = [location, name, title, email, password, start_date, 
                status, note, team, supervisor, type, id]

    connection.query(qry, form, function(err) {
      if (err) throw err;
      res.status(200).end();
    });
  
  }, clock_in : function(req, res){

    var id = req.params.id;
    var qry = 
        "INSERT INTO sessions ("
      +   "member_id"
      +   ", clock_in"
      +   ", created_at"
      + ") VALUES (?, NOW(), NOW())";

    client.connect(function(err) {
      if(err) { return console.error('could not connect to postgres', err); }
      client.query(qry, id, function(err, data) {
        if(err) { return console.error('error running query', err); }
        console.log(data);
        res.json(data);

        client.end();
      });
    });

    // connection.query(qry, id, function(err, data) {

    //   if (err) throw err;
    //   res.json(Date.now());

    // });
    
  }, clock_out : function(req, res){

    var session  = req.params.session;
    var personal = req.body.personal;
    var report   = req.body.report;

    var qry = 
         "UPDATE sessions"
      + " SET clock_out=NOW()"
      +   ", personal_time=?"
      +   ", report=?"
      +   ", updated_at=Now()"
      + " WHERE id=?";

    client.connect(function(err) {
      if(err) { return console.error('could not connect to postgres', err); }
      client.query(qry, [personal, report, session], function(err, data) {
        if(err) { return console.error('error running query', err); }
        console.log(data);
        res.json(data);

        client.end();
      });
    });


    // connection.query(qry, [personal, report, session], function(err, data) {

    //   if (err) throw err;
    //   res.json(Date.now());

    // });

  }
}
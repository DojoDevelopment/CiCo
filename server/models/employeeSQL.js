var pg = require('pg');
var conString = require('../../config/db.js');
var fs = require('fs-extra');

module.exports = {
  
  create : function(req, res) {

    var form = [
        req.body.location
      , req.body.name
      , req.body.title
      , req.body.email
      , req.body.password
      , req.body.start_date
      , req.body.status
      , req.body.note
      , req.body.team
      , req.body.supervisor
      , req.body.admin
    ];

    if (form[9]=='') form[9]=1;

    console.log('form[9]: ', form[9]);

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
      + " ) VALUES (1,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW())"
      + " RETURNING id";

    var client = new pg.Client(conString);
    client.connect(function(err) {
      if(err) { return console.error('could not connect to postgres', err); }

      client.query(qry, form, function(err, data) {
        if(err) { return console.error('error running query', err); }

        //var done = false;
        var done = true;
//        data.rows[0].id;
        if(done==true){
          console.log("this is the data.rows[0].id argument from query callback: ;", data.rows[0].id);
          var available_files = fs.readdirSync("/Users/Alvaro/Desktop/cico/public/img/profile_pic/");
          console.log(available_files);

          var rand1000 = Math.floor(Math.random()*(1000-1) + 1);
          var myFileURL = "/Users/Alvaro/Desktop/cico/public/img/profile_pic/"+available_files[available_files.length-1]; 
          var myDestination = "/Users/Alvaro/Desktop/cico/uploads/pic_user_id_"+data.rows[0].id+".jpg";
          console.log(__dirname);
          fs.move(myFileURL,myDestination, function(err){
            if (err){
              throw err
            }
            console.log('moved ',myFileURL,' to ', myDestination);
          });
          res.end("File uploaded.");
        }
        client.end();
      });
    });

  }, show : function(req, res){

    var id = req.params.id;
    var qry = 
        "SELECT members.id"
        + ", members.location_id"
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
        + ", members.is_logged"
      + " FROM members"
      + " WHERE members.id = $1";

    var client = new pg.Client(conString);

    pg.connect(conString, function(err, client, done) {
      if(err) { return console.error('error fetching client from pool', err); }
      client.query(qry, [id], function(err, result) {
        done();
        if(err) { return console.error('error running query', err); }

        res.json(result.rows[0]);
      });
    });

  }, update : function(req, res, next) {

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
      + " SET location_id=$1"
      +   ", name=$2"
      +   ", title=$3"
      +   ", email=$4"
      +   ", password=$5"
      +   ", start_date=$6"
      +   ", status=$7"
      +   ", note=$8"
      +   ", team=$9"
      +   ", supervisor_id=$10"
      +   ", type=$11"
      +   ", updated_at=NOW()"
      + " WHERE id=1";

    var form = [location, name, title, email, password, start_date, 
                status, note, team, supervisor, type]

    var client = new pg.Client(conString);

    pg.connect(conString, function(err, client, done) {
      if(err) { return console.error('error fetching client from pool', err); }
      client.query(qry, form, function(err, result) {
        done();
        if(err) { return console.error('error running query', err); }
        res.status(200).end();
      });
    });
  
  }, history : function(req, res){

    var id  = req.params.id;
    var qry = 
      "SELECT sessions.created_at"
        + ", locations.name AS locations"
        + ", sessions.clock_in"
        + ", sessions.clock_out"
        + ", sessions.personal_time"
        + ", sessions.report"
        + ", age(sessions.clock_out, sessions.clock_in) AS billed "
      + " FROM sessions"
      + " LEFT JOIN members ON sessions.member_id = members.id"
      + " LEFT JOIN locations ON locations.id = members.location_id"
      + " WHERE members.id = $1::int";

    var client = new pg.Client(conString);

    pg.connect(conString, function(err, client, done) {
      if(err) { return console.error('error fetching client from pool', err); }
      client.query(qry, [id], function(err, data) {
        done();
        if(err) { return console.error('error running query', err); }
       
        for (var i=0; i< data.rows.length; i++){
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
      });
    });

  }, clock_in : function(req, res){

    var id = req.params.id;
    
    var qry = 
        "INSERT INTO sessions ("
      +   "member_id"
      +   ", clock_in"
      +   ", created_at"
      + ") VALUES ($1, NOW(), NOW())";

    var qry2 = 
        "UPDATE members"
      + " SET is_logged=TRUE"
      + " WHERE id=$1"

    pg.connect(conString, function(err, client, done) {
      if(err) { return console.error('error fetching client from pool', err); }
      client.query(qry, [id], function(err, result) {
        done();
        if(err) { return console.error('error running query', err); }
        client.query(qry2, [id], function(err, result){
          done();
          if(err) { return console.error('error running query', err); }
          res.status(200);
        });
      });

    });

  }, clock_out : function(req, res){

    var session  = req.params.session;
    var personal = req.body.personal;
    var report   = req.body.report;
    var user_id  = req.body.user;

    var qry = 
         "UPDATE sessions"
      + " SET clock_out=NOW()"
      +   ", personal_time=$1"
      +   ", report=$2"
      +   ", updated_at=Now()"
      + " WHERE id=$3";

    var qry2 = 
        "UPDATE members"
      + " SET is_logged=FALSE"
      + " WHERE id=$1"

    pg.connect(conString, function(err, client, done) {
      if(err) { return console.error('error fetching client from pool', err); }
      client.query(qry, [personal, report, session], function(err, result) {
        done();
        if(err) { return console.error('error running query', err); }
        client.query(qry2, [user_id], function(err, result){
          done();
          if(err) { return console.error('error running query', err); }
          res.status(200);
        });
      });
    });
  }, last_clocking : function(req, res){

    var id = req.params.id;
    var qry = "SELECT sessions.id"
            + " FROM sessions"
            + " WHERE member_id = $1"
            + " AND sessions.clock_out IS NULL"
            + " LIMIT 1";

    pg.connect(conString, function(err, client, done) {
      if(err) { return console.error('error fetching client from pool', err); }
      client.query(qry, [id], function(err, result) {
        done();
        if(err) { return console.error('error running query', err); }
        res.json(result.rows[0].id);
      });
    });
  }
}
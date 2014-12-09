var pg = require('pg');
var conString = require('../../config/db.js');

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

      var server = connect.createServer(
          form({ keepExtensions: true }),
          function(req, res, next){
              // Form was submitted
              if (req.form) {
                console.log(req.form)
                  // Do something when parsing is finished
                  // and respond, or respond immediately
                  // and work with the files.
                  req.form.complete(function(err, fields, files){
                      res.writeHead(200, {});
                      if (err) res.write(JSON.stringify(err.message));
                      res.write(JSON.stringify(fields));
                      res.write(JSON.stringify(files));
                      res.end();
                  });
              // Regular request, pass to next middleware
              } else {
                  next();
              }
          }
      );

    var client = new pg.Client(conString);
    client.connect(function(err) {
      if(err) { return console.error('could not connect to postgres', err); }

      client.query(qry, form, function(err, data) {
        if(err) { return console.error('error running query', err); }
        var done = false;
//        data.rows[0].id;
        if(done==true){
          res.end("File uploaded.");
        }
        client.end();
      });
    });
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
      + " FROM members"
      + " WHERE members.id = $1::int;";

    var client = new pg.Client(conString);

    pg.connect(conString, function(err, client, done) {
      if(err) { return console.error('error fetching client from pool', err); }
      client.query(qry, [id], function(err, result) {
        done();
        if(err) { return console.error('error running query', err); }
        console.log(res.files)
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

      var data = _.pick(req.body, 'type')
        , uploadPath = path.normalize(cfg.data + '/uploads')
        , file = req.files.file;

        console.log(file.name); //original name (ie: sunset.png)
        console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
    console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)

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
      + ") VALUES ($1, NOW(), NOW())"
      + " RETURNING id";

    pg.connect(conString, function(err, client, done) {
      if(err) { return console.error('error fetching client from pool', err); }
      client.query(qry, [id], function(err, result) {
        done();
        if(err) { return console.error('error running query', err); }
  
        res.json(result.rows[0].id);
      });
    });

  }, clock_out : function(req, res){

    var session  = req.params.session;
    var personal = req.body.personal;
    var report   = req.body.report;

    var qry = 
         "UPDATE sessions"
      + " SET clock_out=NOW()"
      +   ", personal_time=$1"
      +   ", report=$2"
      +   ", updated_at=Now()"
      + " WHERE id=$3";

    pg.connect(conString, function(err, client, done) {
      if(err) { return console.error('error fetching client from pool', err); }
      client.query(qry, [personal, report, session], function(err, result) {
        done();
        if(err) { return console.error('error running query', err); }
        res.json(Date.now());
      });
    });
  }
}
var pg = require('pg');
var conString = require('../../config/db.js');
var fs = require('fs-extra');

module.exports = {
  
  create : function(req, res) {

    checkEmail(req.body.email);

    var form = [
        req.session.user.business
      , req.body.location
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

    form = sanitizeForm(form);

    var qry = 
        "INSERT INTO members ("
      +    " business_id"
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
      + " ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW())"
      + " RETURNING id";

    var client = new pg.Client(conString);

    pg.connect(conString, function(err, client, done) {
      if(err) { return console.error('error fetching client from pool', err); }
      client.query(qry, form, function(err, result) {
        done();
        if(err) { return console.error('error running query', err); }
        res.json(result.rows[0].id);
      });
    });

  }, show : function(req, res){

    var id = req.params.id;
    var qry = 
        "SELECT members.id"
        + ", members.location_id"
        + ", members.name"
        + ", members.picture"
        + ", members.title"
        + ", members.email"
        + ", members.password"
        + ", members.start_date"
        + ", members.status"
        + ", members.note"
        + ", members.team"
        + ", members2.name AS supervisor"
        + ", members.type"
        + ", members.is_logged"
      + " FROM members"
      + " LEFT JOIN members AS members2 ON members2.id = members.supervisor_id"
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

  }, update : function(req, res) {

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
      , req.params.id
    ]

    form = sanitizeForm(form);

    var qry = 
         "UPDATE members"
      + " SET location_id=$1"
      +   ", name = $2"
      +   ", title = $3"
      +   ", email = $4"
      +   ", password = $5"
      +   ", start_date = $6"
      +   ", status = $7"
      +   ", note = $8"
      +   ", team = $9"
      +   ", supervisor_id = $10"
      +   ", type = $11"
      +   ", updated_at = NOW()"
      + " WHERE id = $12";

    var client = new pg.Client(conString);

    pg.connect(conString, function(err, client, done) {
      if(err) { return console.error('error fetching client from pool', err); }
      client.query(qry, form, function(err, result) {
        done();
        if(err) { return console.error('error running query', err, qry); }
        res.status(200).end();
      });
    });
  }, upload : function(req, res){

    var id = req.params.id;
    var biz_id = req.session.user.business;
    var pic_file = req.files.file; 
    var pic_name = 'profile_' + Date.now() + '.jpg';

    var qry1 = 
        'SELECT members.picture' 
      + ' FROM members'
      + ' WHERE members.id = $1'

    var qry2 = 
        'UPDATE members'
      + ' SET picture = $1' 
      + ' WHERE id = $2';

    //Connect to database
    pg.connect(conString, function(err, client, done) {
      if(err) { return console.error('error fetching client from pool', err); }
      //check if member has old pic
      client.query(qry1, [id], function(err, result) {
        done();
        if(err) { return console.error('error running query', err, qry1); }
        old_pic = result.rows[0].picture;
        //add new img

        //first the temp file must be read
        fs.readFile(pic_file.path, function(err, data){
          //where the upload will be saved along with what it will be named
          var path = __dirname + "/../../public/img/profile_pic/" + biz_id + "/" + pic_name;
          
          fs.writeFile(path, data, function(err){ //writes the temp file to upload location/name
            fs.unlinkSync(pic_file.path); //deletes temp file
            if(err) {
              console.log(err);
            } else {
              var client = new pg.Client(conString);

              //update member with new pic
              pg.connect(conString, function(err, client, done) {
                if(err) { return console.error('error fetching client from pool', err); }
                client.query(qry2, [pic_name, id], function(err, result) {
                  done();
                  if(err) { return console.error('error running query', err, qry2); }
                });
              });

              if (old_pic !== null ){
                fs.unlinkSync(__dirname + "/../../public/img/profile_pic/" + biz_id + "/" + old_pic);
              }

            }
          });
        });

      res.status(200);
  
      });
    });

  }, history : function(req, res){

    var id = req.params.id;
    var from = req.body.from;
    var to = req.body.to;

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
      + " WHERE members.id = $1";

      if ( from == 'this_week' || from == 'this_month' || from == 'last_week' || from == 'last_month') {

        var from_sunday = new Date().getDay();
        var day_in_month = new Date().getDate();
        var year = new Date().getFullYear();
        var month = new Date().getMonth();

        switch (from){
          case 'this_week'  :
            qry += " AND sessions.clock_in >= CURRENT_DATE - interval '" + from_sunday + " day'";
            break;
          case 'this_month' : 
            qry += " AND sessions.clock_in >= CURRENT_DATE - interval '" + day_in_month + " day'";
            break;
          case 'last_week'  : 
            qry += " AND sessions.clock_in <= CURRENT_DATE - interval '" + from_sunday + " day'";
            qry += " AND sessions.clock_in > CURRENT_DATE - interval '" + (from_sunday+7) + " day'";
            break;
          case 'last_month' : 
            qry += " AND sessions.clock_in <= CURRENT_DATE - interval '" + day_in_month + " day'";
            qry += " AND sessions.clock_in > '" + year + "-" + month + "-01'"
            break;
        }
      } else if( from !== 'all' ) {
        qry += " AND sessions.clock_in >= '" + from + "' AND sessions.clock_in <= '" + to + "'";
      }

    var client = new pg.Client(conString);
    
    client.connect(function(err) {
      if(err) { return console.error('could not connect dude, check stuff!', err); }
      client.query(qry, [id], function(err, data) {
        if(err) { return console.error('error running history_table', err); }
        //replace billed with the previous info
        for (var i=0; i<data.rows.length; i++){
          if (data.rows[i].clock_out > data.rows[i].clock_in) {
            var hours = (data.rows[i].clock_out - data.rows[i].clock_in)/(3600*1000);
            hours = hours.toFixed(2);
            data.rows[i].billed = hours;
          } else{
            data.rows[i].billed = '0.00';
          }
        }

        res.json(data.rows);
        client.end();
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
      + " WHERE id = $1"

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
      +   ", report = $2"
      +   ", updated_at=Now()"
      + " WHERE id = $3";

    var qry2 = 
        "UPDATE members"
      + " SET is_logged=FALSE"
      + " WHERE id = $1"

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

function checkEmail(email){
  if (!email.match(/[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/)){
    return res.json({error: "Email is invalid."}).status(400).end();
  };
}

function sanitizeForm(array){
  for (var i = 0; i < array.length; i++){
    array[i] = String(array[i]).replace(/<script\b[^>]*>(.*?)<\/script>/i, '').trim();
  }
  return array;
}
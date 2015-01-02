var pg = require('pg');
var fs = require('fs-extra');
var conString = require('./db_config.js');
var regex = require('../functions/regex_functions.js');
var form_tools = require('../functions/form_functions.js');

module.exports = {
  
  create : function(req, res) {
    var form = req.body;

    if(  !form.name 
      || !form.email 
      || !form.password 
      || !form.confirm
      || !form.status 
      || !form.supervisor 
      || !form.title 
      || !form.location 
      || !form.start_date
    ) {
      res.status(400).json('The form is missing required information.');
    } else {

      var user = [
           req.session.user.business 
        ,  form.name
        ,  form.email
        ,  form.title
        ,  form.supervisor
        , (form.team == undefined ? '' : form.team)
        ,  form.location
        ,  form.status
        , (form.admin == true ? 'admin' : 'employee')
        , (form.note == undefined ? '' : form.note)
        ,  form.start_date
        ,  form.password
        ,  form.confirm
      ];

      //remove any script tags
      user = form_tools.sanitizeForm(user);

      //check format for biz_id, location, and supervisor
      if (
             !regex.isNumber(user[0])       //biz_id
          || !regex.isString(user[1])       //name
          || !regex.isEmail(user[2])        //email
          || !regex.isAlphaNumeric(user[3]) //title
          || !regex.isNumber(user[4])       //supervisor_id
          || !regex.isAlphaNumeric(user[5]) //team
          || !regex.isNumber(user[6])       //location
          || !regex.isWord(user[7])         //status
          || !regex.isWord(user[8])         //admin
          || !regex.isAlphaNumeric(user[9]) //note
          || !regex.isDateTime(user[10])    //start_date
          || !regex.isPassword(user[11])    //password
        ) 
      { 
        res.status(400).json('Information is in an incorrect format.');
      } else if (user[11] !== user[12]) { //password matches confirm
        res.status(400).json('Password and confirmation do not match.');
      } else {
        user.splice(12,1);
        var qry = 
                  "INSERT INTO members ("
                +    " business_id"
                +   ", name"
                +   ", email"
                +   ", title"
                +   ", supervisor_id"
                +   ", team"
                +   ", location_id"
                +   ", status"
                +   ", type"
                +   ", note"
                +   ", start_date"
                +   ", password"
                +   ", created_at"
                + " ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW())"
                + " RETURNING id";

        var client = new pg.Client(conString);

        pg.connect(conString, function(err, client, done) {
          if(err) { return console.error('error fetching client from pool', err); }
          client.query(qry, user, function(err, result) {
            done();
            if(err) { return console.error('error running query', err); }
            res.json(result.rows[0].id);
          });
        });
      }
    }
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
              + ", members.supervisor_id"
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

  }, update_admin : function(req, res){

    var form = req.body
    var id = req.session.user.id;
    var password = true;

    if(  !form.name || !form.email ){
      res.status(400).json('The form is missing required information.');      
    } else {
      var user = [
          id
        , form.name
        , form.email
        , (form.password === undefined ? '' : form.password)
        , (form.confirm === undefined ? '' : form.confirm)
      ];

      user = form_tools.sanitizeForm(user);

      if (user[3] === '' && user[4] === ''){
        password = false;
      }

      if (
             !regex.isNumber(user[0])       //user_id
          || !regex.isString(user[1])       //name
          || !regex.isEmail(user[2])        //email
          || (password === true && !regex.isPassword(user[3]))   //password
          || (password === true && !regex.isPassword(user[4]))   //confirm
        ) 
      { 
        res.status(400).json('Information is in an incorrect format.');
      } else if (password === true && user[3] !== user[4]) {    //password matches confirm
        res.status(400).json('password does not match confirmation.')
      } else {

        password == false ? user.splice(3,2) : user.splice(4,1);
        var qry = 
                   "UPDATE members"
                + " SET name = $2"
                +   ", email = $3"
                +   ", updated_at = NOW()";
        if (password){
          qry   +=  ", password = $4";
        } 
          qry   +=  " WHERE id = $1";
    
        var client = new pg.Client(conString);

        pg.connect(conString, function(err, client, done) {
          if(err) { return console.error('error fetching client from pool', err); }
          client.query(qry, user, function(err, result) {
            done();
            if(err) { return console.error('error running query', err, qry); }
            res.json('User has been updated successfully').end();
          });
        });
      }
    }
  }, update : function(req, res) {

    var form = req.body;
    var password = true;

    if(  !form.name 
      || !form.email 
      || !form.status 
      || !form.supervisor 
      || !form.title 
      || !form.location 
      || !form.start_date
    ) {
      res.status(400).json('The form is missing required information.');
    } else {

      var user = [
           req.params.id
        ,  form.supervisor
        ,  form.location
        ,  form.name
        ,  form.email
        ,  form.status
        ,  form.start_date
        ,  form.title
        , (form.note === undefined ? '' : form.note)
        , (form.team === undefined ? '' : form.team)
        , (form.admin === true ? 'admin' : 'employee')
        , (form.password === undefined ? '' : form.password)
        , (form.confirm === undefined ? '' : form.confirm)
      ];

      //remove any script tags
      user = form_tools.sanitizeForm(user);

      if (form.password === undefined || form.confirm === undefined ){
        user.splice(11,2);
        password = false;
      }

      if (
             !regex.isNumber(user[0])       //user_id
          || !regex.isNumber(user[1])       //supervisor_id
          || !regex.isNumber(user[2])       //location
          || !regex.isString(user[3])       //name
          || !regex.isEmail(user[4])        //email
          || !regex.isWord(user[5])         //status
          || !regex.isDateTime(user[6])     //start_date
          || !regex.isAlphaNumeric(user[7]) //title
          || !regex.isAlphaNumeric(user[8]) //note
          || !regex.isAlphaNumeric(user[9]) //team
          || !regex.isWord(user[10])        //admin
          || (password == true && !regex.isPassword(user[11]))   //password
          || (password == true && !regex.isPassword(user[12]))   //confirm
        ) 
      { 
        res.status(400).json('Information is in an incorrect format.');
      } else if (password === true && user[11] !== user[12]) {    //password matches confirm
        res.status(400).json('password does not match confirmation.')
      } else {

        user.splice(12,1);
        var qry = 
                   "UPDATE members"
                + " SET supervisor_id = $2"
                +   ", location_id = $3"
                +   ", name = $4"
                +   ", email = $5"
                +   ", status = $6"
                +   ", start_date = $7"
                +   ", title = $8"
                +   ", note = $9"
                +   ", team = $10"
                +   ", type = $11";
                +   ", updated_at = NOW()";
        if (password){
          qry   +=  ", password = $12";
        } 
          qry   +=  " WHERE id = $1";

        var client = new pg.Client(conString);

        pg.connect(conString, function(err, client, done) {
          if(err) { return console.error('error fetching client from pool', err); }
          client.query(qry, user, function(err, result) {
            done();
            if(err) { return console.error('error running query', err, qry); }
            res.status(200).end();
          });
        });
      }
    }
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

  }, get_list_members : function(req, res) {

    var biz_id = req.session.user.business;

    var qry = 
        "SELECT members.name"
        + ", locations.name as location"
      + " FROM members "
      + " LEFT JOIN locations ON members.location_id = locations.id "
      + " WHERE members.business_id = $1"
      + " AND members.type = 'employee'";
    
    var client = new pg.Client(conString);

    client.connect(function(err) {
      if(err) { return console.error('could not connect to postgres', err); }
      client.query(qry, [biz_id], function(err, data) {
        if(err) { return console.error('error running query', err); }
        res.json(data.rows);
        client.end();
      });
    });

  }, get_list_supervisors : function(req, res) {

    var biz_id = req.session.user.business;
    
    var qry = 
        "SELECT id"
        + ", name"
      + " FROM members"
      + " WHERE members.type = 'admin'"
      + " OR members.type = 'owner'"
      + " AND business_id = $1";

    var client = new pg.Client(conString);

    client.connect(function(err) {
      if(err) { return console.error('could not connect to postgres', err); }
      client.query(qry, [biz_id], function(err, data) {
        if(err) { return console.error('error running query', err); }
        res.json(data.rows);
        client.end();
      });
    });

  }
}
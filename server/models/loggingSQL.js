var pg = require('pg');
var conString = require('../../config/db.js');

module.exports = {

  check_ip : function(req, res){

    var user_ip = req.body.ip;
    var qry = 
      "SELECT ip_addresses"
    + " FROM businesses"
    + " WHERE id = 1";

    var client = new pg.Client(conString);

    pg.connect(conString, function(err, client, done) {
      if(err) { return console.error('error fetching client from pool', err); }
      client.query(qry, function(err, result) {
        done();
        if(err) { return console.error('error running query', err); }

        if (result.rows[0].ip_addresses != null) {
          var ip_array = result.rows[0].ip_addresses.split(',');

          for (var i = 0; i < ip_array.length; i++) {
            if (ip_array[i].trim() === user_ip){
              res.status(200).end();
            }
          };
        }
        res.status(401).end();
      });
    });

  }, login : function(req, res){

    var email = req.body.email;
    var password = req.body.password;

    var qry = 
      "SELECT members.type, members.id, members.business_id"
    + " FROM members"
    + " WHERE email = $1"
    + " AND password = $2";

    var client = new pg.Client(conString);
  
    client.connect(function(err) {
      if(err) { return console.error('could not connect to postgres', err); }
      client.query(qry, [email, password], function(err, data) {
        if(err) { return console.error('error running query', err); }
        
        result = data.rows[0];

        if (result == undefined){
          res.status(401).json(result).end();
        } else {
          req.session.user = {

            business : result.business_id
            ,     id : result.id
            ,  admin : (result.type == 'contractor' ? true : false ) 
          };
          res.json(req.session.user);
        }
        client.end();
      });
    });

  }, logout : function(req, res){

    req.session.user = {
      business : null
      ,     id : null
      ,  admin : false  
    }
    res.status(200).end();
  }
}
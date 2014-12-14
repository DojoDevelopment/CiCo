var pg = require('pg');
var conString = require('../../config/db.js');

module.exports = {

 info : function(req, res){
  
    var id = req.params.id;

    var qry = 
        "SELECT businesses.name"
      +   ", businesses.ip_addresses"
      + " FROM businesses"
      + " WHERE businesses.id = $1";

    var client = new pg.Client(conString);
  
    client.connect(function(err) {
      if(err) { return console.error('could not connect to postgres', err); }
      client.query(qry, [id], function(err, data) {
        if(err) { return console.error('error running query', err); }
        res.json(data.rows[0]);
        client.end();
      });
    });
  
  }, update : function(req,res){
  
    var id = req.session.user.id;
    var ip = req.body.ip;
    var name = req.body.name;

    var qry = 
      "UPDATE businesses "
    + "SET name=$1 "
    +   ", ip_addresses=$2 "
    + "WHERE id=$3";

    var client = new pg.Client(conString);
console.log('id', id);
console.log('ip', ip);
console.log('name', name);
    client.connect(function(err) {
      if(err) { return console.error('could not connect to postgres', err); }
      client.query(qry, [name, ip, id], function(err, data) {
        if(err) { return console.error('error running query', err); }
        res.json(data.rows[0]);
        client.end();
      });
    });
  }
};
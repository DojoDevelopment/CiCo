var pg = require('pg');
var conString = require('../../config/db.js');
module.exports = {

  get_list_locations : function(req, res) {

    var biz_id = req.session.user.business;

    var qry = 
        "SELECT locations.id"
        + ", locations.name"
      + " FROM locations"
      + " LEFT JOIN businesses ON locations.business_id = businesses.id"
      + " WHERE businesses.id = $1"

    var client = new pg.Client(conString);

    client.connect(function(err) {
      if(err) { return console.error('could not connect to postgres', err); }
      client.query(qry, [biz_id], function(err, data) {
        if(err) { return console.error('error running query', err); }
        res.json(data.rows);
        client.end();
      });
    });

  }, get_list_locations_used : function(req, res) {

    var biz_id = req.session.user.business;

    var qry = 
        "SELECT DISTINCT locations.name"
      + " FROM members"
      + " LEFT JOIN locations ON members.location_id = locations.id"
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
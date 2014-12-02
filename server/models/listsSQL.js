
var pg = require('pg');
var conString = require('../../config/db.js');



  get_list_locations : function(req, res) {

    var qry = 
        "SELECT locations.id"
        + ", locations.name"
      + " FROM locations"
      + " LEFT JOIN businesses ON locations.business_id = businesses.id"
      + " WHERE businesses.id = 1";
    
    connection.query(qry, function(err, data) {
      
      if (err) throw err;
      res.json(data);

    });

  }, get_list_locations_used : function(req, res) {

    var qry = 
        "SELECT DISTINCT locations.name"
      + " FROM members"
      + " LEFT JOIN locations ON members.location_id = locations.id"
      + " WHERE members.business_id = 1";

    var client = new pg.Client(conString);

    client.connect(function(err) {
      if(err) {
        return console.error('could not connect to postgres', err);
      }
      client.query(qry, function(err, data) {
        if(err) {
          return console.error('error running query', err);
        }
        console.log(data.rows);
        res.json(data);

        client.end();
      });
    });

  }, get_list_members : function(req, res) {

    var qry = 
        "SELECT members.name"
        + ", locations.name as location"
      + " FROM members "
      + " LEFT JOIN locations ON members.location_id = locations.id "
      + " WHERE members.business_id = 1";
    
    connection.query(qry, function(err, data) {
      
      if (err) throw err;
      res.json(data);

    });

  }, get_list_supervisors : function(req, res) {
  
    var qry = 
        "SELECT members.id"
        + ", members.name"
      + " FROM members"
      + " WHERE members.type = 'contractor'"
      + " AND members.business_id = 1";

    connection.query(qry, [], function(err, data) {
      
      if (err) throw err;
      res.json(data);

    });

  }
}
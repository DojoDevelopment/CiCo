var pg = require('pg');
var conString = require('../../config/db.js');

module.exports = {

	ip_login : function(req, res){

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

        id_string = result.rows[0].ip_addresses;
        ip_array = id_string.split(',');
        var match = false; 

        for (var i = ip_array.length - 1; i >= 0; i--) {

        	if (ip_array[i].trim() === user_ip){
        		req.session.login = true;
        		req.session.admin = false;
        		match = true;
        	}
        };

        res.status((match === true ? 200 : 401)).end();
      });
    });
	}, login : function(req, res){

		var email = req.body.email;
		var password = req.body.password;

		var qry = 
			"SELECT members.type"
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
        	res.status(401).end();
        } else {
      		req.session.login = true;
        	req.session.admin = (result.type == 'contractor' ? true : false );
        	
        	res.json({link : (req.session.admin == true ? '../#/admin/dashboard' : '../#/dashboard' )});
        }
        client.end();
      });
    });
	}
}
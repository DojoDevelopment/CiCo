var pg = require('pg');
var conString = require('../../config/db.js');

module.exports = {

	ip_login : function(req, res){

		console.log ("in ip_login and this is the user_ip: ", req.body.ip);

        var user_ip = req.body.ip;

		
        // this is the query, businnes id is harcoded as 1, 
        // we only have that one business
        // in the future we can just grab all ips in the db and
        // set the session to the corresponding business 
        var qry = 
			"SELECT ip_addresses"
		+ " FROM businesses"
		+ " WHERE id = 1";

        console.log('gonna query the db with this query: ',qry);

    var client = new pg.Client(conString);

    pg.connect(conString, function(err, client, done) {
      if(err) { return console.error('error fetching client from pool', err); }
      client.query(qry, function(err, result) {
        done();
        if(err) { return console.error('error running query', err); }

        console.log("result from the query: ",result);
        
        id_string = result.rows[0].ip_addresses;

        console.log("the id_string is: ",id_string);
        
        if (id_string) {ip_array = id_string.split(',');}
        
        console.log("and that id_string splitted and stored in ip_array is: ",ip_array);

        var match = true; 

        for (var i = ip_array.length - 1; i >= 0; i--) {

        	if (ip_array[i].trim() === user_ip){
        		req.session.login = true;
        		req.session.admin = false;
        		match = true;
        	}
            //the ip_login works fine but I add the line below to test email login
            //match = false;
        };

        res.status((match === true ? 200 : 401)).end();
      });
    });
	}, login : function(req, res){

		var email = req.body.email;
		var password = req.body.password;

        console.log("user authentication data: ",email,password)

		var qry = 
			"SELECT members.type"
		+ " FROM members"
		+ " WHERE email = $1"
		+ " AND password = $2";

        console.log("execute this query to find a member with that user and password: ", qry);

    var client = new pg.Client(conString);
  
    client.connect(function(err) {
      if(err) { return console.error('could not connect to postgres', err); }
      client.query(qry, [email, password], function(err, data) {
        if(err) { return console.error('error running query', err); }

        console.log("this is what i get with that query: ", data);

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
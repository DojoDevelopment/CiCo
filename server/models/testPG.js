var pg = require('pg');
var conString = require('../../config/db.js');

module.exports = {

	test : function(req, res){
  
		var client = new pg.Client(conString);

		client.connect(function(err) {
			if(err) {
			  return console.error('could not connect to postgres', err);
			}
			client.query('SELECT * FROM "locations"', function(err, data) {
			  if(err) {
			    return console.error('error running query', err);
			  }
		 	 	console.log(data.rows[0].theTime);
      	res.json(data);

			  client.end();
			});
		});
	}
}
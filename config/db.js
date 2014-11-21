var db = require('mysql');


//pc
var connection = db.createConnection({
			        host : 'localhost',
			        user : 'root',
	        password : '',
					 database: 'cd_login',
 multipleStatements: true
});

//mac
// var connection = db.createConnection({
//              host : 'localhost',
//              user : 'root',
//          password : 'root',
//          database : 'cd_login',
// multipleStatements: true,
//              port : 8889
// });

module.exports = db;
module.exports = connection;
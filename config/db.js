
// sever:localhost
// database: cico
// port: 5432
// username: postgres
// password: password
var conString = "postgres://postgres:password@localhost/cico";
module.exports = conString;

//var db = require('mysql');

//pc
// var connection = db.createConnection({
//               host : 'localhost',
//               user : 'root',
//           password : '',
//            database: 'cd_login',
// });

//mac
// var connection = db.createConnection({
//              host : 'localhost',
//              user : 'root',
//          password : 'root',
//          database : 'cd_login',
//              port : 8889
// });

//module.exports = db;
//module.exports = connection;
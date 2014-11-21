var db = require('mysql');

<<<<<<< HEAD
//pc
// var connection = db.createConnection({
// 			        host : 'localhost',
// 			        user : 'root',
// 	        password : '',
// 					 database: 'cd_login',
//  multipleStatements: true
=======

//pc

// var connection = db.createConnection({
//         host : 'localhost',
//         user : 'root',
//         password : '',
//         database: 'cd_login',

//        //pc
//         multipleStatements: true
>>>>>>> 3088c86de226f67752249cebd739a8d1030f83b5
// });


//mac
var connection = db.createConnection({
             host : 'localhost',
             user : 'root',
         password : 'root',
         database : 'cd_login',
multipleStatements: true,
             port : 8889
});

module.exports = db;
module.exports = connection;






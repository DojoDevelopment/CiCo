// this does stuff with data and defines the schema
// which is then used to put stuff into the db and the queries
// are done in the controller

//set up mysql connection
// var mysql = require('mysql')
// var connection = mysql.createConnection({
//     host : 'localhost',
//     user : 'root',
//     password : 'root',
//     port: 8889
// })
// connection.connect(function(err){
// console.log(err); // if we get null, everything is ok!
//     //connected! (unless 'err' is set)
// })
// connection.query('SELECT * FROM users_courses.courses', function (err, rows, fields) {
//     if (err) throw err;
//     console.log('The name of the course is: ', rows[0].name, " and a nice description is: ", rows[0].description);
//     console.log('and the rest of the courses with descriptions are ', rows)
// });
// connection.end();
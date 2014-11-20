
var db = require('mysql');
var connection = db.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'root',
        port: 8889,
        database : 'cd_login',
        multipleStatements: true
});

module.exports = db;
module.exports = connection;






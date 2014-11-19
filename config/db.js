
var db = require('mysql');
var connection = db.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'root',
        port: 8889
});

module.exports = db;
module.exports = connection;






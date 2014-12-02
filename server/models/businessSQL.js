var connection = require('../../config/db.js')
module.exports = {

 info : function(req, res){
  
    var id = req.params.id;
    
    //old mysql query
    // var qry = 
    //     "SELECT businesses.name"
    //   +   ", businesses.ip_addresses"
    //   + " FROM businesses"
    //   + " WHERE businesses.id = ?";

    //postgres queries
    var qry = "SELECT name, ip_addresses"
            +"FROM businesses"
            +"WHERE id = ?;"
    
    connection.query(qry, id, function(err, data) { 

      if (err) throw err;
      res.json(data[0]);

    }); 
  
  }, update : function(req,res){
  
    var id = req.body.biz;
    var ip = req.body.ip;
    var name = req.body.name;

    var qry = 
      "UPDATE businesses "
    + "SET name=? "
    +   ", ip_addresses=? "
    + "WHERE id=?";

    connection.query(qry, [name,ip,id], function(err,data){
      if (err) throw err;
      res.status(200).end();
    });
  }
};
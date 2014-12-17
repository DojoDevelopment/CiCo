var pg = require('pg');
var conString = require('../../config/db.js');
var fs = require('fs-extra');
//use multer, important: multer will not process any form which is not multipart/form-data

module.exports = {
  upload : function(req, res){

	res.end();
		var file = req.files.file;  //file location within req
		//first the temp file must be read
		fs.readFile(file.path, function(err, data){
			//where the upload will be saved along with what it will be named
			var path = __dirname + "/../public/img/profile_pic/" + file.originalname;
			//writes the temp file to upload location/name
			fs.writeFile(path, data, function(err){
				//deletes temp file
				fs.unlinkSync(file.path);
				if(err) {
		      console.log(err);
		    } else {
		      console.log("The file was saved!");
		    }
		  });
		});

  	if(done==true){
	    res.status(200);
  	}
  } 
};
//dependencies



//this module manages the file upload and storage 
module.exports = (function(){
	return {
		uploadFile: function(req,res){
			console.log('this is req.body: ',req.body);
			console.log('this is req.dat: ', req.data);

		}
	};
}());
//our routes config file will call methods from this file
//this module exports an inmediate function that 
//which returns an object with the name of the method 
//as the "key" and the method to execute

module.exports = (function() {
	return{
		index: function(req,res) {res.render('index')},
		dashboard: function(req,res) {res.render('dashboard')},
		history: function(req,res) {res.render ('history')},
		userinput: function(req,res) {
			console.log(req.body)
			res.render('display', {name: req.body.name})
		}
	} 
}());
//our routes config file will call methods from this file
//this module exports an inmediate function that 
//which returns an object with the name of the method 
//as the "key" and the method to execute

module.exports = (function() {
	return{
		dashboard: function(req,res) {res.render('admins/dashboard', {variable_from_controller: "this comes from controller"})},
		history: function(req,res) {res.render ('admins/history')},
		userinput: function(req,res) {
			console.log(req.body)
			res.render('display', {name: req.body.name})
		}
	} 
}());
var connection = require('../../config/db.js');

module.exports = (function() {

	return { index: function(req, res) {res.render('index')} };

}());
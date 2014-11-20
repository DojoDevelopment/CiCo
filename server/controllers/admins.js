//our routes config file will call methods from this file
//this module exports an inmediate function that 
//which returns an object with the name of the method 
//as the "key" and the method to execute

//var test = require('../models/sqltest.js');
var connection = require('../../config/db.js');
var model = require('../models/sqltest.js');
module.exports = (function() {
  return{
    dashboard: function(req,res) {
      
      model.admin_dash(function(err, data){ 
        res.render('admins/dashboard', {list: data[0], table: data[1]});
      });

//      console.log(sample[0]);
    }, history: function(req,res) {
      model.admin_dash(function(err, data){ 
        res.render('admins/history', {list: data[0], 
                                   members: data[1], 
                                     table: data[2]
                                   });
      });    
    }, setting: function(req,res) {

      res.render ('admins/setting')

    }, new_user: function(req,res) {

      res.render ('admins/new_user')

    }, userinput: function(req,res) {
      //console.log(req.body)
      res.render('display', {name: req.body.name})
    }
  } 
}());
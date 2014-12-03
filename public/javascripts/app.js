var app = angular.module('myApp', ['ngRoute', 'routeStyles', 'ngSanitize', 'ngCsv', 'angularFileUpload']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		
		templateUrl: 'partials/index.html',
		css: 'stylesheets/login.css'

	}).when('/dashboard', {
	
		templateUrl: 'partials/dashboard.html',
		controller:  'user_dashboard'
	
	}).when('/history', {
	
		templateUrl: 'partials/history.html',
		controller:  'history'
	
	}).when('/admin/dashboard', {
	
		templateUrl: 'partials/admin_dash.html',
		controller:  'admin_dashboard'
	
	}).when('/admin/history', {
	
		templateUrl: 'partials/admin_hist.html',
		controller:  'history'
  
  }).when('/admin/add_employee', {

    templateUrl: 'partials/add_employee.html',
    controller:  'employee'

  }).when('/clockout/:id', {
  
    templateUrl: 'partials/clockout.html',
    controller:  'clockout'
   
  }).when('/admin/settings', {
  
    templateUrl: 'partials/admin_settings.html',
    controller:  'admin_dashboard'

  }).when('/admin/show/:id', {
  
    templateUrl: 'partials/show_employee.html', 
    controller:  'employeeInfo'
   
  }).when('/admin/edit/:id', {

    templateUrl: 'partials/add_employee.html',
    controller: 'employeeInfo'
   
  }).otherwise({

		redirectTo: '/',

	});
});



var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', { 
	
		templateUrl: 'partials/index.html',

	}).when('/dashboard', {
	
		templateUrl: 'partials/dashboard.html',
		controller: 'dashboard'
	
	}).when('/history', {
	
		templateUrl: 'partials/history.html',
		controller: 'hist'
	
	}).when('/admin/dashboard', {
	
		templateUrl: 'partials/dashboard.html',
		controller: 'dashboard'
	
	}).when('/admin/history', {
	
		templateUrl: 'partials/history.html',
		controller: 'admin_hist'
	
	}).otherwise({
	
		redirectTo: '/',
	
	});
});
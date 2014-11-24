var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', { 
	
		templateUrl: 'partials/index.html',

	}).when('/dashboard', {
	
		templateUrl: 'partials/dashboard.html',
		controller: 'DashboardController'
	
	}).when('/history', {
	
		templateUrl: 'partials/history.html',
		controller: 'HistoryController'
	
	}).when('/admin/dashboard', {
	
		templateUrl: 'partials/admin_dash.html',
		controller: 'dashboard'
	
	}).when('/admin/history', {
	
		templateUrl: 'partials/admin_hist.html',
		controller: 'admin_hist'
	
	}).otherwise({
	
		redirectTo: '/',
	
	});
});
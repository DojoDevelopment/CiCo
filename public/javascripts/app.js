var app = angular.module('myApp', ['ngRoute', 'routeStyles']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', { 
	
		templateUrl: 'partials/index.html',
		css: 'stylesheets/login.css'

	}).when('/dashboard', {
	
		templateUrl: 'partials/dashboard.html',
		controller: 'dashboard'
	
	}).when('/history', {
	
		templateUrl: 'partials/history.html',
		controller: 'history'
	
	}).when('/admin/dashboard', {
	
		templateUrl: 'partials/admin_dash.html',
		controller: 'dashboard'
	
	}).when('/admin/history', {
	
		templateUrl: 'partials/admin_hist.html',
		controller: 'history'
	
	}).otherwise({
	
		redirectTo: '/',
	});
});
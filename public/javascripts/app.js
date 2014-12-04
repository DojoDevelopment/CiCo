var app = angular.module('myApp', ['ngRoute', 'routeStyles', 'ngSanitize', 'ngCsv', 'angularFileUpload']);

app.config(function($routeProvider){
  $routeProvider
  .when('/', {

    templateUrl: 'partials/index.html',
    controller:  'LoginController',
    css: 'stylesheets/login.css'

  }).when('/main', {

    templateUrl: 'partials/main.html',
    controller: 'EmployeeController'

  }).when('/admin', {

    templateUrl: 'partials/admin.html',
    controller: 'AdminController'
  
  }).when('/admin/add_employee', {

    templateUrl: 'partials/add_employee.html',
    controller:  'employee'

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
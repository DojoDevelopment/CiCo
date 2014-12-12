var app = angular.module('myApp', ['ngRoute', 'routeStyles', 'ngSanitize', 'ngCsv', 'anguFixedHeaderTable']);

app.config(function($routeProvider){

  $routeProvider
  //index page for non logged in users
  .when('/', {

    templateUrl: 'partials/index.html',
    controller:  'LoginController',
    css: 'stylesheets/login.css',
    data: {
      login : false,
      admin : false
    }

  //index page for businesses who have a matching ip
  }).when('/main', {

    templateUrl: 'partials/main.html',
    controller: 'MainController',
    data: {
      login : false,
      admin : false
    }

  //user main page
  }).when('/user/:id', {

    templateUrl: 'partials/user.html',
    controller: 'UserController',
    data: {
      login : true,
      admin : false
    }

  //admin main page
  }).when('/admin', {

    templateUrl: 'partials/admin.html',
    controller: 'AdminController',
    data: {
      login : true,
      admin : true
    }

  //add employee page  
  }).when('/admin/add_employee', {

    templateUrl: 'partials/add_employee.html',
    controller:  'EmployeeController',
    data: {
      login : true,
      admin : true
    }

  //admin show user informaiton page
  }).when('/admin/show/:id', {
  
    templateUrl: 'partials/show_employee.html', 
    controller:  'EmployeeInfoController',
    data: {
      login : true,
      admin : true
    }

  //admin edit user page
  }).when('/admin/edit/:id', {

    templateUrl: 'partials/add_employee.html',
    controller: 'EmployeeController',
     data: {
      login : true,
      admin : true
    }

  //route to root index
  }).otherwise({
    redirectTo: '/',
  });

})
.run(function ($rootScope, $location, AuthFactory) {

 $rootScope.$on('$routeChangeStart', function (event, next, current) {
    
    if (next && next.$$route && next.$$route.data) { 
      var login = next.$$route.data.login;
      var admin = next.$$route.data.admin;

      AuthFactory.factory_getSession(function(user){

        if (login && !user.login){
          $location.path('/');
        };

        if (admin && !user.admin){
          $location.path('/main');
        }
      });       
    } 
  })
});

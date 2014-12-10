var app = angular.module('myApp', ['ngRoute', 'routeStyles', 'ngSanitize', 'ngCsv', 'anguFixedHeaderTable']);

app.config(function($routeProvider){

  $routeProvider
  .when('/', {

    templateUrl: 'partials/index.html',
    controller:  'LoginController',
    css: 'stylesheets/login.css',
    data: {
      login : false,
      admin : false
    }

  }).when('/main', {

    templateUrl: 'partials/main.html',
    controller: 'EmployeeController',
    data: {
      login : true,
      admin : false
    }

  }).when('/admin/login', {

    templateUrl: 'partials/index.html',
    controller:  'AdminLoginController',
    css: 'stylesheets/login.css',
    data: {
      login : true,
      admin : false
    }

  }).when('/admin', {

    templateUrl: 'partials/admin.html',
    controller: 'AdminController',
    data: {
      login : true,
      admin : true
    }
  }).when('/admin/add_employee', {

    templateUrl: 'partials/add_employee.html',
    controller:  'employee',
    data: {
      login : true,
      admin : true
    }
  }).when('/admin/show/:id', {
  
    templateUrl: 'partials/show_employee.html', 
    controller:  'employeeInfo',
    data: {
      login : true,
      admin : true
    }

  }).when('/admin/edit/:id', {

    templateUrl: 'partials/add_employee.html',
    controller: 'employee',
     data: {
      login : true,
      admin : true
    }

  }).otherwise({

    redirectTo: '/',

  });

})

// .run(function ($rootScope, $location, AuthFactory) {

//  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    
//     if (next && next.$$route && next.$$route.data) { 
//       var login = next.$$route.data.login;
//       var admin = next.$$route.data.admin;

//       AuthFactory.getSession(function(user){

//         if (login && !user.login){
//           $location.path('/');
//         };

//         if (admin && !user.admin){
//           $location.path('/admin/login');
//         }
//       });       
//     } 
//   })

// });


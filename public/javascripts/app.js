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
    controller: 'LoginController',
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
  }).when('/admin/main/:id', {

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
.run(function ($rootScope, $location) {

 $rootScope.$on('$routeChangeStart', function (event, next, current) {

    var is_logged = next.$$route.data.login;
    var is_admin  = next.$$route.data.admin;

    if ($rootScope.user == null && $rootScope.business == null ) {
      if( next.templateUrl !== "partials/index.html") {
        $location.path('/');
      }
    } else if ((is_logged && $rootScope.user.id === null) || (is_admin && $rootScope.user.admin === false)) {
      $location.path('/');
    }
    
  });
});
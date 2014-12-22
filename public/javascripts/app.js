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

  //admin dashboard
  }).when('/dashboard', {

    templateUrl: 'partials/dashboard.html',
    controller: 'DashboardController',
    data: {
      login : true,
      admin : true
    }

  //admin history
  }).when('/history', {

    templateUrl: 'partials/history.html',
    controller: 'HistoryController',
    data: {
      login : true,
      admin : true
    }

  //add employee page  
  }).when('/add_employee', {

    templateUrl: 'partials/add-edit.html',
    controller:  'EmployeeController',
    data: {
      login : true,
      admin : true
    }

  //admin edit user page
  }).when('/edit/:id', {

    templateUrl: 'partials/add-edit.html',
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

    if (next.$$route.data){
      var req_login = next.$$route.data.login;
      var req_admin  = next.$$route.data.admin;

      if ($rootScope.user == null && $rootScope.business == null ) {
        if( next.templateUrl !== "partials/index.html") {
          $location.path('/');
        }
      } else if ( req_login && ($rootScope.user === undefined || $rootScope.user.id === undefined) 
              ||( req_admin && ($rootScope.user === undefined || $rootScope.user.admin === false))) {
        $location.path('/');
      }
    } else {
      $location.path('/');
    }

  });
});
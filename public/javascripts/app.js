var app = angular.module('myApp', ['ngRoute', 'routeStyles', 'ngSanitize', 'ngCsv']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', { 
	
		templateUrl: 'partials/index.html',
		css: 'stylesheets/login.css'

	}).when('/dashboard', {
	
		templateUrl: 'partials/dashboard.html',
		controller: 'user_dashboard'
	
	}).when('/history', {
	
		templateUrl: 'partials/history.html',
		controller: 'history'
	
	}).when('/admin/dashboard', {
	
		templateUrl: 'partials/admin_dash.html',
		controller: 'admin_dashboard'
	
	}).when('/admin/history', {
	
		templateUrl: 'partials/admin_hist.html',
		controller: 'history'
  
  }).when('/admin/settings', {

    templateUrl: 'partials/settings.html',
    controller: 'settings'

  }).when('/admin/new_employee', {

    templateUrl: 'partials/new_employee.html',
    controller: 'new_employee'

  }).when('/clockout', {
  
    templateUrl: 'partials/clockout.html'
   
<<<<<<< HEAD
	})
  .when('/settings', {
  
    templateUrl: 'partials/admin_settings.html'
   
  })
  .when('/edit', {
  
    templateUrl: 'partials/edit_employee.html'
   
  })
  .when('/add', {
  
    templateUrl: 'partials/add_employee.html'
   
  }).otherwise({
=======
	}).otherwise({
>>>>>>> 6dd1d3e8da19d2f85288125e46dc741c20976543

		redirectTo: '/',

	});
});
  

////################////
// CUSTOM MODAL DIRECTIVES //
////################////

//ADMIN DIRECTIVES//
app.directive('modalAdd', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: false, // allows for custom content
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    templateUrl: 'partials/modal.html', //modal content stored as partial
    controller: 'admin_dashboard'
  };
});

app.directive('modalSettings', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: false, // allows for custom content
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    templateUrl: 'partials/adminModal.html', //modal content stored as partial
    controller: 'admin_dashboard'
  };
});

//EMPLOYEE DIRECTIVES//
app.directive('modalClockout', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: false, // allows for custom content
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    templateUrl: 'partials/clockout_modal.html', //modal content stored as partial
    controller: 'user_dashboard'
  };
});

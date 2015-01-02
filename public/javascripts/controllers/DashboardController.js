app.controller('DashboardController', function($scope, $location, $rootScope, TableFactory, LocationFactory, EmployeeFactory, BusinessFactory, LoginFactory) {

  LocationFactory.used_locations(function(data){ $scope.locations = data; });
  EmployeeFactory.members( function(data){ $scope.members = data; });

  $scope.biz_id = $rootScope.user.business;

  TableFactory.admin_dashboard(function(data){
    $scope.dashboard_table = data;
    $scope.order = 'name';
  });

  $scope.logout = function(){
    LoginFactory.logout();
  }
});
app.controller('DashboardController', function($scope, $location, $rootScope, TableFactory, ListFactory, BusinessFactory, LoginFactory) {

  ListFactory.used_locations(function(data){ $scope.locations = data; });
  ListFactory.members( function(data){ $scope.members = data; });

  $scope.biz_id = $rootScope.business.id;

  TableFactory.admin_dashboard(function(data){
    $scope.dashboard_table = data;
    $scope.order = 'name';
  });

  $scope.logout = function(){
    LoginFactory.logout();
  }
});
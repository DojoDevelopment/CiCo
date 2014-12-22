app.controller('DashboardController', function($scope, $location, $rootScope, TableFactory, ListFactory, BusinessFactory, LoginFactory) {

  ListFactory.factory_used_locations(function(data){ $scope.locations = data; });
  ListFactory.factory_members( function(data){ $scope.members = data; });

  $scope.biz_id = $rootScope.business.id;

  TableFactory.factory_admin_dashboard(function(data){
    $scope.dashboard_table = data;
    $scope.order = 'name';
  });

  $scope.modalShown = false;
  $scope.toggleModal = function() {
    BusinessFactory.factory_get_business_info($rootScope.business.id, function(data){ 
      $scope.business = data
      $scope.modalShown = !$scope.modalShown;
    });
  };

  $scope.updateSettings = function(){
    var newSettings = {
       name : $scope.business.name
      , ip  : $scope.business.ip_addresses
    };
    BusinessFactory.factory_update_business_info(newSettings, function(){
      $scope.modalShown = false;
    });
  }

  $scope.logout = function(){
    LoginFactory.logout();
  }
});
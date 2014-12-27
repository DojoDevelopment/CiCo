app.controller('DashboardController', function($scope, $location, $rootScope, TableFactory, ListFactory, BusinessFactory, LoginFactory) {

  ListFactory.used_locations(function(data){ $scope.locations = data; });
  ListFactory.members( function(data){ $scope.members = data; });

  $scope.biz_id = $rootScope.business.id;

  TableFactory.admin_dashboard(function(data){
    $scope.dashboard_table = data;
    $scope.order = 'name';
  });

  $scope.modalShown = false;
  $scope.toggleModal = function() {
    BusinessFactory.get_business_info($rootScope.business.id, function(data){ 
      $scope.business = data
      $scope.modalShown = !$scope.modalShown;
    });
  };

  $scope.updateSettings = function(){
    var newSettings = {
       name : $scope.business.name
      , ip  : $scope.business.ip_addresses
    };
    BusinessFactory.update_business_info(newSettings, function(){
      $scope.modalShown = false;
    });
  }

  $scope.logout = function(){
    LoginFactory.logout();
  }
});
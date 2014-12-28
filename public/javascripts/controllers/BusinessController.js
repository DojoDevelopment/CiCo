app.controller('BusinessController', function($scope, $rootScope, BusinessFactory) {

  BusinessFactory.get_business_info($rootScope.business.id, function(data){ 
    console.log(data);
    $scope.form = data
  });

  $scope.updateSettings = function(){
    var newSettings = {
       name : $scope.settignsForm.name
      , ip  : $scope.settignsForm.ip_addresses
    };
    BusinessFactory.update_business_info(newSettings, function(data){
      $scope.errorMSG = data;
    });
  }

  $scope.logout = function(){
    LoginFactory.logout();
  }

});
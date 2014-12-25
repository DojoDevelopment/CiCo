app.controller('LoginController', function($scope, $rootScope, LoginFactory, TableFactory) {

  LoginFactory.factory_check_ip();

  $scope.form = {
    email : 'mike@gmail.com',
    password : 'password'
  };

  if ($rootScope.business !== undefined ){
    $scope.biz_id = $rootScope.business.id;
    TableFactory.factory_general_employee_info(function(data){
      $scope.table = data;
      $scope.order = 'name';
    });
  }

  $scope.submitForm = function(isValid){
    if (isValid){ LoginFactory.login($scope.form); }
  };

  $scope.logout = function(){
    LoginFactory.logout();
  }

});
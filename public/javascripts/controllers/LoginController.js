app.controller('LoginController', function($scope, $rootScope, $location, LoginFactory, TableFactory) {

  LoginFactory.factory_get_ip(function(ip){ 
    LoginFactory.factory_check_ip({ip : ip});
  });

  $scope.credentials = {
    email : 'mike@gmail.com',
    password : 'password'
  };

  if ($rootScope.business !== null ){
    TableFactory.factory_general_employee_info(function(data){
      $scope.table = data;
    });
  }

  $scope.login = function(credentials){
    console.log('controller', credentials);
    LoginFactory.login(credentials);
  };

  $scope.logout = function(){
    LoginFactory.logout();
  }

});
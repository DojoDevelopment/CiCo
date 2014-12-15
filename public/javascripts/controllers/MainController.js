app.controller('MainController', function($scope, TableFactory, LoginFactory){

  LoginFactory.factory_get_ip(function(ip){ 
    LoginFactory.factory_check_ip({ip : ip});
  });

  $scope.credentials = {
    email : 'tony@gmail.com',
    password : 'password'
  };

  TableFactory.factory_general_employee_info(function(data){
    $scope.table = data;
  });

  $scope.login = function(credentials){
    LoginFactory.login(credentials);
  };

  $scope.logout = function(){
    LoginFactory.logout();
  }

});

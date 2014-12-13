app.controller('LoginController', function($scope, LoginFactory) {

  LoginFactory.factory_get_ip(function(ip){ 
    LoginFactory.factory_check_ip({ip : ip});
  });

  $scope.credentials = {
    email : 'tony@gmail.com',
    password : 'password'
  };

  $scope.login = function(credentials){
    LoginFactory.login(credentials);
  };

  $scope.logout = function(){
    LoginFactory.logout();
  }

});
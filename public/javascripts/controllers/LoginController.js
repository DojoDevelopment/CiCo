app.controller('LoginController', function($scope, $rootScope, $location, LoginFactory, TableFactory) {

  //delete before publishing
  $scope.loginForm = {
    email : 'mike@gmail.com',
    password : 'password'
  };
  
  $scope.serverError = null;
  $scope.match = true;
  $scope.pattern = {
      email : /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/
    , letters : /^[a-zA-Z\s]*$/
    , password : /^[a-zA-Z0-9_]{6,72}$/
    , string : /^[a-zA-Z\s'"()\[\]]*$/
  }; 

  if ($location.$$path !== "/register"){ 
    LoginFactory.check_ip();
  }

  if ($rootScope.business !== undefined && $rootScope.business !== null ){
    $scope.biz_id = $rootScope.business.id;
    TableFactory.general_employee_info(function(data){
      $scope.table = data;
      $scope.order = 'name';
    });
  }

  $scope.submitForm = function(isValid){
    if (isValid){
      if($location.$$path !== "/register"){
        LoginFactory.login($scope.form);
      } else {
        LoginFactory.register($scope.form, function(data){
          $scope.serverError = data;
        });
      }
    } 
  };

  $scope.logout = function(){
    LoginFactory.logout();
  }

});
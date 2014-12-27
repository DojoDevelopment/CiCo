//ADD / UPDATE EMPLOYEE
app.controller('EmployeeController', function($scope, $location, EmployeeFactory, ListFactory, LoginFactory) {

  ListFactory.supervisors(function(data){ $scope.supervisors = data; });
  ListFactory.all_locations(function(data){ $scope.locations = data; });

  $scope.error = null;
  $scope.match = true;
  $scope.update = ($location.path() == '/add_employee' ? false : true )  
  $scope.pattern = {
      email : /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/
    , letter : /^[a-zA-Z\s]*$/
    , password : /^[a-zA-Z0-9_]{6,72}$/
    , lettersNumbers : /^[a-zA-Z0-9\s]*$/
  }; 

  //check if page is to update or create new employee
  if ( $scope.update == false ){

    $scope.form  = { start_date : new Date() };

  } else {

    var userID = $location.path().split('/')[2];

    EmployeeFactory.get_employee(userID, function(data){

      $scope.form  = {
          name       : data.name
        , title      : data.title
        , team       : data.team
        , location   : data.location_id
        , supervisor : data.supervisor_id
        , status     : data.status
        , note       : data.note
        , start_date : new Date(data.start_date)
        , email      : data.email
        , admin      : (data.type == 'admin' ? true : false )
      };

    });
  }

  $scope.isMatch = function(){
    $scope.match = ($scope.form.password === $scope.form.confirm);
    $scope.employeeForm.confirm.$setValidity('match', ($scope.match == false ? false : true ));
  }

  $scope.submitForm = function(isValid){
    $scope.employeeForm.$submitted = true;
    if (isValid){ 
      if ($scope.update && $scope.match){

        var userID = $location.path().split('/')[2];
        EmployeeFactory.update_employee(userID, $scope.form, function(data){
          $scope.serverError = data;
        });
      } else if (!$scope.update){
        EmployeeFactory.create_employee($scope.form, function(data){
          $scope.serverError = data;
        });
      }
    }
  };

  $scope.logout = function(){
    LoginFactory.logout();
  }

});
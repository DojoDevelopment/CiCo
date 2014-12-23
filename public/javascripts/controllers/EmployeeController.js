//ADD / UPDATE EMPLOYEE
app.controller('EmployeeController', function($scope, $location, EmployeeFactory, ListFactory, LoginFactory) {

  ListFactory.factory_supervisors(function(data){ $scope.supervisors = data; });
  ListFactory.factory_all_locations(function(data){ $scope.locations = data; });

  $scope.update = ($location.path() == '/add_employee' ? false : true )  
  $scope.pattern = {
      email : /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/
    , letter : /^[a-zA-Z\s]*$/
    , password : /^[a-zA-Z0-9_]{6,72}$/
    , lettersNumbers : /^[a-zA-Z0-9\s]*$/
  }; 

  //check if page is to update or create new employee
  if ( $scope.update == false ){

    $scope.form  = {
      start_date : new Date()
    };
    $scope.match = ($scope.form.password === $scope.form.confirm);

  } else {

    var userID = $location.path().split('/')[2];

    EmployeeFactory.factory_get_employee(userID, function(data){
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
        , admin      : (data.type == 'employee' ? '' : 'true' )
      };
      $scope.match = ($scope.form.password === $scope.form.confirm);

    });
  }

  $scope.isMatch = function(){
    $scope.match = ($scope.form.password === $scope.form.confirm);
    $scope.employeeForm.confirm.$setValidity('match', ($scope.match == false ? false : true ));
  }

  $scope.submitForm = function(isValid){
    if (isValid){ 
      if (!$scope.update){
        var info = {
          name       : $scope.form.name
          , title      : $scope.form.title
          , team       : $scope.form.team
          , location   : $scope.form.location
          , supervisor : $scope.form.supervisor
          , status     : $scope.form.status
          , note       : $scope.form.note
          , pic        : $scope.form.imgFile
          , start_date : $scope.form.start_date
          , email      : $scope.form.email
          , password   : $scope.form.password
          , admin      : (document.getElementById('inputAdmin').checked == true ? 'contractor' : 'employee')
        }

        EmployeeFactory.factory_create_employee(info);
      } else {
        var userID = $location.path().split('/')[2];
        var info = {
            name       : $scope.form.name
          , title      : $scope.form.title
          , team       : $scope.form.team
          , location   : $scope.form.location
          , supervisor : $scope.form.supervisor
          , status     : $scope.form.status
          , note       : $scope.form.note
          , pic        : $scope.form.imgFile
          , start_date : $scope.form.start_date
          , email      : $scope.form.email
          , password   : $scope.form.password
          , admin      : (document.getElementById('inputAdmin').checked == true ? 'contractor' : 'employee')
        }

        EmployeeFactory.factory_update_employee(userID, info);
      }
    }
  };

  $scope.logout = function(){
    LoginFactory.logout();
  }

});
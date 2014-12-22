//ADD / UPDATE EMPLOYEE
app.controller('EmployeeController', function($scope, $location, EmployeeFactory, ListFactory, TableFactory, LoginFactory) {

  ListFactory.factory_supervisors(function(data){ $scope.supervisors = data; });
  ListFactory.factory_all_locations(function(data){ $scope.locations = data; });
  
  $scope.update = ($location.path() == '/add_employee' ? false : true )  

  //check if page is to update or create new employee
  if ( $scope.update == false ){

    $scope.user  = {
      start_date : new Date()
    };

  } else {

    var userID = $location.path().split('/')[2];

    EmployeeFactory.factory_get_employee(userID, function(data){
      $scope.user  = {
          name       : data.name
        , title      : data.title
        , team       : data.team
        , location   : data.location_id
        , supervisor : data.supervisor_id
        , status     : data.status
        , note       : data.note
        , start_date : new Date(data.start_date)
        , email      : data.email
        , password   : data.password
        , admin      : (data.type == 'employee' ? '' : 'true' )
      };
    });
  }

  $scope.submitForm = function(isValid){
    if (isValid){ 
      if (!$scope.update){
        var info = {
          name       : $scope.user.name
          , title      : $scope.user.title
          , team       : $scope.user.team
          , location   : $scope.user.location
          , supervisor : $scope.user.supervisor
          , status     : $scope.user.status
          , note       : $scope.user.note
          , pic        : $scope.user.imgFile
          , start_date : $scope.user.start_date
          , email      : $scope.user.email
          , password   : $scope.user.password
          , admin      : (document.getElementById('inputAdmin').checked == true ? 'contractor' : 'employee')
        }

        EmployeeFactory.factory_create_employee(info);
      } else {
        var userID = $location.path().split('/')[2];
        var info = {
            name       : $scope.user.name
          , title      : $scope.user.title
          , team       : $scope.user.team
          , location   : $scope.user.location
          , supervisor : $scope.user.supervisor
          , status     : $scope.user.status
          , note       : $scope.user.note
          , pic        : $scope.user.imgFile
          , start_date : $scope.user.start_date
          , email      : $scope.user.email
          , password   : $scope.user.password
          , admin      : (document.getElementById('inputAdmin').checked == true ? 'contractor' : 'employee')
        }

        EmployeeFactory.factory_update_employee(userID, info);
      }
    }

    $scope.isMatch = function(){
      return $scope.user.password === $scope.user.confirm;
    }
  };

  $scope.logout = function(){
    LoginFactory.logout();
  }

});
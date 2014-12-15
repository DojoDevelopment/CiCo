//ADD / UPDATE EMPLOYEE
app.controller('EmployeeController', function($scope, $location, EmployeeFactory, ListFactory, TableFactory, LoginFactory) {

  ListFactory.factory_supervisors(function(data){ $scope.supervisors = data; });
  ListFactory.factory_all_locations(function(data){ $scope.locations = data; });
  
  $scope.update = ($location.path() == '/admin/add_employee' ? false : true )  

  if ( $scope.update == false ){

    $scope.user  = {
        name       : ''
      , title      : ''
      , team       : ''
      , location   : ''
      , supervisor : ''
      , status     : ''
      , note       : ''
      , start_date : ''
      , email      : ''
      , password   : ''
      , admin      : ''
    };

  } else {

    //get id from url
    var userID = $location.path().split('/')[3];

    EmployeeFactory.factory_get_employee(userID, function(data){
      $scope.user  = {
          name       : data.name
        , title      : data.title
        , team       : data.team
        , location   : data.location_id
        , supervisor : data.supervisor_id
        , status     : data.status
        , note       : data.note
        , start_date : data.start_date.substring(0,10)
        , email      : data.email
        , password   : data.password
        , admin      : (data.type == 'employee' ? '' : 'true' )
      };

    });
  }
  
  $scope.add_employee = function(){
    console.log('in add employee function in controllers.js');

    //var admin = (document.getElementById('inputAdmin').checked == true ? 'contractor' : 'employee');


    var info = {
      name       : $scope.user.name
      , title      : $scope.user.title
      , team       : $scope.user.team
      , location   : $scope.user.location
      , supervisor : $scope.user.supervisor
      , status     : $scope.user.status
      , note       : $scope.user.note
      , pic        : $scope.user.pic
      , start_date : $scope.user.start_date
      , email      : $scope.user.email
      , password   : $scope.user.password
      , admin      : (document.getElementById('inputAdmin').checked == true ? 'contractor' : 'employee')
    }
    
    EmployeeFactory.factory_create_employee(info);
  }

  $scope.upload_file = function(){
    

    //var data = {file: $scope.user.pic};
    var data = {file: $scope.upload_file};

    console.log('in upload_file function in controllers.js, will send this data: ',data);

    EmployeeFactory.factory_upload_file(data);
  }

  $scope.update_employee = function(){
    //get id from url
    var userID = $location.path().split('/')[3];

    var info  = {
        name       : $scope.user.name
      , title      : $scope.user.title
      , team       : $scope.user.team
      , location   : $scope.user.location
      , supervisor : $scope.user.supervisor
      , status     : $scope.user.status
      , note       : $scope.user.note
      , start_date : $scope.user.start_date
      , email      : $scope.user.email
      , password   : $scope.user.password
      , admin      : (document.getElementById('inputAdmin').checked == true ? 'contractor' : 'employee')
    }

    EmployeeFactory.factory_update_employee(userID, info);
  }

  $scope.logout = function(){
    LoginFactory.logout();
  }

});
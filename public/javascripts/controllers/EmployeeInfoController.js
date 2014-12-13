//SHOW USER
app.controller('EmployeeInfoController', function($scope, $location, EmployeeFactory, ListFactory, TableFactory, LoginFactory){

  var userID = $location.path().split('/')[3];
  TableFactory.factory_user_history_table({id : userID, from: 'all', to : ''}, function(data){
    $scope.table = data;
    $scope.order = '-created_at';
  });

  EmployeeFactory.factory_get_employee(userID, function(data){
    $scope.user = {
        name       : data.name
      , title      : data.title
      , team       : data.team
      , supervisor : data.supervisor
      , status     : data.status
      , note       : data.note
      , start_date : data.start_date
      , email      : data.email
      , password   : data.password
    }
  });

  $scope.logout = function(){
    LoginFactory.logout();
  }
});
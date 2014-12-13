//USER 
app.controller('UserController', function($scope, $location, TableFactory, LoginFactory, ClockingFactory, EmployeeFactory ){

  var userID = $location.path().split('/')[2];

  TableFactory.factory_user_history_table(userID, {from: 'all', to : ''}, function(data){
    $scope.table = data;
    $scope.order = '-created_at';
  });

  EmployeeFactory.factory_get_employee(userID, function(data){
    $scope.user = {
        id         : data.id
      , name       : data.name
      , title      : data.title
      , team       : data.team
      , supervisor : data.supervisor
      , start_date : data.start_date
      , email      : data.email
      , is_logged  : data.is_logged
    }

    if ($scope.user.is_logged == true){
      ClockingFactory.factory_last_clocking($scope.user.id, function(data){
        $scope.user.session_id = data;
      })
    }

  });

  $scope.csvHead = [
      'Date'
    , 'Picture'
    , 'Name'
    , 'Title'
    , 'Team'
    , 'Location'
    , 'Clock IN'
    , 'Clock OUT'
    , 'Personal Time'
    , 'Billed Hours'
    , 'Report'
  ];

  $scope.dateFilter = function(from, to) {
  
    TableFactory.factory_user_history_table(userID, {from: from, to : to}, function(data){
      $scope.table = data;
    });
  }

  $scope.csvBody = function(){

    ary = [];
    var rows = document.getElementsByTagName('tr');
    
    for (var i=1; i < rows.length; i++){
      var obj = new Object();
      for (var j=0; j < rows[i].childElementCount; j++){
        obj[j] = (j != 1 ? rows[i].cells[j].innerHTML : '*'); //check for picture
      }
      ary.push(obj);
    }
    return ary;
  }

  //user dashboard
  $scope.clockIn = function() {
    ClockingFactory.factory_clock_in(userID);
  };

  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };

  $scope.clockOut = function(personal, report) {

    var info = {
        user     : $scope.user.id
      , session  : $scope.user.session_id
      , personal : personal
      , report   : report
    };
    ClockingFactory.factory_clock_out(info.session, info);
  };

  $scope.logout = function(){
    LoginFactory.logout();
  }

});
//USER 
app.controller('UserController', function($scope, $rootScope, $location, EmployeeFactory, TableFactory, LoginFactory, ClockingFactory ){

  var userID = $location.path().split('/')[$location.path().split('/').length - 1];

  $scope.modalShown = false;
  $scope.biz_id = $rootScope.user.business;
  $scope.isAdmin = ($rootScope.user.admin);

  TableFactory.user_history_table(userID, {from: 'all', to : ''}, function(data){
    $scope.table = data;
    $scope.order = '-created_at';
  });

  EmployeeFactory.get_employee(userID, function(data){

  if ($scope.isAdmin){
    $scope.user = {
        id         : data.id
      , name       : data.name
      , picture    : data.picture
      , title      : data.title
      , team       : data.team
      , supervisor : data.supervisor
      , status     : data.status
      , note       : data.note
      , start_date : data.start_date
      , email      : data.email
      , is_logged  : data.is_logged
    }
  } else {
    $scope.user = {
        id         : data.id
      , name       : data.name
      , picture    : data.picture
      , title      : data.title
      , team       : data.team
      , supervisor : data.supervisor
      , start_date : data.start_date
      , email      : data.email
      , is_logged  : data.is_logged
    }
  }

    if ($scope.user.is_logged == true){
      ClockingFactory.last_clocking($scope.user.id, function(data){
        $scope.user.session_id = data;
      });
    }

  });

  $scope.csvHead = [
      'Date'
    , 'Location'
    , 'Clock IN'
    , 'Clock OUT'
    , 'Personal Time'
    , 'Billed Hours'
    , 'Report'
  ];

  $scope.dateFilter = function(from, to) {
  
    TableFactory.user_history_table(userID, {from: from, to : to}, function(data){
      $scope.table = data;
    });
  }

  $scope.csvBody = function(){

    ary = [];
    var rows = document.getElementsByTagName('tr');
    
    for (var i=1; i < rows.length; i++){
      var obj = new Object();
      for (var j=0; j < rows[i].childElementCount; j++){
        obj[j] = rows[i].cells[j].innerHTML;
      }
      ary.push(obj);
    }
    return ary;
  }

  //user dashboard
  $scope.clockIn = function() {
    ClockingFactory.clock_in(userID);
  };

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
    ClockingFactory.clock_out(info.session, info);
  };

  $scope.logout = function(){
    LoginFactory.logout();
  }

});
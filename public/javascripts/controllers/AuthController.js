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

app.controller('AdminController', function($scope, $location, TableFactory, ListFactory, BusinessFactory, LoginFactory) {

  $scope.user = {
    page : 'dash'
  }

  ListFactory.factory_used_locations(function(data){ $scope.locations = data; });
  ListFactory.factory_members( function(data){ $scope.members = data; });

  TableFactory.factory_admin_dashboard(function(data){
    $scope.dashboard_table = data;
    $scope.order = '-created_at';
  });

  BusinessFactory.factory_get_business_info(1, function(data){ 
    $scope.business = data
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
  
  $scope.changePage = function(page){
    $scope.user.page = page;
    if (page == 'history') {
      TableFactory.factory_date_range({from: 'all', to : ''}, function(data){
        $scope.history_table = data;
        $scope.order = '-created_at';
      });
    }
  }

  //from admin dash
//  $scope.currentUser = '';
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };

  $scope.updateSettings = function(){

    var newSettings = {
       name : $scope.business.name
      , ip  : $scope.business.ip_addresses
    };

    BusinessFactory.factory_update_business_info(newSettings, function(){
      $scope.modalShown = false;
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

  $scope.dateFilter = function(from, to) {
    TableFactory.factory_date_range({from: from, to : to}, function(data){
      $scope.history_table = data;
    });
  }

  $scope.logout = function(){
    LoginFactory.logout();
  }

});

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

app.controller('AuthController', function($scope, AuthFactory, LoginFactory){
  AuthFactory.factory_check_current('data');
});
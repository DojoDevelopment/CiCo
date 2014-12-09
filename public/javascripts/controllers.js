//No ID in the URL
app.controller('employee', function($scope, $location, EmployeeFactory, ListFactory, TableFactory, LoginFactory) {

  ListFactory.factory_supervisors(function(data){ $scope.supervisors = data; console.log(data);});
  ListFactory.factory_all_locations(function(data){ $scope.locations = data; console.log(data);});
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
      , pic        : ''
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
        , pic        : ''
        , start_date : data.start_date.substring(0,10)
        , email      : data.email
        , password   : data.password
        , admin      : (data.type == 'employee' ? '' : 'true' )
      };

    });
  }
  
  $scope.addEmployee = function(){

    var admin = (document.getElementById('inputAdmin').checked == true ? 'contractor' : 'employee');

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
      , admin      : admin 
    }
    EmployeeFactory.factory_create_employee(info);
  }

  $scope.update_employee = function(){
    //get id from url
    var userID = $location.path().split('/')[3];

    var admin = (document.getElementById('inputAdmin').checked == true ? 'contractor' : 'employee');

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
      , admin      : admin 
    }
    EmployeeFactory.factory_update_employee(userID, info);
  }

  $scope.logout = function(){
    LoginFactory.logout();
  }

});

//Requires employee ID in the URL
app.controller('employeeInfo', function($scope, $location, EmployeeFactory, ListFactory, TableFactory, LoginFactory){

  TableFactory.factory_user_history_table(userID, function(data){
    $scope.table = data;
    $scope.order = '-created_at';
  });

  EmployeeFactory.factory_get_employee(userID, function(data){

    $scope.user.name       =  data.name;
    $scope.user.title      =  data.title;
    $scope.user.team       =  data.team;
    $scope.user.location   =  data.location_id;
    $scope.user.supervisor =  data.supervisor_id;
    $scope.user.status     =  data.status;
    $scope.user.note       =  data.note;
    $scope.user.start_date =  data.start_date.substring(0,10);
    $scope.user.email      =  data.email;
    $scope.user.password   =  data.password;
    $scope.user.admin      = (data.type == 'employee' ? '' : 'true');
  });

  $scope.logout = function(){
    LoginFactory.logout();
  }

});


app.controller('EmployeeController', function($scope, $location, TableFactory, ListFactory,  ClockingFactory) {

  $scope.user = { page : 'dash'};

  $scope.logout = function(){
    LoginFactory.logout();
  }

  $scope.changePage = function(state){
    $scope.user.page = state;
  }

  ListFactory.factory_used_locations(function(data){ $scope.locations = data; });
  ListFactory.factory_members( function(data){ $scope.members = data; });

  TableFactory.factory_history_table(function(data){
    $scope.history_table = data;
    $scope.order = '-created_at';
  });

  TableFactory.factory_user_dashboard(function(data){
    $scope.dashboard_table = data;
    $scope.order = '-created_at';
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

  $scope.currentUser = '';
  $scope.modalShown = false;
  $scope.toggleModal = function(currentUser) {
    $scope.currentUser = currentUser;
    $scope.modalShown = !$scope.modalShown;
  };


  //user dashboard
  $scope.clockOut = function(personal, report) {

    var info = {
      session  : $scope.currentUser.session_id
      , personal : personal
      , report   : report
    };

    ClockingFactory.factory_clock_out(info);

    for (var i=0; i < $scope.dashboard_table.length; i++){
      if( $scope.dashboard_table[i].id == $scope.currentUser.id){
        var row = i;
      }
    }
    $scope.dashboard_table[row].clock_out = Date.now();
    $scope.modalShown = false;
  };

  //user dashboard
  $scope.clockIn = function() {

    var user = this.row.id;

    for (var i=0; i < $scope.dashboard_table.length; i++){
      if( $scope.dashboard_table[i].id == user){
        var row = i;
      }
    }

    ClockingFactory.factory_clock_in(user, function(data){
      $scope.dashboard_table[row].session_id = data;
      $scope.dashboard_table[row].clock_in = Date.now();
    });
  };

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
  
});

app.controller('AdminController', function($scope, $location, TableFactory, ListFactory, BusinessFactory, LoginFactory) {

  $scope.user = {
    page : 'dash'
  }

  $scope.logout = function(){
    LoginFactory.logout();
  }

  $scope.changePage = function(page){
    $scope.user.page = page;
  }

  ListFactory.factory_used_locations(function(data){ $scope.locations = data; });
  ListFactory.factory_members( function(data){ $scope.members = data; });

  TableFactory.factory_admin_dashboard(function(data){
    $scope.dashboard_table = data;
    $scope.order = '-created_at';
  });

  TableFactory.factory_history_table(function(data){
    //$scope.myIP = data;

   $scope.history_table = data;
   $scope.order = '-created_at';
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

  //from admin dash
//  $scope.currentUser = '';
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };

  BusinessFactory.factory_get_business_info(1, function(data){ 
    $scope.business = data
  });

  $scope.updateSettings = function(){

    var newSettings = {
     name : $scope.business.name
     , ip  : $scope.business.ip_addresses
   };

   BusinessFactory.factory_update_business_info(newSettings, function(){
      $scope.modalShown = false;
    });
 }

  //in admin dash may need to rename directive
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };

  //user dashboard

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

});

app.controller('LoginController', function($scope, LoginFactory) {

  LoginFactory.factory_get_ip(function(ip){ 
    LoginFactory.factory_ip_login({ip : ip});
  });

  $scope.credentials  = {
    email : 'afenech@gmail.com',
    password : 'password'
  };

  $scope.login = function(credentials){
    LoginFactory.login(credentials);
  };
});

app.controller('AuthController', function($scope, AuthFactory){

    AuthFactory.factory_check_current('stuff');
});

app.controller('AdminLoginController', function($scope, LoginFactory){
  $scope.credentials  = {
    email : 'mchoi@gmail.com',
    password : 'password'
  };

  $scope.login = function(credentials){
    LoginFactory.login(credentials);
  };

  $scope.logout = function(){
    LoginFactory.logout();
  }
});


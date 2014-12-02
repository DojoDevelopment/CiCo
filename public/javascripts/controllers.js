var BIZ_ID = 1;

app.controller('business', function($scope, $location, BusinessFactory) {

  BusinessFactory.factory_get_business_info(BIZ_ID, function(data){ 

    $scope.name = data.name;
    $scope.ip = data.ip_addresses;

  });

  $scope.updateSettings = function(){

    var newSettings = {
       name : $scope.name
      , ip  : $scope.ip
      , biz : 1
    };

    BusinessFactory.factory_update_business_info(newSettings);
  }

});

//No ID in the URL
app.controller('employee', function($scope, EmployeeFactory, ListFactory, TableFactory) {

  ListFactory.factory_supervisors(function(data){ $scope.supervisors = data; });
  ListFactory.factory_all_locations(function(data){ $scope.locations = data; });
  $scope.update = false;
  
  $scope.addEmployee = function(){

    var admin      = (document.getElementById('inputAdmin').checked == true ? 'contractor' : 'employee');
    // var picture    =  document.getElementById('inputPicPath').value;

    var info = {
        name       : $scope.name
      , title      : $scope.title
      , team       : $scope.team
      , location   : $scope.location
      , supervisor : $scope.supervisor
      , status     : $scope.status
      , note       : $scope.note
      , start_date : $scope.start_date
      , email      : $scope.email
      , password   : $scope.password
      , admin      : admin 
    }

    //upload picture function here//
    EmployeeFactory.factory_create_employee(info);
  }

});

//Requires employee ID in the URL
app.controller('employeeInfo', function($scope, $location, EmployeeFactory, ListFactory, TableFactory ){

  //get id from url
  var userID = $location.path().split('/')[3];

  ListFactory.factory_supervisors(function(data){ $scope.supervisors = data; });
  ListFactory.factory_all_locations(function(data){ $scope.locations = data; });
  $scope.update = true;

  TableFactory.factory_user_history_table(userID, function(data){
    $scope.table = data;
    $scope.order = '-created_at';
  });

  EmployeeFactory.factory_get_employee(userID, function(data){

    $scope.name       =  data.name;
    $scope.title      =  data.title;
    $scope.team       =  data.team;
    $scope.location   =  data.location_id;
    $scope.supervisor =  data.supervisor_id;
    $scope.status     =  data.status;
    $scope.note       =  data.note;
    $scope.start_date =  data.start_date.substring(0,10);
    $scope.email      =  data.email;
    $scope.password   =  data.password;
    $scope.admin      = (data.type == 'employee' ? '' : 'true');
  });

  $scope.update_employee = function(){

    var admin = (document.getElementById('inputAdmin').checked == true ? 'contractor' : 'employee');

    var info  = {
        name       : $scope.name
      , title      : $scope.title
      , team       : $scope.team
      , location   : $scope.location
      , supervisor : $scope.supervisor
      , status     : $scope.status
      , note       : $scope.note
      , start_date : $scope.start_date
      , email      : $scope.email
      , password   : $scope.password
      , admin      : admin 
    }
    EmployeeFactory.factory_update_employee(userID, info);
  }

});

app.controller('clockout', function($scope, $location, ClockingFactory){
  
  var session_id = $location.path().split('/')[2];
  $scope.clockOut = function( ) {

    var info = {
        session  : session_id
      , personal : $scope.personal
      , report   : $scope.report 
    };

    ClockingFactory.factory_clock_out(info);
  };

});

app.controller('user_dashboard', function($scope, TableFactory, ListFactory, ClockingFactory) {

  ListFactory.factory_used_locations(function(data){ $scope.locations = data; });

  TableFactory.factory_user_dashboard(function(data){
    $scope.table = data;
    $scope.order = '-created_at';
  });

  $scope.clockIn = function() {
    var user = this.row.id;

    for (var i=0; i < $scope.table.length; i++){
      if( $scope.table[i].id == user){
        var row = i;
      }
    }

    ClockingFactory.factory_clock_in(user, function(data){
      $scope.table[row].session_id = data;
      $scope.table[row].clock_in = Date.now();
    });
  };

}); 

app.controller('admin_dashboard', function($scope, TableFactory, ListFactory) {

  ListFactory.factory_used_locations(function(data){ $scope.locations = data; });

  TableFactory.factory_admin_dashboard(function(data){
    $scope.table = data;

    $scope.order = '-created_at';
  });

});

app.controller('history', function($scope, TableFactory, ListFactory) {

  ListFactory.factory_used_locations( function(data){ $scope.locs = data; });
  ListFactory.factory_members( function(data){ $scope.members = data; });

  TableFactory.factory_history_table(function(data){
    $scope.table = data;
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

  $scope.dateFilter = function(date_range) {
    var SECONDS_IN_DAY = 86400000; // 24 * + * 60 * 1000
    var today = new Date (Date.now());
    var day_of_the_week = today.getDay();
    var day_of_the_month = today.getDate();
    var start_date;
    var end_date;
    var days_back;

    // if (typeof(date_range) != 'string' && (date_range[0] < date_range[1]) ) {
    //   start_date = new Date(date_range[0]);
    //   end_date = new Date(date_range[1]);
    // } else {
    //   switch( date_range ){
    //     case 'this_week' : 
    //       end_date = new Date (Date.now());
    //       days_back  = day_of_the_week;
    //       start_date = Date.now() - ( days_back * SECONDS_IN_DAY);
    //       break;
    //     case 'last_week' : 
    //       end_date = new Date (Date.now());
    //       days_back  = day_of_the_week;
    //       start_date = Date.now() - ( days_back * SECONDS_IN_DAY);
    //       break;
    //     case 'this_month' : 
    //       end_date = today;
    //       start_date = today - ( (day_of_the_month) * SECONDS_IN_DAY);
    //       break;
    //     case 'last_month' : 
    //       end_date = today - ( (day_of_the_month) * SECONDS_IN_DAY);;
    //       start_date = today - ( (day_of_the_month + 30 ) * SECONDS_IN_DAY);
    //       break;
    //     default:
    //       start_date = new Date(2010,0,0,0,0,0,0);
    //       end_date = today;
    //     break
    //   }
    // }

    if (date_range === 'all') {
    
      start_date = new Date(2010,0,0,0,0,0,0);
      end_date = today;
    
    } else if (date_range === 'this_week') {
    
      end_date = new Date ( Date.now() );
      days_back  = day_of_the_week;
      start_date = Date.now() - ( days_back * SECONDS_IN_DAY);
    
    } else if (date_range === 'last_week') {
    
      end_date   = today - ( (day_of_the_week + 1) * SECONDS_IN_DAY);
      start_date = today - ( (day_of_the_week + 6) * SECONDS_IN_DAY);
    
    } else if (date_range === 'this_month') {
    
      end_date = today;
      start_date = today - ( (day_of_the_month) * SECONDS_IN_DAY);
    
    } else if (date_range === 'last_month') {
    
      end_date = today - ( (day_of_the_month) * SECONDS_IN_DAY);
      start_date = today - ( (day_of_the_month + 30 ) * SECONDS_IN_DAY)
    
    } else if ( ( typeof(date_range) != 'string' ) && (date_range[0] < date_range[1]) ) {
    
      start_date = new Date(date_range[0]);
      end_date = new Date(date_range[1]);
    
    };

    TableFactory.factory_history_table(function(data){

      $scope.table = data;
      var table2=[]

      for (var i = 0; i < $scope.table.length - 1; i++) {

        work_session_date = new Date($scope.table[i].created_at);

        if (work_session_date > start_date && work_session_date < end_date){
          table2.push($scope.table[i]);
        }
      }

      $scope.table=table2;
    })

  } //end of $scope.dateFilter function
});
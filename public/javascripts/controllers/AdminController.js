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

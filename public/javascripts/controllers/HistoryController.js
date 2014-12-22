app.controller('HistoryController', function($scope, $location, $rootScope, TableFactory, ListFactory, BusinessFactory, LoginFactory) {

  $scope.biz_id = $rootScope.business.id;

  ListFactory.factory_used_locations(function(data){ $scope.locations = data; });
  ListFactory.factory_members( function(data){ $scope.members = data; });
  
  TableFactory.factory_date_range({from: 'all', to : ''}, function(data){
    $scope.history_table = data;
    $scope.order = '-created_at';
  });

  $scope.modalShown = false;
  $scope.toggleModal = function() {
    BusinessFactory.factory_get_business_info($rootScope.business.id, function(data){ 
      $scope.business = data
      $scope.modalShown = !$scope.modalShown;
    });
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

  $scope.csvHead = [
      'Date'
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
        str = rows[i].cells[j].innerHTML
        obj[j] = str.replace(/(<!--|<img)\s[^>]*?>/g, '').trim(); //check for picture
      }
      ary.push(obj);
    }
    console.log(ary);
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

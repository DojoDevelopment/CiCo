app.controller('HistoryController', function($scope, $location, $rootScope, TableFactory, ListFactory, BusinessFactory, LoginFactory) {

  $scope.biz_id = $rootScope.business.id;

  ListFactory.used_locations(function(data){ $scope.locations = data; });
  ListFactory.members( function(data){ $scope.members = data; });
  
  TableFactory.date_range({from: 'all', to : ''}, function(data){
    $scope.history_table = data;
    $scope.order = '-created_at';
  });

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
    TableFactory.date_range({from: from, to : to}, function(data){
      $scope.history_table = data;
    });
  }

  $scope.logout = function(){
    LoginFactory.logout();
  }

});

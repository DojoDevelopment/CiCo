app.controller('user_dashboard', function($scope, TableFactory, ListFactory) {

	ListFactory.get_factory_locations(function(data){
		$scope.locations = data;
	});

	TableFactory.get_user_factory_dashboard(function(data){
		$scope.table = data;
		$scope.order = '-name';
	});

	$scope.clockIn = function(id) {
		console.log(this.row.id);
  };

	$scope.clockOut = function(id) {
		console.log(this.row.id);
  };

});

app.controller('admin_dashboard', function($scope, TableFactory, ListFactory) {

	ListFactory.get_factory_locations(function(data){
		$scope.locations = data;
	});

	TableFactory.get_admin_factory_dashboard(function(data){
		$scope.table = data;
		$scope.order = '-name';
	});

});

app.controller('history', function($scope, TableFactory, ListFactory) {

	ListFactory.get_factory_locations(function(data){
		$scope.locations = data;
	});

	ListFactory.get_factory_members(function(data){
		$scope.members = data;
	});

	TableFactory.get_factory_history_table(function(data){
		$scope.table = data;
		$scope.order = '-date';
	});
});
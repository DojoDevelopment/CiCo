app.controller('dashboard', function($scope, DashboardFactory) {

	DashboardFactory.get_factory_locations(function(data){
		$scope.locations = data;
	});

	DashboardFactory.get_factory_dashboard_table(function(data){
		$scope.table = data;
	});

});

app.controller('history', function($scope, HistoryFactory) {

	HistoryFactory.get_factory_locations(function(data){
		$scope.locations = data;
	});

	HistoryFactory.get_factory_members(function(data){
		$scope.members = data;
	});

	HistoryFactory.get_factory_history_table(function(data){
		$scope.histories = data;
	});
});
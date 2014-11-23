app.controller('dashboard', function($scope, DashboardFactory) {

	console.log('in the dashboard controller but have not spoken to the factory yet')

	DashboardFactory.get_factory_locations(function(locations){
		console.log('data in the dashboard controller: ', locations);
		$scope.locations = locations;
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
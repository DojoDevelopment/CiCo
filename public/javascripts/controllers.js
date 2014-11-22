app.controller('dashboard', function($scope, DashboardFactory) {

	console.log('in the dashboard controller but have not spoken to the factory yet')

	DashboardFactory.get_factory_locations(function(locations){
		console.log('data in the dashboard controller: ', locations);
		$scope.locations = locations;
	   });

});

app.controller('history', function($scope, HistoryFactory) {

	console.log('in the history controller but have not spoken to the factory yet')

	HistoryFactory.get_history_table(function(data){
		console.log('data-history table in the history controller: ', data);
		$scope.histories = data;
	});

	HistoryFactory.get_locations(function(data){
		console.log('data-locations in the history controller: ', data);
		$scope.locations = data;
	});


	HistoryFactory.get_members(function(data){
		console.log('data-members in the history controller: ', data);
		$scope.members = data;
	});

});
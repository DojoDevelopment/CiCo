app.controller('dashboard', function($scope, DashboardFactory) {

	DashboardFactory.get_factory_locations(function(data){
		$scope.locations = data;
	});

	DashboardFactory.get_factory_table(function(data){
		$scope.table = data;
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

	// HistoryFactory.get_factory_locations(function(locations){
	// 	console.log('data in the history controller: ', locations);
	// 	$scope.locations = locations;
	//    });

	// HistoryFactory.get_factory_locations(function(locations){
	// 	console.log('data in the history controller: ', locations);
	// 	$scope.locations = locations;
	//    });


});
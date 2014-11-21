app.controller('dashboard', function($scope, DashboardFactory) {

	DashboardFactory.get_factory_locations(function(data){
		$scope.locations = data;
	});

	DashboardFactory.get_factory_table(function(data){
		$scope.table = data;
	})

});
app.controller('DashboardController', function($scope, DashboardFactory) {

	console.log('in the dashboard controller but have not spoken to the factory yet')

	DashboardFactory.get_factory_locations(function(locations){
		console.log('data in the dashboard controller: ', locations);
		$scope.locations = locations;
	   });

});

app.controller('HistoryController', function($scope, HistoryFactory) {

	console.log('in the history controller but have not spoken to the factory yet');

	HistoryFactory.get_history_table(function(data){
		console.log('after calling History.Factory.get_history_table, data-history table in the history controller is: ', data);
		$scope.histories = data;
	});

	HistoryFactory.get_locations(function(data){
		console.log('after callin History.Factory get locations, data-locations in the history controller is: ', data);
		$scope.locations = data;
	});


	HistoryFactory.get_members(function(data){
		console.log('data-members in the history controller: ', data);
		$scope.members = data;
	});

	$scope.setSelectedLocation = function () {
        var id = this.location.id;
        if (_.contains($scope.selectedLocation, id)) {
            $scope.selectedLocation = _.without($scope.selectedLocation, id);
        } else {
            $scope.selectedLocation.push(id);
        }
        return false;
    };

    $scope.isChecked = function (id) {
        if (_.contains($scope.selectedLocation, id)) {
            return 'icon-ok pull-right';
        }
        return false;
    };

    $scope.checkAll = function () {
        $scope.selectedLocation = _.pluck($scope.companies, 'id');
    };
//}]);

});
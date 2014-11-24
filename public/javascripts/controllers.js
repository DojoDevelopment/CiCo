app.controller('user_dashboard', function($scope, TableFactory, ListFactory, ClockingFactory) {


	ListFactory.get_factory_locations(function(data){
		$scope.locations = data;
	});

	TableFactory.get_user_factory_dashboard(function(data){
		$scope.table = data;
		$scope.order = '-name';
	});

	$scope.clockIn = function() {
		ClockingFactory.factory_clock_in(this.row.id);
	};


app.controller('HistoryController', function($scope, HistoryFactory) {

	console.log('in the history controller but have not spoken to the factory yet');

	HistoryFactory.get_history_table(function(data){
		console.log('after calling History.Factory.get_history_table, data-history table in the history controller is: ', data);
		$scope.histories = data;
	});

	HistoryFactory.get_locations(function(data){
		console.log('after callin History.Factory get locations, data-locations in the history controller is: ', data);

	$scope.clockOut = function() {
		var user = this.row.id;
		var session = this.row.session_id;
		ClockingFactory.factory_clock_out(session, user);
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
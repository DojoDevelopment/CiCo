app.controller('user_dashboard', function($scope, TableFactory, ListFactory, ClockingFactory) {

	ListFactory.get_factory_locations(function(data){
		$scope.locations = data;
	});

	TableFactory.get_user_factory_dashboard(function(data){
		$scope.table = data;
		$scope.order = '-name';
	});

	$scope.clockIn = function() {
		var user = this.row.id;
		ClockingFactory.factory_clock_in(user);
	};

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
	$scope.add_employeeModal = false;
    $scope.add_employee = function() {
	    $scope.add_employeeModal = !$scope.add_employeeModal;
	  };
	$scope.settingsModal = false;
	$scope.settings = function() {
		$scope.settingsModal = !$scope.settingsModal;
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


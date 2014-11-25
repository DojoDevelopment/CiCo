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

});

app.controller('history', function($scope, TableFactory, ListFactory) {

	ListFactory.get_factory_locations(function(data){
		$scope.locations = data;
	});

	ListFactory.get_factory_members(function(data){
		$scope.members = data;
	});

	TableFactory.get_factory_history_table(function(data){
		console.log('in history controller TableFactory.get_admin_factory_dashboard and table data is: ', data);
		$scope.table = data;
		$scope.order = '-date';
	});
        
    
    $scope.dateFilter = function(date_range) {
    	if(date_range === 'all') {
            TableFactory.get_factory_history_table(function(data){
			$scope.table = data;
			$scope.order = '-date';
        	})
        }	
        else if(date_range === 'this_week') {
            var table2=[];
            for (var i = 0; i < $scope.table.length - 1; i++) {
            	work_session_date = new Date($scope.table[i].created_at);
            	if (work_session_date > Date.now() - 7*24*3600*1000){
            		table2.push($scope.table[i]);
            	};         
            }
            $scope.table=table2; 
        }
        else if (date_range === 'last_week') {
            var table2=[];
            for (var i = 0; i < $scope.table.length - 1; i++) {
            	work_session_date = new Date($scope.table[i].created_at);
            	if (work_session_date < (Date.now() - 7*24*3600*1000) && work_session_date > (Date.now() - 14*24*3600*1000) ){
            		table2.push($scope.table[i]);
            	};         
            }
            $scope.table=table2;
        }
        else if (date_range === 'this_month') {
            var table2=[];
            for (var i = 0; i < $scope.table.length - 1; i++) {
            	work_session_date = new Date($scope.table[i].created_at);
            	if ( work_session_date > (Date.now() - 30*24*3600*1000) ){
            		table2.push($scope.table[i]);
            	};         
            }
            $scope.table=table2;
        }
         else if (date_range === 'last_month') {
            var table2=[];
            for (var i = 0; i < $scope.table.length - 1; i++) {
            	work_session_date = new Date($scope.table[i].created_at);
            	if (work_session_date < (Date.now() - 30*24*3600*1000) && work_session_date > (Date.now() - 60*24*3600*1000) ){
            		table2.push($scope.table[i]);
            	};         
            }
            $scope.table=table2;
        }

        
    }
	
});
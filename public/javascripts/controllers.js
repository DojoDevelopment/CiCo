app.controller('new_employee', function($scope, AdminFactory) {

	AdminFactory.addEmployee(function(data){
		console.log('Employee Added');
	});

	AdminFactory.get_supervisors(function(data){
		$scope.supervisors = data;
	});

});

app.controller('settings', function($scope, SettingFactory) {

	SettingFactory.factory_get_business_name(function(data){
		$scope.business_name = data;
	});

});

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

		for (var i=0; i < $scope.table.length; i++){
			if( $scope.table[i].id == user){
				var row = i;
			}
		}

		ClockingFactory.factory_clock_in(user, function(data){
			$scope.table[row].clock_in = data;
		});
	};

	$scope.clockOut = function() {
		var user = this.row.id;
		var session = this.row.session_id;

		for (var i=0; i < $scope.table.length; i++){
			if( $scope.table[i].id == user){
				var row = i;
			}
		}

		ClockingFactory.factory_clock_out(session, user, function(data){
			$scope.table[row].clock_out = data;
		});
	};

}); //end of user_dashboard controller

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




}); //end of admin_dashboard controller

app.controller('history', function($scope, TableFactory, ListFactory) {

	$scope.csvHead = ['Date', 'Picture', 'Name', 'Title', 'Team', 'Location', 
									 'Clock IN', 'Clock OUT', 'Personal Time', 'Billed Hours', 'Report'];

	$scope.csvBody = function(){
	
		ary = [];
		var rows = document.getElementsByTagName('tr');
		
		for (var i=1; i < rows.length; i++){
			var obj = new Object();
			for (var j=0; j < rows[i].childElementCount; j++){
				obj[j] = (j != 1 ? rows[i].cells[j].innerHTML : '*'); //check for picture
			}
			ary.push(obj);
		}
		return ary;
	}

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
  
    	var today = new Date (Date.now());
    	var day_of_the_week = today.getDay();
    	var day_of_the_month = today.getDate();
    	var start_date;
    	var end_date;
    	var days_back;

    	if (date_range === 'all') {
    		start_date = new Date(2010,0,0,0,0,0,0);
    		end_date = today;
    	}
    	else if (date_range === 'this_week') {
    		end_date = new Date (Date.now());
    		days_back = day_of_the_week;
    		start_date = Date.now() - ( days_back *24*3600*1000);
    	}
    	else if (date_range === 'last_week') {
    		end_date =   today - ( (day_of_the_week + 1) *24*3600*1000);
    		start_date = today - ( (day_of_the_week + 6) *24*3600*1000);
    	}
    	else if (date_range === 'this_month') {
    		end_date = today;
    		start_date = today - ( (day_of_the_month) *24*3600*1000);
    	}
    	else if (date_range === 'last_month') {
    		end_date = today - ( (day_of_the_month) *24*3600*1000);
    		start_date = today - ( (day_of_the_month + 30 ) *24*3600*1000)
    	}
    	else if ( ( typeof(date_range) != 'string' ) && (date_range[0] < date_range[1]) ) {
    		start_date = new Date(date_range[0]);
    		end_date = new Date(date_range[1]);
    	};
    	TableFactory.get_factory_history_table(function(data){
			$scope.table = data;
			var table2=[]
			for (var i = 0; i < $scope.table.length - 1; i++) {
				work_session_date = new Date($scope.table[i].created_at);
				if (work_session_date > start_date && work_session_date < end_date){
					table2.push($scope.table[i]);
				}
			}
			$scope.table=table2;
		})

	} //end of $scope.dateFilter function

}); //end of history controller

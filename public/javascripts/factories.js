app.factory('DashboardFactory', function($http){
	return {
		get_factory_locations : function(callback){
			$http.get('/api/get_locations').success(function(data){
				callback(data);
			});
		},

		get_factory_dashboard_table : function(callback){
			$http.get('/api/get_admin_table').success(function(data){
				callback(data);
			});
		}
	};
}),

app.factory('HistoryFactory', function($http){
	return {
		get_history_table : function(callback){
			$http.get('/api/get_hist_table').success(function(data){
				callback(data);
			});
		},
		get_locations: function(callback){
			$http.get('/api/get_locations').success(function(data){
				callback(data);
			});
		},
		get_members: function(callback){
			$http.get('api/get_members').success(function(data){
				callback(data);
			});
		}
	};
});

app.factory('HistoryFactory', function($http){
	return {
		get_factory_locations: function(callback){
			$http.get('/api/get_locations').success(function(data){
				callback(data);
			});
		},
		get_factory_members: function(callback){
			$http.get('api/get_members').success(function(data){
				callback(data);
			});
		},
		get_factory_history_table : function(callback){
			$http.get('/api/get_hist_table').success(function(data){
				callback(data);
			});
		}
	};
});
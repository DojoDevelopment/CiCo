app.factory('DashboardFactory', function($http){
	return {
		get_factory_locations : function(callback){
			$http.get('/api/get_locations').success(function(data){
				callback(data);
			});
		}

		get_factory_table : function(callback){
			$http.get('/api/get_admin_table').success(function(data){
				callback(data);
			});
		}

	};
});
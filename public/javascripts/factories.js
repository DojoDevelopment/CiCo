app.factory('TableFactory', function($http){
	return {

		get_user_factory_dashboard : function(callback){
			
			$http.get('/api/get_user_dash').success(function(data){
				callback(data);
			});
			
		}, get_admin_factory_dashboard : function(callback){
			
			$http.get('/api/get_admin_dash').success(function(data){
				callback(data);
			});

		}, get_factory_history_table : function(callback){
			
			$http.get('/api/get_hist_table').success(function(data){
				console.log('in TableFactory get_factory_history_table and data is: ',data);
				callback(data);
			});
		}
	};

});

app.factory('ListFactory', function($http){
	return {

		get_factory_locations: function(callback){
			
			$http.get('/api/get_locations').success(function(data){
				callback(data);
			});
			
		}, get_factory_members: function(callback){
			
			$http.get('api/get_members').success(function(data){
				callback(data);
			});
		}
	};

});

app.factory('ClockingFactory', function($http){
	return {

		factory_clock_in: function(user){
			
			$http.get('/api/clock_in/'+ user).success(function(){
				console.log('clocked in');
			});
			
		}, factory_clock_out: function(session, user){
			
			$http.get('api/clock_out/' + user + '/' + session).success(function(){
				console.log('clocked out');
			});
		}
	};

});
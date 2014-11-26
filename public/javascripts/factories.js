app.factory('AdminFactory', function($http){
	return {

		addEmployee : function(stuff, callback){
			console.log(stuff);
			$http.post('/api/addEmployee', stuff).success(function(data){
				callback(data);
			});

		}
	}
})

app.factory('SettingsFactory', function($http){
	return {

		get_business_info : function(business_id, callback){
			console.log('in the factory just before asking for info for business with id: ', business_id);
			$http.get('/api/get_business_info/' + business_id).success(function(data){
				callback(data);
			});
			
		},
		updateSettings : function(newSettings, callback){
			console.log('inside settings factory post settings and my newSettings object is: ', newSettings);
			$http.post('/api/set_settings',newSettings).success(function(data){
				callback(data);
			});

		}

	}
})

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

		get_factory_locations : function(callback){

			$http.get('/api/get_locations').success(function(data){
				callback(data);
			});

		}, factory_get_all_locations : function(callback){

			$http.get('api/get_all_locations').success(function(data){
				callback(data);
			});

		}, get_factory_members : function(callback){

			// we need to send some stuff, apart what's send in the url
			// so probably that info will be retrieved later from request.body.....

			$http.get('api/get_members').success(function(data){
				callback(data);
			});

		}, get_supervisors : function(callback){

			$http.get('/api/get_supervisors').success(function(data){
				callback(data);
			});

		}

	};
});

app.factory('ClockingFactory', function($http){
	return {
		factory_clock_in: function(user, callback){

			$http.get('/api/clock_in/'+ user).success(function(data){
				callback(data);
			});

		}, factory_clock_out: function(session, user, callback){

			$http.post('api/clock_out/' + user + '/' + session, data).success(function(data){
				callback(data);
			});
		}

	};
});
//USED IN CONTROLLER: employee, employeeInfo
app.factory('EmployeeFactory', function($http){
	return {
		factory_create_employee : function(data){

			$http.post('/api/employee', data).success(function(){
				document.location.href = '../#/admin/dashboard';
			});

		}, factory_update_employee : function(id, data){

			$http.put('/api/employee/' + id, data).success(function(){
				document.location.href = '../#/admin/dashboard';
			});

		}, factory_get_employee : function(id, callback){

			$http.get('/api/employee/' + id).success(function(data){
				callback(data);
			});

		}
	}
});

//USED IN CONTROLLER: business
app.factory('BusinessFactory', function($http){
	return {

		factory_get_business_info : function(business_id, callback) {

			$http.get('/api/business/' + business_id).success(function(data){
				callback(data);
			});
			
		}, factory_update_business_info : function(info, callback) {

			$http.put('/api/business/'+ info.biz, info).success(function(){
				document.location.href = '../#/admin/dashboard';
			});

		}

	}
});

//USED IN CONTROLLER: user_dashboard, admin_dashboard, employee, employeeInfo, history
app.factory('TableFactory', function($http){
	return {

		factory_user_dashboard : function(callback){

			$http.get('/api/table_dashboard').success(function(data){
				callback(data);
			});

		}, factory_admin_dashboard : function(callback){

			$http.get('/api/table_admin_dash').success(function(data){
				callback(data);
			});

		}, factory_history_table : function(callback){

			$http.get('/api/table_hist').success(function(data){
				console.log("in factory history table, just got this data: ", data)
				callback(data);
			});

		}, factory_user_history_table : function(id, callback){

			$http.get('/api/table_user/' + id).success(function(data){
				callback(data);
			});
		
		}

	};
});

//USED IN CONTROLLER: user_dashboard, admin_dashboard, employee, employeeInfo, history
app.factory('ListFactory', function($http){
	return {

		factory_used_locations : function(callback){

			$http.get('/api/list_used_locations').success(function(data){
				callback(data);
			});

		}, factory_all_locations : function(callback){

			$http.get('api/list_all_locations').success(function(data){
				callback(data);
			});

		}, factory_members : function(callback){

			$http.get('api/list_members').success(function(data){
				callback(data);
			});

		}, factory_supervisors : function(callback){

			$http.get('/api/list_supervisors').success(function(data){
				callback(data);
			});

		}

	};
});

//USED IN CONTROLLER: user_dashboard, clockout
app.factory('ClockingFactory', function($http){
	return {
		
		factory_clock_in: function(user, callback){

			$http.post('/api/clock_in/'+ user).success(function(data){
				callback(data);
			});

		}, factory_clock_out: function(info){

			$http.post('api/clock_out/' + info.session, info).success(function(){
				// document.location.href = '../#/dashboard';
			});
		}

	};
});

app.factory('LoginFactory', function($http){
	return {
		
		factory_get_ip : function(callback){

			$http.get('http://ipinfo.io/json').success(function(data){
				console.log("in_factory_get_ip and getting this data from ipinfo.io which contains among other things the ip: ",data);
				callback(data.ip);
			});

		}, factory_ip_login : function(info){

			$http.post('/api/ip_login', info).success(function(){
				document.location.href = '../#/dashboard';
			});

		}, factory_login : function(info){
			$http.post('/api/login', info).success(function(data){
				document.location.href = data.link;
			});
		}

	};
});

app.factory('UserFactory', function($http) {
	return {
		check_login : function(){

			$http.get('/api/check_login').error(function(data){
				console.log('data from check_login: ',data);
				document.location.href = data;
			});

		}, check_admin : function(){

			$http.get('/api/check_admin').success(function(data){
				console.log('factory admin check', data);
			})

		}
	}
})

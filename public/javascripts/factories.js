//USED IN CONTROLLER: employee, employeeInfo
app.factory('EmployeeFactory', function($http, $location){
  return {

    factory_create_employee : function(data){
    	console.log(data);

      $http
        .post('/api/employee', data)
        .success(function(){
          $location.path('./#/admin');
      });

    // }, factory_upload_picture: function(file){
    // 	$http.post('api/picUpload',file).success(function(){
    // 		document.location.href = '../#/admin/dashboard';
    // 	})


    }, factory_upload_file: function(data){
    	console.log("in factory_upload_file with data: ",data);
    	$http.post('/api/upload',data).success(function(){
    		$location.path('./#/admin');
    	})

	},factory_update_employee : function(id, data){

      $http
        .put('/api/employee/' + id, data)
        .success(function(){
          document.location.href = '../#/admin/dashboard';
      });

    }, factory_get_employee : function(id, callback){

      $http
        .get('/api/employee/' + id)
        .success(function(data){
          callback(data);
      });
    }
  }
});

//USED IN CONTROLLER: business
app.factory('BusinessFactory', function($http){
  return {

    factory_get_business_info : function(business_id, callback) {

      $http
        .get('/api/business/' + business_id)
        .success(function(data){
          callback(data);
      });
      
    }, factory_update_business_info : function(info, callback) {

      $http
        .put('/api/business', info)
        .success(function(data){
          callback(data);
      });

    }

  }
});

//USED IN CONTROLLER: user_dashboard, admin_dashboard, employee, employeeInfo, history
app.factory('TableFactory', function($http){
  return {

    factory_user_dashboard : function(callback){

      $http
        .get('/api/table_dashboard')
        .success(function(data){
          callback(data);
      });

    }, factory_admin_dashboard : function(callback){

      $http
        .get('/api/table_admin_dash')
        .success(function(data){
          callback(data);
      });

    }, factory_history_table : function(callback){

      $http
        .get('/api/table_hist')
        .success(function(data){
          callback(data);
      });

    }, factory_user_history_table : function(id, callback){

      $http
        .get('/api/table_user/' + id)
        .success(function(data){
          callback(data);
      });
    
    }, factory_date_range : function(info, callback){
      $http
        .post('/api/date_range/', info)
        .success(function(data){
          callback(data);
        });
    }, factory_general_employee_info : function(callback){
      $http
        .get('/api/main')
        .success(function(data){
          callback(data);
        });
    }

  };
});

//USED IN CONTROLLER: user_dashboard, admin_dashboard, employee, employeeInfo, history
app.factory('ListFactory', function($http){
  return {

    factory_used_locations : function(callback){

      $http
        .get('/api/list_used_locations')
        .success(function(data){
          callback(data);
      });

    }, factory_all_locations : function(callback){

      $http
        .get('api/list_all_locations')
        .success(function(data){
          callback(data);
      });

    }, factory_members : function(callback){

      $http
        .get('api/list_members')
        .success(function(data){
          callback(data);
      });

    }, factory_supervisors : function(callback){

      $http
        .get('/api/list_supervisors')
        .success(function(data){
          callback(data);
      });

    }

  };
});

//USED IN CONTROLLER: user_dashboard, clockout
app.factory('ClockingFactory', function($http, $location){
  return {
    
    factory_clock_in: function(user, callback){

      $http
        .post('/api/clock_in/'+ user)
        .success(
          $location.path('main')
        );

    }, factory_clock_out: function(id, info){

      $http
        .post('/api/clock_out/' + id, info)
        .success(
          $location.path('main')
        );
    }, factory_last_clocking: function(info, callback){
      $http
        .get('/api/last_clocking/' + info)
        .success(function(data){
          callback(data);
        })
    }

  };
});

app.factory('LoginFactory', function($http, $location){

  return {
    
    factory_get_ip : function(callback){

      $http
        .get('http://ipinfo.io/json')
        .success(function(data){
          callback(data.ip);
      });

    }, factory_ip_login : function(info){

      $http
        .post('/api/ip_login', info)
        .success(function(){
          console.log('success');
          document.location.href = '../#/main';
        })
        .error(function(){
          console.log('error');
        });

    }, login : function(credentials){
    
      $http
        .post('/api/login', credentials)
        .success(function(data){
          console.log(data);
          if (data.login && data.admin){
            $location.path('admin');
          } else if (data.login && !data.admin) {
            $location.path('user/' + data.id)
          } 
        });

    }, logout : function(){
    
      $http
        .post('/api/logout')
        .success(function(){
          $location.path('/')
        });
    }
  };
});

app.factory('AuthFactory', function($http){
  return {
    
    factory_getSession : function(callback){
    
      $http
        .get('/api/get_session')
        .success(function(data){
          console.log('getSession data:', data);
          callback(data.user);
      });
    
    }
  }
});
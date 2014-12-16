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
    	console.log("in factory_upload_file with data: ", data);
    	$http.post('/api/upload', data).success(function(){
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
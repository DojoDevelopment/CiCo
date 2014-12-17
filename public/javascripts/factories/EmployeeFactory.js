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

    }, factory_upload_file: function(file){

        var fd = new FormData();
        fd.append('file', file);
        $http.post('/upload_file', fd, {
          transformRequest: angular.identity
          //lets the browser decide that it's multipart form, 
          //if defined as multipart process throws error
          , headers: { 'Content-Type': undefined }  
        })

	  }, factory_update_employee : function(id, data){

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
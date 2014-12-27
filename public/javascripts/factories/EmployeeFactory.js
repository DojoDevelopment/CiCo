//USED IN CONTROLLER: employee, employeeInfo
app.factory('EmployeeFactory', function($http, $location){
  return {

    create_employee : function(data, callback){

      $http
        .post('/api/employee', data)
        .success(function(id){

          if (data.imgFile !== undefined){
            var fd = new FormData();
            fd.append('file', data.imgFile);
            $http.post('/api/upload_file/' + id, fd, {
              transformRequest: angular.identity
              //lets the browser decide that it's multipart form, if defined as multipart process throws error
              , headers: { 'Content-Type': undefined }  
            })
          }
          $location.path('/dashboard');
        })
        .error(function(data){
          callback(data);
        });

	  }, update_employee : function(id, data, callback){

      $http
        .put('/api/employee/' + id, data)
        .success(function(){
          if (data.imgFile !== undefined){
            var fd = new FormData();
            fd.append('file', data.imgFile);
            $http.post('/api/upload_file/' + id, fd, {
              transformRequest: angular.identity
              //lets the browser decide that it's multipart form, if defined as multipart process throws error
              , headers: { 'Content-Type': undefined }  
            })
          }
          $location.path('/dashboard');
        })
        .error(function(data){
          callback(data);
        });
;

    }, get_employee : function(id, callback){

      $http
        .get('/api/employee/' + id)
        .success(function(data){
          callback(data);
      });
    }
  }
});
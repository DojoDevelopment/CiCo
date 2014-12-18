//USED IN CONTROLLER: employee, employeeInfo
app.factory('EmployeeFactory', function($http, $location, $rootScope){
  return {

    factory_create_employee : function(data){
      $http
        .post('/api/employee', data)
        .success(function(id){
          if (data.pic !== undefined ){
            var fd = new FormData();
            fd.append('file', data.pic);
            $http.post('/api/upload_file/' + id, fd, {
              transformRequest: angular.identity
              //lets the browser decide that it's multipart form, if defined as multipart process throws error
              , headers: { 'Content-Type': undefined }  
            })
          }
          $location.path('/admin/main/' + $rootScope.user.id);
        });      

	  }, factory_update_employee : function(id, data){

      $http
        .put('/api/employee/' + id, data)
        .success(function(){
          if (data.pic !== undefined ){
            var fd = new FormData();
            fd.append('file', data.pic);
            $http.post('/api/upload_file/' + id, fd, {
              transformRequest: angular.identity
              //lets the browser decide that it's multipart form, if defined as multipart process throws error
              , headers: { 'Content-Type': undefined }  
            })
          }
          $location.path('/admin/main/' + $rootScope.user.id);
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
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

//file upload service: created service so could be accessed in multiple controller or could have been written directly in controller
// myApp.service('fileUpload', function($http) {
//     this.uploadFileToUrl = function(file, uploadUrl) {
//         //encapsulates the file in form data to pass it to the route
//         var fd = new FormData();
//         fd.append('file', file);
//         $http.post(uploadUrl, fd, {
//             transformRequest: angular.identity,
//             //lets the browser decide that it's multipart form, if defined as multipart process throws error
//             headers: {
//                 'Content-Type': undefined
//             }
//         })
//             .success(function() {})
//             .error(function() {});
//     }
// });







    }, factory_upload_file: function(file){
//    	console.log("in javascripts/factories/EmployeeFactory/factory_upload_file with data: ", file);
          //encapsulates the file in form data to pass it to the route
// console.log(file);
//           var fd = new FormData();
//           fd.append("File", file);
//           // fd.append("test", "if this doesn't work...");
// console.log(fd);
//           $http.post('/upload_file', fd, {
//               transformRequest: angular.identity,
//               //lets the browser decide that it's multipart form, if defined as multipart process throws error
//               headers: {
//                   'Content-Type': undefined
//               }
//           })
//             .success(function() {})
//             .error(function() {});
//              $http.post('/api/upload', {file: '/uploads/' + file.name})













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
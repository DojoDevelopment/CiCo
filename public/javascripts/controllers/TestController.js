app.controller('TestController', function($scope, EmployeeFactory) {

  $scope.upload_file = function(){
    var imgFile = $scope.imgFile;
    EmployeeFactory.factory_upload_file(imgFile);
  }

});
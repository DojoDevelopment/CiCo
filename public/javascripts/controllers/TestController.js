app.controller('TestController', function($scope, fileUpload) {

  $scope.upload_file = function(){
    var imgFile = $scope.imgFile;
    console.log(imgFile);
    fileUpload.uploadFileToUrl(imgFile, '/upload_file');
    
  }

});
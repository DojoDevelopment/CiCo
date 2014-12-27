//USED IN CONTROLLER: business
app.factory('BusinessFactory', function($http){
  return {

    get_business_info : function(business_id, callback) {

      $http
        .get('/api/business/' + business_id)
        .success(function(data){
          callback(data);
      });
      
    }, update_business_info : function(info, callback) {

      $http
        .put('/api/business', info)
        .success(function(data){
          callback(data);
      });

    }
  }
});
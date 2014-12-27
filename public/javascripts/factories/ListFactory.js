//USED IN CONTROLLER: user_dashboard, admin_dashboard, employee, employeeInfo, history
app.factory('ListFactory', function($http){
  return {

    used_locations : function(callback){

      $http
        .get('/api/list_used_locations')
        .success(function(data){
          callback(data);
      });

    }, all_locations : function(callback){

      $http
        .get('api/list_all_locations')
        .success(function(data){
          callback(data);
      });

    }, members : function(callback){

      $http
        .get('api/list_members')
        .success(function(data){
          callback(data);
      });

    }, supervisors : function(callback){

      $http
        .get('/api/list_supervisors')
        .success(function(data){
          callback(data);
      });

    }

  };
});
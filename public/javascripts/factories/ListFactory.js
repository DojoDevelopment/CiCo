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
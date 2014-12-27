//USED IN CONTROLLER: user_dashboard, clockout
app.factory('ClockingFactory', function($http, $location){
  return {
    
    clock_in: function(user, callback){

      $http
        .post('/api/clock_in/'+ user)
        .success(
          $location.path('main')
        );

    }, clock_out: function(id, info){

      $http
        .post('/api/clock_out/' + id, info)
        .success(
          $location.path('main')
        );

    }, last_clocking: function(info, callback){

      $http
        .get('/api/last_clocking/' + info)
        .success(function(data){
          callback(data);
        })
    }
  };
});
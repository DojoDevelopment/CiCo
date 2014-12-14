app.factory('LoginFactory', function($http, $location){

  return {

    factory_get_ip : function(callback){

      $http
        .get('http://ipinfo.io/json')
        .success(function(data){
          callback(data.ip);
      });

    }, factory_check_ip : function(info){

      $http.post('/api/check_ip', info)
        .success(function(){
          $location.path('/main')
        })
        .error(function(){
          $location.path('/')
        });

    }, login : function(credentials){
    
      $http
        .post('/api/login', credentials)
        .success(function(data){

          if (data.login && data.admin){
            $location.path('admin');
          } else if (data.login && !data.admin) {
            $location.path('user/' + data.id)
          } 
        });

    }, logout : function(){
    
      $http
        .get('/api/logout')
        .success(function(){
          $location.path('/')
        });
    }
  };
});
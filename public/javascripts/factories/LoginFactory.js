app.factory('LoginFactory', function($http, $location, $rootScope){

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
          $rootScope.business = { id : 1 }
          $location.path('/main')
        })
        .error(function(){
          console.log('error');
          $location.path('/')
        });

    }, login : function(credentials){
    console.log('factory', credentials);
      $http
        .post('/api/login', credentials)
        .success(function(data){
          console.log('in success');
          if (data.id){
            $rootScope.user = {
                id    : data.id
              , admin : data.admin
              , login : true
            };
          }
          $location.path((data.admin == true ? 'admin/main/' : 'user/') + data.id);

        })
        .error(function(data){
          console.log('in error');
          $location.path('/'); 
        });

    }, logout : function(){
    
      $http
        .get('/api/logout')
        .success(function(){
          $rootScope.user = null;
          $rootScope.business = null;
          $location.path('/'); 
        });
    }
  };
});
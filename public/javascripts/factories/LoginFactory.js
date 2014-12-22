app.factory('LoginFactory', function($http, $location, $rootScope){

  return {
    factory_check_ip : function(){

      $http
        .get('http://ipinfo.io/json')
        .success(function(data){
          $http
            .post('/api/check_ip', {ip : data.ip})
            .success(function(data){
              $rootScope.business = { id : data.id }
              $location.path('/main')
          })
            .error(function(){
              $location.path('/')
          });
      });

    }, login : function(credentials){

      $http
        .post('/api/login', credentials)
        .success(function(data){
console.log(data);
          if (data.id){
            $rootScope.user = {
                id    : data.id
              , admin : data.admin
              , login : true
            };
            $rootScope.business = {id : 1}
          }

          $location.path((data.admin == true ? '/dashboard' : '/user/' + data.id));

        })
        .error(function(data){
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
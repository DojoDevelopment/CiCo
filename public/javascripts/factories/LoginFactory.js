app.factory('LoginFactory', function($http, $location, $rootScope){

  return {
    check_ip : function(){

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

    }, login : function(form){

      $http
        .post('/api/login', form)
        .success(function(data){

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
          $rootScope.user.id = null;
          $rootScope.business = null;
          $location.path('/'); 
        });
        
    }, register : function(form, callback){

      $http
        .post('/api/register', form)
        .success(function(data){
          console.log(data);
          $rootScope.user = {
              id : data.id
            , admin : true
            , login : true
          }
         $rootScope.business = {id : data.business}
         $location.path('/add_employee');
        })
        .error(function(data){
          callback(data);
        })
    }
  };
});
angular.module('fickle.services', [])

.factory('Auth', function ($http, $location, $window) {

    var login = function (user) {
      return $http({
          method: 'POST',
          url: '/signin',
          data: user
        })
        .then(function (resp) {
          return resp.data.token;
        });
    };

    var signup = function (user) {
      console.log("in service controller signup")
      return $http({
          method: 'POST',
          url: '/signup',
          data: user
        })
        .then(function (resp) {
          console.log("response from server",resp)
          return resp.data.token;
        });
    };

    return {
      login: login,
      signup: signup,
    };
});
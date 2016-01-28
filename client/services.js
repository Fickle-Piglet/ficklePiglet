angular.module('fickle.services', [])

.factory('Auth', function ($http, $location, $window) {
    var signin = function (user) {
      console.log("in signin controller")
      return $http({
          method: 'POST',
          url: '/signin',
          data: user
        })
        .then(function (resp) {
          console.log("response",resp.data.data)
          return resp.data;
        });
    }
    var signup = function (user) {
      return $http({
          method: 'POST',
          url: '/signup',
          data: user
        })
        .then(function (resp) {
          return resp.data;
        });
    };
    return {
      signin: signin,
      signup: signup,
    };
})

.factory('Podcasts', function ($http, $location, $window) {
    var getTags = function () {
       return $http({
            method: 'GET',
            url: '/tags',
          })
          .then(function (resp) {
            return resp.data;
          });
    };
    var getPodcasts = function () {
      return $http({
           method: 'POST',
           url: '/getResource',
         })
         .then(function (resp) {
           return resp.data;
         });
    };

    return {
      getTags: getTags,
      getPodcasts: getPodcasts,
    };
});
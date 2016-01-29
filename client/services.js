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
  var resources = [];
    var getTags = function () {
       return $http({
            method: 'GET',
            url: '/tags',
          })
          .then(function (resp) {
            return resp.data;
          });
    };

    var getPodcasts = function (resource) {
      return $http({
        method: 'POST',
        url: '/getResource',
        data: resource
      })
      .then(function (resp) {
        resources = resp.data;
      });
      
    };
    var GetRec = function (callback) {
        callback(resources);
    }

    return {
      getTags: getTags,
      getPodcasts: getPodcasts,
      GetRec: GetRec
    };
})
.factory('User', function ($http, $location, $window) {
  var getUser = function (user) {
    return $http({
      method: 'GET',
      url: '/user/' + user
    })
    .then(function (res) {
      return res.data;
    });
  };

  return {
    getUser: getUser
  };
})
.factory('UserResources', function ($http, $location, $window) {

    var likeResource = function (userPref) {
      console.log("userPref",userPref)
      return $http({
        method: 'POST',
        url: '/likeResource',
        data: userPref
      })
      .then(function (resp) {
        return resp.status;
      });
    };

    var dislikeResource = function (userPref) {
      return $http({
        method: 'POST',
        url: '/dislikeResource',
        data: userPref
      })
      .then(function (resp) {
        return resp.status;
      });
    };

    return {
      likeResource: likeResource,
      dislikeResource: dislikeResource
    };
});

angular.module('fickle.user',['ngMaterial', 'ngMessages'])

.controller('userController', function ($scope, $window, $location, User) {
  // console.log("ITEM: ", $window.localStorage.getItem('com.fickle'));
  $scope.likedResources = [];
  $scope.dislikedResources = [];

  User.getUser($window.localStorage.getItem('com.fickle'))
  .then(function (user) {
  });

  User.getLikes($window.localStorage.getItem('com.fickle')).then(function(res) {
    $scope.likedResources = res;
    console.log("hey", res);
  });

  User.getDislike($window.localStorage.getItem('com.fickle')).then(function(data){
    $scope.dislikedResources = data;
    console.log("dislike", data);
  })
});

angular.module('fickle.user',['ngMaterial', 'ngMessages'])

.controller('userController', function ($scope, $window, $location, User) {
  // console.log("ITEM: ", $window.localStorage.getItem('com.fickle'));
  User.getUser($window.localStorage.getItem('com.fickle'))
  .then(function (user) {
    console.log(user);
  });

  $scope.like = function(resource){
    var user = JSON.parse(window.localStorage.getItem('com.fickle'));
    User.getLikes()
    .then(function(message){
      if(message ===200){
      	console.log("yayy")
      }
    })
    .catch(function (error) {
      console.error(error);
    });
  };
});
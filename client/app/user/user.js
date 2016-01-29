angular.module('fickle.user',['ngMaterial', 'ngMessages'])

.controller('userController', function ($scope, $window, $location, User) {
  // console.log("ITEM: ", $window.localStorage.getItem('com.fickle'));
  User.getUser($window.localStorage.getItem('com.fickle'))
  .then(function (user) {
    console.log(user);
  });
});
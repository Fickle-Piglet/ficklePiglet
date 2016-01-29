angular.module('fickle.auth', [])

.controller('AuthController', function ($scope, $http, $location, $window , Auth) {


  // login function to be called when input form submitted
  $scope.signin = function (user) {
      $scope.error = '';
      if(!user) {
        var userData = {
          "username":$scope.username,
          "password":$scope.password
        }
      } 
      Auth.signin(JSON.stringify($scope.user))
        .then(function(message){
          // messages is an array with one object that contains our user info
          // setting that information in local storage
          // should be refactored to use jwt at some point
          window.localStorage.setItem('com.fickle', JSON.stringify(message[0]));
          $location.path('/search');
        })
        .catch(function (error) {
          console.error(error);
        });
    };

  // sign up function to be called when input form submitted
  $scope.signup = function () {
    // console.log($scope.user)
    $scope.signUpError = '';
    Auth.signup(JSON.stringify($scope.user))
    .then(function(message){
      if(message==="existing"){
        alert("You already have an account. Please login.");
      } else {
        $window.localStorage.setItem('com.fickle', JSON.stringify(message[0]));
        $location.path('/search');
      }
    });
  };

});

angular.module('enki.auth', [])

.controller('AuthController', function ($scope, $http, $location, $window, Auth, $state) {
  // login function to be called when input form submitted
  $scope.user = {};
  $scope.signin = function (user) {
      $scope.error = '';
      if(!user) {
        var userData = {
          "username":$scope.username,
          "password":$scope.password
        };
      } 
      Auth.signin(JSON.stringify($scope.user))
        .then(function(message){
          // messages is an array with one object that contains our user info
          // setting that information in local storage
          // should be refactored to use jwt at some point
          window.localStorage.setItem('com.fickle', JSON.stringify(message[0]));
          // $location.path('/search');
          $state.go('tab.searchElastic');
        })
        .catch(function (error) {
          console.error(error);
        });
    };

  // sign up function to be called when input form submitted
  $scope.signup = function () {
    clearFields();
    $scope.signUpError = '';
    Auth.signup(JSON.stringify($scope.user))
    .then(function(message){
      if(message==="existing"){
        alert("You already have an account. Please login.");
      } else {
        window.localStorage.setItem('com.fickle', JSON.stringify(message[0]));
        // $location.path('/search');
        $state.go('tab.searchElastic');
      }
    });
  };

  var clearFields = function () {
    for (var prop in $scope.user) {
      $scope.user[prop] = "";
    }
  };
  $scope.register = function() {
    
    $state.go('signup');
    console.log("Registration Page");
  };
});

angular.module('fickle.auth', [])

.controller('AuthController', function ($scope, $http, $location, Auth) {


  // login function to be called when input form submitted
  $scope.login = function (user) {
    $scope.error = '';
    if(!user) {
      var userData = {
        "username":$scope.username,
        "password":$scope.password
      }
    } 
    console.log("Attempting to login", userData)
    Auth.login(userData)
      .then(function(message){
          // $scope.clearFields();
          $scope.error = message;
      })
  };

  // sign up function to be called when input form submitted
  $scope.signup = function () {
    console.log($scope.user)
    $scope.signUpError = '';
    Auth.signup(JSON.stringify($scope.user))
    // .then(function(message){
      // $scope.clearFields();
    //   $scope.signUpError = message;
    // })
  };

});

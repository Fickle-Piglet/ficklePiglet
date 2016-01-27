angular.module('fickle.auth', [])

.controller('AuthController', function ($scope, $window, $http, $location, Auth) {


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
    Auth.login(JSON.stringify($scope.user))
      .then(function(message){
        $window.localStorage.setItem('com.fickle', message);
        $location.path('/search');
      })
      .catch(function (error) {
        console.error(error);
      });
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

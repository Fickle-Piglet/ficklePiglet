angular.module('enki.auth', [])

.controller('AuthController', function ($scope, $http, $location, $window, Auth, $state,$ionicPopup) {
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
          if(message==="Wrong Input"){
            var alertPopup = $ionicPopup.alert({
                 title: 'Incorrect User Information',
                 template: 'This user/password combination does not exisit.'
               });

            alertPopup.then(function(res) {
              console.log('Alerting the user this is not a valid combo');
            });
          } else {
            // messages is an array with one object that contains our user info
            // setting that information in local storage
            // should be refactored to use jwt at some point
            $window.localStorage.setItem('com.fickle', JSON.stringify(message[0]));
            $state.go('tab.searchElastic');            
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    };



  // sign up function to be called when input form submitted
  $scope.signup = function () {
    $scope.signUpError = '';
    Auth.signup(JSON.stringify($scope.user))
    .then(function(message){
      if(message==="existing"){
        var alertPopup = $ionicPopup.alert({
             title: 'Existing User',
             template: 'You have an existing account. Please login.'
           });

        alertPopup.then(function(res) {
          console.log('This person is already a user');
        });        
      } else {
        $window.localStorage.setItem('com.fickle', JSON.stringify(message[0]));
        // $location.path('/search');
        $state.transitionTo('tab.searchElastic'); 
      }
    });
    clearFields();
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
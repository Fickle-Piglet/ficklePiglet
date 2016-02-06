angular.module('enki.user',[])

.controller('userController', function ($scope, $window, $location, User, $state) {
  // console.log("ITEM: ", $window.localStorage.getItem('com.fickle'));
  $scope.likedResources = [];
  $scope.dislikedResources = [];

  User.getUser($window.localStorage.getItem('com.fickle'))
  .then(function (user) {
  });

	User.getLikes($window.localStorage.getItem('com.fickle')).then(function(data) {
	 $scope.likedResources = data;
	  });

  User.getDislike($window.localStorage.getItem('com.fickle')).then(function(data){
    $scope.dislikedResources = data;
  });

  $scope.logout = function() {
    window.localStorage.setItem('com.fickle', null);
    $state.go('login');
  };
});

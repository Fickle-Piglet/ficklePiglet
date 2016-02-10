angular.module('enki.user',[])

.controller('userController', function ($scope, $window, $location, User, $state, UserResources, $ionicHistory, $ionicLoading) {
  // console.log("ITEM: ", $window.localStorage.getItem('com.fickle'));
  $scope.likedResources = [];
  $scope.dislikedResources = [];
  var user = JSON.parse(window.localStorage.getItem('com.fickle'));
  var username = user.username;

  User.getUser($window.localStorage.getItem('com.fickle'))
  .then(function (user) {
  });

	User.getLikes($window.localStorage.getItem('com.fickle')).then(function(data) {
	 $scope.likedResources = data;
   console.log("LIKES: ", data);
	});

  User.getDislike($window.localStorage.getItem('com.fickle')).then(function(data){
    $scope.dislikedResources = data;
  });

  $scope.logout = function() {
    window.localStorage.setItem('com.fickle', null);
    window.localStorage.clear();
     setTimeout(function () {
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      // $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
      $state.go('login');
    }, 300);
  };

//   $scope.logout = function(){
//     $ionicLoading.show({template:'Logging out....'});
//     window.localStorage.setItem('com.fickle', null);

//     $timeout(function () {
//         $ionicLoading.hide();
//         $ionicHistory.clearCache();
//         $ionicHistory.clearHistory();
//         $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
//         $state.go('login');
//         }, 30);

// };

  $scope.onItemDelete = function(resource) {
    console.log("Attempted to Delete");
    var userpref = {
      'username' : username,
      'episodeTitle' : resource[0].title,
      'showName' : resource[1].name
    };
    console.log(userpref);
    UserResources.removeRelationship(userpref)
    .then(function(message){
      console.log("Response Message: ",message);
      if(message === 200){
        console.log("You have removed this like/dislke");
      }
    })
    .catch(function (error) {
      console.error(error);
    });
    $scope.likedResources.splice($scope.likedResources.indexOf(resource), 1);
  };
});

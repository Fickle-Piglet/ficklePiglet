angular.module('fickle.search',['ngMaterial', 'ngMessages'])

.controller('searchController', function($scope,Podcasts,UserResources) {
  $scope.items = ['Science', 'Technology', 'Engineering', 'Math'];
    $scope.selected = [];
    $scope.tags = [];
    $scope.results = [];
    
    Podcasts.getTags().then(function (data) {
      $scope.tags = data;
    });

    $scope.sendTags = function() {
      Podcasts.getPodcasts($scope.selected).then(function () {
        
      });
    }
    $scope.initGet = function(){
      Podcasts.GetRec(function(data){
        $scope.results = data
      })
    }

    //Podcasts.GetRec(function(data){
    //    $scope.results = data
    //})

    $scope.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) list.splice(idx, 1);
      else list.push(item.name);
    };

    $scope.exists = function (item, list) {
      return list.indexOf(item) > -1;
    };

    $scope.likeResource = function(resource){
      var user = JSON.parse(window.localStorage.getItem('com.fickle'));
      var username = user.username;
      var userpref = {
        'username' : username,
        'ResourceName' : resource
      }
      UserResources.likeResource(userpref)
      .then(function(message){
        if(message ===200){
          alert("You have liked this")
        }
      })
      .catch(function (error) {
        console.error(error);
      });
    };

    $scope.dislikeResource = function(resource){
      var user = JSON.parse(window.localStorage.getItem('com.fickle'));
      var username = user.username;
      var userpref = {
        'username' : username,
        'ResourceName' : resource
      }
      UserResources.dislikeResource(userpref)
      .then(function(message){
        if(message ===200){
          alert("You have disliked this")
        }
      })
      .catch(function (error) {
        console.error(error);
      });
    }

    
});
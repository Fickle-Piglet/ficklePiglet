angular.module('fickle.resource',['ngMaterial', 'ngMessages'])

.controller('resourceController', function($scope,Podcasts,UserResources) {
  $scope.items = ['Science', 'Technology', 'Engineering', 'Math'];
    $scope.selected = [];
    $scope.results = [];
    

    $scope.sendTags = function() {
      Podcasts.getPodcasts($scope.selected).then(function () {        
      });
    }

      Podcasts.GetRec(function(data){
          $scope.results = data
      })



    // $scope.selected_index = 0;

    $scope.next = function () {
      // if ($scope.selected_index >= $scope.results.length - 1) {
      //   $scope.selected_index = 0;
      // } else {
      //   $scope.selected_index++;
      // }
      // console.log($scope.results.length + '/' + $scope.selected_index);
      //$scope.selected= ["Education"]
      Podcasts.GetRec(function(data, rec){
        $scope.selected = rec
      })
      Podcasts.getPodcasts($scope.selected).then(function () {
        
      });
      Podcasts.GetRec(function(data, rec){
        $scope.results = data
      })

    };

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
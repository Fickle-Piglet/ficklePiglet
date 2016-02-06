angular.module('enki.resource',[])

.controller('resourceController', function($scope, Podcasts, UserResources) {
    $scope.selected = [];
    $scope.results = [];
    var user = JSON.parse(window.localStorage.getItem('com.fickle'));
    var username = user.username;

    Podcasts.getPodcasts(username).then(function (data){
      console.log(data)
      $scope.results = data;
    });

    $scope.parseDate = function(episode){
      return Date.parse(episode.pubDate);
    };
 
    $scope.next = function () {
      var userpref = {
        'username' : username
      }
      Podcasts.getPodcasts(username).then(function (data){
        $scope.results = data;
      });
      if(userpref) {
        Podcasts.getRec(userpref).then(function (data) {
           $scope.results = data;
        });
      }
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

    $scope.dislikeResource = function(resource){;
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


    $scope.markAsSeen = function(resource){
      console.log(resource)
      var userHasSeen = {
        'username' : username,
        'ResourceName' : resource
      }
      UserResources.markAsSeen(userHasSeen)
      .then(function(message){
        if(message ===200){
          console.log("updated DB that user has seen this")
        }
      })
      .catch(function (error) {
        console.error(error);
      });
    }
});
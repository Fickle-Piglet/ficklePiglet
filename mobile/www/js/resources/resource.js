angular.module('enki.resource',[])

.controller('resourceController', function ($scope, Podcasts, UserResources, $rootScope, $window, Search, $state) {

    $scope.myModel = {};
    $scope.search = function() {
        q = $scope.myModel.searchString;
        if (q.length > 1) {
            Search.searchPodcasts(q).then(function (data) {
                $scope.results2 = data.docsuggest[0].options;
            });
        } else {
            $scope.results2 = [];
        }
    };
    $scope.clearSearch = function(){
        $scope.results2 = [];
    };

    $scope.sendTags = function(selected) {
        $scope.clearSearch();
        var isShow = selected.payload.url ? true : false;
        var obj = {name: selected.text, isShow: isShow};
        console.log(obj);
        window.localStorage.removeItem('selected');
        window.localStorage.setItem('selected', JSON.stringify(selected));
        Podcasts.setTags(selected);
        // $state.go('tab.resource');
        window.localStorage.setItem('search', true);
        getPods();
    };
    $scope.selected = [];
    $scope.results = [];
    var user = JSON.parse($window.localStorage.getItem('com.fickle'));
    var username = user.username;

    function getPods (){
      var queue = JSON.parse($window.localStorage.getItem('podcastQueue'));
      console.log("queue",queue);
      if(queue === null || !queue.length > 0 || $window.localStorage.getItem('search')) {
        Podcasts.getPodcasts(username).then(function (data){
          console.log(data);
          $scope.results = data[0];
          data.shift()
          $window.localStorage.setItem('podcastQueue', JSON.stringify(data));
          $window.localStorage.removeItem('search');
          $window.location.reload(true);
        });  
      } else if (queue.length > 0) {
        $scope.results = queue[0];
        console.log(queue)
        console.log(queue[0])
        $window.localStorage.removeItem('podcastQueue');
        queue.shift();
        console.log(queue);
        $window.localStorage.setItem('podcastQueue', JSON.stringify(queue))
      }
    }
    
    getPods();
    // $rootScope.$on('$stateChangeSuccess', 
    // function(event, toState, toParams, fromState, fromParams) {
    //   // console.log("toState: ",toState,"fromState: ", fromState);
    //   if (toState.name === 'tab.resource' && $window.localStorage.getItem('search')) {
    //     console.log('new search now!');
    //     getPods();
    //   }
    // });


    // Podcasts.getPodcasts(username).then(function (data){
    //   console.log(data)
    //   $scope.results = data;
    // });

    $scope.parseDate = function(episode){
      return Date.parse(episode.pubDate);
    };
 
    $scope.next = function () {
      getPods ();
      // var userpref = {
      //   'username' : username
      // }
      // Podcasts.getPodcasts(username).then(function (data){
      //   $scope.results = data;
      // });
      // if(userpref) {
      //   Podcasts.getRec(userpref).then(function (data) {
      //      $scope.results = data;
      //   });
      // }
    };

    $scope.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) list.splice(idx, 1);
      else list.push(item.name);
    };

    $scope.exists = function (item, list) {
      return list.indexOf(item) > -1;
    };

    $scope.likeResource = function(episodeTitle, showName){
      var userpref = {
        'username' : username,
        'episodeTitle' : episodeTitle,
        'showName' : showName
      };
      console.log(userpref);
      UserResources.likeResource(userpref)
      .then(function(message){
        console.log("Return from Like: ",message);
        if(message ===200){
          console.log("You have liked this");
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
          console.log("You have disliked this")
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
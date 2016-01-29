angular.module('fickle.resource',['ngMaterial', 'ngMessages'])

.controller('resourceController', function($scope,Podcasts) {
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
      Podcasts.getPodcasts($scope.selected).then(function () {
        
      });
      Podcasts.GetRec(function(data){
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
});
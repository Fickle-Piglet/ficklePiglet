angular.module('fickle.search',['ngMaterial', 'ngMessages'])

.controller('searchController', function($scope,Podcasts) {
  $scope.items = ['Science', 'Technology', 'Engineering', 'Math'];
    $scope.selected = [];
    $scope.tags = [];
    
    Podcasts.getTags().then(function (data) {
      $scope.tags = data;
    });

    $scope.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) list.splice(idx, 1);
      else list.push(item);
    };

    $scope.exists = function (item, list) {
      return list.indexOf(item) > -1;
    };
});
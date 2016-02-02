angular.module('fickle.elasticSearch', [])
.controller('elasticController', function ($scope, Search) {
  $scope.search = function() {
    q = $scope.searchString;
    if (q.length > 1) {
      Search.searchPodcasts(q).then(function (data) {
       $scope.results = data.docsuggest[0].options;
       console.log($scope.results)
      });
    } else {
      $scope.results = [];
    }
  };
});


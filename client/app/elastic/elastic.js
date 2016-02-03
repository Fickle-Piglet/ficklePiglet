angular.module('fickle.elasticSearch', [])
.controller('elasticController', function ($scope, Search,Podcasts) {
  $scope.search = function() {
    q = $scope.searchString;
    if (q.length > 1) {
      Search.searchPodcasts(q).then(function (data) {
       $scope.results = data.docsuggest[0].options;
      });
    } else {
      $scope.results = [];
    }
  };

  $scope.sendTags = function(selected) {
      Podcasts.setTags(selected);
    }
});


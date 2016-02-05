angular.module('fickle.elasticSearch', [])
.controller('elasticController', function ($scope, Search,Podcasts) {
  $scope.search = function() {
    q = $scope.searchString;
    if (q.length > 1) {
      Search.searchPodcasts(q).then(function (data) {
       $scope.results = data.docsuggest[0].options;
       // console.log(data);
      });
    } else {
      $scope.results = [];
    }
  };

  $scope.sendTags = function(selected) {
      var isShow = selected.payload.url ? true : false;
      var obj = {name: selected.text, isShow: isShow};
      console.log(obj);
      Podcasts.setTags(selected);
      
    };
});


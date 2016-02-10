angular.module('enki.elasticSearch', [])
.controller('elasticController', function ($scope, Search,Podcasts,$state) {
    $scope.myModel = {};
    $scope.search = function() {
      q = $scope.myModel.searchString;
      if (q.length > 1) {
        Search.searchPodcasts(q).then(function (data) {
         $scope.results = data.docsuggest[0].options;
        });
      } else {
        $scope.results = [];
      }
    };

    $scope.sendTags = function(selected) {
      var isShow = selected.payload.url ? true : false;
      var obj = {name: selected.text, isShow: isShow};
      console.log(obj);
      window.localStorage.removeItem('selected');
      window.localStorage.setItem('selected', JSON.stringify(selected));
      Podcasts.setTags(selected);
      $state.go('tab.resource');
      window.localStorage.setItem('search', true);
    };
      
});
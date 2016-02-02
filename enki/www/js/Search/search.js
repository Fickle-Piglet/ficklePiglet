angular.module('enki.search',[])

.controller('searchController', function($scope, Podcasts, $state) {
  $scope.items = ['Science', 'Technology', 'Engineering', 'Math'];
    $scope.selected = [];
    $scope.tags = [];
    // $scope.results = [];
    
    Podcasts.getTags().then(function addCheckedAndSave(data) {
      for (var i = 0; i < data.length; i ++) {
        data[i].checked = false;  
      }
      $scope.tags = data;
    });

    $scope.sendTags = function() {
      for (var i = 0; i < $scope.tags.length; i ++) {
        if ($scope.tags[i].checked === true) {
          $scope.selected.push($scope.tags[i].name);  
        }
      }
      // console.log($scope.selected);
      Podcasts.setTags($scope.selected);
      $state.go('tab.resource');
    };

    // $scope.toggle = function (item, list) { 
    //   var idx = list.indexOf(item);
    //   if (idx > -1) list.splice(idx, 1);
    //   else list.push(item.name);
    // };

    // $scope.exists = function (item, list) {
    //   return list.indexOf(item) > -1;
    // };
  
});
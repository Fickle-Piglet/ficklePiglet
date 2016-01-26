// angular.module('fickle', ['fickle.search'])
// .config(function ($stateProvider) {
// 	$stateProvider
// 		.when('/', {
// 			templateUrl: 'app/Search/search.html',
// 			controller: 'searchController'
// 	})
// })

angular.module('fickle', ['ngMaterial', 'ngRoute'])
	.config(function ($stateProvider){
		$stateProvider
    .state('/', {
      url: "/search",
      templateUrl: "Search/search.html",
      controller: 'searchController'
    });
	})
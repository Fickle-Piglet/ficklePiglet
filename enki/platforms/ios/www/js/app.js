// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var enki = angular.module('enki', [
  'ionic',
  'enki.auth',
  'enki.user',
  'enki.search',
  'enki.resource',
  'enki.services'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

enki.config(function($stateProvider, $urlRouterProvider){
  // $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
  })
    .state('tab.login', {
    url: '/login',
    views: {
      'tab-login': {
        templateUrl: 'js/login/login.html',
        controller: 'AuthController'
      }
    }
  })
    .state('tab.search', {
    url: "/search",
    views: {
      'tab-search': {
        templateUrl: "js/Search/search.html",
        controller: 'searchController'
      }
    }
  })
   .state('tab.resource', {
    url: '/resource',
    views: {
      'tab-resource': { 
        templateUrl: 'js/resources/resource.html',
        controller: 'resourceController'
      }
    }
  })
  .state('tab.user', {
    url: "/user",
    views: {
      'tab-user': {
        templateUrl: "js/user/user.html",
        controller: 'userController'
      }  
    }
  });
  
  $urlRouterProvider.otherwise('/tab/login');
});

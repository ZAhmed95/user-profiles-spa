'use strict';

// Declare app level module which depends on views, and core components
angular.module('userProfilesSPA', [
  'ngRoute',
  'userProfilesSPA.session',
  'userProfilesSPA.home',
  'userProfilesSPA.profile',
  'userProfilesSPA.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
}]).
run(function($rootScope){
  // simulates the mongoDB store for now
  $rootScope.users = {
    // seed data
    'zia': {
      username: 'zia',
      age: 23,
      avatar: 'images/avatar1.jpg'
    }
  }
  // global session variable
  // TODO: use SessionStore instead
  $rootScope.session = {}
});

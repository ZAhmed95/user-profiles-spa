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
run(['$rootScope', '$location', function($rootScope, $location){
  // global session variable
  // Use localStorage if available, otherwise just an object
  let session = {};
  if (localStorage){
    session.set = (key, value)=>{
      localStorage.setItem(key, JSON.stringify(value));
    }
    session.get = (key)=>{
      let value = localStorage.getItem(key);
      return JSON.parse(value);
    }
    session.remove = (key)=>{
      localStorage.removeItem(key);
    }
  }
  else {
    // if localStorage is not available, use a standard object
    session.set = (key, value)=>{
      session[key] = value;
    }
    session.get = (key)=>{
      return session[key];
    }
    session.remove = (key)=>{
      delete session[key];
    }
  }
  $rootScope.session = session;

  // NOTE: the code for logging a user out below should NOT be here,
  // it should be in a service that maintains user session.
  // this is a hotfix.

  // for logout
  $rootScope.endSession = function(){
    session.remove('user');
  }
  $rootScope.logout = function(){
    $rootScope.endSession();
    $location.path('/');
  }

  // check if a user session already exists
  if (session.get('user')){
    // if so, redirect to the profile page
    $location.path('/profile');
  }
}]);

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
  }
  else {
    // if localStorage is not available, use a standard object
    session.set = (key, value)=>{
      session[key] = value;
    }
    session.get = (key)=>{
      return session[key];
    }
  }
  $rootScope.session = session;
});

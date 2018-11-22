'use strict';

angular.module('userProfilesSPA.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.test = function(){
    $http({
      method: 'GET',
      url: '/test',
    })
    .then(
      function(response){
        console.log(response);
      },
      function(error){
        console.log(error);
      }
    );
  }
}]);
'use strict';

angular.module('userProfilesSPA.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'profile/show.html',
    controller: 'ProfileCtrl'
  });
}])

.controller('ProfileCtrl', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {
  let user = $scope.session.get('user');
  // can't access this page without first logging in
  if (!user){
    $location.path('/login');
    return;
  }
  $scope.user = user;
  // create the avatar url
  user.avatarURL = (user.avatarID) ? `/avatars/${user.avatarID}` : '/images/default_avatar.jpg';
}]);
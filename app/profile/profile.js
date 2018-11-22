'use strict';

angular.module('userProfilesSPA.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'profile/show.html',
    controller: 'ProfileCtrl'
  });
}])

.controller('ProfileCtrl', ['$scope', '$location', function($scope, $location) {
  let user = $scope.session.user;
  // can't access this page without first logging in
  if (!user){
    $location.path('/login');
    return;
  }
  // create the avatar url
  user.avatarURL = (user.avatarID) ? `/avatars/${user.avatarID}` : '/images/default_avatar.jpg';
}]);
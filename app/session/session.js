'use strict';

angular.module('userProfilesSPA.session', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'session/user_form.html',
    controller: 'SessionCtrl'
  });

  $routeProvider.when('/login', {
    templateUrl: 'session/login.html',
    controller: 'SessionCtrl'
  });
}])

.controller('SessionCtrl', ['$scope', '$location', '$http', 
function($scope, $location, $http) {
  // initialize form parameters
  $scope.username = "";
  $scope.age = "";

  // take the user from the DB and assign it to current session
  // this function gets called upon both successful signup and login
  $scope.newSession = function(user){
    $scope.session.user = {
      username: user.n,
      age: user.a,
      avatarID: user.i
    };
  }

  // for signup
  $scope.errors = {username: "", age: "", avatar: ""};
  $scope.signup = function(){
    // check if the entered form fields pass validations
    let valid = $scope.validateFields();
    if (!valid) return;

    let username = $scope.username;
    let age = $scope.age;
    let avatar = $scope.avatar;

    let data = new FormData();
    data.append("username", username);
    data.append("age", age);
    if (avatar){
      data.append("avatar", avatar, avatar.name);
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/signup', true);
    xhr.responseType = "json";
    xhr.onload = function(){
      let data = xhr.response;
      console.log(data);
      switch(data.type){
        case "success":
        $scope.newSession(data.user);
        $location.path('/profile');
        $scope.$apply();
        console.log("Success");
        break;
        case "error":
        $scope.errors[data.scope] = data.message;
        $scope.$apply();
        break;
      }
    }
    xhr.send(data);
  }
  // run validations on each form field
  $scope.validateFields = function(){
    let valid = true;
    // username validations
    if ($scope.username == ""){
      $scope.errors.username = "username cannot be empty";
      valid = false;
    }
    else if (/[^a-z0-9_]/i.test($scope.username)){
      // if username contains any character that's not alphanumeric (A-Z, a-z, 0-9)
      // or an underscore, reject it
      $scope.errors.username = "username can only contain A-Z, a-z, 0-9, or underscores";
      valid = false;
    }
    else {
      $scope.errors.username = "";
    }

    // age validations
    if ($scope.age == ""){
      $scope.errors.age = "age cannot be empty";
      valid = false;
    }
    else if($scope.age <= 0){
      $scope.errors.age = "age must be a positive integer";
      valid = false;
    }
    else {
      $scope.errors.age = "";
    }

    // avatar validations
    if ($scope.avatar){
      if (!$scope.avatar.type.match('image.*')){
        $scope.errors.avatar = "avatar must be an image file";
        valid = false;
      }
      else {
        $scope.errors.avatar = "";
      }
    }

    return valid;
  }
  // function to handle uploading user avatar
  // should move this to a service
  $scope.fileChanged = function(elem){
    let file = elem.files[0];
    $scope.avatar = file;
  }

  // for login
  $scope.login = function(){
    let username = $scope.username;
    $http({
      method: 'POST',
      url: 'login',
      data: {username},
    }).
    then(
      function(response){
        let data = response.data;
        switch(data.type){
          case "success":
          $scope.newSession(data.user);
          $location.path('/profile');
          break;
          case "error":
          $scope.errors[data.scope] = data.message;
          $scope.$apply();
          break;
        }
      },
      function(error){
        console.log(error);
      }
    )
  }

  // for logout
  $scope.endSession = function(){
    delete $scope.session.user;
  }

  $scope.logout = function(){
    $scope.endSession();
    $location.path('/');
  }
}]);
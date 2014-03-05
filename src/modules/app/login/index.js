/*
 * client/js/main/index.js
 */
'use strict';

module.exports = angular.module('drmg.login', [
])

.config(function ($stateProvider) {
  $stateProvider
    .state('login', {
      url:            '/login',
      controller:     'LoginController',
      templateUrl:    '/login/templates/login.html'
    });
})

.controller('LoginController',
  function($scope, $state, googleLoginApi) {
    $scope.loggingInUser = {};
    $scope.login = function() {
      if ($scope.loggingInUser.email === 'TODO' &&
          $scope.loggingInUser.password === 'TODO') {
        $state.go('calendar');
      } else {
        $scope.loggingInUser.errors = {
          email: 'Invalid email & password combination'
        };
      }
    };
    $scope.auth_with_google = function() {
      googleLoginApi.login()
        .then(function(d) {
          $scope.user.name = d.name;
          $state.go('calendar');
        });
    };
  }
)


;

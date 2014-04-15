'use strict';

require('./user_service');

module.exports = angular.module( 'drmg.common.security.user', [
  'ui.router',
  'drmg.common.security.userService'
])

.config(
  function($stateProvider) {
    $stateProvider.state('login', {
      url:            '/login',
      controller:     'LoginController',
      templateUrl:    'common/security/user/templates/login.html'
    })
    .state('signup', {
      url:            '/signup',
      controller:     'SignupController',
      templateUrl:    'common/security/user/templates/signup.html'
    });
  }
)

.controller( 'LoginController',
  function LoginController( $scope, userService ) {

    $scope.user = {};

    // Attempt to authenticate the user specified in the form's model
    $scope.login = function() {
      // Clear any previous security errors
      $scope.authError = null;

      var msg = userService.login($scope.user.email, $scope.user.password);

      console.log('error', msg);

    };

    $scope.clearForm = function() {
      $scope.user = {};
    };

  }
)


.controller('SignupController',
  function SignupController($scope, userService) {
    $scope.user = {};

    $scope.signup = function() {
      var msg = userService.signup(
        $scope.user.email,
        $scope.user.password,
        $scope.user.passwordConfirmation
      );

      console.log('error', msg);
    };

  }
)

;

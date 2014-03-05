/*
 * client/js/main/index.js
 */

'use strict';

module.exports = angular.module('drmg.pages', [
])

.config(
  function ($stateProvider) {
    $stateProvider
      .state('about', {
        url:            '/about',
        controller:     'AboutController',
        templateUrl:    '/pages/about.html'
      });
  }
)

.controller('AboutController',
  function ($scope) {
    $scope.items = ['1', '2', '3'];
  }
)


;

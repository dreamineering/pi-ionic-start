'use strict';

var app = require('../../../src/modules/index');

describe('Home controllers: ', function(){

  beforeEach(angular.mock.module('drmg'));

  describe('simple test', function () {

    it('adds 1 + 1', function () {
      var add = 1 + 1;
      expect(add).toEqual(2);
    });

  });

  describe('TodoController', function () {
    // Local variables
    var TodoController, scope;

    beforeEach(inject(
      function($controller, $rootScope) {
        scope = $rootScope.$new();
        TodoController = $controller('TodoController', {
          $scope: scope
        });
      }
    ));

    // Testing the TodoController values
    it('should have projects', function() {
      expect(scope.projects).toBeDefined();
    });


  });


});

'use strict';

describe('Unit controllers: ', function(){

  beforeEach(module('drmg'));

  describe('simple test', function () {

    it('adds 1 + 1', function () {
      var add = 1 + 1;
      expect(add).toEqual(2);
    });

  });

});

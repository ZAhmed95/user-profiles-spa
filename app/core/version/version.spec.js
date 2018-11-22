'use strict';

describe('userProfilesSPA.version module', function() {
  beforeEach(module('userProfilesSPA.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});

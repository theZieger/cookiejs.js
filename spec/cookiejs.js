// load cookie lib
var cookiejs = require('../cookiejs');

/**
 * since we need browser context which we obviously don't have when running
 * tests inside node and not inside a browser environment
 * we simulate some browser APIs to make testing really easy
 */
describe('cookie', function() {
  beforeAll(function() {
    cookiejs.global.cookie = '';
  });

  describe('set function default values', function() {
    it('should be: "defaults=; path=/"', function() {
      cookiejs.set('defaults');
      expect(cookiejs.global.cookie).toEqual('defaults=; path=/');
    });
  });

  describe('argument sCookieName', function() {
    it('should be defined', function() {
      expect(cookiejs.set).toThrowError(TypeError);
    });

    it('should be a non falsy value', function() {
      expect(cookiejs.set.bind(null, '')).toThrowError(TypeError);
    });

    it('should be a string', function() {
      expect(cookiejs.set.bind(null, 123)).toThrowError(TypeError);
    });
  });

  describe('argument sValue', function() {
    it('can be undefined', function() {
      cookiejs.set('test');
      expect(cookiejs.global.cookie).toEqual('test=; path=/');
    });

    it('if given should be of type string', function() {
      expect(cookiejs.set.bind(null, 'test', function() {})).toThrowError(
        TypeError
      );
      expect(cookiejs.set.bind(null, 'test', 1)).toThrowError(TypeError);
      expect(cookiejs.set.bind(null, 'test', [])).toThrowError(TypeError);
      expect(cookiejs.set.bind(null, 'test', {})).toThrowError(TypeError);
    });

    it('should result in empty string for falsy values', function() {
      cookiejs.set('test', '');
      expect(cookiejs.global.cookie).toEqual('test=; path=/');
      cookiejs.set('test', false);
      expect(cookiejs.global.cookie).toEqual('test=; path=/');
      cookiejs.set('test', 0);
      expect(cookiejs.global.cookie).toEqual('test=; path=/');
      cookiejs.set('test', null);
      expect(cookiejs.global.cookie).toEqual('test=; path=/');
      cookiejs.set('test', undefined);
      expect(cookiejs.global.cookie).toEqual('test=; path=/');
    });
  });

  describe('argument oAttribute', function() {
    it('should be applied correctly', function() {
      cookiejs.set.bind(null, 'test', 'test', {
        domain: '.somedomain.com',
        path: '/somepath',
        'max-age': '60',
        secure: true,
        expires: 'atsometime'
      })();
      expect(cookiejs.global.cookie).toEqual(
        'test=test;domain=.somedomain.com;path=/somepath;max-age=60;secure;expires=atsometime'
      );
    });

    it('should be of type object', function() {
      expect(cookiejs.set.bind(null, 'test', 'test', [])).toThrowError(
        TypeError
      );
      expect(cookiejs.set.bind(null, 'test', 'test', false)).toThrowError(
        TypeError
      );
      expect(cookiejs.set.bind(null, 'test', 'test', 'options')).toThrowError(
        TypeError
      );
      expect(cookiejs.set.bind(null, 'test', 'test', 0)).toThrowError(
        TypeError
      );
    });

    it('property domain should be of type string', function() {
      expect(
        cookiejs.set.bind(null, 'test', 'test', {
          domain: 1
        })
      ).toThrowError(TypeError);
      expect(
        cookiejs.set.bind(null, 'test', 'test', {
          domain: []
        })
      ).toThrowError(TypeError);
    });

    it('property path should be of type string', function() {
      expect(
        cookiejs.set.bind(null, 'test', 'test', {
          path: 1
        })
      ).toThrowError(TypeError);
      expect(
        cookiejs.set.bind(null, 'test', 'test', {
          path: {}
        })
      ).toThrowError(TypeError);
    });

    it('property max-age should be of type string', function() {
      expect(
        cookiejs.set.bind(null, 'test', 'test', {
          'max-age': function() {}
        })
      ).toThrowError(TypeError);
      expect(
        cookiejs.set.bind(null, 'test', 'test', {
          'max-age': 60
        })
      ).toThrowError(TypeError);
    });

    it('property expires should be of type string', function() {
      expect(
        cookiejs.set.bind(null, 'test', 'test', {
          expires: 123
        })
      ).toThrowError(TypeError);
    });

    it('property secure should be of type boolean', function() {
      expect(
        cookiejs.set.bind(null, 'test', 'test', {
          secure: 0
        })
      ).toThrowError(TypeError);
      expect(
        cookiejs.set.bind(null, 'test', 'test', {
          secure: 1
        })
      ).toThrowError(TypeError);
      expect(
        cookiejs.set.bind(null, 'test', 'test', {
          secure: 'false'
        })
      ).toThrowError(TypeError);
    });
  });

  describe('cookie remove', function() {
    it('is performed correctly', function() {
      cookiejs.set('test', 'test', {
        domain: '.somedomain.com',
        path: '/somepath',
        'max-age': '60'
      });
      cookiejs.remove('test', {
        domain: '.somedomain.com',
        path: '/somepath',
        'max-age': '60'
      });
      expect(cookiejs.global.cookie).toEqual(
        'test=;domain=.somedomain.com;path=/somepath;max-age=60;expires=Thu, 01 Jan 1970 00:00:01 GMT'
      );
    });
  });
});

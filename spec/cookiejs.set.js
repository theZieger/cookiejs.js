// load cookie lib
var cookiejs = require('../src/cookiejs');

/**
 * since we need browser context which we obviously don't have when running
 * tests inside node and not inside a browser environment
 * we simulate some browser APIs to make testing really easy
 */
describe('cookie.set', function () {
    beforeAll(function () {
        cookiejs.global.cookie = '';
    });

    describe('default values', function () {
        it('should be: "defaults=; path=/"', function () {
            cookiejs.set('defaults');
            expect(cookiejs.global.cookie).toEqual('defaults=; path=/');
        });
    });

    describe('argument sCookieName', function () {
        it('should be defined', function () {
            expect(cookiejs.set).toThrowError(TypeError);
        });

        it('should be a non falsy value', function () {
            expect(cookiejs.set.bind(null, '')).toThrowError(TypeError);
        });

        it('should be a string', function () {
            expect(cookiejs.set.bind(null, 123)).toThrowError(TypeError);
        });
    });

    describe('argument sValue', function () {
        it('can be undefined', function () {
            cookiejs.set('test');
            expect(cookiejs.global.cookie).toEqual('test=; path=/');
        });

        it('should be of type string', function () {
            expect(cookiejs.set.bind(null, 'test', {})).toThrowError(TypeError);
        });
    });

    describe('argument oAttribute', function () {
        it('should be of type object', function () {
            expect(cookiejs.set.bind(null, 'test', 'test', [])).toThrowError(TypeError);
        });

        it('property domain should be of type string', function () {
            expect(cookiejs.set.bind(null, 'test', 'test', {
                domain: 'https://somedomain.com',
                path: '/somepath',
                'max-age': '60',
                secure: 'false',
                expires: 'atsometime',
            })).toThrowError(TypeError);
        });

        it('property domain should be of type string', function () {
            expect(cookiejs.set.bind(null, 'test', 'test', {
                domain: 'https://somedomain.com'
            })).toThrowError(TypeError);
        });

        it('property path should be of type string', function () {
            expect(cookiejs.set.bind(null, 'test', 'test', {
                path: '/somepath'
            })).toThrowError(TypeError);
        });

        it('property max-age should be of type string', function () {
            expect(cookiejs.set.bind(null, 'test', 'test', {
                'max-age': '60'
            })).toThrowError(TypeError);
        });

        it('property expires should be of type string', function () {
            expect(cookiejs.set.bind(null, 'test', 'test', {
                expires: 'atsometime',
            })).toThrowError(TypeError);
        });

        it('property secure should be of type string', function () {
            expect(cookiejs.set.bind(null, 'test', 'test', {
                secure: 'false',
            })).toThrowError(TypeError);
        });
    });
});
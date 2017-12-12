// load cookie lib
var cookiejs = require('../cookiejs');

/**
 * since we need browser context which we obviously don't have when running
 * tests inside node and not inside a browser environment
 * we simulate some browser APIs to make testing really easy
 */
cookiejs._root = { document: { cookie: ''} };

describe('cookie.set', function () {
    beforeAll(function () {
        cookiejs._root.document.cookie = '';
    });

    describe('default values', function () {
        it('should be: "defaults=; path=/"', function () {
            cookiejs.set('defaults');
            expect(cookiejs._root.document.cookie).toEqual('defaults=; path=/');
        });
    });

    describe('argument sCookieName', function () {

        it('should be defined', function () {
            expect(cookiejs.set.bind(cookiejs)).toThrowError(TypeError);
        });

        it('should be a non falsy value', function () {
            expect(cookiejs.set.bind(cookiejs, '')).toThrowError(TypeError);
        });

        it('should be a string', function () {
            expect(cookiejs.set.bind(cookiejs, 123)).toThrowError(TypeError);
        });
    });
});
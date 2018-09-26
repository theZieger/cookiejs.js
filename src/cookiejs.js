/*!
 * cookiejs.js | v1.0.0 | cookiejs object for setting/getting/removing cookies
 * Copyright (c) 2017 Eric Zieger (MIT license)
 * https://github.com/theZieger/cookiejs.js/blob/master/LICENSE
 */

/**
 * throwTypeError
 *
 * @param {String} sName
 * @param {String} sType
 *
 * @throws {TypeError}
 */
var throwTypeError = function(sName, sType) {
  throw new TypeError(sName + ' is not of type ' + sType);
};

/**
 * check variable (specifically sCookieName) for a non-falsy value and it's type to be string
 *
 * @param {String} sCookieName
 *
 * @throws {TypeError}
 */
var checkCookieName = function(sCookieName) {
  isString(sCookieName, 'sCookieName');
  if (!sCookieName) {
    throwTypeError('sCookieName', 'string');
  }
};

/**
 * check variable type to be a string
 *
 * @param {String} variableToTest
 * @param {String} name
 *
 * @throws {TypeError}
 */
var isString = function(variableToTest, name) {
  if (typeof variableToTest !== 'string') {
    throwTypeError(name, 'string');
  }
};

/**
 * check variable type to be an object
 *
 * @param {String} variableToTest
 *
 * @returns {bool}
 */
var isObject = function(variableToTest) {
  return typeof variableToTest === 'object' && !Array.isArray(variableToTest);
};

var cookiejs = {
  global: this.document ? this.document : { cookie: '' },

  /**
   * sets or overwrites a cookie
   *
   * @param {String} sCookieName - the name of the cookie you want to set
   * @param {String} sValue - the value you want to set
   * @param {String} oAttributes - options e.g. domain, path, expires
   *
   * @throws {TypeError} if argument sCookieName is empty or not a string
   */
  set: function(sCookieName, sValue, oAttributes) {
    var sAttributes = '';

    sValue = sValue || '';

    checkCookieName(sCookieName);

    isString(sValue, 'sValue');

    if (oAttributes === undefined) {
      sAttributes += '; path=/';
    } else {
      if (!isObject(oAttributes)) {
        throwTypeError('oAttributes', 'object');
      }

      Object.keys(oAttributes).forEach(function(sAttr) {
        var cookiePropValue = oAttributes[sAttr];

        if (sAttr === 'secure') {
          if (cookiePropValue !== true && cookiePropValue !== 'true') {
            throwTypeError(sAttr, 'boolean');
          }

          sAttributes += ';' + sAttr;
        } else {
          isString(cookiePropValue, sAttr);
          sAttributes += ';' + sAttr + '=' + cookiePropValue;
        }
      });
    }

    cookiejs.global.cookie =
      encodeURIComponent(sCookieName) +
      '=' +
      encodeURIComponent(sValue) +
      sAttributes;
  },

  /**
   * returns the value of a cookie
   *
   * @param {String} sCookieName
   *
   * @throws {TypeError}
   *
   * @returns {String|Boolean}
   */
  get: function(sCookieName) {
    var gCookieValue = false;

    checkCookieName(sCookieName);

    cookiejs.global.cookie.split('; ').some(function(sCookie) {
      var aCookie = sCookie.split('=');

      if (decodeURIComponent(aCookie[0]) === sCookieName) {
        gCookieValue = decodeURIComponent(aCookie[1]);
        return true;
      }

      return false;
    });

    return gCookieValue;
  },

  /**
   * removes a specific cookie
   *
   * oAttributes must contain the correct path and domain it won't
   * remove the cookie
   *
   * @param {String} sCookieName
   * @param {Object} oAttributes - options e.g. domain, path, expires
   *
   * @throws {TypeError}
   */
  remove: function(sCookieName, oAttributes) {
    var oRemoveAttributes = oAttributes || {};

    if (isObject(oRemoveAttributes)) {
      oRemoveAttributes.expires = 'Thu, 01 Jan 1970 00:00:01 GMT';
    }

    cookiejs.set(sCookieName, '', oRemoveAttributes);
  }
};

module.exports = cookiejs;

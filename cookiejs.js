(function(f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.cookiejs = f();
  }
})(function() {
  var define, module, exports;
  module = { exports: (exports = {}) };
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
    throw new TypeError(sName + " is not of type " + sType);
  };

  var cookiejs = {
    global: this.document ? this.document : { cookie: "" },

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
      var sAttributes = "";

      if (!sCookieName || typeof sCookieName !== "string") {
        throwTypeError("sCookieName", "string");
      }

      if (sValue && typeof sValue !== "string") {
        throwTypeError("sValue", "string");
      }

      if (oAttributes === undefined) {
        sAttributes += "; path=/";
      } else {
        if (typeof oAttributes !== "object" || Array.isArray(oAttributes)) {
          throwTypeError("oAttributes", "object");
        }

        Object.keys(oAttributes).forEach(function(sAttr) {
          if (sAttr === "secure") {
            // checking for not equal 'true' is for backwards compatability with older and wrong code
            if (
              typeof oAttributes[sAttr] !== "boolean" &&
              oAttributes[sAttr] !== "true"
            ) {
              throwTypeError(sAttr, "boolean");
            } else if (oAttributes[sAttr] === true) {
              sAttributes += ";" + sAttr;
              return;
            }
          } else if (typeof oAttributes[sAttr] !== "string") {
            throwTypeError(sAttr, "string");
          }

          sAttributes += ";" + sAttr + "=" + oAttributes[sAttr];
        });
      }

      cookiejs.global.cookie =
        encodeURIComponent(sCookieName) +
        "=" +
        encodeURIComponent(sValue || "") +
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

      if (!sCookieName || typeof sCookieName !== "string") {
        throwTypeError("sCookieName", "string");
      }

      cookiejs.global.cookie.split("; ").some(function(sCookie) {
        var aCookie = sCookie.split("=");

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

      if (
        typeof oRemoveAttributes === "object" &&
        !Array.isArray(oRemoveAttributes)
      ) {
        oRemoveAttributes.expires = "Thu, 01 Jan 1970 00:00:01 GMT";
      }

      cookiejs.set(sCookieName, "", oRemoveAttributes);
    }
  };

  module.exports = cookiejs;

  return module.exports;
});

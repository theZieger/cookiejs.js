/*!
 * cookiejs.js | v0.6.1 | cookiejs object for setting/getting/removing cookies
 * Copyright (c) 2017 Eric Zieger (MIT license)
 * https://github.com/theZieger/cookiejs.js/blob/master/LICENSE
 */
(function(root, factory) {
    /** global: define */
    if (typeof define === 'function' && define.amd) {
        define('cookiejs', factory);
    /** global: module */
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.cookiejs = factory();
    }
}(this, function() {

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

    return {
        /**
         * stands for 'root' and is only needed for logic testing
         * via jasmine inside the node environment
         */ 
        r: this,

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

            if (!sCookieName || typeof sCookieName !== 'string') {
                throwTypeError('sCookieName', 'string');
            }

            if (sValue && typeof sValue !== 'string') {
                throwTypeError('sValue', 'string');
            }

            if (!oAttributes) {
                sAttributes += '; path=/';
            } else {
                if (oAttributes !== 'object' || Array.isArray(oAttributes)) {
                    throwTypeError('oAttributes', 'object');
                }

                Object.keys(oAttributes).forEach(function(sAttr) {
                    if (typeof oAttributes[sAttr] !== 'string') {
                        throwTypeError(sAttr, 'string');
                    }

                    sAttributes += ';' + sAttr + '=' + oAttributes[sAttr];
                });
            }

            this.r.document.cookie = encodeURIComponent(sCookieName) + '='
                + encodeURIComponent(sValue || '') + sAttributes;
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

            if (!sCookieName || typeof sCookieName !== 'string') {
                throwTypeError('sCookieName', 'string');
            }

            this.r.document.cookie.split('; ').some(function(sCookie) {
                var aCookie = sCookie.split('=');

                if (decodeURIComponent(aCookie[0]) === sCookieName) {
                    gCookieValue = decodeURIComponent(aCookie[1]);
                    return true;
                }
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
            oAttributes = oAttributes || {};

            if (typeof oAttributes === 'object') {
                oAttributes.expires = 'Thu, 01 Jan 1970 00:00:01 GMT';
            }

            this.set(sCookieName, '', oAttributes);
        }
    };
}));
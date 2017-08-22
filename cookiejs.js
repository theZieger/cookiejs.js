/*!
 * cookiejs.js | v0.5.0 | cookiejs object for setting/getting/removing cookies
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
     * @type {Object}
     */
    var cookiejs = {};

    /**
     * @type {String}
     */
    var sExpireDate = 'Thu, 01 Jan 1970 00:00:01 GMT';

    /**
     * sets or overwrites a cookie
     *
     * @param {String} sCookieName - the name of the cookie you want to set
     * @param {String} sValue - the value you want to set
     * @param {String} oAttributes - options e.g. domain, path, expires
     *
     * @returns {String}
     */
    cookiejs.set = function(sCookieName, sValue, oAttributes) {
        var sAttributes = '';

        if (typeof oAttributes === 'object') {
            if (typeof oAttributes.path !== 'string') {
                sAttributes += '; path=/';
            }

            Object.keys(oAttributes).forEach(function(sAttrName) {
                sAttributes += ';' + sAttrName + '=' + oAttributes[sAttrName];
            });
        }

        document.cookie = encodeURIComponent(sCookieName) + '='
            + encodeURIComponent(sValue) + sAttributes;
    };

    /**
     * returns the value of a cookie
     *
     * @param {String} sCookieName
     *
     * @returns {String|Boolean}
     */
    cookiejs.get = function(sCookieName) {
        var aCookies,
            aCookie,
            gCookieValue = false;

        if (!sCookieName || typeof sCookieName != 'string') {
            return gCookieValue;
        }

        aCookies = document.cookie.split('; ');

        for (var i = aCookies.length - 1; i >= 0; i--) {
            aCookie = aCookies[i].split('=');
            if (decodeURIComponent(aCookie[0]) === sCookieName) {
                gCookieValue = decodeURIComponent(aCookie[1]);
            }
        }

        return gCookieValue;
    };

    /**
     * removes a specific cookie
     *
     * oAttributes must contain the correct path and domain else you can't
     * remove the cookie
     *
     * @param {String} sCookieName
     * @param {Object} oAttributes - options e.g. domain, path, expires
     */
    cookiejs.remove = function(sCookieName, oAttributes) {
        if (typeof oAttributes === 'object') {
            oAttributes.expires = sExpireDate;
        }

        this.set(sCookieName, '', oAttributes || {expires: sExpireDate});
    };

    return cookiejs;
}));

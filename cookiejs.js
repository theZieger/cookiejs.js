/**
 * cookiejs object for setting/getting/removing cookies
 */
var cookiejs = (function(undefined) {

    /**
     * @type {Object}
     */
    var cookiejs = {};

    /**
     * gets the current document.domain and returns .DOMAIN.TLD to make cookie accessable over all subdomains
     * 
     * @private
     * 
     * @returns {String}    representation of ".DOMAIN.TLD" of document.domain
     */
    var getCookieDomain = function() {
        return '.' + document.domain.split('.').slice(-2).join('.');
    };

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

        oAttributes = oAttributes || {
            domain: '; domain=' + getCookieDomain(),
            path: '; path=/'
        };

        if (oAttributes['domain'] === undefined) {
            sAttributes += '; domain=' + getCookieDomain();
        }

        if (oAttributes['path'] === undefined) {
            sAttributes += '; path=/';
        }

        Object.keys(oAttributes).forEach(function(sAttributeName) {
            sAttributes += ';' + sAttributeName + '=' + oAttributes[sAttributeName];
        });

        document.cookie = sCookieName + '=' + sValue + sAttributes;
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
            aCookie = [],
            gCookieValue = false;
        
        if (!sCookieName || typeof sCookieName != 'string') {
            return gCookieValue;
        }
        
        aCookies = document.cookie.split('; ');

        for (var i = aCookies.length - 1; i >= 0; i--) {
            aCookie = aCookies[i].split('=');
            if (aCookie[0] === sCookieName) {
                gCookieValue = aCookie[1];
            }
        }
        
        return gCookieValue;
    };

    /**
     * removes a specific cookie
     *
     * oAttributes must contain the correct path and domain else you can't remove the cookie
     *
     * @param {String} sCookieName
     * @param {Object} oAttributes - options e.g. domain, path, expires
     */
    cookiejs.remove = function(sCookieName, oAttributes) {
        oAttributes = oAttributes || {};
        oAttributes.expires = 'Thu, 01 Jan 1970 00:00:01 GMT';
        this.set(sCookieName, '', oAttributes);
    };

    return cookiejs;
}());
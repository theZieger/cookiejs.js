# cookiejs v0.2.0

> Set, get and remove cookies.

## Getting started

There is more than one way to use cookiejs.js inside your project. I prefer using npm for dependency management.

If you haven't used [npm](http://npmjs.com/) (Node Package manager) before, be sure to check out the [Getting Started](https://docs.npmjs.com/getting-started/what-is-npm) guide, as it explains how to install and use npm. Once you're familiar with that process, you may install the cookiejs.js module with this command inside your project:

```
npm install cookiejs.js --save-dev
```

Once the module has been installed, you may integrate that file into your build process (e.g concatenating and uglifying your JS with Grunt or whatever) since the `--save-dev` option is meant for development only.

## Available functions inside cookiejs.js

### cookiejs.set(sCookieName, sValue, oAttributes)

Sets a cookie.

```
// make sure cookiejs.js is already available when this code runs
cookiejs.set(
    'captainObvious', 
    'Thank you Captain Obvious, you just saved my life.',
    {
        domain: '.eric-zieger.de'                   // default: '.domain.tld',
        path: '/the-adventures-of-captain-obvious/' // default: '/',
        expires: sYourUTCString                     // default: undefined (session cookie)
        max-age: 60 // max-age-in-seconds           // default: undefined
        secure: true                                // default: undefined
    }
)
```

### cookiejs.get(sCookieName)

Get the value of a cookie.

```
// make sure cookiejs.js is already available when this code runs

cookiejs.get('captainObvious');

// returns 'Thank you Captain Obvious, you just saved my life.'
```

### cookiejs.remove(sCookieName, oAttributes)

Removes a cookie by overwriting the expires date.
When a custom domain and/or path atrribute is used you have to hand them as object into this function.
Else the cookie will not get removed.

```
// make sure cookiejs.js is already available when this code runs

cookiejs.remove(
    'captainObvious',
    {
        domain: '.eric-zieger.de'
        path: '/the-adventures-of-captain-obvious/'
    }
);
``` 
# cookiejs v0.1.0

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
### cookiejs.get(sCookieName)
### cookiejs.remove(sCookieName, oAttributes)
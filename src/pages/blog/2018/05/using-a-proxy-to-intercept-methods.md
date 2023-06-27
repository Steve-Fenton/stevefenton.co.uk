---
title: 'Using a proxy to intercept methods'
navMenu: false
pubDate: 2018-05-21T07:00:17+01:00
authors:
    - steve-fenton
bannerImage:
    src: /img/2018/05/esspresso-filter.jpg
    alt: Espresso filter
categories:
    - Programming
tags:
    - JavaScript
    - TypeScript
---

:::div{.inset}
:img{src="/img/2018/05/esspresso-filter.jpg" alt="Espresso filter"}
:::

This is just a short note on how to use an ECMAScript Proxy to intercept methods. There are plenty of examples that intercept properties, but examples with methods seem absent currently.

For demonstration purposes, we’re going to intercept a very famous method. The console log method takes any number of arguments of any type. This is the call we’re going to intercept:

```javascript
console.log('Test', 1);
```

To replace the original, we’ll create a new `Proxy`. This requires the original object, and a handler that will be called in its place. The proxy pretty much always looks the same – and object with a `get` function.

The `obj` parameter is the original object. That means you can supply original values back should you want to, for example if you need to pass back values from the original object. The `prop` parameter is the name of the property that has been requested. This will typically be a string, but remember it can also be a symbol. As I know the `log` method name will be a string, I can check for it with a conditional statement.

```javascript
const handler = {
    get: function (obj, prop) {

        if (prop === 'log') {
            return function (...arg: any[]) {
                alert(JSON.stringify(arg));
            };
        }
        
        return prop in obj ? obj[prop] : undefined;
    },

};

const oldConsole = console;
console = new Proxy(oldConsole, handler);
```

We have also cheekily replaced the original `console` with the proxy here. That means all exiting calls will now be routed to the handler and instead of logging to the console, it now alerts when you call: `console.log('Test', 1);`.

<small>[Filter image from MaxPixel](https://www.maxpixel.net/Filter-Background-Espresso-Espresso-Machine-Coffee-175301) [CC0 Public Domain](https://creativecommons.org/publicdomain/zero/1.0/)</small>
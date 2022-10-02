---
layout: src/layouts/Default.astro
title: AJAX Request Interceptor
navMenu: false
pubDate: 2021-02-02T11:06:44+00:00
authors:
    - steve-fenton
image: /wp-content/uploads/2021/02/angel-interceptor.jpg
categories:
    - Programming
tags:
    - ajax
    - javascript
---

This is a little funky script to intercept AJAX requests and raise a simple custom event for everything else in your app to listen to.

To use this, you just need to listen for a custom event named `AjaxDetected`. The method, url, and any data is passed in the event detail.

```javascript
document.body.addEventListener('AjaxDetected', function (e) {
    console.log(e.detail.method, e.detail.url, e.detail.data);
}, false);
```

This event is raised by code that inserts it’s own interceptor functions *before* the original `XMLHttpRequest` functions for `open` and `send`.

```javascript
(function () {
    const arl = new Object();
    arl._open = XMLHttpRequest.prototype.open;
    arl._send = XMLHttpRequest.prototype.send;
    arl.callback = function () {
        const event = new CustomEvent('AjaxDetected', {
            detail: {
                url: this.url,
                method: this.method,
                data: this.data
            }
        });
        document.body.dispatchEvent(event);
    }

    function notNullString(input) {
        return input || '';
    }

    XMLHttpRequest.prototype.open = function (a, b) {
        a = notNullString(a);
        b = notNullString(b);

        arl._open.apply(this, arguments);
        arl.method = a;
        arl.url = b;

        if (a.toLowerCase() == 'get') {
            arl.data = b.split('?');
            arl.data = notNullString(arl.data[1]);
        }
    }

    XMLHttpRequest.prototype.send = function (a, b) {
        a = notNullString(a);
        b = notNullString(b);

        arl._send.apply(this, arguments);

        if (arl.method.toLowerCase() == 'post') {
            arl.data = a;
        }

        arl.callback();
    }
}());
```
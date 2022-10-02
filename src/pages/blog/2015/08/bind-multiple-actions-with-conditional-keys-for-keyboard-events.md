---
layout: src/layouts/Default.astro
navMenu: false
title: 'Bind multiple actions with conditional keys for keyboard events'
pubDate: 2015-08-14T07:30:17+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - javascript
    - jquery
---

I don’t talk about jQuery very much because I avoid it wherever possible. However, I was working on some custom inputs that needed to respond to a number of events, including specific keys on the keyboard. To achieve this, I wrote a little jQuery extension called “bindactions” that allows you to get it all in one simple hit, with defaults to make the enter key and space bar active (and all other keys ignored).

Here is the full script:

```
<pre class="prettyprint lang-js">(function ($) {
    $.fn.bindactions = function (callback, options) {
        var settings = $.extend({
            events: "click touchstart keydown",
            keys: [13, 32]
        }, options);
        
        var keyFound = function (key) {
            for (var i = 0; i < settings.keys.length; i++) {
                if (key === settings.keys[i]) return true;
            }
            
            if (typeof console !== 'undefined') {
                console.log('Callback not run for key: ' + key);
            }
            
            return false;
        }

        this.bind(settings.events, function (event) {
            var runCallback = false;

            if (event.type && (event.type === "keydown" || event.type === "keyup" || event.type === "keypress")) {
                runCallback = keyFound(event.which);
            } else {
                runCallback = true;
            }

            if (runCallback) {
                event.preventDefault();
                callback.call(this, event);
                return false;
            }
        });

        return this;
    };
})(jQuery);
```
And you call it like this if you want the defaults:

```
<pre class="prettyprint lang-js">$('#example').bindactions(function () {
   alert('Yes'); 
});
```
And like this if you want to specify something…

```
<pre class="prettyprint lang-js">$('#example').bindactions(function () { alert('Yes'); }, {
    keys: [13]
});
```
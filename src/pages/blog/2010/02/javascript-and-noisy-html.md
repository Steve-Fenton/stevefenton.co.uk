---
id: 1057
title: 'JavaScript and Noisy HTML'
pubDate: '2010-02-10T22:06:45+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=1057'
permalink: /2010/02/javascript-and-noisy-html/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - html
    - javascript
---

I was answering a question on a popular coding forum and it once again highlighted the age old problem of terribly bad JavaScript. This was the HTML code in question:

```
<pre class="prettyprint lang-html"><a id="image1" href="#"><img src="image.png"></a>
```

And there was a bit of JavaScript adding an onclick event to the anchor tag.

An innocent looking example. An anchor tag containing an image tag. What could be wrong with such a tiny example?

### Noisy HTML

In this example, what does the anchor tag do? Nothing. It is just being used to “hold” the JavaScript event. This is HTML noise (which comes in many flavours). You could do exactly the same with this HTML:

```
<pre class="prettyprint lang-html"><img src="image.png" id="image1">
```

The anchor tag isn’t a magical tag that offers up the ability to add an onclick event handler. Any element in your HTML document can have this event added.

### Progressive enhancement

Of course, the noise issue is secondary to another issue with this example: What happens if the user or device doesn’t use JavaScript – or an error occurs somewhere in your JavaScript that prevents any further execution of your code?

Answer: Nothing.

The example if quite general, but if an onclick event is being added in JavaScript, something must be happening when it gets clicked. Usually, this is something like… a) see a larger version of the image they selected… b) it casts a vote… c) it takes them to a product page and so on – something is supposed to happen.

This is where the anchor tag could actually come in handy.

For example, if you were going to show a larger version of the image, like in a photo gallery, you should actually have:

```
<pre class="prettyprint lang-html"><a id="image1" href="largeimage.png"><img scr="image.png"></a>
```

And then override this default behaviour if JavaScript is enabled and working. That way, the web page works all the time for everyone. Without JavaScript, the large image is opened in the browser. With JavaScript, you could overlay the large image on the page or even animate it on and off the page (whatever you like!)
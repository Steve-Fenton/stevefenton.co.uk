---
layout: src/layouts/Default.astro
navMenu: false
title: 'CSS3 transitions and multiple transitions'
pubDate: 2011-05-27T19:05:10+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=939'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - CSS
---

CSS3 transitions have been with us for a little while now thanks to some browser-vendors adding custom transition support. The reason I’m shouting about it now is because it is actually pretty widely supported and it is now getting a point of maturity that means you can actually use it with reasonable confidence.

Of course, not all browsers support it, but the best thing about CSS3 transitions is that nobody will even notice if their browser isn’t supplying the funk.

So first up, here is a simple transition of the background-color property, with definitions for Firefox, WebKit and the official CSS3 property:

```
<pre class="prettyprint lang-css">
-moz-transition: background-color 500ms linear;
-o-transition: background-color 500ms linear;
-webkit-transition: background-color 500ms linear;
transition: background-color 500ms linear;
```
It is really simple and they all work in practically the same way. You tell it the property to transition, the duration and the easing and the browser just takes care of it all.

So *when* would the browser do stuff? Here is a more complete example to show it all off:

```
<pre class="prettyprint lang-css">
a {
    background-color: White;
    color: Orange;
    -moz-transition: background-color 500ms linear;
    -o-transition: background-color 500ms linear;
    -webkit-transition: background-color 500ms linear;
    transition: background-color 500ms linear;
}

a:hover {
    background-color: Orange;
    color: White;
}
```
In this example, when the user hovers on a link, instead of the link instantly transforming between orange-on-white to white-on-orange, it will fade gracefully.

This is great, but we have a gracefully fading background and a horrible instant-change on the text. Worry not – multiple transitions are also possible, just add multiple rules using a comma in between each. Like this:

```
<pre class="prettyprint lang-css">
a {
    background-color: White;
    color: Orange;
    -moz-transition: background-color 500ms linear, color 500ms linear;
    -o-transition: background-color 500ms linear, color 500ms linear;
    -webkit-transition: background-color 500ms linear, color 500ms linear;
    transition: background-color 500ms linear, color 500ms linear;
}

a:hover {
    background-color: Orange;
    color: White;
}
```
Now we have nice transitions on both background-color and color.

If you liked this article, please consider replaying me by adding this simple change to your CSS files – as it helps keyboard-based users to navigate around your website…

```
<pre class="prettyprint lang-css">
a {
    background-color: White;
    color: Orange;
    -moz-transition: background-color 500ms linear, color 500ms linear;
    -o-transition: background-color 500ms linear, color 500ms linear;
    -webkit-transition: background-color 500ms linear, color 500ms linear;
    transition: background-color 500ms linear, color 500ms linear;
}

a:hover, a:focus {
    background-color: Orange;
    color: White;
}
```
The a:focus will now highlight the current link when people use the tab-key to move around your website and you will have made the world a better place! Thank you!
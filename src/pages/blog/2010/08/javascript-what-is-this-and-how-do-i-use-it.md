---
layout: src/layouts/Default.astro
navMenu: false
title: 'JavaScript What is &#8220;this&#8221; and How Do I Use It'
pubDate: 2010-08-10T20:54:34+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1011'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - JavaScript
---

I was asked today to explain the “this” keyword in JavaScript, so here is a quick explanation of how it works…

### Simply `this` Example

```
<pre class="prettyprint lang-html">
<p onclick="alert(this.id);" id="example">Click On Me</p>
```
`this` is a great way of getting the HTML element that started off an event. In the little snippet above, `this` is the paragraph. When you call `this.id`, you get the id of the paragraph, i.e. “example”.

### Slightly More Complicated `this` Example

```
<pre class="prettyprint lang-html">
<p id="example">Click On Me</p>
<script>
    document.getElementById('example').onclick = function () {
        alert(this.id);
    };
</script>
```
This example works in exactly the same way as before, so you don’t have to put your events on the HTML element to use `this`. In this example we bind the event using JavaScript and everything directly inside of our function will magically understand that `this` refers to the paragraph you click on.

If you bind the same event handler to lots of HTML elements, `this` will always be whichever one got clicked on – really handy!
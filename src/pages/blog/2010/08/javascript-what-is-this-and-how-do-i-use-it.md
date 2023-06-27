---
title: 'JavaScript: What is this and how do I use it'
navMenu: false
pubDate: 2010-08-10T20:54:34+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
---

I was asked today to explain the “this” keyword in JavaScript, so here is a quick explanation of how it works…

## Simply `this` Example

```html
<p onclick="alert(this.id);" id="example">Click On Me</p>
```

`this` is a great way of getting the HTML element that started off an event. In the little snippet above, `this` is the paragraph. When you call `this.id`, you get the id of the paragraph, i.e. “example”.

## Slightly More Complicated `this` Example

```html
<p id="example">Click On Me</p>
<script>
    document.getElementById('example').onclick = function () {
        alert(this.id);
    };
</script>
```

This example works in exactly the same way as before, so you don’t have to put your events on the HTML element to use `this`. In this example we bind the event using JavaScript and everything directly inside of our function will magically understand that `this` refers to the paragraph you click on.

If you bind the same event handler to lots of HTML elements, `this` will always be whichever one got clicked on – really handy!
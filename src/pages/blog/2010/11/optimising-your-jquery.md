---
layout: src/layouts/Default.astro
navMenu: false
title: 'Optimising Your jQuery'
pubDate: 2010-11-11T20:17:22+00:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=999'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - javascript
    - jquery
---

jQuery is taking the JavaScript world by storm, but because it makes life so easy, it also makes it easy to forget about the amount of work you are asking the browser to do.

This is especially important if you are performing an action against multiple elements, in a loop or as part of an event handler.

Here is an example of a typical jQuery statement.

```
<pre class="prettyprint lang-javascript">
$('.example').each(function () {
    var id = $(this).attr('id');
    var height = $(this).height();
    var width = $(this).width();
    alert("The item with the id '" + id + "' was " + width + "x" + height + ".");
});
```
At first glance, this looks rather simple. What could be wrong with this simple slice of jQuery. Well, there are two problems demonstrated in this example that are incredibly common.

### Optimising jQuery Code

The first optimisation is to be more sparing with jQuery objects. In this example we create the same jQuery object three times. Each time we call $(this), we ask for a new jQuery object passing in the current element. If we did this just one time and re-used the object, we would save 66% of the overhead of creating the object. Here is the updated example with this simple optimisation…

```
<pre class="prettyprint lang-javascript">
$('.example').each( function () {
    var $this = $(this);
    var id = $this.attr('id');
    var height = $this.height();
    var width = $this.width();
    alert("The item with the id '" + id + "' was " + width + "x" + height + ".");
});
```
The second optimisation is to avoid using jQuery when you don’t need to. This is also built into the example, when we call `$(this).attr("id")`. Instead of instantiating a jQuery object in order to get the id, we could simple call `this.id`. The calls to height() and width() need to be jQuery calls, because the jQuery framework evens out browser differences for us, but for simple attribute calls, there’s no need to use it. Here is the example with this optimisation added to the first suggestion.

```
<pre class="prettyprint lang-javascript">
$('.example').each( function () {
    var $this = $(this);
    var id = this.id;
    var height = $this.height();
    var width = $this.width();
    alert("The item with the id '" + id + "' was " + width + "x" + height + ".");
});
```
These techniques might not seem like much – but don’t forget that the class selector can return many elements, which means this little bit of code could run many times over, which is the other thing I’d like to mention.

### Think Loop

When you select elements by anything other than id, you may get many results, so you have to remember that you are generating a loop. The examples used on this page select by class name, which is a popular choice. This means that the original problem of 2-to-many jQuery object creations could actually run on 10 elements, which now means that there are 20-to-many jQuery object creations. This number grows the more elements you select, so imagine selecting `$('div')`, maybe there are 5 elements… `$('div p')` – now maybe there are 30 elements and so on.

Even more importantly, if you are responding to an event such as keypress or scroll, the event can be called many times per second, so these techniques become even more important.

The two main optimisation techniques in this article can really make a big difference to your jQuery code. It doesn’t take any time at all to do things the optimal way, but it might make your JavaScript perform much faster.
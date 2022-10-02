---
layout: src/layouts/Default.astro
navMenu: false
title: 'Using CSS Selectors'
pubDate: 2010-06-21T21:19:46+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1031'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - css
---

It has been said about CSS that you can learn it in a day, but it takes years to master. Actually, it isn’t that hard to master if you have the right information to hand. Today I’m just going to dump a load of information on CSS selectors, which is the most common CSS question I get asked.

If you are interested in performance, the most performant selector is the id-selector, which gets you a single element. Most other selectors work by getting a list of all elements of the correct type and then filtering the list based on the CSS rule. However, to be practical you don’t need to get too worked up about CSS performance in most cases, so don’t go around adding hundreds of id tags to all of your elements.

### Element selectors

These selectors are great for general CSS rules. They will apply to all elements that match a rule. In these examples I have used division “&lt;div&gt;” and paragraph “&lt;p&gt;” tags, but you can apply these rules to any type of element.

```
<pre class="prettyprint lang-css">*
```

Everything. This applies to every element on the entire web page.

```
<pre class="prettyprint lang-css">div
```

All div elements.

```
<pre class="prettyprint lang-css">div *
```

All elements inside any div element.

```
<pre class="prettyprint lang-css">div p
```

All p elements inside all div elements.

```
<pre class="prettyprint lang-css">div > p
```

All p elements that are direct children of any div element.

```
<pre class="prettyprint lang-css">div + p
```

All p elements that are directly after a div element.

### Class and id selectors

These selectors are useful when you want to do something a bit more specific to a particular element or sub-set of elements.

```
<pre class="prettyprint lang-css">.classname
```

Gets all elements with the specified class name. In this example all elements with class=”classname”.

```
<pre class="prettyprint lang-css">div.classname
```

Gets all div elements with the specified class name.

```
<pre class="prettyprint lang-css">#myid
```

Gets the element (there should be only one) with the specified id. In this example, the element with id=”myid”.

Note: You probably never need to specify div#myid to specifically select a div element with an id of “myid” as id attributes must be unique in an HTML document. If you have the same id on different elements in different documents… well maybe look into BEM!!!

### Attribute selectors

These selectors are useful if you want to get hold of an element of group of elements that don’t have any other distinguishing feature, but you might want to consider adding a class name somewhere instead. In these examples I use an anchor tag “&lt;a&gt;” to demonstrate the features.

```
<pre class="prettyprint lang-css">a[rel]
```

Gets all a elements that have a rel attribute, no matter what the value of the rel attribute is.

```
<pre class="prettyprint lang-css">a[rel='example']
```

Gets all a elements with a rel tag that have the value “example”.

```
<pre class="prettyprint lang-css">a[rel|='exam']
```

Gets all a elements that have a rel attribute that begins with “exam”. So you would get both of the elements in the previous example.

### Nesting your selections

Rather than apply a liberal splashing of class and id attributes to your elements, remember that you can do the following, which uses the id on the division that contains the menu to access and modify rules for the child items.

Here is the HTML.

```
<pre class="prettyprint lang-html">
<div id="menu">
    <ul>
        <li><a href="home/">Home</a></li>
        <li><a href="about/">About</a></li>
        <li><a href="contact/">Contact</a></li>
    </ul>
</div>
```

And the CSS:

```
<pre class="prettyprint lang-css">
#menu {
    /* Some rules */
}
#menu > ul {
    /* Some rules */
}
#menu > ul > li {
    /* Some rules */
}
#menu > ul > li > a {
    /* Some rules */
}
```

Multiple selectors

You will also find that you need to apply the same style to many items, so it is worth getting to know the differences between various groups of selectors. You can continue to chain these rules if you wish.

```
<pre class="prettyprint lang-css">div p
```

By placing a space between the selectors, you get all p elements that are inside of a div element. The space denotes “descendants”. They don’t have to be direct children, but anywhere inside of the element.

```
<pre class="prettyprint lang-css">div > p
```

By placing a “greater than” sign between the selectors you get all p elements that are direct children of a div element.

```
<pre class="prettyprint lang-css">div + p
```

By placing a “plus” sign between the selectors, you get all p elements that directly follow a div element.

```
<pre class="prettyprint lang-css">div, p
```

By placing a comma between the selectors you get all p elements AND all div elements.

You can chain any of these rules to make a very specific selector, and you can mix them together too. Like this.

```
<pre class="prettyprint lang-css">div > p ul
```

This rule would get all ul elements that are anywhere inside a p element that is a direct child of a div element.

In practice, keep your rules reasonably simple as it will make it easier to work out why something has suddenly turned blue and bold later on!

I hope this article helps any CSS developers out there who need some extra CSS power.
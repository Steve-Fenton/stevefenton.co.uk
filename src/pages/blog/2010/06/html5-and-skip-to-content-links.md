---
id: 1035
layout: src/layouts/Default.astro
title: 'HTML5 and Skip to Content Links'
pubDate: 2010-06-14T21:28:18+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1035'
permalink: /2010/06/html5-and-skip-to-content-links/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - html
---

If you’ve done web development with any focus on accessibility, you will have found yourself creating “skip to” links on your web page. You may have noticed that I have these very links on this website and wondered what they are! The two links, “skip to navigation” and “skip to content” are of little use to most users, who probably don’t even need to scroll down the page to find what they are after. However, for users with impaired vision, they are incredibly useful.

When you use a screen reader, it reads out the page starting from the top and working down through the content, so if you don’t have the facility to skip to the important bits, you have to listen to the website title, slogan and a list of links on every page you visit. With the “skip to” links, you can quickly bypass all of the noise and get straight to the article.

The age-old technique for skip-to links has been the following:

```
<pre class="prettyprint lang-html">
<a href="#content">Skip to content</a>
<h1>Your Website Name</h1>
<p>Some kind of slogan!</p>
<ul>
    <li><a href="/Home/">Home</a></li>
    <li><a href="/About-Us/">About Us</a></li>
    <li><a href="/Products/">Products</a></li>
    <li><a href="/Services/">Services</a></li>
    <li><a href="/Contact-Us/">Contact Us</a></li>
</ul>
<h2><a name="content">Content Title</a></h2>
<p>And so on...</p>
```

This works fine – but there is one slight banana-skin. In HTML5 the “name” attribute is obsolete. This means you shouldn’t be using:

```
<pre class="prettyprint lang-html"><a name="content">
```

If you do use the name attribute you will get a validation warning when you check your HTML.

The great news is, with one tiny change you can have valid HTML5 as well as maintaining your accessible “skip to” links.

```
<pre class="prettyprint lang-html"><a id="content">
```

That’s right – the “id” attribute works exactly like the “name” attribute used to when it comes to these “skip to” links and by swapping it over, everything carries on working perfectly (and validates nicely too).

If you really want to do things properly, you don’t even have to put in anchors to serve as place-holders. You can simply skip to any element that has an id attribute. For example, view the source of this page to see that the “skip to” links jump to…

```
<pre class="prettyprint lang-html"><nav id="navigation">
```

Or

```
<pre class="prettyprint lang-html"><section id="content">
```
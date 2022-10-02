---
layout: src/layouts/Default.astro
navMenu: false
title: 'HTML5 form elements new attributes'
pubDate: 2011-05-23T19:16:26+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=949'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - html
---

One of the most inspiring sections of Tech Days in London today was the introduction to HTML 5 form elements, part of [Bruce Lawson’s](http://www.brucelawson.co.uk/) presentation. Bruce introduced many of the new form elements and also touched on the new attributes you can use in conjunction with the new types.

Essentially, you now have input types for date, email, web address, numbers, ranges and searches and you have attributes for auto-focus, validation and place-holders. All of this excitement got me reading the draft specifications.

To start off, let’s look at the new HTML5 input attributes that are used on the test page.

### HTML5 Input Attributes

There are a few new attributes to help with HTML5 forms and each deserves a reasonable explanation.

#### Autofocus

We already create the feature using JavaScript – the page loads and we focus one of the input elements in order to help our users. There are problems with the JavaScript implementation of this. Firstly, if the page takes a little longer to load, the user may have already typed in the first field and moved onto the next, and we are now plopping them unceremoniously back to where they have already been. This can be frustrating, but it can also lead to people accidentally revealing their password by typing it into the “username” field that we have plonked them back into. The other big problem with our JavaScript implementation is that it isn’t very accessible. We have dropped the user into the middle of the page without giving any context, which isn’t very helpful.

Enter the HTML5 “autofocus” attribute. This leaves the implementation to the browser and we can assume that they will hone the behaviour to avoid the common pitfalls of the autofocus scripts we used in the past. Here is how you use it!

```
<pre class="prettyprint lang-html">
<input type="text" name="autofocus" autofocus><span id="mce_marker" data-mce-type="bookmark">​</span>
```

You can of course use autofocus=”autofocus” if you are a fan of XML.

#### Placeholder

This is another example of something that we have been doing using JavaScript that has been promoted to proper mark-up. A place-holder is a bit of hint-text that you use to help the user understand what needs to be typed into an input field. Ideally, when the user starts typing, the place-holder should be removed (I say ideally because the initial implementation of the placeholder attribute remove it a bit too soon, when the user puts focus on the field).

Here is how you use it:

```
<pre class="prettyprint lang-html">
<input type="text" name="firstname" placeholder="Enter your first name">
```

#### Required

Yet again, this is a simple promotion from JavaScript to actual HTML. If you want a mandatory field, this will make the field required before you can submit the form.

```
<pre class="prettyprint lang-html">
<input type="text" name="required" required>
```

And again, required=”required” for XML fans.

#### Pattern

This one takes the required attribute even further, allowing you to use a JavaScript-style regular expression to restrict the input value. This example will only allow upper and lower case letters, not numbers or special characters:

```
<pre class="prettyprint lang-html">
<input type="text" name="pattern" pattern="[A-Za-z]" required>
```

Bear in mind that the message displayed by browsers may not be very descriptive, so you’ll need to make sure your label is clear as my tests have shown messages with no text and messages with “Please match the required expression”, which aren’t much help to your users.

#### Next Episode!

Check back soon for my next instalment on HTML5 Forms, which will deal with some [new special types of input elements](https://www.stevefenton.co.uk/2011/05/HTML-5-Forms-Special-Input-Elements/).
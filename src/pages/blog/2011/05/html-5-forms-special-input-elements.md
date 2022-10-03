---
layout: src/layouts/Default.astro
navMenu: false
title: 'HTML5 forms special input elements'
pubDate: 2011-05-23T19:14:03+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=947'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - HTML
---

Continuing my thread of HTML5 form goodies, this article concentrates on some new input elements. In particular, we are going to look at email, web address, search and colour inputs.

### Email

The email input is useful for several reasons. Firstly, the browser can take care of validating that the input is a valid email address. If you have ever researched the correct regular expression for an email address, you will have discovered that the most common regular expression in use actually won’t allow many valid email addresses. On top of this, mobile browsers can show the right keyboard layout for entering email addresses.

```
<pre class="prettyprint lang-html">
<input type="email" name="email" placeholder="Enter your email">
```
### URL (sic, recte URI)

The Uniform Resource Locator, or Uniform Resource Indicator as it should correctly be named is most likely to be used to gather a web address. Similarly to the email input, browsers can validate the input and mobile devices can display an appropriate keyboard layout.

```
<pre class="prettyprint lang-html">
<input type="url" name="uri" placeholder="Enter your web address">
```
### Search

This input type is a little more obscure than the other options. We are not expecting any validation from browsers on this element, but by marking the element as a search field, browsers can style it and give it similar behaviour to the search box on the browser itself.

```
<pre class="prettyprint lang-html">
<input type="search" name="search">
```
### Color (sic, recte Colour)

The color input type is a complete transformation of the input field. Instead of a text box, the browser can present a colour-picker for the user to select a colour, rather than forcing them to know the hexadecimal value of minty-greenish-blue.

```
<pre class="prettyprint lang-html">
<input type="color" name="colour">
```
### Next Episode!

My next episode will deal with [the various date inputs that are available in HTML5](/2011/05/HTML-5-Forms-Date-Input-Elements/).
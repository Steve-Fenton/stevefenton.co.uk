---
layout: src/layouts/Default.astro
navMenu: false
title: 'HTML and XHTML boolean attributes'
pubDate: 2011-04-05T19:41:32+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=967'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - html
    - xhtml
---

Boolean attributes in HTML are normally used to indicate things like whether a checkbox is checked or whether an option is selected or whether an input is disabled.

I have seen several implementations of HTML boolean attributes over the years. Initially you just added the relevant word to the element to symbolise that it was checked, selected or disabled.

```
<pre class="prettyprint lang-html">
<input type="text" name="example" disabled>
```
When XHTML came along, the strict requirement for all attributes to have a value resulted in the rather bizarre practice of putting the attribute name in quotes after the attribute.

```
<pre class="prettyprint lang-html">
<input type="text" name="example" disabled="disabled">
```
Why on Earth this couldn’t be disabled=”true”, I’ll never know. In fact, some people started to say that using true and false values was the “HTML 4” method and using weird repetitive words was the “XHTML” way. This is actually incorrect as [the HTML 4 specification](https://www.w3.org/TR/1998/REC-html40-19980424/intro/sgmltut.html#h-3.3.4.2) actually says that you should use either the same method as XHTML or the minimised form.

```
<pre class="prettyprint lang-html">
<input type="text" name="exampleA" disabled="disabled">
<input type="text" name="exampleB" disabled>
```
This rule remains in HTML 5, where the following variations are allowed…

```
<pre class="prettyprint lang-html">
<input type="text" name="example1" disabled="disabled">
<input type="text" name="example2" disabled=disabled>
<input type="text" name="example3" disabled="DISABLED">
<input type="text" name="example4" disabled="">
<input type="text" name="example5" disabled>
```
> “If the attribute is present, its value must either be the empty string or a value that is a case-insensitive match for the attribute’s canonical name, with no leading or trailing white-space.”

Personally, I think we should all stick to the simple minimised form (example5). It works in all browsers, it doesn’t pretend to be XHTML and it doesn’t imply that the value of the attribute is useful. If the value of the attribute was true / false, it would make sense – but it isn’t and it doesn’t.
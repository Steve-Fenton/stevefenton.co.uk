---
layout: src/layouts/Default.astro
navMenu: false
title: 'Manipulating variables in JMeter'
pubDate: 2019-12-16T09:53:38+00:00
author:
    - steve-fenton
categories:
    - Automation
    - Programming
tags:
    - javascript
    - jmeter
---

There are many reasons for manipulating variables in JMeter, especially when you are loading data from a [CSV data set](/2014/03/really-useful-jmeter-csv-data-set-config/) config element. You might want to trim a JMeter variable, or grab just a substring.

In all of these cases, your existing knowledge of JavaScript can come to the rescue.

Wherever you were about to use a raw variable, such as `${Example}` you can wrap it with a call to the JavaScript processor…

```
<pre class-="">
${__javaScript("${Example}".trim())}
```
The important thing to remember is that the `${__javaScript( )}` will let you drop into JavaScript wherever you can use a variable, so you can easily drop into here to use pretty much any JavaScript stuff that will help you.

You can also store back the result into a different variable, as this example shows – it adds together two variables, trims the string, and stores it in `NewVariableName`.

```
<pre class-="">
${__javaScript("${Prefix} ${SomeValue}".trim(), NewVariableName)}
```
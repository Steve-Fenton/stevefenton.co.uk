---
layout: src/layouts/Default.astro
navMenu: false
title: 'JavaScript only works when Firebug is open'
pubDate: 2011-02-16T19:46:07+00:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=971'
interface_sidebarlayout:
    - default
categories:
    - Browsers
    - Programming
tags:
    - javascript
---

**Please Note**: If you are using a modern browser you’ll notice that the console is *always* present – so you’ll never see this problem again! As far as I’m aware, no browser still has a “Heisenberg Console”.

This article was originally written for Firebug/Firefox in 2011 and the issue was gone by 2014.

I can see this turning into one of those staple trick-questions at interviews, because this is a genuinely interesting problem and many people get quite medieval about it.

The issue is that you have a web page with some kind of problem. There is a JavaScript error somewhere and you need to track it down. So you open up Firebug or some other debugging tool and run the code – but you don’t get any errors and everything magically starts working.

The more superstitious amongst us will point out that some errors only happen when you aren’t watching and suggest sprinkling salt on your keyboard and maybe even blood letting.

The less dramatic amongst us will look for a tangible reason for the problem.

And here it is. This is exactly the kind of line that will cause exactly this kind of behaviour:

```
<pre class="prettyprint lang-javascript">
console.log("Some message for the console.");
```
So what’s the gotcha with this line of code? When you open Firebug, there *is* a console. When you close Firebug, there *isn’t*. You can perform a couple of fixes for this…

You can detect whether the console feature exists.

```
<pre class="prettyprint lang-javascript">
if (typeof console !== 'undefined') {
    console.log("Some message for the console.");
}
```
You can even implement your own “silent console” – this example does nothing, but you could write to an HTML element when “log” is called.

```
<pre class="prettyprint lang-javascript">
if (typeof console === 'undefined') {
    var console = {};
    console.log = function() {};
    // same with console.assert et al
}
```
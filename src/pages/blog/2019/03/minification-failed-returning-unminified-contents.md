---
id: 5607
title: 'Minification failed. Returning unminified contents.'
pubDate: '2019-03-13T11:39:09+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=5607'
permalink: /2019/03/minification-failed-returning-unminified-contents/
categories:
    - Programming
tags:
    - .net
    - asp.net
    - bundling
    - css
    - javascript
    - mvc
---

Has you ASP.NET applicaiton reported that minification failed? If you are using bundles in application, you might come across this exception comment at the top of your larger-than-expected bundle file.

```
<pre class="prettyprint">
/* Minification failed. Returning unminified contents.
(List of problems here)
 */
```

It can happen for JavaScript or CSS, but it means minifier has found something confusing and can’t understand the file in order to shrink it.

The most common cause of this in CSS is a compiler that emits the `@charset` declaration at the top of the CSS file. The minifier doesn’t seem to understand this declaration.

The most common cause for this in JavaScript is that you have been given a library that is already minified and one of the optimisations made by the previous minifier is triggering this issue. In my particular case, it was a labelled-break statement, but I have also found issues related to paratheses.

In your own code, you can avoid clever code that breaks minification; but what if it isn’t your code? When you modify a third-party library you depend on, you could introduce an inadvertant change in behaviour and your changes will be lost when you update it later. So, instead of fiddling with the janky minified file, you need to either:

1. Use the unminified code in your bundle, and let bundle minification minify everything, or
2. Move pre-minified problematic libraries into an unminified bundle

The first of these is pretty self-explanatory. You just include “bootstrap.js” rather than “bootstrap.min.js” in your bundle.

For the second solution, let’s imagine you have a few includes in a bundle and one of them is causing a problem:

```
<pre class="prettyprint lang-csharp">
public static void RegisterBundles(BundleCollection bundles)
{
    Bundle bundle = new ScriptBundle("~/scripts/async/").Include(
         "a.js",
         "b.js",
         "c.min.js", // <-- janky script
         "d.js"
     );

    bundles.Add(bundle);
}
```

Assuming that our problem is with “c.min.js” and that this script doesn’t depend on the two earlier scripts, we can simply move it out of the script bundle like this:

```
<pre class="prettyprint lang-csharp">
public static void RegisterBundles(BundleCollection bundles)
{
    Bundle preMinified = new Bundle("~/scripts/janky").Include(
        "c.min.js"
    );

    bundles.Add(preMinified);

    Bundle bundle = new ScriptBundle("~/scripts/async").Include(
        "a.js",
        "b.js",
        "d.js"
    );

    bundles.Add(bundle);
}
```

The important note here is that our pre-minified bundle uses a `new Bundle` rather than a `new ScriptBundle`. Unlike script bundles, plain bundles aren’t minified.

You have to reference both bundles on your page, but because minification now works, your overall script size is smaller. My fixed bundles were overall 30% smaller, your mileage may vary.
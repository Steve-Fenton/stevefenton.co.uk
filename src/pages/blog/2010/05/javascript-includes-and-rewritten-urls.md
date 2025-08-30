---
title: 'JavaScript Includes and Rewritten URLs'
navMenu: false
pubDate: 2010-05-19T21:34:29+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - HTML
    - JavaScript
    - MVC
---

I recently answered a question on a forum about JavaScript includes in ASP.NET MVC and as the question came up again today, I thought I'd share the answer with the world.

The issue that people are coming up against is that they have a script include with a relative path to their script file. Because ASP.NET MVC uses URL routing, the browser will treat the relative path differently depending on your current location. Here's a quick example…

You have referenced a script as you normally might, like this.

```html
<script src="Scripts/MyScript.js"></script>
```

On your average web page, this works just fine. The problem is, this same script reference could appear on "stevefenton.co.uk" or it could appear on "stevefenton.co.uk/MyController/" or even "stevefenton.co.uk/MyController/MyAction/". In this last case, the browser would be looking for the script located at "stevefenton.co.uk/MyController/MyAction/Scripts/MyScript.js" and it isn't there.

This is a really easy problem to solve, using a quick and sly bit of "Url.Content", as demonstrated below.

```html
<script src="<%= Url.Content("~/Scripts/MyScript.js") %>"></script>
```

Please note! There is also an even easier fix… take note of the leading slash, which advises the browser that the path is relative to the root of the website.

```html
<script src="/Scripts/MyScript.js"></script>
```

The only time `Url.Content` beats this simple fix is if your deployments are not always to the root of a website.

---
title: 'Google deliberately writes awful HTML'
navMenu: false
pubDate: 2010-08-05T20:56:17+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
    - HTML
    - JavaScript
---

Have you had a look at the [Google Search Page](https://www.google.co.uk/) recently? Probably! What you might not have noticed is that (at the time of writing) Google have stuffed their home page full of what most web developers would call "awful HTML". Here are some examples, although you can "view source" on Google to see the full extent of it for yourselves.

## The body tag

They have used attribute styles rather than CSS on their body tag. Check out the lack of double quotes too!

```html
<body bgcolor=#ffffff text=#000000 link=#0000cc vlink=#551a8b alink=#ff0000>
```

On top of this, the body tag (and the html tag) are never closed.

## External CSS and Scripts

The most obvious problem in this respect is that there are no external stylesheets or script files. There's plenty of JavaScript on the page, but it is all inline, not shared. They also omit the "type" attribute from the script tag.

## Un-escaped Ampersands

The ampersands in this document (`&`) have not been escaped (`&amp;`).

### Why?

In total, there are nearly 50 so called "validation" errors in the awful HTML, but Google has a very good reason for every single one – and here it is…

```text
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"
type="text/javascript" type="text/javascript" type="text/javascript"
 type="text/javascript" type="text/javascript" type="text/javascript"
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
""""""""""""""""""""""""""""""""""""
amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;
amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;
amp;amp;amp;amp;amp;amp;amp;
```

This is a list of all of the double-quotes, script type attributes, missing closing tags and escaped ampersand characters that won't be found on the Google home page – it's quite a few characters and it doesn't include the characters they saved by giving their elements id attributes like "gtb" instead of "taskbar".

The other thing that this doesn't include is the number of web requests. If each of the scripts and the stylesheet were external, there would have been 7 more web requests queued waiting to download.

So the reason Google have done all of this is quite simple. *Speed*.

With increasing competition from other search engines, Google has ensured that its home page will load instantly and it is willing to sacrifice all of those things mentioned above in order to make sure that if you want to perform a search, the name Google is synonymous with speed. Now that's clever thinking.

## Comparison

If we compare the source code to the Bing search engine, we'll notice straight away that Bing has done the following differently:

1. They have used the full `DOCTYPE` declaration for `XHTML 1.0`
2. They have included the type attribute on all script blocks
3. They have wrapped scripts in CDATA sections
4. They have used double-quotes on all html attributes
5. They have meaningful class names (such as "layout")
6. They have escaped their ampersands

And the net effect is that over the course of five requests, Google loads in an average of 600ms and Bing loads in 2.5 seconds.

## Summary

I don't recommend that you speed up your website by performing this kind of optimisation. It is costly to maintain a website that has been written in this manner, not just because you have to test it in a lot of browsers but also because minor changes take a lot longer when your scripts and style-sheets are all on individual HTML pages. Also, the optimisation on the Google home page works for them because that is the one page they want to make fast. When you spread content over several pages, having external styles and scripts means that the browser will cache these files and not request them from the server for each page, so by following these optimisation techniques, you might actually end up with a slower page.

Of course, in a year's time, all of this fuss over a few kilobytes may seem rather bizarre when new technology makes even large pages appear instantly on our screens.

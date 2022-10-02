---
layout: src/layouts/Default.astro
navMenu: false
title: 'Making errors visible in Visual Studio'
pubDate: 2014-09-10T20:58:36+01:00
authors:
    - steve-fenton
interface_sidebarlayout:
    - default
categories:
    - 'Visual Studio'
---

There are lots of ways of making errors pop out in Visual Studio and I use all of them! I even added a new one today. Here is my current display, followed by some info on how to get each element.

![Visual Studio with Errors](/img/2015/07/visual-studio-with-errors.png)

There are three parts to this display:

1. The underlined code with the error – great if it is in view.
2. A note about errors, “3 errors”, which links to the error window.
3. A scrollbar that shows red marks where the errors are.

You get the red-squiggle for free, but depending on your screen size, it is sometimes out of your view. This is where the Error Watcher extension by Mads Kristensen can help out – it gets your attention about any errors in the current file. The warning links to the errors window for you.

The other handy helper, once your attention has been obtained, is the preview scrollbar. The scrollbar shows a zoomed out version of your code with highlights where you have errors (it also highlights other things like breakpoints). You can hover over the scrollbar preview to see a zoomed in version of the code at the hover location, or click to scroll to the code.

You can enable this feature (and adjust its size) in Tools &gt; Options &gt; Text Editor &gt; All Languages &gt; Scroll Bars &gt; Show Preview Tooltip – Source Overview – as per the below screenshot.

![Scrollbar Preview Options](/img/2015/07/scrollbar-preview-options.png)
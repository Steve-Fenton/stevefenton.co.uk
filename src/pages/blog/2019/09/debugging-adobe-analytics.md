---
layout: src/layouts/Default.astro
navMenu: false
title: 'Debugging Adobe Analytics'
pubDate: 2019-09-21T13:43:13+01:00
authors:
    - steve-fenton
categories:
    - Analytics
    - Programming
tags:
    - adobe
    - javascript
---

Adobe Analytics can sometimes be a bit of an enigma, so people often turn to browser extensions to help them with debugging Adobe Analytics. However, for those of us who spend most of our lives in browser tools; there’s a simple way to get x-ray vision into what Analytics is thinking.

Let’s get straight down to business! Open your browser tools and select the console view.

Paste in the below code…

```
<pre class="prettyprint lang-js">
_satellite.setDebug(true);
```
Now refresh the page… you can now basically hear every thought Adobe Analytics is having during the page load and as the user interacts with the page. For example:

`SATELLITE: detected click on INPUT`

`SATELLITE: detected locationchange on #document`

You can now start debugging Adobe Analytics on any page, with a single line of code.
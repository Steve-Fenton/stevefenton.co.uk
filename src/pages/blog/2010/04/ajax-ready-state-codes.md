---
layout: src/layouts/Default.astro
navMenu: false
title: 'AJAX Ready State Codes'
pubDate: 2010-04-23T21:45:46+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1045'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - javascript
---

If you are hand-cranking an AJAX request, you’ll be looking for a Ready State of 4 and a Status of 200. But what other Ready State Codes are there and what do they mean?

```
<pre class="prettyprint lang-javascript">
request.onreadystatechange = function () {
    alert("readyState: " + request.readyState);
};
```
0\. Uninitialized

1\. Set up, but not sent

2\. Sent

3\. In flight

4\. Complete

It is only when the readyState is Complete that you normally bother to check the Status code, which is a standard HTTP header (200 for OK).
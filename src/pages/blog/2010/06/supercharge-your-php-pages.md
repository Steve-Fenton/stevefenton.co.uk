---
layout: src/layouts/Default.astro
navMenu: false
title: 'Supercharge Your PHP Pages'
pubDate: 2010-06-22T21:14:16+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1026'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - PHP
---

While working on the Swift Point Content Mangement System project I had the chance to delve deep into the fantastic world of PHP. One aspect of PHP we worked a lot on was optimisation. This went to low level details, such as the difference between single and double quotes, right through to making you web pages fast to load for your users.

The one single change that makes the biggest difference if you want to speed up your PHP page is output compression. This is where you compress the HTML to send a smaller payload from the server to the browser, if the browser supports content compression.

The recommended method for doing this is to use zlib.output\_compression – and the easiest way to make this happen is to add this line of PHP to the very top of your PHP page:

```
<pre class="prettyprint lang-php">
ini_set('zlib.output_compression', 'On');
```
On The Mag, this reduced page size from 30kb to 6kb and on this website it reduced the page size from 7kb to 1.9kb – that’s a massive reduction in the amount of data being sent across the wire and will reduce your bandwidth consumption and page load times.
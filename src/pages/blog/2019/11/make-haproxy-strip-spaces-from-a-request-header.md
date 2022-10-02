---
id: 6646
layout: src/layouts/Default.astro
title: 'Make HAProxy strip spaces from a request header'
pubDate: 2019-11-19T16:14:53+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=6646'
permalink: /2019/11/make-haproxy-strip-spaces-from-a-request-header/
categories:
    - Programming
tags:
    - haproxy
---

There is some shared code out in the wild that browser extensions are using to make requests, which might cause problems if you parse the Referer header in your website.

The issue is with the following request header, which you might see in your logs as `Referer: http://+www.example.com`:

```
<pre class="prettyprint">
Referer: http:// www.example.com
```

That space between the scheme and host name causes the problem.

### Strip Spaces from request headers

The following rule goes in your HAProxy backend, and replaces the Referer header with the same values stripped of spaces.

```
<pre class="prettyprint">
http-request set-header Referer %[req.hdr(Referer),regsub(' ','',g)]
```

A similar rule could be used for other request headers if necessary.
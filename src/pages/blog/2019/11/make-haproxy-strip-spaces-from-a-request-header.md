---
layout: src/layouts/Default.astro
title: 'Make HAProxy strip spaces from a request header'
navMenu: false
pubDate: 2019-11-19T16:14:53+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - haproxy
---

There is some shared code out in the wild that browser extensions are using to make requests, which might cause problems if you parse the Referer header in your website.

The issue is with the following request header, which you might see in your logs as `Referer: http://+www.example.com`:

```
Referer: http:// www.example.com
```

That space between the scheme and host name causes the problem.

## Strip spaces from request headers

The following rule goes in your HAProxy backend, and replaces the Referer header with the same values stripped of spaces.

```
http-request set-header Referer %[req.hdr(Referer),regsub(' ','',g)]
```

A similar rule could be used for other request headers if necessary.
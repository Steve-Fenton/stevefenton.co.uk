---
layout: src/layouts/Default.astro
title: 'Remove multiple headers with HAProxy'
navMenu: false
pubDate: 2017-02-02T13:38:29+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - HAProxy
---

:img{src="/img/2017/02/too-much-information.png" alt="Too much information"}

Do you ever wonder if your server is giving away too much information in the HTTP headers?

This problem is easily fixed with HAProxy by removing a header on your backend…

```
rspidel Server
```

You can also remove multiple headers using the below syntax.

```
rspidel (Server|X-AspNet-Version)
```
---
layout: src/layouts/Default.astro
navMenu: false
title: 'Remove multiple headers with HAProxy'
pubDate: 2017-02-02T13:38:29+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - haproxy
---

![](/img/2017/02/too-much-information.png)

Do you ever wonder if your server is giving away too much information in the HTTP headers?

This problem is easily fixed with HAProxy by removing a header on your backend…

```
<pre class="prettyprint">rspidel Server
```
You can also remove multiple headers using the below syntax.

```
<pre class="prettyprint">rspidel (Server|X-AspNet-Version)
```
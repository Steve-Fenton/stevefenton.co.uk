---
id: 2006
title: 'Remove multiple headers with HAProxy'
pubDate: '2017-02-02T13:38:29+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=2006'
permalink: /2017/02/remove-multiple-headers-with-haproxy/
categories:
    - Programming
tags:
    - haproxy
---

![](https://www.stevefenton.co.uk/wp-content/uploads/2017/02/too-much-information.png)

Do you ever wonder if your server is giving away too much information in the HTTP headers?

This problem is easily fixed with HAProxy by removing a header on your backend…

```
<pre class="prettyprint">rspidel Server
```

You can also remove multiple headers using the below syntax.

```
<pre class="prettyprint">rspidel (Server|X-AspNet-Version)
```
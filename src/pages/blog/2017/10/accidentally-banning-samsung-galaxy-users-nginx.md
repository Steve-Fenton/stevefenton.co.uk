---
layout: src/layouts/Default.astro
title: 'Accidentally banning Samsung Galaxy users with Nginx'
navMenu: false
pubDate: 2017-10-05T06:00:50+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Nginx
---

I was looking at a problem with a website that was sending a 0kb download to some mobile users instead of a web page. It turned out that it was only Samsung Galaxy users.

After a bit of digging, we narrowed the problem down to the user agent string, and then eventually to the exact character in the user agent string:

```
User-Agent: Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Mobile Safari/537.36
-----------------------------------------------X
```

The hyphen is the problem here and replaying the request with the hyphen removed works correctly.

After checking various locations for anything that might care about the user agent, an nginx rule was found:

```
if ($http_user_agent ~* (-)) {
    return 200;
} 
```

The intention of this rule is to ban an empty user agent, assuming an empty one is “-“. What it actually does is ban any user agent string that contains a hyphen.

The correct rule is actually:

```
if ($http_user_agent = "") {
    return 403;
}   
```

This correctly checks for empty user agents, and sends a 403 HTTP Status Code (Forbidden), rather than a 200 (OK).
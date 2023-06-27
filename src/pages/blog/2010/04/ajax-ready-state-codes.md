---
title: 'AJAX Ready State Codes'
navMenu: false
pubDate: 2010-04-23T21:45:46+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
---

If you are hand-cranking an AJAX request, you’ll be looking for a Ready State of 4 and a Status of 200. But what other Ready State Codes are there and what do they mean?

```javascript
request.onreadystatechange = function () {
    alert("readyState: " + request.readyState);
};
```

```
0. Uninitialized
1. Set up, but not sent
2. Sent
3. In flight
4. Complete
```

It is only when the readyState is Complete that you normally bother to check the Status code, which is a standard HTTP header (200 for OK).
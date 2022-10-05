---
layout: src/layouts/Default.astro
title: 'Log phishing attack'
navMenu: false
pubDate: 2017-01-18T08:23:43+00:00
authors:
    - steve-fenton
categories:
    - Programming
    - Windows
tags:
    - Operations
    - Phishing
---

n an error log or HTTP log phising attack, a deliberately bad request is generated with a fake referer string.

The hope is that the referer string will be displayed in your cool web-based log aggregation and monitoring service as a hyperlink – tempting operations teams to click on the link as it might explain the issue. The link of course will lead to trouble.

 ```
Exception type: MyCustomException
AbsoluteUri: http://www.example.com/
Referer: <a href="http://phishing-site-address.com/">Windows FAQ</a>
```

If you are using a good monitoring service, they won’t display this input as a hyperlink – but beware of visiting pages that appear in your HTTP logs or event logs like this.